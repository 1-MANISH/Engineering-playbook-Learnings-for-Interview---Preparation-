import React, { memo, useCallback, useState } from 'react'
import { useAccountStore } from '../../store/accountStore'
import {ArrowLeft, CloudDownload, GlobeX} from "lucide-react"

const AddWallet = ({
        onClose= () => {},
        isOpen= false,
}) => {

        const {addWalletAccount} = useAccountStore()

        const networks = [
                {
                        name:"ethereum",
                        icon:"https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
                        code:'60'
                },{
                        name:"bitcoin",
                        icon:"https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022",
                        code:'0'
                },{
                        name:'solana',
                        icon:"https://cryptologos.cc/logos/solana-sol-logo.svg?v=022",
                        code:'501'
                }
        ]

        const [ selectedNetwork, setSelectedNetwork] = useState(null)
        const [seedPhrase, setSeedPhrase] = useState([])
        const [step,setStep] = useState(1)
        
        const importAWallet = useCallback( async () =>{
                try {
                        if(seedPhrase.length===0 || (seedPhrase.length!=12 &&  seedPhrase.length!=24)){
                                throw new Error("Seed phrase must be at least 12 / 24 words")
                        }
                        await addWalletAccount(seedPhrase,selectedNetwork)
                } catch (error) {
                        console.log(error)
                }
        },[selectedNetwork,seedPhrase ,addWalletAccount])

        const next = useCallback(()=>{
                if(step==2){
                        return
                }else{
                        setStep(prev=>prev+1)
                }
        },[step,setStep])
        const prev = useCallback(()=>{
                if(step<=1){
                        return
                }else{
                        setStep(prev=>prev-1)
                }
        },[step,setStep])


        return (
                <dialog 
                id="my_modal_5" 
                className={`modal modal-bottom sm:modal-middle ${isOpen ? 'modal-open' : ''} `}
             
                >
                        <div className="modal-box flex justify-center flex-col ">

                                <div className="">
                                       {step==2 &&  <div className="cursor-pointer" role='button' onClick={prev}>
                                                <ArrowLeft />
                                        </div>}

                                        <ul className="steps flex gap-4 justify-center">
                                                <li className="step step-accent">
                                                         <span className="step-icon "><GlobeX /></span>
                                                </li>
                                                <li className={`step ${step==2 ? 'step-accent' : ''}`}>
                                                        <span className="step-icon"><CloudDownload /></span>
                                                </li>
                                              
                                        </ul>

                                </div>
                                {
                                        step===1 &&(
                                                 <div className="">
                                                        <h2 className="font-bold text-xl text-center">
                                                                Select a  networks
                                                        </h2>

                                                        <p className="py-4 text-center">You can always change this later.</p>

                                                        <h4 className='text-md font-bold text-center'>POPULAR</h4>
                                                
                                                        <div className="w-full flex justify-between mt-10">
                                                                {
                                                                        networks.map((network) => (
                                                                                        <div 
                                                                                                key={network.name} 
                                                                                                className={`${selectedNetwork===network.code ? 'border-2 rounded' : ''} flex justify-center items-center shadow-lg p-4  gap-2 cursor-pointer`}
                                                                                                onClick={()=>{
                                                                                                        if(selectedNetwork===network.code)setSelectedNetwork(null)
                                                                                                        else setSelectedNetwork(network.code)
                                                                                                }}
                                                                                                role="button"
                                                                                        >
                                                                                                <img 
                                                                                                src={network.icon} 
                                                                                                alt={network.name} 
                                                                                                className="w-8 h-8"
                                                                                                />
                                                                                                <span>{network.name.toLocaleUpperCase()}</span>
                                                                                        
                                                                                        </div>
                                                                        ))
                                                                }
                                                        </div>
                                                </div>
                                        )
                                }
                                {
                                        step===2 &&(
                                                 <div className="">
                                                         <h2 className="font-bold text-xl text-center">
                                                               Add a recovery phrase
                                                        </h2>
                                                        <div className="flex justify-center mt-5">
                                                                <textarea 
                                                                className="textarea" 
                                                                placeholder="Enter recovery phrase"
                                                                value={seedPhrase && seedPhrase.join("  ")}
                                                                onChange={(e)=>setSeedPhrase(e.target.value.trim().split(" "))}
                                                                >

                                                                </textarea>
                                                        </div>
                                                        <div className="flex justify-center  flex-wrap mt-4 gap-4">
                                                        {
                                                                seedPhrase.map((word,index) => (
                                                                        word && <div className="badge badge-dash   w-25 p-4 " key={index}>{word}</div>
                                                                ))
                                                        }
                                                        </div>
                                                </div>
                                        )
                                }


        
                                <div className="flex justify-between items-center mt-6">
                                       {
                                                step==1 && (
                                                          <button 
                                                                className="btn btn-primary btn-block"
                                                                disabled={selectedNetwork===null}
                                                                onClick={next}
                                                        >
                                                              {
                                                                selectedNetwork===null ?"  Select a Network":"Import wallet"
                                                              }
                                                        </button>
                                                )
                                       }
                                        {
                                                step==2 && (
                                                          <button 
                                                                className="btn btn-primary btn-block"
                                                                disabled={seedPhrase.length===0 }
                                                                onClick={importAWallet}
                                                        >
                                                               {
                                                                seedPhrase.length!==12 ?" Import a wallet":"Import wallet"
                                                               }
                                                        </button>
                                                )
                                       }
      
                                </div>

                                 <div className="modal-action">
                                        <form method="dialog mt-10 flex justify-center gap-10" >

                                        <button className="btn" onClick={onClose}>Close</button>
                                </form>
                                </div>
                        </div>
                </dialog>
        )
}

export default memo(AddWallet)