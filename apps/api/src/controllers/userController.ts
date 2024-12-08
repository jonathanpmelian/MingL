import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "@/src/constants/HTTP_STATUS_CODES";
import { getUser } from "@/src/services/userService";

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (isNaN(req.body.userId)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Invalid userId format" });
    }

    const user = await getUser(req.body.userId);

    res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    next(error);
  }
};
