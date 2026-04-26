import { createUser, getUser } from "../db/models/user.model.js";
import { TryCatch } from "../utils/tryCatch.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const signupController = TryCatch(async(req,res,next) =>{

        const {name,email,password} = req.body

        if(!name || !email || !password) 
                return res.status(400).json({message:"Please fill all the fields"})
       
        const userExists = await getUser(email)

        if(userExists) 
                return res.status(400).json({message:"User already exists"})

        const hashPassword = await bcrypt.hash(password,10)
        
        const user = await createUser(name,email,hashPassword)

        const token  = jwt.sign(
                {userId:user.id,email:user.email},
                process.env.JWT_SECRET_KEY,
                {expiresIn:'7d'}
        )

        res.cookie(
                "todo_token",
                token,
                {
                        maxAge:7*24*60*60*1000,
                        httpOnly:true,
                        secure:true,
                        sameSite:"none"
                }
        )

        return res.status(201).json({user})

})


const loginController = TryCatch(async(req,res,next) =>{

        const {email,password} = req.body

        if( !email || !password) 
                return res.status(400).json({message:"Please fill all the fields"})
       
        const user = await getUser(email)

        if(!user) 
                return res.status(400).json({message:"User not found"})

        const match = await bcrypt.compare(password,user.password)

        if(!match) 
                return res.status(400).json({message:"Invalid credentials"})

        const token  = jwt.sign(
                {userId:user.id,email:user.email},
                process.env.JWT_SECRET_KEY,
                {expiresIn:'7d'}
        )

        res.cookie(
                "todo_token",
                token,
                {
                        maxAge:7*24*60*60*1000,
                        httpOnly:true,
                        secure:true,
                        sameSite:"none"
                }
        )

        return res.status(201).json({user})

})

const logoutController = TryCatch(async(req,res,next) =>{

        res.cookie(
                "todo_token",
                "",
                {
                        maxAge:0,
                        httpOnly:true,
                        secure:true,
                        sameSite:"none"
                }
        )

        return res.status(200).json({message:"Logged out successfully"})
})

export {
        signupController,
        loginController,
        logoutController
}