import express from "express";
import healthRouter from "./routes/health.routes.js";
import readyRouter from "./routes/ready.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sendError } from "./utils/api-response.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/health", healthRouter);
app.use("/ready", readyRouter);

// Error handlers
app.use((_req, res) => {
  sendError(res, 404, "Route not found");
});

app.use(errorHandler);
export default app;
