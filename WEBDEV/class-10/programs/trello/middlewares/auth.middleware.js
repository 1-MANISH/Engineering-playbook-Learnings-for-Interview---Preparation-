import jwt from "jsonwebtoken"
import { MESSAGES, STATUS_CODE, TOKEN_NAME } from "../utils/constants.js";
import { sendError } from "../utils/response.js";
import { ENV } from "../utils/env.js";
import { getFilePath } from "../utils/getfilepath.js";
import { readFileData } from "../utils/filereadwrite.js";

export async function authMiddleware(req,res,next){
        try {
                
                const token = req.cookies[TOKEN_NAME]

                if(!token){
                        sendError(res,STATUS_CODE.UNAUTHORIZED,MESSAGES.TOKEN_MISSING)
                        return
                }

                const decoded = jwt.verify(token,ENV.JWT_SECRET)

                const {username} = decoded
                
                const filepath =  getFilePath("../models/store.json")
                const store = await readFileData(filepath,"utf-8")

                const user = store.users.find(user=>user.username===username)

                if(!user){
                        sendError(res,STATUS_CODE.UNAUTHORIZED,MESSAGES.TOKEN_INVALID)
                        return
                }

                req.user = {id:user.id, username:user.username }
                next()
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

export async function authorizeMiddleware(role=""){
        return async (req,res,next)=>{
                try {
                        if(req.user.role !== role){
                                sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.NOT_AUTHORIZED)
                                return
                        }
                        next()
                } catch (error) {
                        sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
                }
        }
}