import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const client = new PrismaClient({
        adapter:new  PrismaPg({
                connectionString: process.env.DATABASE_URL
        })
})
async function createUser(){
      const newUser =   await client.user.create({
                data:{
                        username:"hardik",
                        password:"123123",
                        age:23,
                        city:"baroda"
                }
        })
        console.log(newUser)
}

createUser()
