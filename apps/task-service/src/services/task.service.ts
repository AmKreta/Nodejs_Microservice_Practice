import type { TaskCreateSchema, TaskUpdateSchema } from "../schema/task.schema";
import * as taskRepository from "../repositories/task.repository";

export async function createTask(taskInput: TaskCreateSchema) {
    const task = await taskRepository.createTask(taskInput);
    return task;
}

export async function getTasksByUserId(userId: string) {
    const tasks = await taskRepository.getTasksByUserId(userId);
    return tasks;
}

export async function getTaskById(id: string) {
    const task = await taskRepository.getTaskById(id);
    return task;
}

export async function deleteTaskById(id: string) {
    const task = await taskRepository.deleteTaskById(id);
    return task;
}

export async function updateTaskById(id: string, taskPatch: Partial<TaskUpdateSchema>) {
    const task = await taskRepository.updateTaskById(id, taskPatch);
    return task;
}