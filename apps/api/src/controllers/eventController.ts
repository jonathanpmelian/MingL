import { NextFunction, Request, Response } from "express";
import { createEvent } from "@/src/services/eventService";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await createEvent(req.body);

    res.status(201).json({ message: "Event created", event });
  } catch (error) {
    next(error);
  }
};
