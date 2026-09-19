import { pinoHttp } from "pino-http";
import pino from 'pino';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
});

export const httpLogger = pinoHttp({
    logger,
    customLogLevel(_req, res, err) {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    },
});