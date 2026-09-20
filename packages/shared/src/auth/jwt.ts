import { sign, verify, type JwtPayload, type SignOptions } from "jsonwebtoken";
import { UserRole, type UserJwtPayload } from "./types";
import { AppError } from "../errors";

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

function isValidPayload(payload: string | JwtPayload): payload is UserJwtPayload {
    const isValidType = typeof payload === "object" && payload !== null;
    if(!isValidType){
        return false;
    }
    const hadValidProperties = payload.name && payload.email && payload.role ;
    if(!hadValidProperties){
        return false;
    }
    const hasValidRole = [UserRole.ADMIN, UserRole.USER].includes(payload.role);
    if(!hasValidRole){
        return false;
    }
    return true;
}

export function verifyToken(token: string): UserJwtPayload {
    const payload = verify(token, process.env.JWT_SECRET as string);
    if(!isValidPayload(payload)){
        throw new AppError("Invalid token", 401);
    }
    return payload;
}