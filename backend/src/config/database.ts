import { Pool } from "pg";
import { envs } from "./env.js";

export const pool = new Pool({
  connectionString: envs.DATABASE_URL,
});
