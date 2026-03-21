import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { readFileData, writeFileData } from "../utils/filereadwrite.js"
import { getFilePath } from "../utils/getfilepath.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function addMemberToOrganizationController(req,res,_next){
        try {
                const {organizationId} = req.params
                const {memberId} = req.body
                const user = req.user

                if(!memberId || !organizationId){
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

                const member  = store.users.find(user=>user.id===Number(memberId))

                if(!member){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.INVALID_MEMBER_ID)
                        return
                }

                organization.members.push(memberId)

                store.organizations = store.organizations.map(organization1=>organization1.id===Number(organizationId)?organization:organization1)

                await writeFileData(filepath,store)

                sendSuccess(res,STATUS_CODE.OK,{},MESSAGES.MEMBER_ADDED_TO_ORGANIZATION)

        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}
async function deleteMemberFromOrganizationController(req,res,_next){
        try {

                const {organizationId,memberId} = req.query
                const user = req.user

                 if(!memberId || !organizationId){
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


                const member  = store.users.find(user=>user.id===Number(memberId))

                if(!member){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.INVALID_MEMBER_ID)
                        return
                }

                organization.members = organization.members.filter(memberId1=>memberId1!==Number(memberId))

                store.organizations = store.organizations.map(organization1=>organization1.id===Number(organizationId)?organization:organization1)

                await writeFileData(filepath,store)

                sendSuccess(res,STATUS_CODE.OK,{},MESSAGES.MEMBER_DELETED_FROM_ORGANIZATION)

                
        } catch (error) {
                 sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

export {
        addMemberToOrganizationController,
        deleteMemberFromOrganizationController
}