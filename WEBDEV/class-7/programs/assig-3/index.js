import express from "express"
import fs from "fs"

const app =  express()

const PORT = 3000


app.use(express.json())

app.get('/',(req,res)=>{
        res.status(200).json({
                success:true,
                message:"Server is running"
        })
})

// lets tried to implement todo endpoints
app.get('/todos',(req,res)=>{

        
        const todos = JSON.parse(fs.readFileSync('todos.json','utf-8')).todos


        res.status(200).json({
                success:true,
                todos
        })
})

app.post('/todos',(req,res)=>{
        const {title,priority} = req.body

        if(!title || !priority){
                return res.status(400).json({
                        success:false,
                        message:"Please provide title and priority"
                })
        }

        const prioritiesOptions  = [ "Low", "Medium", "High" ]
        if(!prioritiesOptions.includes(priority)){
                return res.status(400).json({
                        success:false,
                        message:"Please provide valid priority"
                })
        }

        
        const todos = JSON.parse(fs.readFileSync('todos.json','utf-8')).todos


        const newTodo = {
                id: todos.length + 1,
                title,
                priority,
                completed: false
        } 

        todos.push(newTodo)
        fs.writeFileSync('todos.json',JSON.stringify({todos}))
        
        res.status(201).json({
                success:true,
                message:"Todo created successfully",
                todo:newTodo
        })
})

app.put('/todos/:id',(req,res)=>{       
        const {id} = req.params

        const todos = JSON.parse(fs.readFileSync('todos.json','utf-8')).todos

        const todo = todos.find((todo)=>todo.id == id)
        if(!todo){
                return res.status(404).json({
                        success:false,
                        message:"Todo not found"
                })
        }

        const {title,priority,completed} = req.body


        if(title)
                todo.title = title
        if(priority)
                todo.priority = priority
        if(completed)
                todo.completed = completed
        
        fs.writeFileSync('todos.json',JSON.stringify({todos}))
        
        res.status(200).json({
                success:true,
                message:"Todo updated successfully",
                todo
        })
})

app.delete('/todos/:id',(req,res)=>{
        const {id} = req.params

        const todos = JSON.parse(fs.readFileSync('todos.json','utf-8')).todos

        const todo = todos.find((todo)=>todo.id == id)
        if(!todo){
                return res.status(404).json({
                        success:false,
                        message:"Todo not found"
                })
        }
        const indexOfTodo = todos.indexOf(todo)
        todos.splice(indexOfTodo,1)

        fs.writeFileSync('todos.json',JSON.stringify({todos}))
        
        res.status(200).json({
                success:true,
                message:"Todo deleted successfully"     
        })
})

// process runs infinitely
app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
})