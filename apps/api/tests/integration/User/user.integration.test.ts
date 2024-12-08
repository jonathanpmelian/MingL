import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "@/src/app";
import prismaMock from "@/tests/__mocks__/prismaClient";

describe("User integration cases", () => {
  let token: string;

  beforeAll(() => {
    const payload = { userId: 1 };
    const secret = process.env.JWT_SECRET || "default_secret";
    token = jwt.sign(payload, secret, { expiresIn: "1h" });
  });

  test("should get user details", async () => {
    const userStub = {
      id: 1,
      name: "Test user",
    };

    prismaMock.user.findUnique.mockResolvedValue(userStub);

    const response = await supertest(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Test user" });
  });
});
