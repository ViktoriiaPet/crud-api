import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validateUser } from "../middlewares/validateUser.js";
import { createUserSchema } from "../schemas/userSchema.js";

export const authRouter = Router();

authRouter.post("/register",validateUser(createUserSchema), authController.register);
authRouter.post("/login", authController.login);