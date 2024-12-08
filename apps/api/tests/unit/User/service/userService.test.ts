import { getUser } from "@/src/services/userService";
import prismaMock from "@/tests/__mocks__/prismaClient";

describe("User Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should return the user details, if the user is found", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: 1, name: "Test name" });

    await expect(getUser(1)).resolves.toEqual({ id: 1, name: "Test name" });
  });

  test.todo("should throw an error if the user is not found");

  test("should throw an error if the error is unknown", async () => {
    prismaMock.user.findUnique.mockRejectedValue("Test error");

    await expect(getUser(1)).rejects.toEqual({
      code: "UNKNOWN",
      message: "Unknown database error: Test error",
    });
  });
});
