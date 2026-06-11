import * as authService from "../services/authService.js";
 import express, { type Request, type Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await authService.register(name, email, password);

  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  res.json(result);
};