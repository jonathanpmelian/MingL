import { createEvent, getAllEvents } from "@/src/services/eventService";
import prismaMock from "@/tests/__mocks__/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

describe("Event Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Cases - createEvent", () => {
    test("should return the event, if the event is successfully created", async () => {
      prismaMock.event.create.mockResolvedValue({
        title: "New Event",
        type: "Online",
        date: "2024-12-06T13:22:02.290Z",
        user: {
          connect: {
            id: 1,
          },
        },
      });

      await expect(
        createEvent({
          title: "New Event",
          type: "Online",
          date: "2024-12-06T13:22:02.290Z",
          user: {
            connect: {
              id: 1,
            },
          },
        })
      ).resolves.toEqual({
        title: "New Event",
        type: "Online",
        date: "2024-12-06T13:22:02.290Z",
        user: {
          connect: {
            id: 1,
          },
        },
      });
    });

    test("should throw a Prisma error if, for example, a unique constraint is violated", async () => {
      prismaMock.event.create.mockRejectedValue(
        new PrismaClientKnownRequestError("Unique constraint failed", {
          code: "P2002",
          clientVersion: "1.0.0",
        })
      );

      await expect(
        createEvent({
          title: "Duplicate Event",
          type: "Online",
          date: "2024-12-06T13:22:02.290Z",
          user: {
            connect: {
              id: 1,
            },
          },
        })
      ).rejects.toEqual({
        code: "P2002",
        message: "Database error occurred with code: P2002",
      });
    });

    test("should throw an Error if the error is unknown", async () => {
      prismaMock.event.create.mockRejectedValue("Test error");

      await expect(
        createEvent({
          title: "New Event",
          type: "Online",
          date: "2024-12-06T13:22:02.290Z",
          user: {
            connect: {
              id: 1,
            },
          },
        })
      ).rejects.toEqual(new Error("Unknown database error: Test error"));
    });
  });

  describe("Cases - getAllEvents", () => {
    test("should return the events, if there are previous events created", async () => {
      prismaMock.event.findMany.mockResolvedValue([
        {
          title: "New Event",
          type: "Online",
          date: "2024-12-06T13:22:02.290Z",
          user: 1,
        },
      ]);

      await expect(getAllEvents()).resolves.toEqual([
        {
          title: "New Event",
          type: "Online",
          date: "2024-12-06T13:22:02.290Z",
          user: 1,
        },
      ]);
    });

    test("should return an empty array, if there are no previous events", async () => {
      prismaMock.event.findMany.mockResolvedValue([]);

      await expect(getAllEvents()).resolves.toEqual([]);
    });

    test("should throw an Error if the error is unknown", async () => {
      prismaMock.event.findMany.mockRejectedValue("Test error");

      await expect(getAllEvents()).rejects.toEqual(
        new Error("Unknown database error: Test error")
      );
    });
  });
});
