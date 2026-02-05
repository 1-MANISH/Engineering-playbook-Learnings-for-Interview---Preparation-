import Navigation from "../../components/shared/Navigation"
import {Logs,Copy,ChevronDown,Settings,Plus,CopyCheck,Import } from 'lucide-react'
import { useAccountStore } from "../../store/accountStore"
import { Suspense, useCallback, useMemo, useState } from "react"
import SelectAccountBar from "../../components/shared/SelectAccountBar"
import SelectNetworkBar from "../../components/shared/SelectNetworkBar"
import { networks } from "../../lib/utils"
import SelectWalletBar from "../../components/shared/SelectWalletBar"
import CreateWallet from "../../components/dialogs/CreateWallet";
import AddWallet from "../../components/dialogs/AddWallet";
import AddNetwork from "../../components/dialogs/AddNetwork"
import CreateNetworkWallet from "../../components/dialogs/CreateNetworkWallet"
const Wallets = () => {

        const {packbackAccounts,currentAccount,currentNetwork,currentWallet} = useAccountStore()

        const [ isAddAccountOpen, setIsAddAccountOpen ] = useState(false)
        const [isImportAccountOpen,setIsImportAccountOpen] = useState(false)
        const [ isAddNetworkOpen, setIsAddNetworkOpen] = useState(false)
        const [ isAddWalletOpen, setIsAddWalletOpen] = useState(false)
        const [copied, setCopied] = useState(false);

        const currentNetworkToShow = useMemo(()=>{
                return networks.find((net)=>net.code===currentNetwork)
        },[currentNetwork,packbackAccounts])

        const currentNetworkAvailable = useMemo(()=>{
                return currentAccount?.networks?.map((network)=>{
                        const networkDetails = networks.find((net)=>net.code===network)
                        return {
                                name:networkDetails?.name?.toUpperCase(),
                                iconUrl:networkDetails?.icon,
                                networkCode:network
                        }
                })
        },[currentAccount,packbackAccounts,packbackAccounts])

        const currentWalletToAvailable = useMemo(()=>{
                const wallets =  currentAccount?.wallets?.filter((wallet)=> wallet.network===currentNetwork)
                return wallets?.map((wallet)=>{
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

        },[currentNetwork,currentAccount,packbackAccounts,packbackAccounts])

        const currentWalletToShow = useMemo(()=>{
                const netWorkWallets =  currentAccount?.wallets?.filter((wallet)=> wallet.network===currentNetwork)
                if(!netWorkWallets?.length){
                        return null
                }
                const currentWalletIndex = netWorkWallets?.findIndex((wallet)=>wallet.walletId===currentWallet.walletId)
                return {
                        ...netWorkWallets[currentWalletIndex],
                        walletIndex:currentWalletIndex+1
                }
        },[currentAccount,currentWallet,currentNetwork,packbackAccounts])

        const copyToClipboard = useCallback(()=>{
                setCopied(true)
                navigator.clipboard.writeText(currentWalletToShow?.publicKey)

                setTimeout(()=>{
                        setCopied(false)
                },1000)
        },[currentWalletToShow,copied])

        return (
                <div className="w-full min-h-[90vh] flex flex-col  items-center px-3">
                         <div className="flex-4 border-1 w-full">
                                {/* up navigation details */}
                                <div className="flex justify-between border-b-1  items-center">
                                        <div className="dropdown dropdown-start ">
                                                <div  tabIndex={0} role="button" className="avatar avatar-placeholder cursor-pointer">
                                                        <div className="bg-neutral text-neutral-content w-12 rounded-4xl">
                                                                <span>{`A${currentAccount?.accountId+1}`}</span>
                                                        </div>
                                                 </div>
                                                 <ul tabIndex="-1" className="dropdown-content menu  rounded-box z-1 w-50 p-2 shadow-sm">
                                                        {
                                                                packbackAccounts && packbackAccounts?.map((account)=>{
                                                                        return(
                                                                                <SelectAccountBar 
                                                                                        key={account?.accountId*100} 
                                                                                        accountId={account?.accountId}
                                                                                        avatarText={`A${account?.accountId+1}`} 
                                                                                        accountName={`Account ${account?.accountId+1}`} 
                                                                                        balance={account?.balance} 

                                                                                />
                                                                        )
                                                                })
                                                        }

                                              
                                                        <li>
                                                                <div role="button" onClick={()=>setIsAddAccountOpen(true)}>
                                                                       <Plus />
                                                                        <span>Add Account</span>
                                                                </div>
                                                        </li>
                                                        <li>
                                                                <div role="button" onClick={()=>setIsImportAccountOpen(true)}>
                                                                     <Import />
                                                                        <span>Import account from  recovery phrase</span>
                                                                </div>
                                                        </li>
                                                        <li>
                                                                <div>
                                                                        <Settings />
                                                                        <span>Setting</span>
                                                                        
                                                                </div>
                                                        </li>
                                                </ul>                                            
                                        </div>
                                        <div className="">
                                                <div className="badge  badge-outline flex  gap-8  py-4 ">
                                                        <div className="cursor-pointer dropdown  dropdown-center">
                                                                <div  tabIndex={2} role="button" className="avatar avatar-placeholder cursor-pointer">
                                                                                {/* <span><GlobeX /></span> */}
                                                                                  <img 
                                                                                        src={currentNetworkToShow?.icon} 
                                                                                        alt={currentNetworkToShow?.name} 
                                                                                        className="w-6 h-6"
                                                                                />
                                                                </div>
                                                                <ul tabIndex="-2" className="dropdown-content menu  rounded-box z-1  p-2 shadow-sm">
                                                                        {
                                                                                currentNetworkAvailable && currentNetworkAvailable?.map((network)=>{
                                                                                        return(
                                                                                                <SelectNetworkBar 
                                                                                                        key={network?.networkCode*100} 
                                                                                                        network={network} 
                                                                                                />
                                                                                        )
                                                                                })
                                                                        }
                                                                          <li>
                                                                                <div role="button" onClick={()=>setIsAddNetworkOpen(true)}>
                                                                                <Plus />
                                                                                        <span>Add Network</span>
                                                                                </div>
                                                                        </li>
                                                                      
                                                                </ul>
                                                                
                                                        </div>
                                                        <div className="cursor-pointer  dropdown  dropdown-center">
                                                                <div className=" border-x-1 px-2">
                                                                        <div tabIndex={2} role="button" className="flex gap-2 avatar avatar-placeholder cursor-pointer">
                                                                                <span>{`Wallet ${currentWalletToShow?.walletIndex}`}</span>
                                                                                  <span><ChevronDown /></span>
                                                                        </div>
                                                                      
                                                                </div>
                                                                 <ul tabIndex="-2" className="dropdown-content menu  rounded-box z-1 w-60  p-2 mt-3 shadow-sm">
                                                                        {
                                                                                currentWalletToAvailable && currentWalletToAvailable?.map((wallet,walletIndex)=>{
                                                                                        return(
                                                                                                <SelectWalletBar 
                                                                                                        key={wallet?.walletId*100} 
                                                                                                        wallet={wallet} 
                                                                                                        walletIndex={walletIndex}
                                                                                                />
                                                                                        )
                                                                                })
                                                                        }
                                                                         <li>
                                                                                <div role="button" onClick={()=>setIsAddWalletOpen(true)}>
                                                                                <Plus />
                                                                                        <span>Add Wallet</span>
                                                                                        
                                                                                </div>
                                                                        </li>
                                                                      
                                                                </ul>
                                                        </div>
                                                        <div className="cursor-pointer">
                                                                {
                                                                        copied ? <CopyCheck /> :<Copy onClick={copyToClipboard}/>
                                                                }
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="">
                                                   <Logs />     
                                        </div>
                                </div>
                         </div>

                        <Navigation />

                                        {
                                                isAddAccountOpen && (
                                                        <Suspense fallback={<div>Loading...</div>}>
                                                                <CreateWallet 
                                                                        onClose={() => setIsAddAccountOpen(false)} 
                                                                        isOpen={isAddAccountOpen}
                                                                />
                                                        </Suspense>
                                                )
                                        }
                                         {
                                                isImportAccountOpen && (
                                                        <Suspense fallback={<div>Loading...</div>}>
                                                                <AddWallet
                                                                        onClose={() => setIsImportAccountOpen(false)} 
                                                                        isOpen={isImportAccountOpen}
                                                                />
                                                        </Suspense>
                                                )
                                        }
                                        {
                                                isAddNetworkOpen && (
                                                        <Suspense fallback={<div>Loading...</div>}>
                                                                <AddNetwork 
                                                                        onClose={() => setIsAddNetworkOpen(false)} 
                                                                        isOpen={isAddNetworkOpen}
                                                                />
                                                        </Suspense>
                                                )
                                        }
                                        {
                                                isAddWalletOpen && (
                                                        <Suspense fallback={<div>Loading...</div>}>
                                                                <CreateNetworkWallet 
                                                                        onClose={() => setIsAddWalletOpen(false)} 
                                                                        isOpen={isAddWalletOpen}
                                                                        network={currentNetwork}
                                                                />
                                                        </Suspense>
                                                )
                                        }
                </div>
        )
}

export default Wallets