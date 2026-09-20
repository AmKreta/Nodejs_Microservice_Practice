import { AppError, errorHandler, httpLogger, logger, requireGatewaySecret, successResponse } from "@nodejsmicroservices/packages-shared";
import { setupEnv } from "./setupEnv";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";

setupEnv();

const port = process.env.AUTH_SERVICE_PORT || 3000;

const app = express();
app.use(httpLogger);
app.use(requireGatewaySecret);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*',methods: '*'}));

app.use("/auth", authRouter);

app.get("/health", (_, res) => {
    successResponse(res, "Auth service is running");
});

app.use((req, res, next) => {
    next(new AppError("Not found", 404));
});

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Auth service is running on port ${port}`);
});

