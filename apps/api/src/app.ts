import express from "express";
import authRoutes from "./routes/auth";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to I'm in API!");
});
app.use("/auth", authRoutes);
app.use(errorHandler);

export default app;
