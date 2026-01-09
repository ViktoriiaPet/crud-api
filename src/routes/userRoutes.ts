import { Router } from "express";
import * as userController from "../controllers/userController.js"
import { validateUser } from "../middlewares/validateUser.js";

export const userRouter = Router()

userRouter.get("/", validateUser, userController.getUsers)
userRouter.get("/:id", validateUser, userController.getUser)
userRouter.post("/", validateUser, userController.createUser)
userRouter.put("/:id", validateUser, userController.updateUser)
userRouter.delete("/:id", validateUser, userController.deleteUser)