
import jwt from "jsonwebtoken"
export function generateToken(userId,username){

        return jwt.sign(
                {userId,username},
                process.env.JWT_SECRET,
                {
                        expiresIn:"1d"
                }
        )
}