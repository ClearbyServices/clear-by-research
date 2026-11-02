import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Redirect naked domain to www
  if (hostname === 'clearbyresearch.com') {
    url.hostname = 'www.clearbyresearch.com';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Only run this middleware on standard page routes (ignore APIs and static files)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};