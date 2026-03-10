import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const connection  =  new Connection("https://api.devnet.solana.com")
const keyPair = Keypair.fromSecretKey(new Uint8Array([238,37,160,63,235,162,103,112,91,120,11,100,97,222,46,57,33,36,158,29,163,121,186,4,249,151,116,21,106,114,124,105,55,27,35,132,217,167,44,115,191,71,221,52,109,118,144,18,24,191,77,233,73,231,26,84,62,220,94,64,47,254,125,172]))
        



// 1 ) creating a normal data account
// async function main(){

//         // create a new wallet 

//         const newKeypair = Keypair.generate()

//         const tx = new Transaction().add(
//                 SystemProgram.createAccount({
//                         fromPubkey: keyPair.publicKey,
//                         newAccountPubkey:  newKeypair.publicKey,
//                         space: 165,
//                         lamports: LAMPORTS_PER_SOL*0.1,
//                         programId: TOKEN_2022_PROGRAM_ID
//                 })
//         )

//         const signature = await connection.sendTransaction(tx, [keyPair, newKeypair])

//         console.log(signature)
//         console.log(newKeypair.publicKey.toBase58())


// }


// 2 ) creating a pda account

async function main(){

        // create a new pda account

        const [randomPDA] = PublicKey.findProgramAddressSync(
                [],
                ASSOCIATED_TOKEN_PROGRAM_ID
        )

        const tx = new Transaction().add(
                SystemProgram.createAccount({
                        fromPubkey: keyPair.publicKey,
                        newAccountPubkey:  randomPDA,
                        space: 165,
                        lamports: LAMPORTS_PER_SOL*0.1,
                        programId: TOKEN_2022_PROGRAM_ID
                })
        )

        const signature = await connection.sendTransaction(tx, [keyPair, ASSOCIATED_TOKEN_PROGRAM_ID])

        console.log(signature)
        console.log(newKeypair.publicKey.toBase58())


}

// main()

