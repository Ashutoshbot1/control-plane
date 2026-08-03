import app from "./app.js";
import { envs } from "./config/env.js";

const { PORT } = envs;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
