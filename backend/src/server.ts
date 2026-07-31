import app from "./app";
import "./config/env";

const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : null;

if (!PORT) {
  throw new Error("Port is not configured on server");
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
