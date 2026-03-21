import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createIssueController } from "../controllers/issue.controller.js"

const issueRoutes = express.Router()

issueRoutes.post('/create',authMiddleware,createIssueController)

export default issueRoutes