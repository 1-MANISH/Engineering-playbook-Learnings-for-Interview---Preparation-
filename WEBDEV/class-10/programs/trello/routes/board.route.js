import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createBoardController } from "../controllers/board.controller.js"

const boardRoutes = express.Router()

boardRoutes.post('/create',authMiddleware,createBoardController)


export default boardRoutes