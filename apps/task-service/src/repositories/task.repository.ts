import type { TaskCreateSchema, TaskUpdateSchema } from "../schema/task.schema";
import { getPool } from "@nodejsmicroservices/packages-shared";
import { TaskStatus, type Task } from "../types/type";

export async function createTask(taskInput: TaskCreateSchema) {
    const task = await getPool().query<Task>(`
        INSERT INTO tasks (title, description, status, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, description, status, created_by, created_at, updated_at
    `, [taskInput.title, taskInput.description, TaskStatus.OPEN, taskInput.created_by]);
    return task.rows[0];
}

export async function getTasksByUserId(userId: string) {
    const tasks = await getPool().query<Task>(`
        SELECT * FROM tasks WHERE created_by = $1
    `, [userId]);
    return tasks.rows;
}

export async function getTaskById(id: string) {
    const task = await getPool().query<Task>(`
        SELECT * FROM tasks WHERE id = $1
    `, [id]);
    return task.rows[0];

}

export async function deleteTaskById(id: string) {
    const task = await getPool().query<Task>(`
        DELETE FROM tasks WHERE id = $1
    `, [id]);
    return task.rows[0];

}

export async function updateTaskById(id: string, taskPatch: Partial<TaskUpdateSchema>) {
    let sql = 'UPDATE tasks SET';
    if(taskPatch.title) {
        sql += ' title = $1,';
    }
    if(taskPatch.description) {
        sql += ' description = $2,';
    }
    if(taskPatch.status) {
        sql += ' status = $3,';
    }
    sql += ' WHERE id = $4 RETURNING *';
    const task = await getPool().query<Task>(sql, [taskPatch.title, taskPatch.description, taskPatch.status, id]);
    return task.rows[0];
}