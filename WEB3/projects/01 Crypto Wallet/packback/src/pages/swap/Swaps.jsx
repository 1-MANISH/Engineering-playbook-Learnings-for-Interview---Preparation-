import Navigation from "../../components/shared/Navigation"
import Swap from "../../components/Swap"

const Swaps = () => {
        return (
                     <div className="w-full min-h-[90vh] flex flex-col  items-center px-3">
                         <div className="flex-4 border-1 w-full ">
                               <div className="w-full  bg-neutral  p-4 flex flex-col items-center">
                                        <div className="badge badge-outline text-secondary">Swaps</div>
                               </div>
                                 <div className="w-full">
                                        <Swap />
                                </div>
                        </div>

                       
                
                        <Navigation active="swaps"/>
                </div>
        )
}

export default Swaps