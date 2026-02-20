import {
        Connection,
        PublicKey,
        clusterApiUrl,
} from "@solana/web3.js";

// Connect to devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const accountInformation =await connection.getAccountInfo(new PublicKey("EVgKrHgMwMPBeh2vMWkUoUyH2954dHJEiReJQSpCT5ow"))

console.log(accountInformation)