import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/interest", "/"];
const privateRoutes = ["/login", "/register"];

export default function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("access_token")?.value;
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (isAuthenticated && privateRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
