import { asynchandler } from "../utils/asynchandler.js";
import { API_ERROR } from "../utils/ApiError.js";
import { User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const test=asynchandler(async(req,res)=>{
   
    const {hola}=req.body

    res.json({
        "message":"okkk",
        hola

    })
})


export {
    test
}