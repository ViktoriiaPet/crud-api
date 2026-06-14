import type { Request, Response, NextFunction } from "express";

export const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (req.user?.role === "admin") {
        next()
    } else if (!req.user) {
        res.status(401).json({message: "You are not logged in"})
    } else {
        res.status(403).json({message: "Access denied"})
    }

}