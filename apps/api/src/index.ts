import app from "./app";
import dotenv from "dotenv";

const PORT = process.env.PORT;

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: envFile });

app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
