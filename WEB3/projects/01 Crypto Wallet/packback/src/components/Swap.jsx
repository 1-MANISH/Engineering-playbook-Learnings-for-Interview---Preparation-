import { ArrowUpDown } from "lucide-react"


const Swap = () => {

        

        return (
                <div className=" p-5 border-1">
                        {/* from */}
                        <div className="rounded-lg bg-base-300 p-4">
                                {/* label */}
                                <div className="flex justify-between">
                                        <span className="font-extrabold">Sell</span>
                                        <div className="flex gap-3">
                                                <h5 className="font-extrabold">Balance</h5>
                                                <span>0.05 SOL</span>
                                        </div>
                                </div>
                                {/* details */}
                                <div className="flex justify-between mt-3">
                                        
                                        <input 
                                                type="number"
                                                className="input input-bordered w-16 max-w-xs"
                                                placeholder="0.00"
                                                min={0}
                                                max={100}
                                        />
                                        <div className="">
                                                <div className="dropdown">
                                                         <div tabIndex={0} role="button" className="btn m-1">Select</div>
                                                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                                <li><a>Item 1</a></li>
                                                                <li><a>Item 2</a></li>
                                                        </ul>
                                                </div>
                                        </div>
                                </div>
                                <div className="">
                                        <span>$0.00</span>
                                </div>
                        </div>
                        <div className="flex justify-center ">
                                <button className="btn btn-soft " style={{clipPath: "circle(50% at 50% 50%)"}}>
                                        <ArrowUpDown />
                                </button>
                        </div>
                        {/* to */}
                        <div className="rounded-lg bg-base-300 p-4">
                                {/* label */}
                                <div className="flex justify-between">
                                        <span className="font-extrabold">Buy</span>
                                        <div className="flex gap-3">
                                                <h5 className="font-extrabold">Balance</h5>
                                                <span>0.05 SOL</span>
                                        </div>
                                </div>
                                {/* details */}
                                <div className="flex justify-between mt-3">
                                        
                                        <input 
                                                type="number"
                                                className="input input-bordered w-16 max-w-xs"
                                                placeholder="0.00"
                                                min={0}
                                                max={100}
                                        />
                                        <div className="">
                                                <div className="dropdown">
                                                         <div tabIndex={0} role="button" className="btn m-1">Select</div>
                                                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                                <li><a>Item 1</a></li>
                                                                <li><a>Item 2</a></li>
                                                        </ul>
                                                </div>
                                        </div>
                                </div>
                                <div className="">
                                        <span>$0.00</span>
                                </div>
                        </div>
                </div>
        )
}

export default Swap