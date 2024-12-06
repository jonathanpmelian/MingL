import { Prisma } from "@prisma/client";
import prisma from "../utils/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createEvent = async (event: Prisma.EventCreateInput) => {
  try {
    const createdEvent = await prisma.event.create({
      data: event,
    });

    return createdEvent;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw {
        code: error.code,
        message: `Database error occurred with code: ${error.code}`,
      };
    }

    throw new Error(`Unknown database error: ${error}`);
  }
};

export const getAllEvents = async () => {
  try {
    const events = await prisma.event.findMany();

    return events;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw {
        code: error.code,
        message: `Database error occurred with code: ${error.code}`,
      };
    }

    throw new Error(`Unknown database error: ${error}`);
  }
};
