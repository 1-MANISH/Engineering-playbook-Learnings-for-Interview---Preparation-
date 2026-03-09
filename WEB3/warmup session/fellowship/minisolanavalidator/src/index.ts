import express from "express";
import bs58 from "bs58";
import { randomBytes } from "crypto";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

const app = express();
app.use(express.json({ limit: "10mb" }));

// --- In-memory ledger ---

type Account = {
  pubkey: string;
  lamports: number;
  owner: string;
  data: Buffer;
  executable: boolean;
  rentEpoch: number;
};

type SignatureStatus = {
  slot: number;
  confirmations: number | null;
  err: null;
  confirmationStatus: "confirmed";
};

type BlockhashInfo = {
  slot: number;
  lastValidBlockHeight: number;
};

const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");
const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

const accounts: Map<string, Account> = new Map();
const signatures: Map<string, SignatureStatus> = new Map();
const issuedBlockhashes: Map<string, BlockhashInfo> = new Map();

let slot = 1;
let blockHeight = 1;

const rentExemptionFormula = (dataSize: number) => {
  // Any consistent formula is acceptable.
  return (dataSize + 128) * 2;
};

const makeError = (code: number, message: string) => ({ code, message });

const normalizePubkey = (input: string) => {
  try {
    return new PublicKey(input).toBase58();
  } catch (e) {
    throw makeError(-32602, "Invalid pubkey");
  }
};

const getAccount = (pubkey: string): Account | null => {
  const normalized = normalizePubkey(pubkey);
  const acc = accounts.get(normalized);
  if (!acc) return null;
  return acc;
};

const getOrCreateAccount = (pubkey: string): Account => {
  const normalized = normalizePubkey(pubkey);
  const existing = accounts.get(normalized);
  if (existing) return existing;
  const newAcc: Account = {
    pubkey: normalized,
    lamports: 0,
    owner: SYSTEM_PROGRAM_ID.toBase58(),
    data: Buffer.alloc(0),
    executable: false,
    rentEpoch: 0,
  };
  accounts.set(normalized, newAcc);
  return newAcc;
};

const setAccount = (acc: Account) => {
  accounts.set(acc.pubkey, acc);
};

const deleteAccount = (pubkey: string) => {
  accounts.delete(normalizePubkey(pubkey));
};

const isTokenAccountData = (data: Buffer) => data.length === 165;
const isMintData = (data: Buffer) => data.length === 82;

const parseTokenAccount = (data: Buffer) => {
  if (!isTokenAccountData(data)) return null;
  const mint = new PublicKey(data.subarray(0, 32)).toBase58();
  const owner = new PublicKey(data.subarray(32, 64)).toBase58();
  const amount = Number(data.readBigUInt64LE(64));
  const state = data.readUInt8(97);
  return { mint, owner, amount, state };
};

const parseMint = (data: Buffer) => {
  if (!isMintData(data)) return null;
  const mintAuthorityOption = data.readUInt32LE(0);
  const mintAuthority = new PublicKey(data.subarray(4, 36)).toBase58();
  const supply = Number(data.readBigUInt64LE(36));
  const decimals = data.readUInt8(44);
  const isInitialized = data.readUInt8(45);
  const freezeAuthorityOption = data.readUInt32LE(46);
  const freezeAuthority = new PublicKey(data.subarray(50, 82)).toBase58();
  return { mintAuthorityOption, mintAuthority, supply, decimals, isInitialized, freezeAuthorityOption, freezeAuthority };
};

const getAccountInfoResponse = (acc: Account) => {
  return {
    data: [acc.data.toString("base64"), "base64"],
    executable: acc.executable,
    lamports: acc.lamports,
    owner: acc.owner,
    rentEpoch: acc.rentEpoch,
  };
};

const createBlockhash = (): { blockhash: string; info: BlockhashInfo } => {
  const random = randomBytes(32);
  const blockhash = bs58.encode(random);
  const info: BlockhashInfo = {
    slot,
    lastValidBlockHeight: blockHeight + 150,
  };
  issuedBlockhashes.set(blockhash, info);
  return { blockhash, info };
};

const requireIssuedBlockhash = (blockhash: string) => {
  if (!issuedBlockhashes.has(blockhash)) {
    throw makeError(-32003, "Unknown blockhash");
  }
};

