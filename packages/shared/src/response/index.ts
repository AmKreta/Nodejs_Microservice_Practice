import type { Response } from 'express';

export const successResponse = <T>(res: Response, data: T, statusCode: number = 200) => {
    return res.status(statusCode).json({ success: true, data });
}

export const failResponse = (res: Response, message: string, statusCode: number = 400) => {
    return res.status(statusCode).json({ success: false, message });
}

export const errorResponse = (res: Response, error: Error, statusCode: number = 500) => {
    return res.status(statusCode).json({ success: false, message: error.message });
}