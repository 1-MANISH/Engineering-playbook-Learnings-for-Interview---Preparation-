import * as ed from '@noble/ed25519'

const originalMessage = "HARDIK"
async function main(){

        const privateKey  =  ed.utils.randomSecretKey();
        const publicKey = await ed.getPublicKeyAsync(privateKey);

        const message = new TextEncoder().encode(originalMessage) // uint8array

        const signature = await ed.signAsync(message,privateKey)

        const isValid = await ed.verifyAsync(signature, message, publicKey)
        console.log("isValid: ",isValid)

}

main()