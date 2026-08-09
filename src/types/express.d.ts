import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        uuid: string;
        role: string;
      };
    }
  }
}

export {};