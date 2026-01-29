

import React, { memo, useCallback, useState } from 'react'
import { useAccountStore } from '../../store/accountStore'
import {ArrowLeft, ChevronRight, CloudDownload, GlobeX, LayersPlus, Plus} from "lucide-react"
import {networks} from "../../lib/utils"
const AddNetwork = ({
        onClose= () => {},
        isOpen= false,
}) => {

        const {addWallet} = useAccountStore()


        const [ selectedNetwork, setSelectedNetwork] = useState(null)
        const [step,setStep] = useState(1)
        
        const addANetwork = useCallback( async () =>{
                try {
                        await addWallet(selectedNetwork.code)
                } catch (error) {
                        console.log(error)
                }
        },[selectedNetwork,addWallet ])

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
                                                        <span className="step-icon"><LayersPlus /></span>
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
                                                                                                className={`${ selectedNetwork && selectedNetwork.code===network.code ? 'border-2 rounded' : ''} flex justify-center items-center shadow-lg p-4  gap-2 cursor-pointer`}
                                                                                                onClick={()=>{
                                                                                                        if(selectedNetwork && selectedNetwork.code===network.code)setSelectedNetwork(null)
                                                                                                        else setSelectedNetwork(network)
                                                                                                }}
                                                                                                role="button"
                                                                                        >
                                                                                                <img 
                                                                                                src={network.icon} 
                                                                                                alt={network.name} 
                                                                                                className="w-8 h-8"
                                                                                                />
                                                                                                <span>{network.name.toUpperCase()}</span>
                                                                                        
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
                                                        
                                                        <div className="flex justify-center mt-5">
                                                               <img
                                                                        src={selectedNetwork?.icon}
                                                                        alt={selectedNetwork?.name}
                                                                        className="w-12 h-12"
                                                               />
                                                        </div>
                                                         <h2 className="font-bold text-xl text-center mt-6">
                                                               ADD A {selectedNetwork?.name.toUpperCase()} WALLET
                                                        </h2>
                                                        <p className="font-medium text-sm text-center mt-3">Choose a methods</p>
                                                        <button 
                                                        className="btn btn-primary btn-block cursor-pointer  rounded-xl mt-4"
                                                        
                                                        onClick={addANetwork}
                                                        >
                                                                <div className="flex gap-2 items-center" >
                                                                        <span><Plus /></span>
                                                                        <span>Add a new wallet</span>
                                                                </div>
                                                                {/* <div className="">
                                                                        <ChevronRight />
                                                                </div> */}
                                                        </button>
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
                                                                Select a Network
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

export default memo(AddNetwork)

