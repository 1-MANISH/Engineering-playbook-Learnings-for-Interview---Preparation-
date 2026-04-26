import express from "express"
import { loginController, logoutController, signupController } from "../controllers/user.controller.js"

const userRoutes = express.Router()

userRoutes.post('/signup',signupController)
userRoutes.post('/login',loginController)
userRoutes.get('/logout',logoutController)

export default userRoutes