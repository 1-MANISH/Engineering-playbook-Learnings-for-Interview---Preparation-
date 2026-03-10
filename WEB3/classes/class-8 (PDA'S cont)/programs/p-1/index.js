import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress,TOKEN_2022_PROGRAM_ID,unpackAccount } from '@solana/spl-token'
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'


// how would we send this keypair (public key) 1 SOL of an airdrop ?
// can u airdrop 1 SOL devnet? YES
// can u airdrop 1 SOL mainnet? NO


// as this RPC devenet very expensive - very hevily rate limited
// we can go for some other RPCs -  rent explorer
//  helius , quicknode,Alchemy
// const connection  =  new Connection("https://api.devnet.solana.com")

const connection  =  new Connection("https://api.devnet.solana.com")

async function airdropSolToWallet(publicKey,amount){

        await connection.requestAirdrop(publicKey,amount)
}

async function main(){

        // new wallet - empty wallet
        // const newKeypair = Keypair.generate()
        const newKeypair = Keypair.fromSecretKey(new Uint8Array([238,37,160,63,235,162,103,112,91,120,11,100,97,222,46,57,33,36,158,29,163,121,186,4,249,151,116,21,106,114,124,105,55,27,35,132,217,167,44,115,191,71,221,52,109,118,144,18,24,191,77,233,73,231,26,84,62,220,94,64,47,254,125,172]))
        
        // airdrop
        // const airdropSignature = await airdropSolToWallet(newKeypair.publicKey,LAMPORTS_PER_SOL*1)

        // checking balance
        const balance = await connection.getBalance(newKeypair.publicKey)

        console.log('wallet address ' + newKeypair.publicKey.toBase58())
        // console.log("Airdrop signature:", airdropSignature)
        console.log("Balance of the wallet:"+balance / LAMPORTS_PER_SOL)
}

// main()

async function getUserTokenAddresses(publicKey){
        
        const userHasTokens = await connection.getTokenAccountsByOwner(
                publicKey,
                {
                        programId: TOKEN_2022_PROGRAM_ID
                }
        )

        console.log("userHasTokens:",userHasTokens)
}

async function  getTokenBalance(mintAddress,publicKey){

        // return users ata / pda address
        // const ataAddress = await  getAssociatedTokenAddress(
        //         mintAddress,
        //         publicKey,
        //         false,
        //         TOKEN_2022_PROGRAM_ID
        // )

        // without using getAssociatedTokenAddress we cal also find pda address

        const [ataAddress,bump] = await PublicKey.findProgramAddress(
                [
                        publicKey.toBuffer(),// converted into bytes
                        TOKEN_2022_PROGRAM_ID.toBuffer(),
                        mintAddress.toBuffer(),
                ],
                ASSOCIATED_TOKEN_PROGRAM_ID
        )
        console.log("ATA(pdas) address which function return:"+ataAddress.toBase58())

        // we will find token balance using PDA address
        const accountData = await connection.getAccountInfo(new PublicKey(ataAddress))
        // console.log("accountData:",accountData)

        // how to unpack
        const unpackedData =  unpackAccount(
               ataAddress,
                accountData,
                TOKEN_2022_PROGRAM_ID
        )
        // console.log("unpackedData:",unpackedData)

        const amount = parseInt(unpackedData.amount )/ LAMPORTS_PER_SOL
        console.log("Exact amount of tokens:"+amount)

        console.log('Extra field ', bump)


        // public_key = 32 bytes / 32 * 8  =  256 bits = [010101010101010101010101010]
        


}

// getUserTokenAddresses(
//         new PublicKey("4i7RemktiYVynotHTCRvBtVvTNa7m8Wvq7GvytLmYX6T")
// )



// how much this account address has this token amount

getTokenBalance(
        new PublicKey("6rP7LWkSSS1xE8vnb7LV41CC6oDUDTAmik7FpTHvirQH"),
        new PublicKey("4i7RemktiYVynotHTCRvBtVvTNa7m8Wvq7GvytLmYX6T")
)








