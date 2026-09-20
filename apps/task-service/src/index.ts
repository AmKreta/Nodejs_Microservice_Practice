import { AppError, errorHandler, httpLogger, requireGatewaySecret, successResponse } from "@nodejsmicroservices/packages-shared";
import { setupEnv } from "./setupEnv";
import express from "express";
import cors from 'cors'
import tasksRouter from "./routes/tasks.routes";

setupEnv();

const port = process.env.TASK_SERVICE_PORT || 3002;
const app = express();
app.use(httpLogger);
app.use(requireGatewaySecret);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", (req, res) => {
    successResponse(res, "Task service is running", 200);
});

app.use("/task", tasksRouter);

app.use((req, res, next) => {
    next(new AppError("Not found", 404));
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Task service is running on port ${port}`);
});