const ensureSignaturesValid = (tx: Transaction) => {
  const verified = tx.verifySignatures();
  if (!verified) {
    throw makeError(-32003, "Invalid or missing signature");
  }
};

const ensureSigner = (key: { pubkey: PublicKey; isSigner: boolean }, name: string) => {
  if (!key.isSigner) {
    throw makeError(-32003, `${name} must be a signer`);
  }
};

const cloneLedger = () => {
  const copy = new Map<string, Account>();
  for (const [k, v] of accounts.entries()) {
    copy.set(k, {
      pubkey: v.pubkey,
      lamports: v.lamports,
      owner: v.owner,
      data: Buffer.from(v.data),
      executable: v.executable,
      rentEpoch: v.rentEpoch,
    });
  }
  return copy;
};

const runTransaction = (tx: Transaction) => {
  const preLedger = cloneLedger();
  const preSlot = slot;
  const preBlockHeight = blockHeight;
  const preSignatures = new Map(signatures);

  try {
    // Verify blockhash is ours
    const recentBlockhash = tx.compileMessage().recentBlockhash;
    requireIssuedBlockhash(recentBlockhash);

    // Verify signatures
    ensureSignaturesValid(tx);

    // Execute instructions
    for (const ix of tx.instructions) {
      switch (ix.programId.toBase58()) {
        case SYSTEM_PROGRAM_ID.toBase58():
          runSystemProgramInstruction(ix);
          break;
        case TOKEN_PROGRAM_ID.toBase58():
          runTokenProgramInstruction(ix);
          break;
        case ASSOCIATED_TOKEN_PROGRAM_ID.toBase58():
          runAssociatedTokenProgramInstruction(ix);
          break;
        default:
          throw makeError(-32003, `Unsupported program ${ix.programId.toBase58()}`);
      }
    }

    // Record signature status
    const signature = tx.signatures[0]?.signature;
    if (signature) {
      const sigBase58 = bs58.encode(signature);
      signatures.set(sigBase58, {
        slot,
        confirmations: null,
        err: null,
        confirmationStatus: "confirmed",
      });
    }

    // Advance slot and blockheight
    slot += 1;
    blockHeight += 1;
  } catch (err: any) {
    // rollback upon failure
    accounts.clear();
    for (const [k, v] of preLedger.entries()) accounts.set(k, v);
    slot = preSlot;
    blockHeight = preBlockHeight;
    signatures.clear();
    for (const [k, v] of preSignatures.entries()) signatures.set(k, v);

    if (err && typeof err === "object" && "code" in err) {
      throw err;
    }
    throw makeError(-32003, (err && (err as Error).message) || "Transaction failed");
  }
};

const getLamports = (pubkey: string) => {
  const acc = getAccount(pubkey);
  return acc ? acc.lamports : 0;
};

const debitLamports = (pubkey: string, amount: number) => {
  if (amount < 0) throw makeError(-32003, "Invalid amount");
  const acc = getOrCreateAccount(pubkey);
  if (acc.lamports < amount) throw makeError(-32003, "Insufficient funds");
  acc.lamports -= amount;
};

const creditLamports = (pubkey: string, amount: number) => {
  if (amount < 0) throw makeError(-32003, "Invalid amount");
  const acc = getOrCreateAccount(pubkey);
  acc.lamports += amount;
};

const runSystemProgramInstruction = (ix: TransactionInstruction) => {
  const data = Buffer.from(ix.data);
  const disc = data.readUInt32LE(0);
  const keys = ix.keys;

  if (disc === 0) {
    // CreateAccount
    if (keys.length < 2) throw makeError(-32003, "CreateAccount requires 2 accounts");
    ensureSigner(keys[0], "payer");
    ensureSigner(keys[1], "new account");

    const lamports = Number(data.readBigUInt64LE(4));
    const space = Number(data.readBigUInt64LE(12));
    const owner = new PublicKey(data.subarray(20, 52)).toBase58();

    const newPubkey = keys[1].pubkey.toBase58();
    const existing = getAccount(newPubkey);
    if (existing && (existing.lamports > 0 || existing.data.length > 0)) {
      throw makeError(-32003, "Account already exists");
    }

    // fund new account
    debitLamports(keys[0].pubkey.toBase58(), lamports);

    const acc: Account = {
      pubkey: newPubkey,
      lamports,
      owner,
      data: Buffer.alloc(Number(space)),
      executable: false,
      rentEpoch: 0,
    };
    setAccount(acc);
    return;
  }

  if (disc === 2) {
    // Transfer
    if (keys.length < 2) throw makeError(-32003, "Transfer requires 2 accounts");
    ensureSigner(keys[0], "source");

    const lamports = Number(data.readBigUInt64LE(4));
    const src = keys[0].pubkey.toBase58();
    const dest = keys[1].pubkey.toBase58();
    debitLamports(src, lamports);
    creditLamports(dest, lamports);
    return;
  }

  throw makeError(-32003, `Unsupported SystemProgram instruction discriminator ${disc}`);
};

