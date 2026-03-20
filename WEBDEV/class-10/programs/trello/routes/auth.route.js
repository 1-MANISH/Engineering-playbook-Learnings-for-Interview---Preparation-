import express from "express"
import { signupController } from "../controllers/user.controller.js"

const authRoutes = express.Router()

authRoutes.post('/signup',signupController)

authRoutes.post('/login',(req,res)=>{
        res.send("login")
})

export default authRoutes