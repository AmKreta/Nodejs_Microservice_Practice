import type { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AppError, errorResponse, successResponse } from "@nodejsmicroservices/packages-shared";

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
        const userId = req.headers["x-user-id"];
        if(!userId){
            throw new AppError("User ID is required", 400);
        }
        if(typeof userId !== "string"){
            throw new AppError("User ID must be a string", 400);
        }
        const user = await authService.getMe(userId);
        successResponse(res, {user}, 200);
    } catch (error) {
        errorResponse(res, error as Error);
    }
}