import { useAccountStore } from "../../store/accountStore"
import {themes} from "../../lib/utils"

const Header = () => {

        const{toggleTheme,packbackTheme} = useAccountStore()
        return (
                <div className="navbar  bg-base-100  sticky top-0 flex justify-between align-center py-4">
                       <div className="w-4">
                                <p className="font-bold ::first-letter text-2xl">
                                      PACK
                                      <span className="text-pretty">BACK</span>  
                                </p>
                       </div>
                       <div className="">
                                 <div className="dropdown mb-2">
                                        <div tabIndex={0} role="button" className="btn btn-primary btn-outline flex item-center gap-2">
                                                <span className="mb-1">Theme</span>
                                                <svg
                                                        width="12px"
                                                        height="10px"
                                                        className="inline-block h-2 w-2 fill-current opacity-60"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 2048 2048">
                                                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                                                </svg>
                                        </div>
                                        <ul tabIndex="-1" className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
                                                {
                                                        themes.map((theme) => (
                                                        <li key={theme}>
                                                                <input

                                                                        type="radio"
                                                                        name="theme-dropdown"
                                                                        className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                                                                        value={theme} 
                                                                        aria-label={theme.toUpperCase()}
                                                                        onChange={(e)=>toggleTheme(e.target.value)}
                                                                        checked={theme===packbackTheme}
                                                                        />
                                                                </li>
                                                        ))
                                                }
                                        </ul>
                                </div>
                       </div>
                </div>
        )
}

export default Header