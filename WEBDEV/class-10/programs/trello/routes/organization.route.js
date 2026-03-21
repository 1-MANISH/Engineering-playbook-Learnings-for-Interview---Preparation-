import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createOrganizationController, getAllOrganizationsController, getOrganizationController } from "../controllers/organization.controller.js"

const orgRoutes = express.Router()

orgRoutes.post('/create',authMiddleware,createOrganizationController)

orgRoutes.get('/all',authMiddleware,getAllOrganizationsController)

orgRoutes.get('/:organizationId',authMiddleware,getOrganizationController)

export default orgRoutes