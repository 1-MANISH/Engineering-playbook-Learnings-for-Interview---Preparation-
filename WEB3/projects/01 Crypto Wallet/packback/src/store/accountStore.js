
import {create} from "zustand"
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import {Keypair} from '@solana/web3.js'
import nacl from "tweetnacl";
import {HDNodeWallet} from "ethers"
import * as bitcoin from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1'
import {BIP32Factory} from "bip32"
const bip32 = BIP32Factory(ecc)
import { HDKey } from "micro-ed25519-hdkey";
import bs58 from "bs58";
import {Account,Wallet} from "../lib/account"

export const useAccountStore = create((set,get)=>({
        packbackTheme:'light',
        packbackAccounts:JSON.parse(localStorage.getItem('packbackAccounts')) || [],
        currentAccount:null,
        currentNetwork:null,
        currentWallet:null,
        pathTypeName:null,
        loading:false,


        setLoading:(loading)=>{
                set({loading})
        },
        toggleTheme:(theme)=>{
                set({packbackTheme:theme})
        },
        generateWalletsForMnemonic:async(networks=[],mnemonic="",newAccount=true,accountIndex=0)=>{
                try {

                        if(newAccount){
                                // get seedBuffer from mnemonic
                                let seedBuffer =  bip39.mnemonicToSeedSync(mnemonic) // getting buffer from mnemonic

                                // generate wallet for each networks
                                const paths = networks.map((network)=>{
                                        return `m/44'/${network}'/0'/${accountIndex}'`
                                })

                                // now generate wallet for each networks with public and private keys
                                const wallets = paths.map((path,index)=>{

                                        let publicKeyEncoded = "" 
                                        let privateKeyEncoded = ""

                                        if(networks[index]==='501'){
                                                // solona
                                                // const keypair = Keypair.fromSeed(seedBuffer.slice(0,32))
                                                // console.log(keypair.publicKey.toBase58())
                                                const hdkey = HDKey.fromMasterSeed(seedBuffer)
                                                const child = hdkey.derive(path)
                                                // console.log(child)
                                                publicKeyEncoded = bs58.encode(child.publicKey)
                                                privateKeyEncoded = bs58.encode(child.privateKey)
                                        }else if(networks[index]==='60'){
                                                // ethereum
                                                const wallet = HDNodeWallet.fromPhrase(mnemonic,path)
                                                // console.log(wallet)
                                                publicKeyEncoded = wallet.publicKey.toString('hex')
                                                privateKeyEncoded = wallet.privateKey
                                        }else if(networks[index]==='0'){
                                                // bitcoin
                                                const root = bip32.fromSeed(seedBuffer)
                                                const child = root.derivePath(path)
                                                // console.log(child,child.publicKey,child.toWIF())
                                                const address = bitcoin.payments.p2wpkh({
                                                        pubkey:child.publicKey,
                                                        network:bitcoin.networks.bitcoin
                                                })
                                                publicKeyEncoded = address.address
                                                privateKeyEncoded = child.toWIF()
                                        }else{
                                                // other networks
                                        }

                                        return new Wallet( 
                                                accountIndex,
                                                networks[index],
                                                mnemonic.split(" "),
                                                paths[index],
                                                publicKeyEncoded,
                                                privateKeyEncoded
                                        )
                                })

                                return wallets

                        }else{
                                // for existing account- we are adding new wallet
                                console.log("existing account")
                        }
                } catch (error) {
                        throw new Error(error)
                }
        },
        createNewAccount:async(networks=[])=>{
                try {
                        if(networks.length===0){
                                throw new Error("Please select at least one network")
                        }
                        // now suppose allowed only 12 words
                        let mnemonicWords =  new Array(12).fill("")

                        // as we are creating new account
                        // 1 ) first create mnemonic /seed phrase
                        const mnemonic = bip39.generateMnemonic(wordlist,mnemonicWords.length ===12 ? 128 : 256);

                        // 2 ) get all words
                        mnemonicWords = mnemonic.split(" ");

                        // get local storage
                        const numberOfAccount = get().packbackAccounts.length || 0;
                        
                        // 3) then generate wallet for each networks using this seed phrase
                        const wallets = await useAccountStore.getState().generateWalletsForMnemonic(networks,mnemonic,true,numberOfAccount);

                        // create a packback account
                        const newAccount = new Account(mnemonicWords,networks,wallets ,numberOfAccount);
                        // console.log(newAccount)

                        set({packbackAccounts:[...get().packbackAccounts,newAccount]})

                        // console.log(get().packbackAccounts,'createWala')

                        // 4)  setUp into local storage
                        localStorage.setItem('packbackAccounts',JSON.stringify([...get().packbackAccounts]));
                } catch (error) {
                        throw new Error(error,error.message)
                }
        },

        addWalletAccount:async(seedPhrase,network="")=>{
                try {
                        if(seedPhrase.length===0 || (seedPhrase.length!=12 &&  seedPhrase.length!=24)){
                                throw new Error("Seed phrase must be at least 12 / 24 words")
                        }
                        
                        const mnemonic = seedPhrase.join(" ").trim();
                        // console.log(mnemonic,network)
                        // if(!bip39.validateMnemonic(mnemonic)){
                        //         throw new Error("Seed phrase is not valid")
                        // }

                        // console.log(mnemonic,network)

                        const numberOfAccount = get().packbackAccounts?.length || 0

                        const wallets = await useAccountStore.getState(). generateWalletsForMnemonic([network],mnemonic,true,numberOfAccount)
                        
                        const newAccount = new Account(seedPhrase,[network],wallets,numberOfAccount)
                        // console.log(newAccount)
                        set({packbackAccounts:[...get().packbackAccounts,newAccount]})
                        // console.log(get().packbackAccounts,'addWala')
                        localStorage.setItem('packbackAccounts',JSON.stringify([...get().packbackAccounts]));
                } catch (error) {
                        throw new Error(error)
                }
        },

        updateAccount:async(accountId,name)=>{

        },
        deleteAccount:async(accountId)=>{

        },
        getAccountSeedPhrase:async(accountId)=>{

        },

        getWalletsForNetwork:async(accountId,network="")=>{
                
        },
        addWallet:async(accountId,network)=>{

        },
        deleteWallet:async(accountId,walletId)=>{

        },


}))

// https://petal-estimate-4e9.notion.site/Creating-a-web-based-wallet-e0f174184f574aa9a73a98cabe3f13b6