import type { Request, Response } from "express";

export const healthCheck = async (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Api is healthy!" });
};
