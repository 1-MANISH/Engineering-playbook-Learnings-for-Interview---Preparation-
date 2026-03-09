import {getAssociatedTokenAddress} from "@solana/spl-token"
import { PublicKey } from "@solana/web3.js"


//  getAssociatedTokenAddressSync 

/*
Is Does'nt work on devnet
or its just work on mainnet accounts
as we can'nt create/ see PDA account for devnet
*/
async function getPDAAddress(){
        try {
                // using top function
                const address  = await getAssociatedTokenAddress(
                        new PublicKey("token_mint_address"), // mint_address -  let USDC_mint address (current -randomTokenMint)
                        new PublicKey("user_wallet_address")// my_address - my wallet address

                )

                
                // way 2 to use main function
                const [address2] =  await PublicKey.findProgramAddress(
                        [
                                new PublicKey("user_wallet_address").toBuffer(), //owner
                                new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").toBuffer(),// token program id - public available
                                new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v").toBuffer() , // usdc mint address
                        ],
                        new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
                        //associatedTokenProgramId - public available,
                )



                console.log(address.toBase58())
                console.log(address2.toBase58())
        } catch (error) {
                console.log(error)
        }
}

// my_token ata account address we will get
getPDAAddress()
// HKzPZcKkzYHYS5Sm8zJ5fUs512MHpnDpkx3AUmWRi7qT
// at this address the final USDC balance will be stored here



/*

For my custom token - in devnet

 const address  = await getAssociatedTokenAddress(
                new PublicKey("FGccjjbjLR9HfkqHArTWSNEiTsXkYkyPZ8jreiNLhMU5"), // mint_address -  let USDC_mint address (current -randomTokenMint)
                new PublicKey("4i7RemktiYVynotHTCRvBtVvTNa7m8Wvq7GvytLmYX6T")// my_address - my wallet address

        )


        const address  = await getAssociatedTokenAddress(
                        new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // mint_address -  let USDC_mint address (current -randomTokenMint)
                        new PublicKey("EVgKrHgMwMPBeh2vMWkUoUyH2954dHJEiReJQSpCT5ow")// my_address - my wallet address

                )
*/
