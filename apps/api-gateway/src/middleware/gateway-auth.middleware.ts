import { AppError, extractTokenFromAuthorizationHeader, verifyToken, type UserJwtPayload } from "@nodejsmicroservices/packages-shared";
import type { Request, Response, NextFunction } from "express";
import { getAllowedRoles, HttpMethod, isPublicRoute } from "../rbac";
import { attachGatewaySecret, attachIdentityHeaders, getJWTTokenPayload, stripeIdentityHeaders } from "./utils";

export function gatewayAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    stripeIdentityHeaders(req);
    let path = req.baseUrl + req.path;
    if(path.endsWith("/")){
        path = path.slice(0, -1);
    }
    if(isPublicRoute({ method: req.method as HttpMethod, path })) {
        return next();
    }
    const payload = getJWTTokenPayload<UserJwtPayload>(req);
    const allowedRoles = getAllowedRoles({ method: req.method as HttpMethod, path });
    if(!allowedRoles?.includes(payload.role)){
        throw new AppError("You are not authorized to access this resource", 403);
    }
    attachIdentityHeaders(req, payload);
    next();
}