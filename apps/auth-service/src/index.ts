import { setupEnv } from "./setupEnv";
import express from "express";
import cors from "cors";
import { errorHandler, httpLogger, logger, successResponse } from "@nodejsmicroservices/packages-shared";

setupEnv();

const port = process.env.AUTH_SERVICE_PORT || 3000;

const app = express();
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*',methods: '*'}));
app.use(errorHandler)

app.listen(port, () => {
    logger.info(`Auth service is running on port ${port}`);
});

app.get("/health", (_, res) => {
    successResponse(res, "Auth service is running");
});

