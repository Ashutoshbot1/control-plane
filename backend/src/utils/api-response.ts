import type { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
