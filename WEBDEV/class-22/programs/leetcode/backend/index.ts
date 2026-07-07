import express from 'express'
import dotenv from "dotenv"
import { createClient } from 'redis'
dotenv.config()

const app = express()
app.use(express.json())

const redisClient = createClient({
        url:process.env.UPSTASH_REDIS_REST_URL,
})

redisClient.on('error',(error)=>{
        console.log('REDIS ME ERROR',error)
})

redisClient.connect()

app.post('/submission/:problemId',async(req,res)=>{

       try {
                // we will get userId from headers - cookies but now lets take it from body
                 const {userId,questionId,code,language} = req.body

                 if(!userId || !questionId ||  !code || !language ){
                        return res.status(400).json({
                                success:false,
                                error:"Required fields are missing"
                        })
                 }

                //  database entry

                 // push to the queue
                 await redisClient.lPush("problems",JSON.stringify({userId,questionId,code,language}))

                 // send submission id to the user - so that he can poll

                 res.status(200).json({
                        success:true,
                        message:"Your code is in process",
                        submissionId:"236sds7s78d9s",
                        status:"pending"
                 })
     
       } catch (error) {
                return res.status(500).json({
                        success:false,
                        error:"Internal server error"
                })
       }

})

app.get('/submission/status/:submissionId',async(req,res)=>{
        
})

app.listen(process.env.PORT,()=>{
        console.log(`Server running on ${process.env.PORT}`)
})
