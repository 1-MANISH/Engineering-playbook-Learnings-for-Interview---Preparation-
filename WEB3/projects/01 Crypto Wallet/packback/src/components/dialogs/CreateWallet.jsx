import React, { memo, useState } from 'react'
import { useAccountStore } from '../../store/accountStore'

const CreateWallet = ({
        onClose= () => {},
        isOpen= false,
}) => {

        const {createNewAccount} = useAccountStore()

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

        const [ selectedNetworks, setSelectedNetworks] = useState([])

        const toggleNetwork = (network) => {
                if(selectedNetworks.includes(network)){
                        setSelectedNetworks(selectedNetworks.filter(item => item !== network))
                }else{
                        setSelectedNetworks([...selectedNetworks,network])
                }
        }
        
        const setupNewWallet = async () =>{
                try {
                        await createNewAccount(selectedNetworks)
                        
                } catch (error) {
                        console.log(error)
                }
        }

        return (
                <dialog 
                id="my_modal_5" 
                className={`modal modal-bottom sm:modal-middle ${isOpen ? 'modal-open' : ''} `}
             
                >
                        <div className="modal-box flex justify-center flex-col ">
                                <h2 className="font-bold text-xl text-center">
                                        Select one or more networks
                                </h2>

                                <p className="py-4 text-center">You can always change this later.</p>

                                <h4 className='text-md font-bold text-center'>POPULAR</h4>
                               
                                <div className="w-full flex justify-between mt-10">
                                                {
                                                        networks.map((network) => (
                                                                <div 
                                                                        key={network.name} 
                                                                        className={`${selectedNetworks.includes(network.name) ? 'border-2 rounded' : ''} flex justify-center items-center shadow-lg p-4  gap-2 cursor-pointer`}
                                                                        onClick={()=>{
                                                                                toggleNetwork(network.code)
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

        
                                <div className="mt-6">
                                         <button 
                                                className="btn btn-primary btn-block"
                                                disabled={selectedNetworks.length===0}
                                                onClick={setupNewWallet}
                                        >
                                                Setup a wallet
                                        </button>
      
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

export default memo(CreateWallet)