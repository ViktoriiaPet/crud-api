import {type Request, type Response, type NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  next();
};