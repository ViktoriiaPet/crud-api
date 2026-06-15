import type { Request, Response, NextFunction } from "express";

export const validateParam = (
    req: Request,
    res:Response,
    next: NextFunction
) => {
    const id = Number(req.params.id)
    if(id < 0 || !Number.isInteger(id)) {
        return res.status(400).json({message: "Invalid ID parameter"})
    }
    next()
}