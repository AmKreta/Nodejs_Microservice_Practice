import type { ZodSchema } from "zod/v3";
import type { Request, Response, NextFunction } from "express";
import { failResponse } from "../response";
import { AppError } from "../errors";

export function ValidateBody<T>(schema: ZodSchema<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const message = result.error.issues.map(issue => issue.message).join(', ');
            return next(new AppError(message, 400));
        }
        req.body = result.data;
        next();
    }
}