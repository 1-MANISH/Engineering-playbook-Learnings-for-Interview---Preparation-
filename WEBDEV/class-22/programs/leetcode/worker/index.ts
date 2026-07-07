import {createClient} from "redis"
import dotenv from "dotenv"

dotenv.config()

const redisClient = createClient({
        url:process.env.UPSTASH_REDIS_REST_URL
})

redisClient.connect().then(async ()=>{

        console.log("Connected to redis")

        while(1){

                const response = await redisClient.rPop("problems")

                console.log(response)

                if(!response || response === null){// wait for 2 second then check again
                        await new Promise(resolve=>setTimeout(resolve,5*1000))
                        continue
                 }

                 //now we can run the problem
                 const problem = JSON.parse(response as string)

                console.log(`Processing problem ${problem.questionId} for user ${problem.userId} in language ${problem.language}`)

                let output = {
                        status:'compiling',
                        userId:problem.userId,
                        questionId:problem.questionId,
                        language:problem.language,
                        output:"",
                        error:"",
                        code:problem.code,
                        code_status:""
                }

                 if(problem.language === "cpp"){
                         // run the problem
                         console.log(`Running CPP code for  problem ${problem.questionId} for user ${problem.userId}`)

                         // compiler execute

                        await new Promise(resolve=>setTimeout(resolve,10*1000))

                        // update the output
                 }
                 else if(problem.language === "js"){
                         // run the problem
                         console.log(`Running JS code for problem ${problem.questionId} for user ${problem.userId}`)

                         // compiler execute

                        await new Promise(resolve=>setTimeout(resolve,10*1000))

                        // update the output
                 }
                  else if(problem.language === "py"){
                         // run the problem
                         console.log(`Running PY code for problem ${problem.questionId} for user ${problem.userId}`)

                         // compiler execute

                        await new Promise(resolve=>setTimeout(resolve,10*1000))

                        // update the output
                 }

                 output.status = "completed"

                 // update the output into Database
                console.log(`Updating Database output for problem ${problem.questionId} for user ${problem.userId}`)
             
                await new Promise(resolve=>setTimeout(resolve,5*1000))

                // continue to next problem

        }
}).catch((err)=>{
        console.log(`Error: ${err}`)
})
