
import jwt from "jsonwebtoken"
import { ENV } from "./env.js"
import { TOKEN_NAME } from "./constants.js"


export function generateToken(user,res){

        const jwt_secret = ENV.JWT_SECRET
        const nodeEnv = ENV.NODE_ENV

        if(!jwt_secret){
                throw new Error('JWT_SECRET is not defined')
        }

        const token =  jwt.sign(
                user,
                jwt_secret,
                {expiresIn:"1d"}
        )

        res.cookie(
                TOKEN_NAME,
                token,
                {
                        maxAge:1*24*60*60*1000,
                        httpsOnly:true,
                        sameSite:nodeEnv==="development"?"lax":"strict",
                        secure:nodeEnv==="development"?false:true
                }
        )

        return token
}

export function clearCookie(res){

        res.cookie(
                TOKEN_NAME,
                "",
                {
                        maxAge:0,
                }
        )

       
}