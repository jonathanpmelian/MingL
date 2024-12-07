import { create, getAll, getById } from "@/src/controllers/eventController";
import {
  createEvent,
  getAllEvents,
  getEventById,
} from "@/src/services/eventService";
import { NextFunction, Request, Response } from "express";

jest.mock("@/src/services/eventService");

describe("Event Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      params: {
        id: "1",
      },
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

  describe("Controller - Create", () => {
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

  describe("Controller - Get All", () => {
    test("should call getAllEvents and return 200 status if successful", async () => {
      (getAllEvents as jest.Mock).mockResolvedValue([mockReq.body]);

      await getAll({} as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([mockReq.body]);
    });

    test("should call next() if getAllEvents throws an error", async () => {
      const error = new Error("Test error");

      (getAllEvents as jest.Mock).mockRejectedValue(error);

      await getAll({} as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("Controller - Get By Id", () => {
    test("should call getEventById and return 200 status if successful", async () => {
      (getEventById as jest.Mock).mockResolvedValue(mockReq.body);

      await getById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
    });

    test("should call next() if getEventById throws an error", async () => {
      const error = new Error("Test error");

      (getEventById as jest.Mock).mockRejectedValue(error);

      await getById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    test("should return a status 400 if the ID is not a number", async () => {
      const mockReqWithBadId: Partial<Request> = {
        params: { id: "aa" },
        body: {},
      };

      await getById(mockReqWithBadId as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Invalid event ID format",
      });
    });
  });
});