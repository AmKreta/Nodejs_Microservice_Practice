import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers/auth.controller";
import { validateBody } from "@nodejsmicroservices/packages-shared";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";

export const authRouter = Router();

authRouter.post("/register",validateBody(registerSchema), registerUser);
authRouter.post("/login",validateBody(loginSchema), loginUser);
authRouter.get("/me", getMe);