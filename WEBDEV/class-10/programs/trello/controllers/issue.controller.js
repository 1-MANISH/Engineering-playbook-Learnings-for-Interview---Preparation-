import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { readFileData, writeFileData } from "../utils/filereadwrite.js"
import { getFilePath } from "../utils/getfilepath.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function createIssueController(req,res,_next){
        try {
               const {title,description} = req.body
               const {organizationId,boardId} = req.query
               const user = req.user
               
               if(!title || !description  || !organizationId || !boardId){
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

               const isAllowed= organization.admin===user.id || organization.members.includes(user.id)
               if(!isAllowed){
                        sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.CAN_PERFORM_ACTION)
                        return
               }

               const board = store.boards.find(board=>board.id===Number(boardId))

               if(!board){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.BOARD_NOT_FOUND)
                        return
               }

               const newIssue= {
                        id:store.issues.length+1,
                        title,
                        description,
                        boardId:board.id,
                        state:"next_up"
               }

               store.issues.push(newIssue)

               await writeFileData(filepath,store)

               sendSuccess(res,STATUS_CODE.CREATED,{issue:newIssue},MESSAGES.CREATE_ISSUE_SUCCESS)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}


export {
        createIssueController
}