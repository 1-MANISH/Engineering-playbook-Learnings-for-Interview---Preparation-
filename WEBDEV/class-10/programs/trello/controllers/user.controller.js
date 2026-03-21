
import { readFileData, writeFileData } from "../utils/filereadwrite.js"
import { getFilePath } from "../utils/getfilepath.js"
import { clearCookie, generateToken } from "../utils/token.js"
import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { sendError, sendSuccess } from "../utils/response.js"
import { comparePassword, getHashPassword } from "../utils/hashpassword.js"

async function signupController(req,res,_next){

        try {
                const {username,password} = req.body

                if(!username || !password){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
                }

                if(password.length< 6){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.PASSWORD_LENGTH)
                        return
                }

                const filePath = getFilePath("../models/store.json")

                const store = await readFileData(filePath,"utf-8")

                const userExists = store.users.find(user=>user.username===username)

                if(userExists){
                        sendError(res,STATUS_CODE.CONFLICT,MESSAGES.USER_EXISTS)
                        return
                }

                const hashPassword = await getHashPassword(password)

                const newUser = {
                        id:store.users.length+1,
                        username,
                        password:hashPassword
                }

                store.users.push(newUser)

                const token = generateToken({username:newUser.username},res)

                await writeFileData(filePath,store)

                sendSuccess(res,STATUS_CODE.CREATED,{username:newUser.username,token},MESSAGES.SIGNUP_SUCCESS)

        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

async function loginController(req,res,_next){

       try {

                const {username,password} = req.body

                if(!username || !password){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
                }

                if(password.length< 6){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.PASSWORD_LENGTH)
                        return
                }

                const filePath = getFilePath("../models/store.json")

                const store =await readFileData(filePath,"utf-8")

                const userExists = store.users.find(user=>user.username===username)

                if(!userExists){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.USER_NOT_FOUND)
                        return
                }

                const isPasswordMatch = await comparePassword(password,userExists.password)

                if(!isPasswordMatch){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.PASSWORD_MISMATCH)
                        return
                }

                  const token = generateToken({username:userExists.username},res)

                  sendSuccess(res,STATUS_CODE.OK,{username:userExists.username,token},MESSAGES.LOGIN_SUCCESS)
        
       } catch (error) {
                  sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
       }

}


async function logoutController(req,res,_next){
        try {
                // only logged in user can logout
                clearCookie(res)

                sendSuccess(res,STATUS_CODE.OK,null,MESSAGES.LOGOUT_SUCCESS)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}
export {
        signupController,
        loginController,
        logoutController
}