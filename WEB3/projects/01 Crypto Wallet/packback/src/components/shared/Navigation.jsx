import { memo } from "react"
import { useNavigate } from "react-router"
import { Wallet,ReplaceAll,Telescope } from "lucide-react"
const Navigation = ({
        active="wallets"
}) => {

        const navigate = useNavigate()
        return (
                 <div className="w-full">
                                <ul className="menu  lg:menu-horizontal  w-full flex justify-between items-stretch p-0">
                                        <li  className="flex-1">
                                                <button className={`${active === "wallets" ? "menu-active" : ""}  p-4`} onClick={()=>navigate('/wallets')}>
                                                        <Wallet />
                                                                Portfolios
                                                        {/* <span className="badge badge-xs">99+</span> */}
                                                </button>
                                        </li>
                                        <li className="flex-1">
                                                <button className={`${active === "swaps" ? "menu-active" : ""}  p-4`} onClick={()=>navigate('/swaps')}>
                                                        <ReplaceAll /> 
                                                        Swaps
                                                        {/* <span className="badge badge-xs badge-warning">NEW</span> */}
                                                </button>
                                        </li>
                                        <li className="flex-1">
                                                <button  className={`${active === "explore" ? "menu-active" : ""}  p-4`} onClick={()=>navigate('/explore')}>
                                                        <Telescope />
                                                        Explore
                                                        {/* <span className="badge badge-xs badge-info"></span> */}
                                                </button>
                                        </li>
                                </ul>
                         </div>
        )
}

export default memo(Navigation) 