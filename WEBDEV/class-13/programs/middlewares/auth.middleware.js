import { getUser } from "../db/models/user.model.js";
import { TryCatch } from "../utils/tryCatch.js";
import jwt from "jsonwebtoken"

export const authMiddleware = TryCatch(async (req,res,next)=>{
        const token = req.cookies.todo_token

        if(!token)
                return res.status(401).json({message:"Unauthorized"})

        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)

        const user = await getUser(payload.email)

        if(!user)
                return res.status(401).json({message:"Unauthorized"})

        req.user = {
                id:user.id,
                email:user.email
        }
        next()

})