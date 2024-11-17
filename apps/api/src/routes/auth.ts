import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = "";
    const user = await prisma.user.findUnique({ where: { email } });

    res.status(201).json({ message: "Logged in", token });
  } catch (error) {
    res.status(400).json({ error: "Invalid credentials" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = "";

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(401).json({ error: "Email already exists" });
  }
});

export default router;
