// middleware.ts
import { TokenService } from '@/backend/services/token.service';
import { NextResponse, type NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = path.startsWith('/public');
  const isPrivateRoute = path.startsWith('/private');

  // Allow public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Handle private routes authentication
  if (isPrivateRoute) {
    try {
      // Get token from cookies or Authorization header
      const authToken = request.cookies.get('token')?.value;
      const authHeader = request.headers.get('authorization');
      const token = authToken || authHeader?.split(' ')[1];

      if (!token) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status:  401 }
        );
      }

      // Verify token
      const decoded = await TokenService.verifyToken(token);

      if (!decoded) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 401 }
        );
      }

      // Clone the request headers and add user information
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.id);
      requestHeaders.set('x-user-email', decoded.email);
      requestHeaders.set('x-user-role', decoded.role);

      // Return modified request with user headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  // Continue for other routes
  return NextResponse.next();
}

export const config = {
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
