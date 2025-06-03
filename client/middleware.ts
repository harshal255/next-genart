import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define paths that need protection
const protectedPaths = ["/result"];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only check for protected routes
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
        // Get token from cookies
        const token = req.cookies.get("token")?.value;

        // If no token, redirect to login or home page
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/result/:path*"],
};
