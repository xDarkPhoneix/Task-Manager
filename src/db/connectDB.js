import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants.js";

const connectDB=async()=>{
    try {
        const instance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database Connected ${instance.connection.host}` );
    } catch (error) {
        console.log("Mongo DB Connection error",error);
        process.exit(1);
    }
    
}

export default connectDB