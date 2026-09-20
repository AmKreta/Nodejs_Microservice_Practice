import { Router } from "express";
import { createTask, deleteTaskById, getTaskById, getTasksByUserId, updateTaskById } from "../controllers/task.controller";
import { taskCreateSchema, taskUpdateSchema } from "../schema/task.schema";
import { validateBody } from "@nodejsmicroservices/packages-shared";

const taskRouter = Router();

taskRouter.post('/createTask',validateBody(taskCreateSchema), createTask);
taskRouter.get('getUsersTasks/:userId', getTasksByUserId);
taskRouter.get('/getTaskById/:id', getTaskById);
taskRouter.delete('/deleteTask/:id', deleteTaskById);
taskRouter.patch('/updateTask/:id', validateBody(taskUpdateSchema), updateTaskById);

export default taskRouter;