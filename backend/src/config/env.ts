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

// RETURNING DATA
export const envs = {
  PORT,
};
