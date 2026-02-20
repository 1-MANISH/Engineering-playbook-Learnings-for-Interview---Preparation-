// create a new account

import { Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";


const connection  = new Connection("https://api.devnet.solana.com","finalized");

async function createAccount(){

        // my account - cli devnet- wallet address
        const payer = Keypair.fromSecretKey(new Uint8Array([238,37,160,63,235,162,103,112,91,120,11,100,97,222,46,57,33,36,158,29,163,121,186,4,249,151,116,21,106,114,124,105,55,27,35,132,217,167,44,115,191,71,221,52,109,118,144,18,24,191,77,233,73,231,26,84,62,220,94,64,47,254,125,172]))

        const newAccount = Keypair.generate()

        const fundTx = new Transaction().add(
                SystemProgram.createAccount({
                        fromPubkey:payer.publicKey,
                        newAccountPubkey:newAccount.publicKey,
                        space:0,
                        lamports:0.1*LAMPORTS_PER_SOL,
                        programId:SystemProgram.programId
                })
        )

        await sendAndConfirmTransaction(connection,fundTx,[payer,newAccount])

        console.log('funded account : ',newAccount.publicKey.toBase58())

        await allocateSomeSpace(newAccount)
}
createAccount()

async function allocateSomeSpace(newAccount){
        // now we can allocate some space - ?

        // await new Promise(r=>setTimeout(r,60*1000))

        // allocate few bytes of space
        const transaction2 = new Transaction().add(
                SystemProgram.allocate({
                        accountPubkey:newAccount.publicKey,
                        space:100,
                })
        )

        const sig2 = await sendAndConfirmTransaction(connection,transaction2,[newAccount])

        console.log(sig2)
}