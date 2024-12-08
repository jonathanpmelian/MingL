import { getUserDetails } from "@/src/controllers/userController";
import { getUser } from "@/src/services/userService";
import { NextFunction, Request, Response } from "express";

jest.mock("@/src/services/userService");

describe("User Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {
        userId: 1,
      },
    };

    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    mockNext = jest.fn();
  });

  test("should call getUser and return 200 status if successful", async () => {
    (getUser as jest.Mock).mockResolvedValue({ name: "Test name" });

    await getUserDetails(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ name: "Test name" });
  });

  test("should return status 400 if userId is not a number", async () => {
    const mockReqBadId: Partial<Request> = {
      body: {
        userId: "a",
      },
    };

    await getUserDetails(
      mockReqBadId as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Invalid userId format",
    });
  });

  test("should call next() if getUser throw an error", async () => {
    const error = new Error("Test error");

    (getUser as jest.Mock).mockRejectedValue(error);

    await getUserDetails(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
