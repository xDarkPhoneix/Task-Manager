import { Router } from "express";
import { test } from "../controllers/user.controller.js";


const router=Router()


router.route("/signup").post(test)


export default router