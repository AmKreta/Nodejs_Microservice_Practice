import { z } from "zod";

export const taskCreateSchema = z.object({
    title: z.string().min(1),
    description: z.string().default(""),
    created_by: z.uuid(),
});
export type TaskCreateSchema = z.infer<typeof taskCreateSchema>;

export const taskUpdateSchema =  z.object({
    title: z.string().min(1).optional().optional(),
    description: z.string().min(1).optional().optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional().optional(),
});
export type TaskUpdateSchema = z.infer<typeof taskUpdateSchema>;