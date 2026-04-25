import {Client } from "pg"
import dotenv from "dotenv"

dotenv.config()

const client = new Client({
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        connectionString:process.env.DB_URL,
        port:process.env.DB_PORT,
})

client.connect()

export default client