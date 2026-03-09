import express from "express"

const app =  express()

const PORT = 3000


app.get('/',(req,res)=>{
        res.status(200).json({
                success:true,
                message:"Server is running"
        })
})

// lets tried to implement todo endpoints


// process runs infinitely
app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
})