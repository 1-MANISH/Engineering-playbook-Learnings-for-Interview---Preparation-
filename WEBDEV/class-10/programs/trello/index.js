import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { ENV } from "./utils/env.js"

// routes import
import authRoutes from "./routes/auth.route.js"
import orgRoutes from "./routes/organization.route.js"
import memberRoutes from "./routes/member.routes.js"
import boardRoutes from "./routes/board.route.js"
import issueRoutes from "./routes/issue.route.js"

// configurations
dotenv.config()

const app  = express()
const PORT = ENV.PORT || 4000
const nodeEnv = ENV.NODE_ENV || "development"


// middlewares
app.use(express.json())
app.use(cookieParser())

// health check route
app.get('/api/health',(_req,res)=>{
        res.status(200).json({
                success:true,
                message:"Server is running"
        })
})
// routes
app.use('/api/auth',authRoutes)
app.use('/api/v1/organization',orgRoutes)
app.use('/api/v1/member',memberRoutes)
app.use('/api/v1/board',boardRoutes)
app.use('/api/v1/issue',issueRoutes)

// here we are going to serve static files - for the production
if(nodeEnv === 'production'){

        // app.use(express.static())

        // app.get(/.*/,(req,res)=>{
        //         res.sendFile()
        // })
}

// server
app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost: ${PORT}`)
})
