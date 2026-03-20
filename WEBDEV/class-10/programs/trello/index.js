// trello clone - file based

// username , password ? USERS table
// organization | ORGANIZATION tbale
// boards | BOARDS table
// issues | ISSUES table

import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
// configurations
dotenv.config()

const app  = express()
const PORT = process.env.PORT || 4000


app.use(express.json())

/**
 * @GET /api/health
 * @description - health check
 */
app.get('/api/health',(req,res)=>{
        res.status(200).json({
                success:true,
                message:"Server is running"
        })
})


app.use('/api/auth',authRoutes)




app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost: ${PORT}`)
})
