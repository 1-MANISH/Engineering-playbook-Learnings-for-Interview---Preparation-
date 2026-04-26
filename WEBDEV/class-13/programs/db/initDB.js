import { fileURLToPath } from "url"
import path from "path"
import client from "./db.js"
import fs from "fs"

export const initDB = async () =>{

        try {
                const pathname =  path.resolve(fileURLToPath(import.meta.url))
                const schemaPath  = path.join(path.dirname(pathname),"./schema")
                const files =  fs.readdirSync(schemaPath)

                for(let file of files){
                        const sql = fs.readFileSync(path.join(schemaPath,file),"utf-8")
                        await client.query(sql)
                        console.log(`Created table ${file}`)
                }

                console.log(`All tables created`,files)
        } catch (error) {
                console.log(`DB Error: ${error}`)
        }
}