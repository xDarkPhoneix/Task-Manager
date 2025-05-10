import { Router } from "express";
import { loginUser, logOutuser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router=Router()


router.route("/signup").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ])
 ,registerUser)
 router.route("/login").post(loginUser)
 router.route("/logout").post(verifyJwt,logOutuser)


export default router