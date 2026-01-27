import { Route, Routes } from "react-router"

import Home from "./pages/home/Home.jsx"
import Wallets from "./pages/wallet/Wallets.jsx"
import Swaps from "./pages/swap/Swaps.jsx"
import { useAccountStore } from "./store/accountStore.js"
import Header from "./components/layout/Header.jsx"

const App = () => {

        const {packbackTheme} = useAccountStore()
        console.log(packbackTheme)
        return (

        <div className="min-h-screen" data-theme={packbackTheme}>

                <div className="max-h-screen max-w-3xl mx-auto  flex flex-col  align-center p-0">

               
                <Header />

                 <div className="max-h-screen">
                        <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/wallets" element={<Wallets />} />
                                <Route path="/swaps" element={<Swaps />} />
                        </Routes>
                 </div>

                </div>

        </div>

        )
}

export default App