import { auth } from "@/auth";
import { NextResponse } from "next/server";
export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
});
export const config = {
  matcher: ["/", "/dashboard", "/my-inventory", "/profile/:path*"],
};
