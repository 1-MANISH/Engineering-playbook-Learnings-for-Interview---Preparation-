import * as secp from "@noble/secp256k1";


const originalMessage = "HARDIK";

async function main() {

        const {secretKey:privateKey , publicKey} = secp.keygen();
       
        console.log("privateKey: ",privateKey);
        console.log("publicKey: ",publicKey);

        const msgHash = new TextEncoder().encode(originalMessage);

        const signature = await secp.signAsync(msgHash, privateKey);

        const isValid = await secp.verifyAsync(signature, msgHash, publicKey);
        console.log(isValid);
}

main();