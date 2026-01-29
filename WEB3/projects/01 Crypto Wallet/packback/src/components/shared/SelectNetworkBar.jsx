import { useAccountStore } from "../../store/accountStore"

const SelectNetworkBar = ({
        network={
                name:"Ethereum",
                iconUrl:"https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022",
                networkCode:"60"
        }
}) => {
        const {setCurrentNetwork} = useAccountStore()
        return (
        <li>
                <div className="flex gap-3 justify-between items-center w-full  my-1 p-2" role="button" onClick={()=>setCurrentNetwork(network.networkCode)}>
                        <div className="flex gap-3 items-center">
                                <div className="avatar avatar-placeholder">
                                        <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                                                <span className="text-md font-bold">
                                                         <img 
                                                                src={network.iconUrl} 
                                                                alt={network.name.toUpperCase()} 
                                                                className="w-8 h-8"
                                                        />
                                                </span>
                                        </div>
                                </div>
                                <div className="text-md  font-semibold">{network?.name}</div>
                        </div>
                </div>
        </li>
        );
};


export default SelectNetworkBar