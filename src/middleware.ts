import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

/**
 * Middleware to handle authentication and authorization for certain routes.
 * Redirects users based on their authentication status and role.
 *
 * @param req - The incoming Next.js request object.
 * @returns A NextResponse based on the user's authentication and role.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('token')?.value;

  // If the user is authenticated and is trying to access a login or signup route,
  // redirect them to the dashboard
  if (token) {
    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Check if the request is for admin or dashboard routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    // If the user is not authenticated, redirect them to the login page
    if (!token) {
      Cookies.remove('token');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Additional check for admin-specific routes
    if (pathname.startsWith('/admin')) {
      const role = req.cookies.get('role')?.value;

      // If the user is not an admin, redirect them to the dashboard
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  }

  // If no redirects are necessary, proceed with the request
  return NextResponse.next();
}

// Define the paths that should be checked by the middleware
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/signup'],
};
