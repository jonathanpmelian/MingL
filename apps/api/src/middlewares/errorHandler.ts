import { NextFunction, Request, Response } from "express";
import { handlePrismaError } from "@/src/utils/prismaErrorHandler";
import { HTTP_STATUS } from "../constants/HTTP_STATUS_CODES";

interface PrismaError {
  code: string;
}

interface CustomError {
  code: string;
  message: string;
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as PrismaError).code.startsWith("P")
  ) {
    handlePrismaError(err as PrismaError, res);

    return;
  }

  if (typeof err === "object" && err !== null && "code" in err) {
    const customError = err as CustomError;
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: customError.message,
    });

    return;
  }

  if (err instanceof Error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });

    return;
  }

  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Unknown error occurred" });
};
