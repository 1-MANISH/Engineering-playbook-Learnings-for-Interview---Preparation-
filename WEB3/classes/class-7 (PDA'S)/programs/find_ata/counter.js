import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const connection  = new Connection("https://api.devnet.solana.com")

const adminKeypair = Keypair.generate()

async function main(){

        // 1) airdrop some sol for admin - newly created account

        await connection.requestAirdrop(
                adminKeypair.publicKey,
                LAMPORTS_PER_SOL
        )



        // 2) create account  - for my friend
        const keypair = Keypair.generate()// does have both private and public key
        // pub_key ,  private_key -  ed25519 , eddsa , ecdsa etc
        // are alogithms for encryption

        /*


         */

        const tx = new Transaction().add(
                SystemProgram.createAccount({
                        fromPubkey:adminKeypair.publicKey,
                        newAccountPubkey:keypair.publicKey,
                        space:100,
                        lamports: 100000000,
                        programId:SystemProgram.programId,
                })
        )

        // sign transaction  - signer are [who_being_created , admin]
        await connection.sendTransaction(tx,[keypair,adminKeypair])

        // why newly created account also has to sign transaction otherwise tx failed
        /*
                But in phantom we send some amount of sol to my friend 
                which does not have any sol in it then also 
                my tx succeeded
                because phantom doest not use SYstemProgram.createAccount
                it calls SystemProgram.transfer (
                        lamports:1
                        fromPubkey:adminKeypair.publicKey,
                        toPubkey:keypair.publicKey
                )

                await connection.sendTransaction(tx,[adminKeypair])

                So why we can only use SystemProgram.transfer
                why we are using SystemProgram.createAccount

                --Because SystemProgram.createAccount does so many thing in it

                1) create account
                2) transfer lamports
                3) allocate space

                to just send sol its find to not sign tx -  but kuch weired kr rhee unke account
                ke sath then unko pta hona chaiyee

        */


        console.log(`being created keypair ${keypair.publicKey.toBase58()}`)

        console.log(`admin keypair ${adminKeypair.publicKey.toBase58()}`)

}

main()