import { createEvent } from "@/src/services/eventService";
import prismaMock from "@/tests/__mocks__/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

describe("Event Service - createEvent", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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
    ).rejects.toEqual(new Error("Unknown database error"));
  });
});
