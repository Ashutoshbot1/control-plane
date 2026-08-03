import express from "express";
import healthRouter from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sendError } from "./utils/api-response.js";

const app = express();

app.use(express.json());

// Routes
app.use("/health", healthRouter);

// Error handlers
app.use((_req, res) => {
  sendError(res, 404, "Route not found");
});

app.use(errorHandler);
export default app;
