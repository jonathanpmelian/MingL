import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "@/src/services/authService";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);

    res.setHeader(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const user = await registerUser(name, email, password);

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    next(error);
  }
};
