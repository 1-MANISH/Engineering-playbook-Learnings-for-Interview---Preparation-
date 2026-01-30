
import { useCallback, useState } from "react";
import { useAccountStore } from "../../store/accountStore"
import { Copy ,EllipsisVertical ,CopyCheck } from 'lucide-react'
const ShowWallet = ({
        wallet={
                walletId,
                accountId,
                derivationPath,
                network:{
                        name:"Ethereum",
                        iconUrl:"https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
                        networkCode:"60"
                },
                publicKey,
        },
        walletIndex
}) => {
        const {setCurrentWallet} = useAccountStore()
        const [copied, setCopied] = useState(false);

        const copyToClipboard = useCallback(()=>{
                setCopied(true)
                navigator.clipboard.writeText(wallet.publicKey)

                setTimeout(()=>{
                        setCopied(false)
                },1000)
        },[wallet.publicKey,copied])
        return (
        <li>
                <div className="flex gap-3 justify-between items-center w-full  my-1 p-2 " role="button" onClick={()=>setCurrentWallet(wallet.walletId)}>
                        <div className="flex justify-between items-center w-full">
                                <div className="flex gap-1 items-center">
                                        <div className="avatar avatar-placeholder">
                                                <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                                                        <span className="text-md font-bold">
                                                                <img 
                                                                        src={wallet.network.iconUrl} 
                                                                        alt={wallet.network.name.toUpperCase()} 
                                                                        className="w-8 h-8"
                                                                />
                                                        </span>
                                                </div>
                                        </div>
                                        <div className="text-md  font-semibold">
                                                <p>{`Wallet ${walletIndex+1}`}</p>
                                               <div className="flex gap-2">
                                                        <span>{`${wallet.publicKey.slice(0,5) }...${wallet.publicKey.slice(-2)}`}</span>
                                                        <span>
                                                                {copied?<CopyCheck />:<Copy onClick={copyToClipboard}/>}
                                                        </span>
                                               </div>
                                        </div>
                                </div>
                                <div className="">
                                        <EllipsisVertical />
                                </div>
                        </div>
                </div>
        </li>
        );
};

export default ShowWallet