// getTokenAccountsByOwner 

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');

async function getTokenAccountsByOwner(ownerPublicKey) {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
        new PublicKey(ownerPublicKey),
        {
            programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        }
    );

    return tokenAccounts;
}

async function main() {
    const ownerPublicKey = '4i7RemktiYVynotHTCRvBtVvTNa7m8Wvq7GvytLmYX6T'; // Replace with the public key of the owner
//     const ownerPublicKey = 'EVgKrHgMwMPBeh2vMWkUoUyH2954dHJEiReJQSpCT5ow'; // Replace with the public key of the owner
    const tokenAccounts = await getTokenAccountsByOwner(ownerPublicKey);
    console.log('Token Accounts:', tokenAccounts.value);
}        

main();