import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./src/db/connectDB.js"
const app=express()

dotenv.config({
    path:"./.env"
})

connectDB()

var corsOptions = {
    origin: "*" || "https://eventmanagement-urhj.onrender.com0" || "http://localhost:8000/api/v1",
     methods:[ 'GET, POST, PUT, DELETE, OPTIONS'],
     credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server listening on port : ${process.env.API_BASE_URL}`);
    
})


app.get("/",(req,res)=>{
    res.send("Server is ready")
})

//*****************   User Router                             ********************************/

import userRouter from "./src/routes/user.routes.js"
app.use("/api/v1/users",userRouter)

//*****************   User Router                             ********************************/