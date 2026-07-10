import {createClient} from "redis"
import dotenv from "dotenv"
import fs from "fs"
import {spawn} from "child_process"
import {prismaClient} from "./prisma/db"

dotenv.config()

const redisClient = createClient({
        url:process.env.UPSTASH_REDIS_REST_URL
})


// a new process will be created for each submission 

async function handleSpawnResponse(response:any){

        let output = {
                status:'processing',
                output:"",
                error:"",
                code_status:""
        }


        // asynchronous process -  so data comes in chunks
        response.stdout.on("data",(chunk:any)=>{
                output.output += chunk.toString()// bytes.toString()
                output.code_status = "success"
        })
        response.stderr.on("data",(chunk:any)=>{
                output.error += chunk.toString()// bytes.toString()
                output.code_status = "failed"
        })

        await new Promise((resolve ,reject)=>{
                        // async process - so need to listen to the output and error - wait 
                        // for the process to complete and then update the output into database
                        // so the only jump to next line of code after the process is completed
                       
                        response.on("close",()=>{
                                output.status = "completed"
                                resolve("")
                        })
                        response.on('error',(error:any)=>{
                                output.error += error.toString()
                                output.code_status = "failed"
                                output.status = "completed"
                                resolve("")
                        })
         })


        return output
}

async function spawnProcess(language:string,fileName:string,args:string[]){

        let output :any ;
        if(language === "cpp"){
                // compiler execute  - new process execute
                let response = spawn("g++",[fileName, "-o","./code/out",...args]) // compilation
                //special case - if compilation fails then don't run the code
                output = await handleSpawnResponse(response)
                if(output.code_status === "failed"){
                        output = {...output,code_status:"failed"}
                        return output
                }
                // await new Promise(r=>setTimeout(r,3*1000)) // let suppose its take 3 seconds to compile the code
                response = spawn("./code/out")//run
                output = await handleSpawnResponse(response)
          
        }
        else if(language === "js"){
                   // compiler execute  - new process execute
                const response =  spawn("node",[fileName,...args])
                output = await handleSpawnResponse(response)
        }else if(language === "py"){
                   // compiler execute  - new process execute
                const response =  spawn("python",[fileName,...args])
                output = await handleSpawnResponse(response)
        }else{
                throw new Error("Language not supported")
        }
        return output
}

async function runCode(code:string,language:string){

        let path = __dirname+"/code"
        const fileName = path+"/main."+language 
        fs.writeFileSync(fileName,code)
        const result = await spawnProcess(language,fileName,[])
        return result
}

redisClient.connect().then(async ()=>{

        console.log("Connected to redis")

        while(1){

                const response = await redisClient.rPop("problems")
        
                if(!response || response === null){// wait for 5 second then check again
                        await new Promise(resolve=>setTimeout(resolve,5*1000))
                        continue
                 }

                 //now we can run the problem
                 const problem = JSON.parse(response as string)

                console.log(`Processing for submission id =  ${problem.submissionId} in language ${problem.language}`)

                // update the status- into database like processing - as it is in queue
                const submission = await prismaClient.submissions.update({
                        where:{id:problem.submissionId},
                        data:{status:"processing"}
                })

                let output:any = {
                        id:submission.id,
                        status:submission.status,
                        language:submission.language,
                        code:submission.code,
                        output:submission.output || "",
                        error:submission.error || "",
                        code_status:submission.code_status ||""
                }

                if(problem.language === "cpp" || problem.language === "js" || problem.language === "py"){
                         // run the problem
                        console.log(`Running ${problem.language} code for submission ${submission.id}`)

                        // compiler execute
                       const response = await runCode(submission.code,submission.language)

                        // update the output
                        output = {...output,...response}

                        console.log(`extra time for submission ${submission.id}.....`)
                        await new Promise(resolve=>setTimeout(resolve,2*1000))
                       
                 }
               

                 // update the output into Database
                console.log(`Updating Database for submission ${submission.id}`)
                await prismaClient.submissions.update({
                        where:{id:submission.id},
                        data:output
                })
                 console.log(`Waiting for 5 seconds -  to pick next problem`)
                await new Promise(resolve=>setTimeout(resolve,5*1000))

                // continue to next problem

        }
}).catch((err)=>{
        console.log(`Error: ${err}`)
})
