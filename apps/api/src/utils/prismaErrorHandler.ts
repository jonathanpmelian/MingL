import { Response } from "express";
import { HTTP_STATUS } from "../constants/HTTP_STATUS_CODES";

interface PrismaError {
  code: string;
}

export const handlePrismaError = (err: PrismaError, res: Response) => {
  const { code } = err;

  const errorMap = new Map<string, { status: number; message: string }>([
    [
      "P2002",
      {
        status: HTTP_STATUS.CONFLICT,
        message:
          "Conflict: Duplicate value error, a unique constraint was violated",
      },
    ],
    [
      "P2005",
      {
        status: HTTP_STATUS.NOT_FOUND,
        message: "Not Found: The requested record does not exist.",
      },
    ],
  ]);

  const errorResponse = errorMap.get(code);

  if (errorResponse) {
    res.status(errorResponse.status).json({ error: errorResponse.message });
  }

  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Unknown database error occurred" });
};
