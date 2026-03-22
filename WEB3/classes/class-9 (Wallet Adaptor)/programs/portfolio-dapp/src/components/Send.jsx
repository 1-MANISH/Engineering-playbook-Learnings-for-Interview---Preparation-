import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";
const Send = () => {

        // no access ot private keys -  as we are using wallet adaptor
        // then how sign transaction - to send money

        const wallet = useWallet()
        const {connection} = useConnection()


        const [amount,setAmount] = useState(0)
        const [walletAddress,setWalletAddress] = useState('')
        const [message,setMessage] = useState('')
        const [error,setError] = useState('')


        const handleSend = async () =>{
                try {

                         const transaction = new Transaction();
                         transaction.add(
                                SystemProgram.transfer({
                                        fromPubkey:wallet.publicKey,
                                        toPubkey: new PublicKey(walletAddress),
                                        lamports: amount * LAMPORTS_PER_SOL,
                                })
                        );

                        await wallet.sendTransaction(transaction, connection)

                        setAmount(0)
                        setWalletAddress('')

                        setMessage('Transaction successful')

                        setTimeout(()=>{
                                setMessage('')
                        },2000)

                        
                } catch (error) {
                        setError(error.message)
                        setTimeout(()=>{
                                setError('')
                        },2000)
                }
        }
        return (
                <div>
                        <input 
                                type="text" 
                                placeholder='wallet address' 
                                // value={walletAddress}
                                onChange={(e)=>setWalletAddress(e.target.value)} 
                        />
                        <input 
                                type="number" 
                                placeholder='amount' 
                                // value={amount}
                                onChange={(e)=>setAmount(e.target.value)} 
                        />
                        <button onClick={handleSend}>Send SOL</button>

                        <div className="">
                                {message && <p className="text-green-500">{message}</p>}
                                {error && <p className="text-red-500">{error}</p>}
                        </div>
                </div>
        )
}

export default Send