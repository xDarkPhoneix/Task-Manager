import { asynchandler } from "../utils/asynchandler.js";
import { API_ERROR } from "../utils/ApiError.js";
import { User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asynchandler(async(req,res)=>{
  
    const {email,name,password}=req.body

    if([email,name,password].some((field)=>field?.trim()==="")){
        throw new API_ERROR(400,"Please Enter all the fields")
    }

    const existedUser=await User.findOne({email})

    if (existedUser) {
        throw new API_ERROR(409, "User with email already exists")
    }


    const avatarLocalPath=req.files?.avatar[0].path;

    if(!avatarLocalPath){
        throw new API_ERROR(400, "Avatar LocalFile path is required")
    }
    
    const avatar=await uploadOnCloudinary(avatarLocalPath)

    if(!avatar){
        throw new API_ERROR(400,"Avatar failed to uploadOnCloudinary")
    }

    const user=await User.create({
        email,
        name,
        avatar:avatar?.url,
        password,

    })
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new API_ERROR(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, "User registered Successfully",createdUser)
    )

})


const loginUser=asynchandler(async (req,res)=>{
    const {email,password}=req.body
    const generateAccessTokenAndRefreshToken=async(userId)=>{
       try {
            const user=await User.findById(userId)
            
            const accessToken=user.generateAccessToken()
            const refreshToken=user.generateRefreshToken()
            user.refreshToken=refreshToken
            await  user.save({validateBeforeSave: false})

            return {accessToken,refreshToken}
       } catch (error) {
        throw new API_ERROR(500,"Something went wrong while registering the user")
       }
    }

    if(!(email)){
        throw new API_ERROR(400,"Email is required")
    }
    
    const user=await User.findOne({
        email
    })
    
    if(!user){
        throw new API_ERROR(404,"User does not exist")
    }
    
    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
       throw new API_ERROR(401,"Invalid User credintials")
    }

    const {accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(user._id)
    
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    
    
    const options={
        httpOnly:true,
        secure:true
    }
    
    
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
             "User Logged In Sucessfully",
            {
                user:loggedInUser,
                refreshToken,
                accessToken
            }
        )
    )
 })

 const logOutuser=asynchandler(async(req,res)=>{
    
    console.log("byeee",req.user);
    
    const hola= await User.findByIdAndUpdate(req.user._id,
          {
              $set:{
                  refreshToken:undefined
              }
  
         },
         {
          new :true
         }
  )
  const options={
      httpOnly:true,
      secure:true
  }
  
  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(
      new ApiResponse(
          200,
          {},
          "User Logged out Sucessfully"
      )
  )
  
  })



    


export {
    registerUser,
    loginUser,
    logOutuser
}