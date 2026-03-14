import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = 4002
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

app.get('/',(req,res)=>{
        res.sendFile(dirname+"/index.html")
})

app.get('/make-request',async(req,res)=>{
        
      try {
                const response = await fetch('http://localhost:4001/calculator/sum/2/2')
                const data = await response.json()

                res.status(200).json({
                        data
        })
      } catch (error) {
                res.status(500).json({
                        error:error.message,
                        success:false
                })
      }
})      

app.listen(PORT,()=>{
        console.log(`Server running http://localhost:${PORT}`)
})