import { NextFunction, Request, Response } from "express";
import { createEvent, getAllEvents } from "@/src/services/eventService";
import { HTTP_STATUS } from "../constants/HTTP_STATUS_CODES";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await createEvent(req.body);

    res.status(HTTP_STATUS.CREATED).json({ message: "Event created", event });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await getAllEvents();

    res.status(HTTP_STATUS.OK).json(events);
  } catch (error) {
    next(error);
  }
};
