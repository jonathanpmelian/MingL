import supertest from "supertest";
import app from "@/src/app";
import prismaMock from "@/tests/__mocks__/prismaClient";
import bcrypt from "bcrypt";

describe("Auth Routes", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should register a user", async () => {
    prismaMock.user.create.mockResolvedValue({
      email: "newuser@example.com",
      name: "Test User",
      password: "$2b$10$hashedpassword",
    });

    const response = await supertest(app).post("/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created");
  });

  test("should login a user", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
    });

    const response = await supertest(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
