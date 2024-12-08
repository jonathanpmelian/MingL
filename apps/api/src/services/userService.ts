import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../utils/db";

export const getUser = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw {
        code: error.code,
        message: `Database error occurred with code: ${error.code}`,
      };
    }

    throw {
      code: "UNKNOWN",
      message: `Unknown database error: ${error}`,
    };
  }
};
