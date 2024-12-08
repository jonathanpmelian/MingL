import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!process.env.JWT_SECRET) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET);
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/events"],
};
