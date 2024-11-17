import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const SECRET = process.env.JWT_SECRET;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && SECRET) {
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

      res.status(200).json({ message: "Logged in", token });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(401).json({ error: "Email already exists" });
  }
});

export default router;
