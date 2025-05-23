import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./src/db/connectDB.js"
import path from "path"
const app=express()

dotenv.config({
    path:"./.env"
})

connectDB()

var corsOptions = {
    origin: "*" || "https://task-manager-sagg.onrender.com" || "http://localhost:8000/api/v1",
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


// app.get("/",(req,res)=>{
//     res.send("Server is ready")
// })

//*****************   User Router                             ********************************/

import userRouter from "./src/routes/user.routes.js"
app.use("/api/v1/users",userRouter)




//*****************  Task Router                              ********************************/
import taskRouter from "./src/routes/task.routes.js"
app.use("/api/v1/task",taskRouter)



// ---------Deployment Code---------
const _dirname1=path.resolve();
if(process.env.NODE_ENV==="production"){
  console.log(process.env.NODE_ENV);
  console.log(_dirname1);
  
  
  app.use(express.static(path.join(_dirname1,"/frontend/dist")))
  
  
  
  app.get("/*:splat",(req,res)=>{
    res.sendFile(path.resolve(_dirname1,"frontend","dist","index.html"))
  })

}else{

app.get("*", (req, res) => {
  res.send("server is ready");
});

}
//------------------------------------------------