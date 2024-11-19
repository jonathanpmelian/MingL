import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validate =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
