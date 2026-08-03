import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { sendError } from "../utils/api-response.js";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  return sendError(res, 500, "Internal server error");
};
