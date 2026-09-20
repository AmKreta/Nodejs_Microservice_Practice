import type { Request } from "express";
import { AppError, extractTokenFromAuthorizationHeader, verifyToken, type UserJwtPayload } from "@nodejsmicroservices/packages-shared";

const IDENTITY_HEADERS = [
    "x-user-id",
    "x-user-role",
    "x-gateway-secret",
] as const;

export function stripeIdentityHeaders(req: Request) {
    IDENTITY_HEADERS.forEach(header => {
        if(req.headers[header]){
            delete req.headers[header];
        }
    });
}

export function attachGatewaySecret(req: Request) {
    const gatewaySecret = process.env.GATEWAY_SECRET;
    if(!gatewaySecret){ 
        throw new AppError("gateway secret is not set on the environment variables", 500);
    }
    req.headers["x-gateway-secret"] = process.env.GATEWAY_SECRET;
}

export function attachIdentityHeaders(req: Request, payload: UserJwtPayload) {
    attachGatewaySecret(req);
    req.headers["x-user-id"] = payload.id;
    req.headers["x-user-role"] = payload.role;
}

export function getJWTTokenPayload<T extends UserJwtPayload>(req: Request): T {
    const authorization = req.headers["authorization"];
    const token = extractTokenFromAuthorizationHeader(authorization);
    const payload = verifyToken(token);
    return payload as T;
}