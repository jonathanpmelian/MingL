import { create } from "@/src/controllers/eventController";
import { createEvent } from "@/src/services/eventService";
import { NextFunction, Request, Response } from "express";

jest.mock("@/src/services/eventService");

describe("Event Controller - Create", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {
        title: "Sample Event",
        description: "This is a test event",
        type: "Online",
        date: "2024-12-31T10:00:00.000Z",
      },
    };

    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockNext = jest.fn();
  });

  test("should call createEvent and return 201 status if successful", async () => {
    (createEvent as jest.Mock).mockResolvedValue(mockReq.body);

    await create(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Event created",
      event: mockReq.body,
    });
  });

  test("should call next() if createEvent throws an error", async () => {
    const error = new Error("Test error");

    (createEvent as jest.Mock).mockRejectedValue(error);

    await create(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
