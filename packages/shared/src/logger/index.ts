import { pinoHttp } from "pino-http";
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
    level: process.env.LOG_LEVEL?.trim() || 'info',
    ...(isProduction ? {} : {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
            },
        },
    }),
});

export const httpLogger = pinoHttp({
    logger,
    customLogLevel(_req, res, err) {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    },
    customSuccessMessage(req, res) {
        return `${req.method} ${req.url} ${res.statusCode}`;
    },
    customErrorMessage(req, res) {
        return `${req.method} ${req.url} ${res.statusCode}`;
    },
    serializers: {
        req(req) {
            return { method: req.method, url: req.url };
        },
        res(res) {
            return { statusCode: res.statusCode };
        },
    },
});