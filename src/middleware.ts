import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/db";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.split("/").pop() === "dashboard") {
    return NextResponse.redirect(new URL("/dashboard/inbox", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
