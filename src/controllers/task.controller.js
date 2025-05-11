import { asynchandler } from "../utils/asynchandler.js";
import { API_ERROR } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import mongoose from "mongoose";

const createTask=asynchandler(async(req,res)=>{
    
    const user=req.user
    if(!user){
        throw new API_ERROR(400,"User not Authorized to create Task")
    }
    const {title,description,status}=req.body

    if([title,description,status].some((field)=>field?.trim()==="")){
        throw new API_ERROR(401,"Enter all fields")
    }

  const task = await Task.create({
        title,
        description,
        status,
        user:user
    })

    if(!task){
        throw new API_ERROR(400,"Failed to create the task")
    }

    res.status(201).json(new ApiResponse(200,"Task Created Successfully",task))




})


const getTask=asynchandler(async(req,res)=>{
    const {id}=req.user._id
   
    
 
    if(!id){
        throw new API_ERROR(400,"Id is not provided")
    }

   const task= await Task.aggregate([
        {
            $match:{
                user:new mongoose.Types.ObjectId(id)
            }
        }
    ])

    if(!task){
        throw new API_ERROR(400,"Failed to fetch tasks")
    }
    
    res.status(201).json(new ApiResponse(200,"Task Fetched",task))

})




export {
    createTask,
    getTask
}

