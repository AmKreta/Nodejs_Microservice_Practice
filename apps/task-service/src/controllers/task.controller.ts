import type { Request, Response } from "express";
import * as taskService from "../services/task.service";
import type { TaskCreateSchema, TaskUpdateSchema } from "../schema/task.schema";
import type { Task } from "../types/type";
import { successResponse } from "@nodejsmicroservices/packages-shared";

export async function createTask(req: Request<{}, {}, TaskCreateSchema>, res: Response<Task>) {
    const task = await taskService.createTask(req.body);
    successResponse(res, task, 201);
}

export async function getTasksByUserId(req: Request<{ userId: string }>, res: Response<Task[]>) {
    const tasks = await taskService.getTasksByUserId(req.params.userId);
    successResponse(res, tasks, 200);
}

export async function getTaskById(req: Request<{ id: string }>, res: Response<Task>) {
    const task = await taskService.getTaskById(req.params.id);
    successResponse(res, task, 200);
}

export async function deleteTaskById(req: Request<{ id: string }>, res: Response<Task>) { 
    const task = await taskService.deleteTaskById(req.params.id);
    successResponse(res, task, 200);
}

export async function updateTaskById(req: Request<{ id: string }, {}, Partial<TaskUpdateSchema>>, res: Response<Task>) {
    const task = await taskService.updateTaskById(req.params.id, req.body);
    successResponse(res, task, 200);
}