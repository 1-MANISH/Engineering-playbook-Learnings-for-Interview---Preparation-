import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { readFileData, writeFileData } from "../utils/filereadwrite.js"
import { getFilePath } from "../utils/getfilepath.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function createOrganizationController(req,res,_next){
        try {
                const user = req.user
                const {name,description} = req.body

                if(!name || !description){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
                }

                const filepath = getFilePath('../models/store.json')
                const store = await readFileData(filepath,'utf-8')

                const newOrganization = {
                        id:store.organizations.length+1,
                        name,
                        description,
                        admin:user.id,
                        members:[]
                }

                store.organizations.push(newOrganization)

                await writeFileData(filepath,store)

                sendSuccess(res,STATUS_CODE.CREATED,{organization:newOrganization},MESSAGES.ORGANIZATION_CREATED)


        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

async function getAllOrganizationsController(req,res,_next){
        try {
                const user  = req.user

                const filepath = getFilePath('../models/store.json')
                const store = await readFileData(filepath,'utf-8')

                const organizations = store.organizations.filter(organization=>organization.admin===user.id || organization.members.includes(user.id))

                const detailedOrganizations = organizations.map(organization=>{
                        return{
                                ...organization,
                                admin:req.user
                        }
                })
                sendSuccess(res,STATUS_CODE.OK,{organizations:detailedOrganizations},MESSAGES.ORGANIZATIONS_FETCHED)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}
async function getOrganizationController(req,res,_next){
        try {
                const {organizationId} = req.params
                const user  = req.user

                const filepath = getFilePath('../models/store.json')
                const store = await readFileData(filepath,'utf-8')

                const organization = store.organizations.find(organization=>organization.id===Number(organizationId) && (organization.admin===user.id || organization.members.includes(user.id)))

                if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
                        return
                }


                const detailedOrganization = {...organization,admin:req.user,members:organization.members.map(memberId=>{
                        return{
                                id:memberId,
                                username:store.users.find(user=>user.id===memberId).username,
                        }
                })}

                const boards = store.boards.filter(board=>board.organizationId===organizationId)
                detailedOrganization.boards = boards
                sendSuccess(res,STATUS_CODE.OK,{organization:detailedOrganization},MESSAGES.ORGANIZATIONS_FETCHED)

        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

export {
        createOrganizationController,
        getAllOrganizationsController,
        getOrganizationController
}