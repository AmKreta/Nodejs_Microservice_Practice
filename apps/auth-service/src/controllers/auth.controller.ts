import type { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AppError, errorResponse, successResponse, verifyToken } from "@nodejsmicroservices/packages-shared";

export async function registerUser(req: Request, res: Response) {
    try {
        const user = await authService.registerUser(req.body);
        successResponse(res, {user}, 201);
    } catch (error) {
        errorResponse(res, error as Error);
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const user = await authService.loginUser(req.body);
        successResponse(res, {user}, 200);
    } catch (error) {
        errorResponse(res, error as Error);
    }
}

export async function getMe(req: Request, res: Response) {
    try {
        const userId = req.headers["authorization"];
        console.log({userId})
        if(!userId){
            throw new AppError("Authorization header is required", 400);
        }
        if(typeof userId !== "string"){
            throw new AppError("Authorization header must be a string", 400);
        }
        if(!userId.startsWith("Bearer ")){
            throw new AppError("Invalid Authorization header format", 400);
        }
        const token = userId.split(" ")[1];
        if(!token){
            throw new AppError("Authorization token is required", 400);
        }
        const payload = verifyToken(token);
        const user = await authService.getMe(payload.id);
        successResponse(res, {user}, 200);
    } catch (error) {
        errorResponse(res, error as Error);
    }
}