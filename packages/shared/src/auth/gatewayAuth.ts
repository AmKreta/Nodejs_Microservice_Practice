import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export function requireGatewaySecret(req: Request, res: Response, next: NextFunction) {
    if(!process.env.GATEWAY_SECRET){
        next(new AppError("Gateway secret is not configured", 401));
        return;
    }
    const gatewaySecret = req.headers["x-gateway-secret"];
    if(!gatewaySecret){
        next(new AppError("Gateway secret is not provided", 401));
        return;
    }
    if(gatewaySecret !== process.env.GATEWAY_SECRET){
        next(new AppError("Invalid gateway secret", 401));
        return;
    }
    next();
}