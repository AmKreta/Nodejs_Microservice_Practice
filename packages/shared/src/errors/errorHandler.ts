import type { Request, Response, NextFunction } from 'express';
import { AppError } from './appErrors.js';
import { logger } from '../logger';

function isBodyParseError(err: Error): boolean {
    return err instanceof SyntaxError && 'body' in err;
}

export const errorHandler = <T extends Error>(err: T, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ success: false, message: err.message });
    }
    if (isBodyParseError(err)) {
        return res.status(400).json({ success: false, message: 'Invalid JSON body' });
    }
    logger.error({ err }, 'Unhandled error');
    return res.status(500).json({ success: false, message: 'Internal server error' });
}