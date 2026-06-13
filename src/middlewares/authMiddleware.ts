import type { Request, Response, NextFunction } from "express";
import type { Jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface TokenPayload  {
    "id": number,
    "role": string
}

export const authMiddleware = (req: Request, res:Response, next: NextFunction) : void => {
    const authHeader = req.headers.authorization; 

    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token is missing" });
    return;
    }

      const token = authHeader.split(" ")[1];
      if (!token) {
  res.status(401).json({ message: "Token is missing" });
  return;
}

      const secret = process.env.JWT_SECRET;

        if (!secret) {
    res.status(500).json({ message: "JWT_SECRET is not configured" });
    return;
  }

    try {
    const decoded = jwt.verify(token, secret) as TokenPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}