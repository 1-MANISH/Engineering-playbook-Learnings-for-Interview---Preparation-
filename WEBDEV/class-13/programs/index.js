import express from "express"
import dotenv from "dotenv"
import { initDB } from "./db/initDB.js"


const app  = express()
const PORT = process.env.PORT || 7001

dotenv.config()

initDB()

app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
})