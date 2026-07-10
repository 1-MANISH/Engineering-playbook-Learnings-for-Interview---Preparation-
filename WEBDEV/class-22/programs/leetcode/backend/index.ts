import express from 'express'
import dotenv from "dotenv"
import { createClient } from 'redis'
import { prismaClient } from './prisma/db'
import cors from "cors"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const redisClient = createClient({
        url:process.env.UPSTASH_REDIS_REST_URL,
})

redisClient.connect()

redisClient.on('error',(error)=>{
        console.log('REDIS ME ERROR',error)
})

app.post('/submission',async(req,res)=>{

       try {
                // we will get user code and language
                const {code,language} = req.body

                if(  !code || !language ){
                        return res.status(400).json({
                                success:false,
                                error:"Required fields are missing"
                        })
                }

                //distributed transaction - 

                //  database entry
                const submission = await prismaClient.submissions.create({
                        data:{
                                code,
                                language,
                                status:"pending"
                        }
                })

                 // push to the queue
                 await redisClient.lPush("problems",JSON.stringify({submissionId:submission.id,code,language}))

                // send submission id to the user - so that he can poll

                res.status(200).json({
                        success:true,
                        message:"Your code is in queue",
                        submissionId:submission.id,
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
        const {submissionId} = req.params
        if(!submissionId){
                return res.status(400).json({
                        success:false,
                        error:"Submission id is required"
                })
        }
        const submission = await prismaClient.submissions.findUnique({
                where:{id:submissionId}
        })
        if(!submission){
                return res.status(404).json({
                        success:false,
                        error:"Submission not found"
                })
        }
        res.status(200).json({
                success:true,
                submission
        })
})

app.listen(process.env.PORT,()=>{
        console.log(`Server running on ${process.env.PORT}`)
})
