import { useAccountStore } from "../../store/accountStore"

const SelectAccountBar = ({
        accountId= 0,
        avatarText="A1",
        accountName="Account 1",
        balance="0.00"
}) => {
        const {setCurrentAccount} = useAccountStore()
        return (
        <li>
                <div className="flex gap-3 justify-between items-center w-full  my-1 p-2" role="button" onClick={()=>setCurrentAccount(accountId)}>
                        <div className="flex gap-3 items-center">
                                <div className="avatar avatar-placeholder">
                                        <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                                                <span className="text-md font-bold">{avatarText}</span>
                                        </div>
                                </div>
                                <div className="text-md  ">{accountName}</div>
                        </div>
                        <div className="font-extrabold">${balance}</div>
                </div>
        </li>
        );
};

export default SelectAccountBar;
