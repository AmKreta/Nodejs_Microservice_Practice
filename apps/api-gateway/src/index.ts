import { setupEnv } from "./setupEnv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createProxyMiddleware } from "http-proxy-middleware";
import { errorHandler, successResponse, logger, AppError, httpLogger } from "@nodejsmicroservices/packages-shared";

setupEnv();

const port = process.env.API_GATEWAY_PORT?.trim() || "3000";
const authServiceUrl = `${process.env.BASE_URL?.trim()}:${process.env.AUTH_SERVICE_PORT?.trim()}`;

const app = express();
app.use(httpLogger);
app.use(helmet());
app.use(cors({ origin: "*", methods: "*" }));

app.get("/health", (_, res) => {
    successResponse(res, "API Gateway is running");
});

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
}));

app.use("/auth", createProxyMiddleware({
    target: authServiceUrl,
    changeOrigin: true,
    pathRewrite: path => "/auth" + path
}));



app.use((_req, _res, next) => {
    next(new AppError("Not found", 404));
});

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`API Gateway is running on port ${port}`);
});