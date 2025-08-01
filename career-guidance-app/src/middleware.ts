import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For client-side authentication, we'll handle most auth in the components
  // This middleware is mainly a placeholder for future server-side auth checks
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/educational-background/:path*',
    '/degree-selection/:path*',
    '/aptitude-test/:path*',
    '/test-results/:path*',
  ],
};