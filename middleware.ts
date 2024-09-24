import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const newHost = 'fusion.sky.money';

  // Check if we're already on the correct domain
  if (url.hostname === newHost) {
    return NextResponse.next();
  }

  // Construct the new URL
  url.protocol = 'https';
  url.port = '443'; // 443 is the default port for HTTPS
  url.hostname = newHost;

  // Create a Response object
  const response = NextResponse.redirect(url, {
    status: 308, // Permanent Redirect
  });

  return response;
}

export const config = {
  // eslint-disable-next-line spellcheck/spell-checker
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
