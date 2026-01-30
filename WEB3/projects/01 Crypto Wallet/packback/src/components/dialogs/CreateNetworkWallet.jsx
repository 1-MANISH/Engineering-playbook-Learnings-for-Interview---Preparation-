

import React, { memo, useCallback, useMemo, useState } from 'react'
import { useAccountStore } from '../../store/accountStore'
import {Plus} from "lucide-react"
import {networks} from "../../lib/utils"
import SelectWalletBar from '../shared/SelectWalletBar'
const CreateNetworkWallet = ({
        onClose= () => {},
        isOpen= false,
        network=""
}) => {

        const {addWallet,getWalletsForNetwork,packbackAccounts,currentAccount} = useAccountStore()

        const [selectedNetwork,setSelectedNetwork] = useState(networks.find((net)=>net.code===network))
        const currentNetworkWallet = useMemo(()=>{
                 const wallets =   getWalletsForNetwork(selectedNetwork.code)   
                 return wallets.map((wallet)=>{
                        const network = networks.find((net)=>net.code===wallet.network)
                        return {
                                ...wallet,
                                network:{
                                        name:network?.name,
                                        networkCode:wallet.network,
                                        iconUrl:network?.icon
                                },
                                privateKey:null
                                
                        }
                })

        },[selectedNetwork,packbackAccounts,currentAccount])

        const addANetworkWallet = useCallback( async () =>{
                try {
                    await  addWallet(selectedNetwork.code)
                } catch (error) {
                        console.log(error)
                }
        },[ selectedNetwork])

       
        return (
                <dialog 
                id="my_modal_5" 
                className={`modal modal-middle  sm:modal-middle ${isOpen ? 'modal-open' : ''}`}
                >
                        <div className="modal-box flex justify-center flex-col h-120 overflow-scroll overflow-x-hidden">
                                                 <div className="mt-15">
                                                        <h2 className="font-bold text-2xl text-center">
                                                                Wallets
                                                        </h2>
                                                        <div className="">
                                                                <div className="badge  badge-outline flex  gap-8  py-4 mx-auto my-3 w-30">
                                                                        <div className="cursor-pointer dropdown  dropdown-center">
                                                                                <div  tabIndex={2} role="button" className="avatar avatar-placeholder cursor-pointer gap-3">
                                                                                                <img 
                                                                                                        src={selectedNetwork.icon} 
                                                                                                        alt={selectedNetwork.name} 
                                                                                                        className="w-6 h-6"
                                                                                                />
                                                                                                <span>{selectedNetwork.name.toUpperCase()}</span>
                                                                                </div>
                                                                                <ul tabIndex="-1" className="dropdown-content menu  rounded-box z-2   mt-[-8] shadow-lg">
                                                                                        {
                                                                                                networks && networks?.map((network)=>{
                                                                                                        return(
                                                                                                                <li>
                                                                                                                <div className="flex gap-3 justify-between items-center  my-1 p-2" role="button" onClick={()=>setSelectedNetwork(network)}>
                                                                                                                        <div className="flex gap-3 items-center">
                                                                                                                                <div className="avatar avatar-placeholder">
                                                                                                                                        <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                                                                                                                                                <span className="text-md font-bold">
                                                                                                                                                        <img 
                                                                                                                                                                src={network.icon} 
                                                                                                                                                                alt={network.name.toUpperCase()} 
                                                                                                                                                                className="w-8 h-8"
                                                                                                                                                        />
                                                                                                                                                </span>
                                                                                                                                        </div>
                                                                                                                                </div>
                                                                                                                                <div className="text-md  font-semibold">{network?.name?.toUpperCase()}</div>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        </li>
                                                                                                        )
                                                                                                })
                                                                                        }
                                                                                                                        
                                                                                </ul>        
                                                                                
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="w-full flex flex-col gap-2 ">
                                                                {
                                                                                currentNetworkWallet && currentNetworkWallet?.map((wallet,walletIndex)=>{
                                                                                        return(
                                                                                                <SelectWalletBar
                                                                                                        key={wallet?.walletId*100} 
                                                                                                        wallet={wallet} 
                                                                                                        walletIndex={walletIndex}
                                                                                                        style={"border-1 rounded-lg hover:border-2 cursor-pointer"}
                                                                                                        showWallet={true}
                                                                                                />
                                                                                        )
                                                                                })
                                                                        }                        
                                                        </div>
                                                </div>

                                                <button className="btn btn-primary btn-block cursor-pointer  rounded-xl mt-24">
                                                        <div className="flex gap-2 items-center" role="button" onClick={addANetworkWallet}>
                                                                <span><Plus /></span>
                                                                <span>Add a new wallet</span>
                                                        </div>
                                                        {/* <div className="">
                                                                <ChevronRight />
                                                        </div> */}
                                                 </button>

                                 <div className="modal-action">
                                        <form method="dialog mb-5 flex justify-center gap-10" >

                                        <button className="btn" onClick={onClose}>Close</button>
                                </form>
                                </div>
                        </div>
                </dialog>
        )
}

export default memo(CreateNetworkWallet)


