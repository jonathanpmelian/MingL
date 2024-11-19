import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/db";

const SECRET = process.env.JWT_SECRET || "";
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

export const loginUser = async (email: string, password: string) => {
  if (!SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  return jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return user;
};
