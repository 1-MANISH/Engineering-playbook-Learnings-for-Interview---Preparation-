import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'

const Portfolio = () => {

        const {publicKey} = useWallet()
        const {connection} = useConnection()
        const [balance,setBalance] = useState(null)


        useEffect(()=>{
                if(publicKey){
                        connection.getBalance(publicKey).then(bal=>{
                                setBalance(bal/1000000000)
                        })
                }
        },[publicKey])


        return (
                <div>
                        {
                                publicKey ? (
                                        <div>
                                                <p>Public Key: {publicKey.toBase58()}</p>
                                                <p>Balance: {balance} SOL</p>
                                        </div>
                                ) : (
                                        <p>Wallet not connected</p>
                                )
                        }

                </div>
        )
}

export default Portfolio