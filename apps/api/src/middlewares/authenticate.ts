import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/HTTP_STATUS_CODES";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Authorization header missing" });

    throw new Error("Unauthorized request: header missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = (decoded as { userId: number }).userId;

    next();
  } catch (error) {
    res
      .status(HTTP_STATUS.FORBIDDEN)
      .json({ message: "Invalid or expired token" });
  }
};
