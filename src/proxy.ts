import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Detect if the request is for the portal subdomain
  if (hostname.startsWith('portal.')) {
    // Determine if user is logged in
    const session = await auth();
    const isAuth = !!session?.user;
    const isLoginPage = url.pathname === '/login';

    // If trying to access portal without being logged in and not on login page
    if (!isAuth && !isLoginPage) {
      // Redirect unauthenticated users to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // If logged in and trying to access login page, redirect to Dashboard
    if (isAuth && isLoginPage) {
      const dashboardUrl = new URL('/', request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Rewrite the URL to the portal path internally
    url.pathname = `/portal${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Rewrite all other traffic to the home path
  url.pathname = `/home${url.pathname}`;
  return NextResponse.rewrite(url);
}

// Configured to match all paths except for static assets and APIs
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
