import dotenv from "dotenv";

dotenv.config();

// PORT
const rawPort = process.env.PORT;
if (!rawPort) {
  throw new Error("Port is not configured on server");
}
const PORT = Number(rawPort);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error(`Invalid PORT value: ${rawPort}`);
}

// NODE_ENV
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error("NODE_ENV is not configured on server");
}

// DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured on server");
}

// RETURNING DATA
export const envs = {
  PORT,
  NODE_ENV,
  DATABASE_URL,
};
