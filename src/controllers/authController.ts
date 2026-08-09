import * as authService from "../services/authService.js";
 import { type Request, type Response } from 'express';
import {refreshToken} from "../services/authService.js"


export const register = async (req: Request, res: Response) => {
  try {const { name, email, password } = req.body;

  const user = await authService.register(name, email, password);

  res.status(201).json(user); }

    catch (error) {
       console.error(error);

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

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token is required",
      });
    }

    const result = await authService.refreshToken(refreshToken);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Invalid refresh token" ||
        error.message === "Refresh token expired"
      ) {
        return res.status(401).json({
          message: error.message,
        });
      }

      if (error.message === "User not found") {
        return res.status(404).json({
          message: error.message,
        });
      }
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};