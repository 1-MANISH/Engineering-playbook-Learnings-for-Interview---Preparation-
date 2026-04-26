import { createTodo, deleteTodo, getTodo, updateTodo } from "../db/models/todo.model.js";
import { TryCatch } from "../utils/tryCatch.js";


const createTodoController = TryCatch(async(req,res,next)=>{

        const {title,description} = req.body

        if(!title || !description){
                return res.status(400).json({
                        success:false,
                        error:"Title and description are required"
                })
        }

        const todo = await createTodo(title,description,req.user.id)

        res.status(201).json({
                success:true,
                data:todo
        })
})
const updateTodoController = TryCatch(async(req,res,next)=>{

        const todoId = req.params.id
        const status = req.query.status

        if(!status){
                return res.status(400).json({
                        success:false,
                        error:"Status is required"
                })
        }

        const todo = await getTodo(todoId)

        if(!todo){
                return res.status(404).json({
                        success:false,
                        error:"Todo not found"
                })
        }

        const updatedTodo = await updateTodo(todoId,status)

        res.status(200).json({
                success:true,
                data:updatedTodo
        })

})
const deleteTodoController = TryCatch(async(req,res,next)=>{

        const todoId = req.params.id

        const todo = await getTodo(todoId)

        if(!todo){
                return res.status(404).json({
                        success:false,
                        error:"Todo not found"
                })
        }

        const deletedTodo = await deleteTodo(todoId)

        res.status(200).json({
                success:true,
                data:deletedTodo
        })
})

export {
        createTodoController,
        updateTodoController,
        deleteTodoController
}