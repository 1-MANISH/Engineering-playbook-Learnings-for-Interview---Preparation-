
const {Connection,
         LAMPORTS_PER_SOL, 
         clusterApiUrl, 
         PublicKey,
         Keypair,  
         TOKEN_PROGRAM_ID
} = require('@solana/web3.js');

const { createMint, 
        getOrCreateAssociatedTokenAccount, 
        mintTo
 } = require('@solana/spl-token');



// if we wants to airdrop some sol
// then

const connection = new Connection(clusterApiUrl('devnet'))

async function airdrop(publicKey, amount) {
        const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
        await connection.confirmTransaction({signature: airdropSignature})
}

// airdrop("4i7RemktiYVynotHTCRvBtVvTNa7m8Wvq7GvytLmYX6T", LAMPORTS_PER_SOL).then(signature => {
//         console.log('Airdrop signature:', signature);
// });

// let just check balance of the account
async function checkBalance(publicKey) {
        const balance = await connection.getBalance(new PublicKey(publicKey));
        console.log('Balance:', balance / LAMPORTS_PER_SOL, 'SOL');
}

checkBalance("4i7RemktiYVynotHTCRvBtVvTNa7m8Wvq7GvytLmYX6T");

// create a new token mint account

const payer = Keypair.fromSecretKey(Uint8Array.from([238,37,160,63,235,162,103,112,91,120,11,100,97,222,46,57,33,36,158,29,163,121,186,4,249,151,116,21,106,114,124,105,55,27,35,132,217,167,44,115,191,71,221,52,109,118,144,18,24,191,77,233,73,231,26,84,62,220,94,64,47,254,125,172]));

const mintAthority = payer;


async function createMintForToken(payer, mintAuthority) {
        const mint = await createMint(
                connection,
                payer,
                mintAuthority,
                null,
                9,
                TOKEN_PROGRAM_ID
        );
        console.log('Mint created at', mint.toBase58());
        return mint;
}

async function createMintAccount() {
        const mint = await createMintForToken(payer, mintAthority.publicKey);
}

// createMintAccount();
// mint address = Goc6a1aDnskwKhaETTasJSGxhoRCytpDjzavamjKp1KW

// now create an associated token account for the mint

async function mintNewTokens(mint, to, amount) { 
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                payer,
                mint,
                new PublicKey(to)
        );

        console.log('Token account created at', tokenAccount.address.toBase58());
        // await mintTo(
        //         connection,
        //         payer,
        //         mint,
        //         tokenAccount.address,
        //         payer,
        //         amount
        // )
        console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
}

async function mintNewTokenToSomeone() {
        // const mint = await createMintAccount()
         const mint = await createMintForToken(payer, mintAthority.publicKey);
         console.log('Mint created at', mint);
        await mintNewTokens(mint, mintAthority.publicKey, 100);    
}

mintNewTokenToSomeone();
