import { Router } from "express";
import { createTask, delteTask, getTask, getTaskById, updateTask } from "../controllers/task.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/").post(verifyJwt,createTask)
router.route("/getTask").post(verifyJwt,getTask)
router.route("/updateTask").post(verifyJwt,updateTask)
router.route("/deleteTask").post(verifyJwt,delteTask)
router.route("/getTaskById").post(getTaskById)

export default router