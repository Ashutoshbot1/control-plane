import { pinoHttp } from "pino-http";
import { envs } from "../config/env.js";

export const requestLogger = pinoHttp({
  redact: ["req.headers.authorization", "req.headers.cookie"],
  transport:
    envs.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
});
