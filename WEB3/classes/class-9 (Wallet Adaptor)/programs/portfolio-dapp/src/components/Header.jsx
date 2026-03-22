import { useWallet } from '@solana/wallet-adapter-react';
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const Header = () => {

        const {publicKey} = useWallet()
        return (
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                        {
                                publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />
                        }
                </div>
        )
}

export default Header