import { NextFunction, Request, Response } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
} from "@/src/services/eventService";
import { HTTP_STATUS } from "@/src/constants/HTTP_STATUS_CODES";

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

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = parseInt(req.params.id, 10);

    if (isNaN(eventId)) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Invalid event ID format" });
    }

    const event = await getEventById(eventId);

    res.status(HTTP_STATUS.OK).json(event);
  } catch (error) {
    next(error);
  }
};
