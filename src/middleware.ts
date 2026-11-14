import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') || '';

  // Intercept requests to the homepage that specifically ask for markdown (Goal 3)
  if (request.nextUrl.pathname === '/' && acceptHeader.includes('text/markdown')) {
    const markdown = `# E-Clearby Research Consulting\nAdvisory-only PhD, Master's, and research paper guidance in Pune, India.\n\nRead more at https://www.clearbyresearch.com/llms.txt`;
    
    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      },
    });
  }

  // Let your hosting platform handle the www redirects naturally.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};