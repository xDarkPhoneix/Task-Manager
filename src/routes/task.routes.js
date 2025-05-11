import { Router } from "express";
import { createTask, getTask } from "../controllers/task.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/").post(verifyJwt,createTask)
router.route("/getTask").post(verifyJwt,getTask)

export default router