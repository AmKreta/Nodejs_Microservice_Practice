import { AppError, extractTokenFromAuthorizationHeader, verifyToken, type UserJwtPayload } from "@nodejsmicroservices/packages-shared";
import type { Request, Response, NextFunction } from "express";
import { getAllowedRoles, HttpMethod, isPublicRoute } from "../rbac";

const IDENTITY_HEADERS = [
    "x-user-id",
    "x-user-role",
    "x-gateway-secret",
] as const;

function stripeIdentityHeaders(req: Request) {
    IDENTITY_HEADERS.forEach(header => {
        if(req.headers[header]){
            delete req.headers[header];
        }
    });
}

function attachGatewaySecret(req: Request) {
    const gatewaySecret = process.env.GATEWAY_SECRET;
    if(!gatewaySecret){
        throw new AppError("gateway secret is not set on the environment variables", 500);
    }
    req.headers["x-gateway-secret"] = process.env.GATEWAY_SECRET;
}

function attachIdentityHeaders(req: Request, payload: UserJwtPayload) {
    attachGatewaySecret(req);
    req.headers["x-user-id"] = payload.id;
    req.headers["x-user-role"] = payload.role;
}

export function gatewayAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    stripeIdentityHeaders(req);
    let path = req.baseUrl + req.path;
    if(path.endsWith("/")){
        path = path.slice(0, -1);
    }
    if(isPublicRoute({ method: req.method as HttpMethod, path })) {
        return next();
    }
    const authorization = req.headers["authorization"];
    const token = extractTokenFromAuthorizationHeader(authorization);
    const payload = verifyToken(token);
    const allowedRoles = getAllowedRoles({ method: req.method as HttpMethod, path });
    if(!allowedRoles?.includes(payload.role)){
        throw new AppError("You are not authorized to access this resource", 403);
    }
    attachIdentityHeaders(req, payload);
    next();
}