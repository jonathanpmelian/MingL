import app from "@/src/app";
import prismaMock from "@/tests/__mocks__/prismaClient";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

describe("Event integration cases", () => {
  let token: string;
  let date: Date;
  let dateString: string;

  beforeAll(() => {
    const payload = { userId: 1 };
    const secret = process.env.JWT_SECRET || "default_secret";
    token = jwt.sign(payload, secret, { expiresIn: "1h" });
    date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    dateString = date.toISOString();
  });

  describe("POST /events", () => {
    test("should create an event", async () => {
      const eventStub = {
        title: "New Event",
        type: "Online",
        date: date,
      };
      prismaMock.event.create.mockResolvedValue(eventStub);

      const response = await supertest(app)
        .post("/event")
        .set("Authorization", `Bearer ${token}`)
        .send(eventStub);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "Event created",
        event: {
          title: "New Event",
          type: "Online",
          date: dateString,
        },
      });
    });

    test("should return an error if there is a duplicate event", async () => {
      const eventStub = {
        title: "New Event",
        type: "Online",
        date: date,
      };
      prismaMock.event.create.mockRejectedValue(
        new PrismaClientKnownRequestError(
          "Database error occurred with code: P2002",
          {
            code: "P2002",
            clientVersion: "1.0.0",
          }
        )
      );

      const response = await supertest(app)
        .post("/event")
        .set("Authorization", `Bearer ${token}`)
        .send(eventStub);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty(
        "error",
        "Conflict: Duplicate value error, a unique constraint was violated"
      );
    });
  });

  describe("GET /events", () => {
    test("should return all the events", async () => {
      const eventStub = [
        {
          id: 1,
          title: "New Event",
          type: "Online",
          date: date,
        },
      ];
      prismaMock.event.findMany.mockResolvedValue(eventStub);

      const response = await supertest(app)
        .get("/event")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 1,
          title: "New Event",
          type: "Online",
          date: dateString,
        },
      ]);
    });
  });
});
