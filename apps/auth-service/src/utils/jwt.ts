import { sign, verify, type SignOptions } from "jsonwebtoken";
import type { UserJwtPayload } from "@nodejsmicroservices/packages-shared";
import { AppError } from "@nodejsmicroservices/packages-shared";

export function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new AppError("JWT_SECRET is not set", 500);
    }
    return secret;
}

export function getJwtExpiresIn(): NonNullable<SignOptions["expiresIn"]> {
    return (process.env.JWT_EXPIRES_IN ?? "7d") as NonNullable<SignOptions["expiresIn"]>;
}

export function signToken(payload: UserJwtPayload) {
    const secret = getJwtSecret();
    const expiresIn = getJwtExpiresIn();
    return sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string) {
    return verify(token, process.env.JWT_SECRET as string);
}