import { Suspense, useState } from "react";
import CreateWallet from "../../components/dialogs/CreateWallet";
import AddWallet from "../../components/dialogs/AddWallet";
import { useAccountStore } from "../../store/accountStore";
import Wallets from "../wallet/Wallets";

const Home = () => {


        const [isTermsAccepted, setIsTermsAccepted] = useState(false);
        const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
        const [isAddWalletOpen,setIsAddWalletOpen] = useState(false)

        const{packbackAccounts} = useAccountStore()

        return (
        <div className="w-full min-h-[800px]   flex  justify-center items-center">
                {packbackAccounts.length===0 ?
                        <div className="card w-96 h-100 bg-base-100 shadow-sm">
                                <div className="card-body">
                                
                                <div className="mt-10 flex flex-col justify-center items-center">
                                        <h2 className="text-2xl font-bold">
                                                PACKBACK
                                        </h2>
                                        <span className="text-md text-center">
                                                you'll use this wallet to send and receive crypto and NFTs
                                        </span>
                                </div>

                                <div className="mt-10 text-center">

                                        <label className="label">
                                        <input 
                                                type="checkbox" 
                                                checked={isTermsAccepted}
                                                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                                className="checkbox" 
                                        />
                                                I'm agree with terms and conditions
                                        </label>
                                </div>

                                <div className="mt-6">
                                        <button 
                                        className="btn btn-primary btn-block"
                                        onClick={()=>setIsCreateWalletOpen(true)}
                                        disabled={!isTermsAccepted}
                                        >
                                                Create a wallet
                                        </button>
                                </div>
                                <div className="text-center mt-4">
                                        <button 
                                        className="btn  btn-ghost" 
                                        disabled={!isTermsAccepted}
                                        onClick={()=>{ setIsAddWalletOpen(true)}}
                                        >
                                                I already have a wallet
                                        </button>
                                </div>
                                </div>
                        </div>:
                        <Wallets />
                }

                {
                        isCreateWalletOpen && (
                                <Suspense fallback={<div>Loading...</div>}>
                                        <CreateWallet 
                                                onClose={() => setIsCreateWalletOpen(false)} 
                                                isOpen={isCreateWalletOpen}
                                        />
                                </Suspense>
                        )
                }
                 {
                        isAddWalletOpen && (
                                <Suspense fallback={<div>Loading...</div>}>
                                        <AddWallet
                                                onClose={() => setIsAddWalletOpen(false)} 
                                                isOpen={isAddWalletOpen}
                                        />
                                </Suspense>
                        )
                }
        </div>
        );
};

export default Home;
