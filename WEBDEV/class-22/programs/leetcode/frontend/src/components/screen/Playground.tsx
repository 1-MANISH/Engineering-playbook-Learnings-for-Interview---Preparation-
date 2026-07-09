import { useState,useRef, useCallback } from "react";
import axios from "axios"

const axiosInstance = axios.create({
      // baseURL:import.meta.env.REACT_APP_BACKEND,
      baseURL:"http://localhost:3002",
})

export default function Playground() {

      const [language, setLanguage] = useState("cpp")
      const [submissionId,setSubmissionId] =useState("")
      const [status,setStatus] = useState("")
      const [codeStatus,setCodeStatus] = useState("")
      const [output,setOutput] = useState(null)
      const [error,setError] = useState(null)
      const code = useRef<HTMLTextAreaElement | null>(null)

      const extension:any = {
            cpp: "cpp",
            js: "js",
            py: "py",
      }


      const pollBackend = useCallback(async(submissionId:string) => {
            try {
                  const response = await axiosInstance.get(`/submission/status/${submissionId}`)
                   setStatus(response.data.submission.status)
                  if(response.data.submission.status ==='completed'){
                        setCodeStatus(response.data.submission.code_status)
                        setOutput(response.data.submission.output)
                        setError(response.data.submission.error)
                  }else{
                        await new Promise(r=>setTimeout(r,2*1000))
                        pollBackend(submissionId)
                  }
            } catch (error) {
                  
            }
      },[submissionId,status,codeStatus,output,error])

      const handleSubmit = useCallback(async () => {
            try {

                  if(!code.current?.value) return
                  setStatus("")
                  setCodeStatus("")
                  setOutput(null)
                  setError(null)

                  const response = await axiosInstance.post("/submission", {
                        language,
                        code:code.current?.value ,
                  })
                  setSubmissionId(response.data.submissionId)
                  setStatus(response.data.status)
                  pollBackend(response.data.submissionId)
            } catch (error) {
                  console.log('Error(running in code):', error);
            }
      }, [language,code.current?.value,pollBackend])



      return (
            <div className="h-screen bg-[#111111] text-gray-200 flex flex-col">
                  {/* ================= Navbar ================= */}
                  <header className="h-10 border-b border-zinc-700 flex items-center justify-between px-5">
                        
                        <h1 className="text-xs font-semibold tracking-wide">
                              Code<span className="text-blue-500">Check</span>
                        </h1>

      
                        <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                              className="bg-[#1d1d1d] border border-zinc-700 rounded px-3 py-1 outline-none text-xs"
                        >
                              <option value="cpp">C++</option>
                              <option value="js">JavaScript</option>
                              <option value="py">Python</option>
                        </select>

                   
                        <button 
                               onClick={handleSubmit}
                               className="bg-green-600 hover:bg-green-700 px-3 py-0.5 rounded font-mono text-sm"
                        >
                              Run 
                        </button>
                  </header>

                  {/* ================= Editors ================= */}
                  <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Left */}
                      <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-zinc-700 flex flex-col">
                            
                              <div className="h-10 border-b border-zinc-700 bg-[#1a1a1a] flex items-center px-4 font-medium text-sm">
                                    {`main.${extension[language]}`}
                              </div>

                              {/* Editor */}
                              <textarea
                                    ref={code}
                                    spellCheck={false}
                                    placeholder="Write your code..."
                                    className="flex-1 resize-none bg-[#111111] text-gray-100 p-4 outline-none font-mono text-sm"
                              />
                        </div>

                        {/* Right */}
                       <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
                             
                              <div className="h-10 border-b border-zinc-700 bg-[#1a1a1a] flex items-center px-4 font-medium text-sm">
                                    Console
                              </div>

                              {/* Console */}
                             <div className="w-full h-10   flex items-center justify-between gap-5 p-3">
                                     { submissionId && status &&
                                          <div className=" p-1">
                                                 <div className="text-sm text-gray-400">
                                                      Status  :   <span className="text-green-400"> { status}</span>
                                                </div>
                                          </div>
                                    }
                                    
                                    { codeStatus && status==='completed' &&
                                                <div className="  p-1">
                                                <div className="text-sm text-gray-400">
                                                Code Status  :  <span className={codeStatus === "success" ? "text-green-400" : "text-red-400"}>{codeStatus}</span>
                                                </div>
                                    </div>
                                    }
                                    
                            
                              
                             </div>
                              <textarea
                                    value={output || error || ""}
                                    readOnly
                                    placeholder="Program output..."
                                    className={`flex-1 resize-none bg-[#111111] ${status!=='completed' ? "text-gray-100" : codeStatus === "success" ? "text-green-400" : "text-red-400"} p-4 outline-none font-mono text-sm`}
                              />
                        </div>
                  </div>
            </div>
      );
}
