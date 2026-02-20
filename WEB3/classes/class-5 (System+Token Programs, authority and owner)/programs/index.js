import {
        Connection,
        Keypair,
        PublicKey,
        SystemProgram,
        Transaction,
        sendAndConfirmTransaction,
        clusterApiUrl,
        LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// Connect to devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Your wallet (sender) — load from secret key
const sender = Keypair.fromSecretKey(Uint8Array.from([238,37,160,63,235,162,103,112,91,120,11,100,97,222,46,57,33,36,158,29,163,121,186,4,249,151,116,21,106,114,124,105,55,27,35,132,217,167,44,115,191,71,221,52,109,118,144,18,24,191,77,233,73,231,26,84,62,220,94,64,47,254,125,172]));

// Recipient address
const recipient = new PublicKey("EVgKrHgMwMPBeh2vMWkUoUyH2954dHJEiReJQSpCT5ow");

// Build the transaction
const transaction = new Transaction().add(
        SystemProgram.transfer({
                fromPubkey: sender.publicKey,
                toPubkey: recipient,
                lamports: 0.1 * LAMPORTS_PER_SOL, // 0.1 SOL
        })
);

// Send and confirm
const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
console.log("SOL Transfer signature:", signature);