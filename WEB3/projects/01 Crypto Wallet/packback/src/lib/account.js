
class Wallet{
        constructor(accountId,network,seedPhrase=[],derivationPath="",publicKey="",privateKey=""){
                this.walletId = Math.random()
                this.accountId=accountId
                this.network=network
                this.seedPhrase=seedPhrase
                this.derivationPath=derivationPath
                this.publicKey=publicKey
                this.privateKey=privateKey

        }
}



class Account{
        constructor (seedPhrase=[],networks=[],wallets=[],accountIndex=0){
                this.accountId =accountIndex
                this.seedPhrase=seedPhrase
                this.networks=networks
                this.wallets=wallets
        }
}

export {Wallet,Account}