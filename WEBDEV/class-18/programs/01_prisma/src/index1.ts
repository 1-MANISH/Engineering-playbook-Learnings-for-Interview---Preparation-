import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

interface User{
        username:string,
        password:string,
        age:number,
        city:string
}
interface Todo{
        id?:number,
        title:string,
        description?:string|null,
        completed?:boolean,
        userId?:number,
        time?:Date
}
const user1:User = {
         username:"hardik",
         password:"123123",
        age:23,
        city:"baroda",
}
const user2:User = {
        username:"devik",
        password:"123123",
        age:20,
        city:"rajkot"
}

const client = new PrismaClient({
        adapter:new  PrismaPg({
                connectionString: process.env.DATABASE_URL
        }),
        log: ['query']
})
async function createUser(user:User):Promise<User>{
      const newUser =   await client.user.create({
                data:user
        })
        return newUser
}
async function deleteUser(userId:number):Promise<User>{
      const deletedUser =   await client.user.delete({
         where:{
                id:userId
         }
      })
      return deletedUser
}
async function updateUser(user:User,userId:number):Promise<User>{
      const updatedUser =   await client.user.update({
         where:{
                id:userId
         },
         data:user
      })
      return updatedUser
}
async function findUser(userId:number):Promise<User>{
      const user =   await client.user.findFirst({
         where:{
                id:userId
         }
      })
      return {
                username:user ? user.username:'',
                password:user ? user.password:'',
                age:user ? user.age:-1,
                city:user ? user.city:''
      }
}

async function createTodo(userId:number,title:string,description:string):Promise<Todo>{
        
        const todo = await client.todo.create({
                data:{
                        title:title,
                        description:description,
                        completed:false,
                        userId:userId
                }
        })
        return todo
}

async function findUserTodos(userId:number){
        const todos = await client.user.findFirst({
                where:{
                        id:userId
                },
                include:{
                        todos:true
                }
        })
        return todos
}

async function main(){
        // const user:User = await createUser(user1)
        // console.log(user)
        // const deletedUser:User = await deleteUser(1)
        // console.log(deletedUser)

        // const user_to_update:User = {
        //         username:"hardik",
        //         password:"123123",
        //         age:20,
        //         city:"baroda",
        // }
        // const updatedUser:User = await updateUser(user_to_update,4)
        // console.log(updatedUser)
        
        // const user:User = await findUser(4)
        // console.log(user)

        // const todo:Todo = await createTodo(4,"title","description")
        // console.log(todo)

        const todos = await findUserTodos(4)
        console.log(todos)
    
}

main()
    .catch(console.error)
    .finally(async () => {
        // await client.$disconnect()
    })
