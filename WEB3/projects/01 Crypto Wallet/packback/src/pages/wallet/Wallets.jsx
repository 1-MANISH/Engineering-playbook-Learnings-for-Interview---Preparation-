import Navigation from "../../components/shared/Navigation"
import {Logs,GlobeX,Copy,ChevronDown } from 'lucide-react'
import { useAccountStore } from "../../store/accountStore"
const Wallets = () => {

        const {} = useAccountStore()

        return (
                <div className="w-full min-h-[90vh] flex flex-col  items-center px-3">
                         <div className="flex-4 border-1 w-full">
                                {/* up navigation details */}
                                <div className="flex justify-between border-b-1  items-center">
                                        <div className="">
                                                <div className="avatar avatar-placeholder cursor-pointer">
                                                        <div className="bg-neutral text-neutral-content w-12 rounded-4xl">
                                                                <span>A1</span>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="">
                                                <div className="badge  badge-outline flex  gap-8  py-4 ">
                                                        <div className="cursor-pointer">
                                                                <GlobeX />
                                                        </div>
                                                        <div className="cursor-pointer ">
                                                                <div className="flex gap-2 border-x-1 px-2">
                                                                        <span>Wallet</span>
                                                                        <span><ChevronDown /></span>
                                                                </div>
                                                        </div>
                                                        <div className="cursor-pointer">
                                                                <Copy />
                                                        </div>
                                                </div>
                                        </div>

                                        <div className="">
                                                   <Logs />     
                                        </div>
                                </div>
                         </div>

                        <Navigation />
                </div>
        )
}

export default Wallets