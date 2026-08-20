import type { Request, Response } from "express";
import { pool } from "../config/database.js";
import { sendError, sendSuccess } from "../utils/api-response.js";

export const checkDBConnection = async (_req: Request, res: Response) => {
  try {
    const result = (await pool.query(`SELECT 1 AS ok`)).rows[0];
    sendSuccess(res, 200, "Database connected successfully", result);
  } catch (error) {
    sendError(res, 503, "Database connection failed");
  }
};
