import type { Request, Response, NextFunction } from 'express';
import { AppError } from './appErrors.js';

export const errorHandler = <T extends Error>(err: T, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({success: false, message: err.message });
    } 
    // Log the error
    return res.status(500).json({ success: false, message: 'Internal server error' });
}