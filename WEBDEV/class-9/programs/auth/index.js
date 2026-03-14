import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import jwt from "jsonwebtoken"


const app  = express()
const PORT = 3000
const jwt_secret = "note_secret_token_key"
// middlewares

app.use(express.json())

function authMiddleware(req,res,next){


        const note_token_string = req.headers['note_token']

        if(!note_token_string){
                return res.status(401).json({
                        success:false,
                        error:"User not authenticated"
                })
        }

        const note_token = note_token_string.split(' ')[1]


        try {
                const decoded = jwt.verify(note_token,jwt_secret)
                const username = decoded.username

                const userExists = users.find(user=> user.username === username)
                if(!userExists){
                        return res.status(401).json({
                                success:false,
                                error:"User not authenticated"
                        })
                }

                req.user = userExists
                next() 
        } catch (error) {
                return res.status(401).json({
                        success:false,
                        error:"User not authenticated"
                })
        }
}


const notes = [] // this is bad
// databases -  [mongodb,  postgres , mysql]
const users = []

app.get('/login',(req,res)=>{
        const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)),"./frontend/login.html")
        res.status(200).sendFile(filePath)
})
app.get('/signup',(req,res)=>{
        const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)),"./frontend/signup.html")
        res.status(200).sendFile(filePath)
})

app.get('/',authMiddleware,(req,res)=>{
        const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)),"./frontend/index.html")
        res.status(200).sendFile(filePath)

})

app.post('/signup',(req,res)=>{
        const {username,password} = req.body
        if(!username || !password){
                return res.status(400).json({
                        error:"Username and password are required"
                })
        }

        const userExists = users.find(user=> user.username === username)
        if(userExists){
                return res.status(403).json({
                        error:"User already exists"
                })
        }
        users.push({username,password})
        return res.status(201).json({
                success:true,
                message:"User created successfully"
        })
})

app.post('/login',(req,res)=>{
        const {username,password} = req.body
        if(!username || !password){
                return res.status(400).json({
                        error:"Username and password are required"
                })
        }
        const userExists = users.find(user=> user.username === username && user.password === password)

        // json web token - stateless ,  
        const note_token =jwt.sign(
                {username,password},
                jwt_secret,
                {
                        expiresIn:"1h"
                }
        )
        if(userExists){
                return res.status(200).json({
                        success:true,
                        message:"User logged in successfully",
                        note_token
                })
        }else{
                return res.status(401).json({
                        success:false,
                        error:"Invalid credentials"
                })
        }
})

app.post('/notes',authMiddleware,(req,res)=>{
        const {title,description}  =req.body

        if(!title || !description){
                return res.status(400).json({
                        success:false,
                        error:"Title and description are required"

                })
        }else{
                const username = req.user.username
                notes.push({title,description,id:notes.length+1,username})
                return res.status(200).json({
                        success:true,
                        message:"Note added successfully",
                })
        }
})

app.get('/notes',authMiddleware,(req,res)=>{    

        const username = req.user.username

        const userNotes = notes.filter(note=> note.username === username)
        return res.status(200).json({notes:userNotes})
})


app.listen(PORT, () => {
        console.log("Listening on port 3000")
})