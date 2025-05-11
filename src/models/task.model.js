import mongoose, { Schema } from "mongoose";

const taskSchema=new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
}
)

export const Task=mongoose.model("Task",taskSchema)