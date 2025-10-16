// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// ✅ Only protect /admin and /api routes
export const config = {
  matcher: ["/admin(.*)", "/api/(.*)"],
};
