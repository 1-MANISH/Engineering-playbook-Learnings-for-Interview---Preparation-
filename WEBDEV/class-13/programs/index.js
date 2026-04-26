import express from "express"
import dotenv from "dotenv"
import { initDB } from "./db/initDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import todoRoutes from "./routes/todo.route.js"


const app  = express()
const PORT = process.env.PORT || 7001

dotenv.config()

app.use(express.json())
app.use(cookieParser())

initDB()

app.use("/api/auth",userRoutes)
app.use('/api/todos',todoRoutes)
app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
})