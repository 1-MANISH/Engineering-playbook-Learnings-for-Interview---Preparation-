
import {create} from "zustand"

export const useAccountStore = create((set,get)=>({
        packbackTheme:'dark',
        packbackAccounts:localStorage.getItem('packbackAccounts') || [],
        currentAccount:null,
        currentNetwork:null,
        current_wallet:null,
        pathTypeName:null,


        toggleTheme:(theme)=>{
                set({packbackTheme:theme})
        },
        generateWalletsForMnemonic:async(networks=[],mnemonic="",newAccount=true,accountIndex=0)=>{
                try {
                        if(newAccount){
                                // get seedBuffer from mnemonic
                                let seedBuffer = mnemonic

                                // generate wallet for each networks
                                const paths = networks.map((network)=>{
                                        return `m/44'/${network.code}'/0'/${accountIndex}'`
                                })
                                const derivedSeeds = paths.map((path)=>{
                                        return derivePath(path,seedBuffer.toString("hex")).key
                                })

                                // now generate wallet for each networks with public and private keys
                                const wallets = derivedSeeds.map((seed,index)=>{

                                        let publicKeyEncoded = "" , privateKeyEncoded = ""

                                        if(networks[index]==='501'){
                                                // solona
                                        }else if(networks[index]==='60'){
                                                // ethereum
                                        }else if(networks[index]==='0'){
                                                // bitcoin
                                        }else{
                                                // other networks
                                        }

                                        return {
                                                accountId:accountIndex,
                                                network:networks[index],
                                                seedPhrase:mnemonic.join(" "),
                                                derivationPath:paths[index],
                                                publicKey:publicKeyEncoded,
                                                privateKey:privateKeyEncoded
                                        }
                                })

                        }else{
                                // for existing account- we are adding new wallet
                        }
                } catch (error) {
                        throw new Error(error)
                }
        },
        createNewAccount:async(networks=[])=>{
                try {
                        // as we are creating new account
                        // 1 ) first create mnemonic /seed phrase
                        // const mnemonic = generateMnemonic(128);

                        // 2 ) get all words
                        // const words = mnemonic.split(" ");

                        // get local storage
                        // const accounts = localStorage.getItem('packbackAccounts');
                        
                        // 3) then generate wallet for each networks using this seed phrase
                        // const wallets = await generateWalletsForMnemonic(networks,mnemonic,true,accounts.length);

                        // create a packback account
                        // const newAccount = new Account(words,networks,wallets);

                        // 4)  setUp into local storage
                        // localStorage.setItem('packbackAccounts',JSON.stringify([...accounts,newAccount]));
                } catch (error) {
                        throw new Error(error)
                }
        },

        addWalletAccount:async(seedPhrase,network="")=>{
                try {
                        if(!seedPhrase || seedPhrase.length!=12 || seedPhrase.length!=24){
                                throw new Error("Seed phrase must be at least 12 / 24 words")
                        }

                        const wallets = await generateWalletsForMnemonic(network,seedPhrase,false,accounts.length);
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