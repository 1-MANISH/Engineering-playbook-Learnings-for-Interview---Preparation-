import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { readFileData, writeFileData } from "../utils/filereadwrite.js"
import { getFilePath } from "../utils/getfilepath.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function createBoardController(req,res,_next){
        try {
               const {title} = req.body
               const {organizationId} = req.query
               const user = req.user
               
               if(!title || !organizationId){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
               }

               const filepath = getFilePath('../models/store.json')
               const store = await readFileData(filepath,'utf-8')

               const organization = store.organizations.find(organization=>organization.id===Number(organizationId))

               if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
                        return
               }

               const isAdmin = organization.admin===user.id
               if(!isAdmin){
                        sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.ADMIN_CAN_PERFORM_ACTION)
                        return
               }

               const newBoard = {
                        id:store.boards.length+1,
                        title,
                        organizationId:organization.id
               }

               store.boards.push(newBoard)

               await writeFileData(filepath,store)

               sendSuccess(res,STATUS_CODE.CREATED,{board:newBoard},MESSAGES.BOARD_CREATED)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}


export {
        createBoardController
}