import type { ZodType } from "zod/v4";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export function validateBody<T>(schema: ZodType<T>) {
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