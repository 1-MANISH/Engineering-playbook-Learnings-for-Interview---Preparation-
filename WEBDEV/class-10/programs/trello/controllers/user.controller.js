
import { readFileData, writeFileData } from "../utils/filereadwrite.js"
import { getFilePath } from "../utils/getfilepath.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/token.js"

async function signupController(req,res,_next){

        const {username,password} = req.body

        if(!username || !password){
                return res.status(400).json({
                        success:false,
                        message:"Missing username or password"
                })
        }

        const filePath = getFilePath("../models/users.json")

        const users =(await readFileData(filePath,"utf-8")).users

        const userExists = users.find(user=>user.username===username)

        if(userExists){
                return res.status(400).json({
                        success:false,
                        message:"Username already exists"
                })
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = {
                id:users.length+1,
                username,
                password:hashPassword
        }

        users.push(newUser)

        const token = generateToken(newUser.id,newUser.username)

        await writeFileData(filePath,users)

        return res.status(201).json({
                success:true,
                user:newUser,
                token
        })
}

export {
        signupController
}