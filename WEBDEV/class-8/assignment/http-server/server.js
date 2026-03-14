
import express from "express"
import bodyParser from "body-parser"

const todos = []

const app = express()

app.use(express.json())
// app.use(bodyParser.json())




app.get('/',(req,res)=>{
        res.status(200).send("Hello World")
})

app.post('/create/todo', (req, res) => {

        const {title,description} = req.body
        console.log(title,description)

        const newTodo = {
                id:todos.length+1,
                title,
                description
        }
        todos.push(newTodo)
        res.status(200).json(todos)
})

app.get('/todos', (req, res) => {
        res.status(200).json(todos)
})
  
  app.get('/todo/:id', (req, res) => {
        const todo = todos.find(t => t.id === parseInt(req.params.id))
        if (!todo) {
                res.status(404).json({
                        error:'Todo not found'
                })
        } else {
                res.status(200).json(todo)
        }
  });

  app.delete('/todo/:id', (req, res) => {
        const todo = todos.find(t => t.id === parseInt(req.params.id))
        if (!todo) {
                res.status(404).json({
                        error:'Todo not found'
                })
        } else {
                todos.splice(todo.id-1, 1)
                res.status(200).json(todos)
        }
  })
  

app.listen(3000,()=>{
        console.log("server started at 3000")
})