const runTokenProgramInstruction = (ix: TransactionInstruction) => {
  const data = Buffer.from(ix.data);
  const disc = data.readUInt8(0);
  const keys = ix.keys;

  const getTokenAccount = (pubkey: string) => {
    const acc = getAccount(pubkey);
    if (!acc) throw makeError(-32003, "Token account does not exist");
    if (acc.owner !== TOKEN_PROGRAM_ID.toBase58()) throw makeError(-32003, "Account is not owned by token program");
    if (!isTokenAccountData(acc.data)) throw makeError(-32003, "Invalid token account data");
    return acc;
  };

  const getMint = (pubkey: string) => {
    const acc = getAccount(pubkey);
    if (!acc) throw makeError(-32003, "Mint account does not exist");
    if (acc.owner !== TOKEN_PROGRAM_ID.toBase58()) throw makeError(-32003, "Account is not owned by token program");
    if (!isMintData(acc.data)) throw makeError(-32003, "Invalid mint data");
    return acc;
  };

  switch (disc) {
    case 20: {
      // InitializeMint2
      if (keys.length < 1) throw makeError(-32003, "InitializeMint2 requires mint account");
      const mintAcc = getMint(keys[0].pubkey.toBase58());
      const parsed = parseMint(mintAcc.data)!;
      if (parsed.isInitialized) throw makeError(-32003, "Mint already initialized");

      const decimals = data.readUInt8(1);
      const mintAuthority = new PublicKey(data.subarray(2, 34)).toBase58();
      const hasFreezeAuth = data.readUInt8(34);
      const freezeAuthority = new PublicKey(data.subarray(35, 67)).toBase58();

      const newData = Buffer.alloc(82);
      newData.writeUInt32LE(1, 0); // mintAuthorityOption
      new PublicKey(mintAuthority).toBuffer().copy(newData, 4);
      newData.writeBigUInt64LE(0n, 36); // supply
      newData.writeUInt8(decimals, 44);
      newData.writeUInt8(1, 45); // isInitialized
      newData.writeUInt32LE(hasFreezeAuth ? 1 : 0, 46);
      new PublicKey(freezeAuthority).toBuffer().copy(newData, 50);
      mintAcc.data = newData;
      return;
    }
    case 18: {
      // InitializeAccount3
      if (keys.length < 2) throw makeError(-32003, "InitializeAccount3 requires token account + mint");
      const tokenAcc = getOrCreateAccount(keys[0].pubkey.toBase58());
      if (tokenAcc.lamports > 0 || tokenAcc.data.length > 0) {
        throw makeError(-32003, "Token account already exists");
      }
      const mintAcc = getMint(keys[1].pubkey.toBase58());

      const owner = new PublicKey(data.subarray(1, 33)).toBase58();
      tokenAcc.owner = TOKEN_PROGRAM_ID.toBase58();
      tokenAcc.data = Buffer.alloc(165);
      new PublicKey(keys[1].pubkey).toBuffer().copy(tokenAcc.data, 0);
      new PublicKey(owner).toBuffer().copy(tokenAcc.data, 32);
      tokenAcc.data.writeBigUInt64LE(0n, 64); // amount
      tokenAcc.data.writeUInt8(1, 97); // state initialized
      return;
    }
    case 7: {
      // MintTo
      if (keys.length < 3) throw makeError(-32003, "MintTo requires mint, destination, authority");
      const mintAcc = getMint(keys[0].pubkey.toBase58());
      const destAcc = getTokenAccount(keys[1].pubkey.toBase58());
      const authority = keys[2];
      const parsedMint = parseMint(mintAcc.data)!;
      if (!authority.isSigner) throw makeError(-32003, "Mint authority must be signer");
      if (authority.pubkey.toBase58() !== parsedMint.mintAuthority) throw makeError(-32003, "Invalid mint authority");

      const amount = Number(data.readBigUInt64LE(1));
      const destParsed = parseTokenAccount(destAcc.data)!;
      const newAmount = BigInt(destParsed.amount) + BigInt(amount);
      destAcc.data.writeBigUInt64LE(newAmount, 64);
      const newSupply = BigInt(parsedMint.supply) + BigInt(amount);
      mintAcc.data.writeBigUInt64LE(newSupply, 36);
      return;
    }
    case 3: {
      // Transfer
      if (keys.length < 3) throw makeError(-32003, "Transfer requires source, destination, owner");
      const srcAcc = getTokenAccount(keys[0].pubkey.toBase58());
      const dstAcc = getTokenAccount(keys[1].pubkey.toBase58());
      const owner = keys[2];

      const srcParsed = parseTokenAccount(srcAcc.data)!;
      if (!owner.isSigner) throw makeError(-32003, "Owner must be signer");
      if (owner.pubkey.toBase58() !== srcParsed.owner) throw makeError(-32003, "Owner mismatch");

      const amount = Number(data.readBigUInt64LE(1));
      if (srcParsed.amount < amount) throw makeError(-32003, "Insufficient token balance");

      srcAcc.data.writeBigUInt64LE(BigInt(srcParsed.amount - amount), 64);
      const dstParsed = parseTokenAccount(dstAcc.data)!;
      dstAcc.data.writeBigUInt64LE(BigInt(dstParsed.amount + amount), 64);
      return;
    }
    case 12: {
      // TransferChecked
      if (keys.length < 4) throw makeError(-32003, "TransferChecked requires source, mint, destination, owner");
      const srcAcc = getTokenAccount(keys[0].pubkey.toBase58());
      const mintAcc = getMint(keys[1].pubkey.toBase58());
      const dstAcc = getTokenAccount(keys[2].pubkey.toBase58());
      const owner = keys[3];

      const srcParsed = parseTokenAccount(srcAcc.data)!;
      if (!owner.isSigner) throw makeError(-32003, "Owner must be signer");
      if (owner.pubkey.toBase58() !== srcParsed.owner) throw makeError(-32003, "Owner mismatch");

      const amount = Number(data.readBigUInt64LE(1));
      const decimals = data.readUInt8(9);
      const mintParsed = parseMint(mintAcc.data)!;
      if (mintParsed.decimals !== decimals) throw makeError(-32003, "Decimals mismatch");

      if (srcParsed.amount < amount) throw makeError(-32003, "Insufficient token balance");

      srcAcc.data.writeBigUInt64LE(BigInt(srcParsed.amount - amount), 64);
      const dstParsed = parseTokenAccount(dstAcc.data)!;
      dstAcc.data.writeBigUInt64LE(BigInt(dstParsed.amount + amount), 64);
      return;
    }
    case 8: {
      // Burn
      if (keys.length < 3) throw makeError(-32003, "Burn requires tokenAccount, mint, owner");
      const tokenAcc = getTokenAccount(keys[0].pubkey.toBase58());
      const mintAcc = getMint(keys[1].pubkey.toBase58());
      const owner = keys[2];

      const tokenParsed = parseTokenAccount(tokenAcc.data)!;
      if (!owner.isSigner) throw makeError(-32003, "Owner must be signer");
      if (owner.pubkey.toBase58() !== tokenParsed.owner) throw makeError(-32003, "Owner mismatch");

      const amount = Number(data.readBigUInt64LE(1));
      if (tokenParsed.amount < amount) throw makeError(-32003, "Insufficient token balance");

      tokenAcc.data.writeBigUInt64LE(BigInt(tokenParsed.amount - amount), 64);
      const mintParsed = parseMint(mintAcc.data)!;
      mintAcc.data.writeBigUInt64LE(BigInt(mintParsed.supply) - BigInt(amount), 36);
      return;
    }
    case 9: {
      // CloseAccount
      if (keys.length < 3) throw makeError(-32003, "CloseAccount requires account, destination, owner");
      const tokenAcc = getTokenAccount(keys[0].pubkey.toBase58());
      const destAcc = getOrCreateAccount(keys[1].pubkey.toBase58());
      const owner = keys[2];

      const tokenParsed = parseTokenAccount(tokenAcc.data)!;
      if (!owner.isSigner) throw makeError(-32003, "Owner must be signer");
      if (owner.pubkey.toBase58() !== tokenParsed.owner) throw makeError(-32003, "Owner mismatch");
      if (tokenParsed.amount !== 0) throw makeError(-32003, "Token account must have zero balance");

      // transfer lamports
      const lamports = tokenAcc.lamports;
      tokenAcc.lamports = 0;
      destAcc.lamports += lamports;
      deleteAccount(tokenAcc.pubkey);
      return;
    }
    default:
      throw makeError(-32003, `Unsupported Token Program instruction discriminator ${disc}`);
  }
};

