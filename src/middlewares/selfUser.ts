import type { Request, Response, NextFunction } from "express";

export const ownershipMiddleware = (req:Request, res:Response, next:NextFunction) :void => {
    const currentUserId = String(req.user?.id);
    const targetUserId =  req.params.id;
    if (!req.user) {
        res.status(401).json({message: "You are not logged in"})
    } else if (req.user.role === "admin") {
        next()
    } else if(targetUserId === currentUserId) {
        next()
    } else {
        res.status(403).json({message: "access denied"})
    }
}