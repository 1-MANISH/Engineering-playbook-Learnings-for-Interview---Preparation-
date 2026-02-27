const { createMint, getOrCreateAssociatedTokenAccount, mintTo } = require('@solana/spl-token');
const { Keypair, Connection, clusterApiUrl,  TOKEN_PROGRAM_ID, PublicKey } = require('@solana/web3.js');

const payer = Keypair.fromSecretKey(Uint8Array.from([238,37,160,63,235,162,103,112,91,120,11,100,97,222,46,57,33,36,158,29,163,121,186,4,249,151,116,21,106,114,124,105,55,27,35,132,217,167,44,115,191,71,221,52,109,118,144,18,24,191,77,233,73,231,26,84,62,220,94,64,47,254,125,172]));

const mintAthority = payer;

const connection = new Connection(clusterApiUrl('devnet'));

async function createMintForToken(payer, mintAuthority) {
        const mint = await createMint(
                connection,
                payer,
                mintAuthority,
                null,
                6,
                TOKEN_PROGRAM_ID
        );
        console.log('Mint created at', mint.toBase58());
        return mint;
}

async function mintNewTokens(mint, to, amount) { 
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                payer,
                mint,
                new PublicKey(to)
        );

        console.log('Token account created at', tokenAccount.address.toBase58());
        await mintTo(
                connection,
                payer,
                mint,
                tokenAccount.address,
                payer,
                amount
        )
        console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
}

async function main() {
        const mint = await createMintForToken(payer, mintAthority.publicKey);
        await mintNewTokens(mint, mintAthority.publicKey, 100);    
}

main();
