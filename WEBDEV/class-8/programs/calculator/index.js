// http server that supports 4 routes ()
// /sum?num1=2&num2=3
// /sub?num1=2&num2=3
// /mul?num1=2&num2=3
// /div?num1=2&num2=3

// express , hono , elysiajs , trpc

import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"

const app  = express()

const PORT = 4001
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// middleware - > body parser
app.use(express.json())
// app.use(express.static(path.join(dirname)))
app.use(cors({
        origin:"*",
        // methods:["POST"]
}))
app.use((req,res,next)=>{
        console.log(req.method,req.url)
        next()
})

app.get('/server/check',(req,res)=>{
        res.status(200).json({
                success:true,
                message:"Server is running"
        })
})

// query
// http://localhost:4001/calculator/sum?num1=10&num2=20
// http://localhost:4001/calculator/sum?num1=10&num2=20
// req.query.a

// params
// http://localhost:4001/calculator/sum/10/20
// http://localhost:4001/calculator/sum/:A/:B
// req.params.a

app.get('/',(req,res)=>{
        res.status(200).sendFile(path.join(dirname,"index.html"))
})

app.get('/calculator/sum/:a/:b',(req,res)=>{
        let a = parseInt(req.params.a)
        let b = parseInt(req.params.b)

        let sum = a + b
        res.status(200).json({
                success:true,
                message:"Addition done",
                result:sum
        })

})

app.get('/calculator/sub',(req,res)=>{
        let a = parseInt(req.query.num1)
        let b = parseInt(req.query.num2)

        let sub = a - b
        res.status(200).json({
                success:true,
                message:"Subtraction done",
                result:sub
        })

})
app.post('/calculator/mul',(req,res)=>{
        let a = parseInt(req.body.num1)
        let b = parseInt(req.body.num2)

        let mul = a * b
        res.status(200).json({
                success:true,
                message:"Multiplication done",
                result:mul
        })

})
app.post('/calculator/div',(req,res)=>{
        let a = parseInt(req.query.num1)
        let b = parseInt(req.query.num2)

       try {
                if(b==0){
                       return  res.status(400).json({
                        success:false,
                        message:"Cannot divide by zero",
                        error:"Cannot divide by zero"
                })
                }
                let div = a / b
                res.status(200).json({
                        success:true,
                        message:"Division done",
                        result:div
                })
       } catch (error) {
                res.status(500).json({
                        success:false,
                        message:"Division failed",
                        error:error.message
                })
       }
})

app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
                success: false,
                message: err.message || "Internal Server Error",
                error: err.message
        })
})


app.listen(4001,()=>{
        console.log(`Server running http://localhost:${PORT}`)
})