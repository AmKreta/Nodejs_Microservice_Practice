import type { NextFunction, Request, Response } from "express";
import { attachIdentityHeaders, getJWTTokenPayload, stripeIdentityHeaders } from "./utils";
import type { UserJwtPayload } from "@nodejsmicroservices/packages-shared";

export function taskAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    stripeIdentityHeaders(req);
    const payload = getJWTTokenPayload<UserJwtPayload>(req);
    attachIdentityHeaders(req, payload);
    next();
}