import { Router } from "express";
import * as userController from "../controllers/userController.js"
import { validateUser } from "../middlewares/validateUser.js";
import { createUserSchema } from "../schemas/userSchema.js";
import { updateUserSchema } from "../schemas/userSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { ownershipMiddleware } from "../middlewares/selfUser.js";
import { validateParam } from "../middlewares/validateParam.js";

export const userRouter = Router()

userRouter.get("/", authMiddleware, userController.getUsers)
userRouter.get("/me", authMiddleware, userController.getMe);
userRouter.get("/:id",validateParam, authMiddleware, userController.getUser)
userRouter.post("/", validateUser(createUserSchema), authMiddleware, roleMiddleware, userController.createUser)
userRouter.put("/:id",validateParam, validateUser(updateUserSchema),authMiddleware, ownershipMiddleware, userController.updateUser)

userRouter.delete("/me", authMiddleware, userController.deleteMe);
userRouter.delete("/:id",validateParam, authMiddleware, roleMiddleware, userController.deleteUser)

