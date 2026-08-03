import express from "express";
import healthRouter from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/health", healthRouter);

// Error handlers
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);
export default app;
