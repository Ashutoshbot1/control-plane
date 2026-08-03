import { pinoHttp } from "pino-http";
import { envs } from "../config/env.js";

export const requestLogger = pinoHttp({
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
