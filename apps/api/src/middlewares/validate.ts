import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { HTTP_STATUS } from "../constants/HTTP_STATUS_CODES";

export const validate =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: error.details[0].message });
    } else {
      next();
    }
  };
