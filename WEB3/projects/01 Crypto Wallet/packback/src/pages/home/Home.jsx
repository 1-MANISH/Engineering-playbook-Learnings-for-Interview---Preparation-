import { Suspense, useState } from "react";
import CreateWallet from "../../components/dialogs/CreateWallet";

const Home = () => {


        const [isTermsAccepted, setIsTermsAccepted] = useState(false);
        const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);

        return (
        <div className="w-full min-h-[800px]   flex  justify-center items-center">
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
                                <a className="link link-hover" disabled={!isTermsAccepted}>
                                        I already have a wallet
                                </a>
                        </div>
                        </div>
                </div>

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
        </div>
        );
};

export default Home;
