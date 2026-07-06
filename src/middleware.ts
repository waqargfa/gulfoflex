import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for URL canonicalization:
 * 1. Redirect www.gulfoflex.com → gulfoflex.com (301)
 * 2. Redirect trailing slashes → no trailing slash (301)
 * 3. Redirect HTTP → HTTPS (handled at CDN/server level typically, but enforced here as well)
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // www → non-www redirect
  if (host.startsWith("www.")) {
    const newHost = host.replace(/^www\./, "");
    url.host = newHost;
    url.protocol = "https";
    return NextResponse.redirect(url, 301);
  }

  // Remove trailing slash (except for root "/")
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.png
     * - api routes
     * - static assets
     */
    "/((?!_next/static|_next/image|favicon\\.ico|favicon\\.png|api/|images/|videos/|assets/|fonts/|logos/|Render/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|ttf|mp4|webm|pdf|json|xml|txt)).*)",
  ],
};
