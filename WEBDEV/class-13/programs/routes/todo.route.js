import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createTodoController, deleteTodoController, updateTodoController } from "../controllers/todo.controller.js"

const todoRoutes = express.Router()

todoRoutes.post('/create',authMiddleware,createTodoController)
todoRoutes.put('/update/:id',authMiddleware,updateTodoController)
todoRoutes.delete('/delete/:id',authMiddleware,deleteTodoController)


export default todoRoutes