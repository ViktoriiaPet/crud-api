import { type Request, type Response, type NextFunction } from "express";
import type { ZodSchema } from "zod";

export const validateUser = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.format();
      const errors: Record<string, string> = {};

      for (const key of Object.keys(formatted)) {
        const field = formatted[key];

        if (
          typeof field === "object" &&
          field !== null &&
          "_errors" in field &&
          Array.isArray(field._errors) &&
          field._errors.length > 0
        ) {
          errors[key] = field._errors[0];
        }
      }

      res.status(400).json({ errors });
      return;
    }

    req.body = result.data;
    next();
  };
};
