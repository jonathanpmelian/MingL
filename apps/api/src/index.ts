import express from "express";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to I'm in API!");
});
app.use("/auth", authRoutes);
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
