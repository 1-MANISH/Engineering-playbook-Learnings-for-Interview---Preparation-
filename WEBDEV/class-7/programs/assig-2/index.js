import fs from "fs"
import {Command} from "commander"
const program = new Command()

function initializeProgram(){
        program
                .name('todo')
                .description('manage your todo list')
                .version('1.0.0')


        program
                .command('add-todo')
                .argument('<todo-title>')
                .option('-d , --done','mark todo as done')
                .option('-p, --priority','set todo priority')
                .action((todo,options)=>{

                        const todoList = JSON.parse(fs.readFileSync('todos.json','utf-8'))

                        const newTodo = {
                                id: todoList.tasks.length + 1,
                                title: todo,
                                completed: options.done,
                                priority: options.priority ? 'High' : 'Low'
                        }

                        todoList.tasks.push(newTodo)

                        fs.writeFileSync('todos.json',JSON.stringify(todoList))
                })

        program  
              .command('list-todo')
                .option('-a, --all','list all todos')
                .option('-c,--completed','list completed todos')
                .option('--id,--id <id>','list todo by id')
                .action((options)=>{
                        const todoList = JSON.parse(fs.readFileSync('todos.json','utf-8'))

                         if(options.completed){
                                const completedTodos = todoList.tasks.filter(t => t.completed)
                                console.log(completedTodos)
                        }else if(options.all){
                                console.log(todoList.tasks)
                        }else if(options.id){
                                const todo = todoList.tasks.find(t => t.id == options.id)
                                console.log(todo)
                        }
                        else{
                                console.log(todoList)
                        }
                })

        program
                .command('remove-todo')
                .argument('<todo-id>')
                .action((id)=>{
                        const todoList = JSON.parse(fs.readFileSync('todos.json','utf-8'))
                        const todoIndex = todoList.tasks.findIndex(t => t.id == id)
                        todoList.tasks.splice(todoIndex,1)
                        fs.writeFileSync('todos.json',JSON.stringify(todoList))
                })

        program
                .command('todo-done')
                .argument('<todo-id>')
                .action((id)=>{
                        const todoList = JSON.parse(fs.readFileSync('todos.json','utf-8'))
                        const todoIndex = todoList.tasks.findIndex(t => t.id == id)
                        todoList.tasks[todoIndex].completed = true
                        fs.writeFileSync('todos.json',JSON.stringify(todoList))
                })
}

function main(){
        initializeProgram()
        program.parse()
}

main()

// process.argv[2] // node index.js file.txt

// process.argv[0] // node
// process.argv[1] // index.js
// process.argv[2] // file.txt