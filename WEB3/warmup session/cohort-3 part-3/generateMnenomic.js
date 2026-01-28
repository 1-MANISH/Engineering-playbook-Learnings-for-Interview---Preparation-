import { Keypair } from "@solana/web3.js";
import { 
        generateMnemonic, 
        validateMnemonic ,
        mnemonicToSeedSync

} from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

let mnemonicWords = new Array(12).fill("")
let addressIndex= 0
// const mnemonicWords = ["", "", "", "", "", "", "", "", "", "", "", ""];
// now generating seed phrase 
const generateRandom = async () => {
	const words = generateMnemonic(mnemonicWords.length === 12 ? 128 : 256);
	console.log(words.split(" "));
        mnemonicWords = words.split(" ");
};

generateRandom()


// now lets generate different set of keys pair
// for different-2 accounts/wallets

function getCurrencyIndex(currency){
        switch(currency){
                case "BTC":{
                        return 0
                }
                case "ETH":{
                        return 60
                }
                case "SOL":{
                        return 501
                }
        }
        return 0;
}
function addressGenerate(currency){

        let currencyIndex  = getCurrencyIndex(currency);

        // const seedPhrase = "will rhythm frown art drink olympic joy faint easily tent behave blame"
        const seedPhrase = mnemonicWords.join(" ")
        const seed = mnemonicToSeedSync(seedPhrase)

        const path = `m/44'/${currencyIndex}'/${addressIndex}'/0'`;


        const derivedSeed   = derivePath(path,seed.toString("hex")).key

        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey

        console.log(Keypair.fromSecretKey(secret).publicKey.toBase58())
        // console.log(Keypair.fromSecretKey(secret).secretKey)

        addressIndex ++
}

// addressGenerate("SOL")
// addressGenerate("SOL")

