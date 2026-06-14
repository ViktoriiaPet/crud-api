import * as authService from "../services/authService.js";
 import { type Request, type Response } from 'express';

export const register = async (req: Request, res: Response) => {
  try {const { name, email, password } = req.body;

  const user = await authService.register(name, email, password);

  res.status(201).json(user); }

    catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error
    ) {
      if (error.code === "23505") {
        return res.status(409).json({
          message: "User with this email already exists"
        });
      }
    }
  
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  res.json(result);
};