const runAssociatedTokenProgramInstruction = (ix: TransactionInstruction) => {
  const data = Buffer.from(ix.data);
  // Create instruction uses discriminator 0 or empty data
  const isCreate = data.length === 0 || (data.length === 1 && data.readUInt8(0) === 0);
  if (!isCreate) {
    throw makeError(-32003, "Unsupported Associated Token Account instruction");
  }

  const keys = ix.keys;
  if (keys.length < 6) throw makeError(-32003, "Create associated token account requires 6 accounts");

  const payer = keys[0];
  const ata = keys[1];
  const owner = keys[2];
  const mint = keys[3];
  const systemProgram = keys[4];
  const tokenProgram = keys[5];

  if (systemProgram.pubkey.toBase58() !== SYSTEM_PROGRAM_ID.toBase58()) {
    throw makeError(-32003, "Invalid system program account");
  }
  if (tokenProgram.pubkey.toBase58() !== TOKEN_PROGRAM_ID.toBase58()) {
    throw makeError(-32003, "Invalid token program account");
  }

  ensureSigner(payer, "payer");

  const derived = PublicKey.findProgramAddressSync(
    [new PublicKey(owner.pubkey).toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), new PublicKey(mint.pubkey).toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  if (derived[0].toBase58() !== ata.pubkey.toBase58()) {
    throw makeError(-32003, "Invalid associated token account address");
  }

  const rent = rentExemptionFormula(165);
  debitLamports(payer.pubkey.toBase58(), rent);

  const ataAcc = getOrCreateAccount(ata.pubkey.toBase58());
  if (ataAcc.lamports > 0 || ataAcc.data.length > 0) {
    throw makeError(-32003, "Associated token account already exists");
  }

  ataAcc.lamports = rent;
  ataAcc.owner = TOKEN_PROGRAM_ID.toBase58();
  ataAcc.data = Buffer.alloc(165);
  new PublicKey(mint.pubkey).toBuffer().copy(ataAcc.data, 0);
  new PublicKey(owner.pubkey).toBuffer().copy(ataAcc.data, 32);
  ataAcc.data.writeBigUInt64LE(0n, 64);
  ataAcc.data.writeUInt8(1, 97);
};

const handleRpc = async (method: string, params: any): Promise<any> => {
  switch (method) {
    case "getVersion":
      return { "solana-core": "1.16.0", "feature-set": 0 };
    case "getSlot":
      return slot;
    case "getBlockHeight":
      return blockHeight;
    case "getHealth":
      return "ok";
    case "getLatestBlockhash": {
      const { blockhash, info } = createBlockhash();
      return {
        context: { slot },
        value: {
          blockhash,
          lastValidBlockHeight: info.lastValidBlockHeight,
        },
      };
    }
    case "getBalance": {
      if (!Array.isArray(params) || params.length < 1) throw makeError(-32602, "Invalid params");
      const pubkey = normalizePubkey(params[0]);
      return { context: { slot }, value: getLamports(pubkey) };
    }
    case "getAccountInfo": {
      if (!Array.isArray(params) || params.length < 1) throw makeError(-32602, "Invalid params");
      const pubkey = normalizePubkey(params[0]);
      const acc = getAccount(pubkey);
      return {
        context: { slot },
        value: acc ? getAccountInfoResponse(acc) : null,
      };
    }
    case "getMinimumBalanceForRentExemption": {
      if (!Array.isArray(params) || params.length < 1) throw makeError(-32602, "Invalid params");
      const dataSize = Number(params[0]);
      if (Number.isNaN(dataSize) || dataSize < 0) throw makeError(-32602, "Invalid params");
      return rentExemptionFormula(dataSize);
    }
    case "getTokenAccountBalance": {
      if (!Array.isArray(params) || params.length < 1) throw makeError(-32602, "Invalid params");
      const pubkey = normalizePubkey(params[0]);
      const acc = getAccount(pubkey);
      if (!acc || acc.owner !== TOKEN_PROGRAM_ID.toBase58() || !isTokenAccountData(acc.data)) {
        throw makeError(-32003, "Account is not a token account");
      }
      const parsed = parseTokenAccount(acc.data)!;
      const mintAcc = getAccount(parsed.mint);
      const mintParsed = mintAcc && isMintData(mintAcc.data) ? parseMint(mintAcc.data) : null;
      const decimals = mintParsed ? mintParsed.decimals : 0;
      const uiAmount = decimals > 0 ? Number(parsed.amount) / 10 ** decimals : parsed.amount;
      return {
        context: { slot },
        value: {
          amount: parsed.amount.toString(),
          decimals,
          uiAmount,
        },
      };
    }
    case "getTokenAccountsByOwner": {
      if (!Array.isArray(params) || params.length < 2) throw makeError(-32602, "Invalid params");
      const ownerPubkey = normalizePubkey(params[0]);
      const filter = params[1];
      const results: Array<{ pubkey: string; account: any }> = [];
      for (const acc of accounts.values()) {
        if (acc.owner !== TOKEN_PROGRAM_ID.toBase58() || !isTokenAccountData(acc.data)) continue;
        const parsed = parseTokenAccount(acc.data)!;
        if (parsed.owner !== ownerPubkey) continue;
        if (filter && filter.mint && parsed.mint !== normalizePubkey(filter.mint)) continue;
        if (filter && filter.programId && normalizePubkey(filter.programId) !== TOKEN_PROGRAM_ID.toBase58()) continue;
        results.push({ pubkey: acc.pubkey, account: getAccountInfoResponse(acc) });
      }
      return { context: { slot }, value: results };
    }
    case "requestAirdrop": {
      if (!Array.isArray(params) || params.length < 2) throw makeError(-32602, "Invalid params");
      const pubkey = normalizePubkey(params[0]);
      const lamports = Number(params[1]);
      if (Number.isNaN(lamports) || lamports < 0) throw makeError(-32602, "Invalid params");
      creditLamports(pubkey, lamports);
      const signature = bs58.encode(randomBytes(64));
      signatures.set(signature, {
        slot,
        confirmations: null,
        err: null,
        confirmationStatus: "confirmed",
      });
      slot += 1;
      blockHeight += 1;
      return signature;
    }
    case "sendTransaction": {
      if (!Array.isArray(params) || params.length < 1) throw makeError(-32602, "Invalid params");
      const encoded = params[0];
      if (typeof encoded !== "string") throw makeError(-32602, "Invalid params");
      const txBytes = Buffer.from(encoded, "base64");
      const tx = Transaction.from(txBytes);
      runTransaction(tx);
      const signature = tx.signatures[0]?.signature;
      if (!signature) throw makeError(-32003, "No signature");
      return bs58.encode(signature);
    }
    case "getSignatureStatuses": {
      if (!Array.isArray(params) || params.length < 1) throw makeError(-32602, "Invalid params");
      const sigs = params[0];
      if (!Array.isArray(sigs)) throw makeError(-32602, "Invalid params");
      const results = sigs.map((sig: string) => {
        const status = signatures.get(sig);
        return status ?? null;
      });
      return { context: { slot }, value: results };
    }
    default:
      throw makeError(-32601, "Method not found");
  }
};

app.post("/", async (req, res) => {
  const { jsonrpc, id, method, params } = req.body ?? {};
  if (jsonrpc !== "2.0" || id === undefined || typeof method !== "string") {
    return res.status(400).json({ jsonrpc: "2.0", id: id ?? null, error: makeError(-32600, "Invalid request") });
  }

  try {
    const result = await handleRpc(method, params);
    return res.json({ jsonrpc: "2.0", id, result });
  } catch (err: any) {
    const error = err && typeof err === "object" && "code" in err ? err : makeError(-32003, (err && err.message) || "Internal error");
    return res.json({ jsonrpc: "2.0", id, error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mini Solana Validator running on port ${PORT}`);
});
