import { Router } from "express";
import * as userController from "../controllers/userController.js"

export const userRouter = Router()

userRouter.get("/", userController.getUsers)
userRouter.get("/:id", userController.getUser)
userRouter.post("/", userController.createUser)
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)