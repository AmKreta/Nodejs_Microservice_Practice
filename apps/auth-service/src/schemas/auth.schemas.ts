import { z } from "zod";
import type { UserRole } from "@nodejsmicroservices/packages-shared";

export const registerSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.email("Invalid email address"),
    password: z.string().min(8)
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8)
});
export type LoginSchema = z.infer<typeof loginSchema>;