
class Wallet{
        constructor(accountId,network,seedPhrase=[],derivationPath="",publicKey="",privateKey=""){
                this.id = Math.random()
                this.accountId=accountId
                this.network=network
                this.seedPhrase=seedPhrase
                this.derivationPath=derivationPath
                this.publicKey=publicKey
                this.privateKey=privateKey

        }
}



class Account{
        constructor (seedPhrase=[],networks=[],wallets=[]){
                this.accountId = Math.random()
                this.seedPhrase=seedPhrase
                this.networks=networks
                this.wallets=wallets
        }
}

export {Wallet,Account}