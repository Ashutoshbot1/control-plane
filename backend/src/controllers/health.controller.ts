import type { Request, Response } from "express";
import { sendSuccess } from "../utils/api-response.js";

export const healthCheck = async (_req: Request, res: Response) => {
  sendSuccess(res, 200, "Api is healthy!");
};
