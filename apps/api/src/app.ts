import express from "express";
import authRoutes from "./routes/auth";
import eventRoutes from "./routes/event";
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

app.get("/health", (req, res) => {
  res.send("Welcome to MingL API!");
});
app.use("/auth", authRoutes);
app.use("/event", eventRoutes);
app.use(errorHandler);

export default app;
