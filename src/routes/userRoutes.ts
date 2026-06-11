import { Router } from "express";
import * as userController from "../controllers/userController.js"
import { validateUser } from "../middlewares/validateUser.js";
import { createUserSchema } from "../schemas/userSchema.js";
import { updateUserSchema } from "../schemas/userSchema.js";

export const userRouter = Router()

userRouter.get("/", userController.getUsers)
userRouter.get("/:id", userController.getUser)
userRouter.post("/", validateUser(createUserSchema), userController.createUser)
userRouter.put("/:id", validateUser(updateUserSchema), userController.updateUser)
userRouter.delete("/:id", validateUser, userController.deleteUser)