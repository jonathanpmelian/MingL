import dotenv from "dotenv";
import prismaMock from "@/tests/__mocks__/prismaClient";

dotenv.config({ path: ".env.test" });

jest.mock("@/src/utils/db", () => prismaMock);
