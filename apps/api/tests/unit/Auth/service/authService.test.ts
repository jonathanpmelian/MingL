import { loginUser } from "@/src/services/authService";
import prisma from "@/src/utils/db";
import bcrypt from "bcrypt";

describe("Auth service", () => {
  test("Login - should throw an error if the user is invalid", async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(null);

    expect(loginUser("test@example.com", "password")).rejects.toThrow(
      "Invalid credentials"
    );
  });

  test("Login - should return a token for valid credentials", async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),
    });

    const token = await loginUser("test@example.com", "password");
    expect(token).toBeDefined();
  });
});
