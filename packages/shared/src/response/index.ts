import type { Response } from 'express';
import { AppError } from '../errors';
import { logger } from '../logger';

export const successResponse = <T>(res: Response, data: T, statusCode: number = 200) => {
    return res.status(statusCode).json({ success: true, data });
}

export const failResponse = (res: Response, message: string, statusCode: number = 400) => {
    return res.status(statusCode).json({ success: false, message });
}

export const errorResponse = (res: Response, error: Error, statusCode?: number) => {
    const status = statusCode ?? (error instanceof AppError ? error.statusCode : 500);
    if (status >= 500) {
        logger.error({ err: error }, 'Unhandled error');
        return res.status(status).json({ success: false, message: 'Internal server error' });
    }
    return res.status(status).json({ success: false, message: error.message });
}