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

    throw {
      code: "UNKNOWN",
      message: `Unknown database error: ${error}`,
    };
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

    throw {
      code: "UNKNOWN",
      message: `Unknown database error: ${error}`,
    };
  }
};

export const getEventById = async (id: number) => {
  try {
    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) {
      // ! Provisional until Custom Error codes implementation
      throw {
        code: "P2015",
        message: "Database error occurred with code: P2015",
      };
    }

    return event;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw {
        code: error.code,
        message: `Database error occurred with code: ${error.code}`,
      };
    }

    if ((error as any).code === "P2015") {
      throw error;
    }

    throw {
      code: "UNKNOWN",
      message: `Unknown database error: ${error}`,
    };
  }
};
