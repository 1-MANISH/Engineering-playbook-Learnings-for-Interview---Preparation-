import express from "express";

const app:express.Application = express();

app.use(express.json());

app.get("/",(req:express.Request,res:express.Response)=>{
        res.status(200).json({
                success:true,
                message:"Server is running"
        })
})

interface SignupInput{
        name:string;
        email:string;
        password:string;
}

app.post("/signup",(req,res)=>{

        const body:SignupInput  = req.body;

        
        // push to database
        res.status(201).json({
                success:true,
                message:"User signed up successfully",
                data:body
        })
})

app.listen(3000,()=>{
        console.log("Server is running on port 3000");
})