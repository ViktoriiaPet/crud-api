import type { Request, Response, NextFunction } from "express";
import { error } from "node:console";

export const errorMiddleware = (
    err:unknown,
    req:Request,
    res:Response,
    next: NextFunction
) => {
    console.error("ERROR:", err)
    return( res.status(500).json({message: "Internal Server Error"}))
}