import {Keypair} from '@solana/web3.js'
import nacl from "tweetnacl"
const originalMessage = "HARDIK"
async function main(){

        const keyPair = Keypair.generate()

        const publicKey = keyPair.publicKey.toString()
        const privateKey = keyPair.secretKey

        console.log("publicKey: ",publicKey)
        console.log("privateKey: ",privateKey)

        const message = new TextEncoder().encode(originalMessage) // uint8array


        const signature = await nacl.sign.detached(message, privateKey)

        const result = nacl.sign.detached.verify(
                message,
                signature,
                keyPair.publicKey.toBytes()
        )

        console.log(result)
}

main()