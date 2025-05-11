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

const updateTask=asynchandler(async(req,res)=>{
    const {title,description,status,id}=req.body


        if([title,status,description,id].some((field)=>field?.trim()==="")){
            throw new API_ERROR(400,"Please Enter all the fields")
        }
    
        const updatedTask= await Task.findByIdAndUpdate(
            id,
         {
           $set:{
            title:title,
            description:description,
            status:status,
           }
         },
         {
            $new:true
         }
        ).select("-password")
    

    if(!updatedTask){
        throw new API_ERROR(400,"Failed to update Task")
    }  

    res.status(201).json(new ApiResponse(200,"Task Updated Successfully"),updatedTask)
})


const delteTask=asynchandler(async(req,res)=>{
  
    const {id}=req.body

    if(!id){
        throw new API_ERROR(400,"Id not provided")
    }
 
    const deletedTask=await Task.deleteOne({_id:id})
    
    if(!deletedTask){
        throw new API_ERROR(400,"Failed to delete Task")
    }

    res.status(201).json(new ApiResponse(200,"Task Deleted Successfully",deletedTask))
    


})

const getTaskById=asynchandler(async(req,res)=>{
 
    const {id}=req.body

    if(!id){
        throw new API_ERROR(400,"Id not provided")
    }

    const task=await Task.findById(id)

    if(!task){
        throw new API_ERROR(400,"Failed to fetch Task")
    }
  

    res.status(201).json(new ApiResponse(200,"Task Fetched",task))

})



export {
    createTask,
    getTask,
    updateTask,
    delteTask,
    getTaskById
}

