// app/api/users/change-password/route.ts
import dbConnect from '@/backend/config/db.config';
import { changePasswordSchema } from '@/backend/schema/user.schema';
import { UserService } from '@/backend/services/user.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // console.log('post',request.json())
  try {
    await dbConnect();

    // Get user role from headers (set by middleware)
    let userRole = request.headers.get('x-user-role');
    let isAdmin = userRole === 'admin' || userRole === 'super-admin';

    // Fallback: If middleware headers are not available, try to get role from token in cookies
    if (!userRole) {
      console.log(
        'Middleware headers not found, trying fallback from cookies...'
      );
      const token = request.cookies.get('token')?.value;

      if (token) {
        // Try to decode the token directly (without verification) to get the role
        try {
          const { default: jwt } = await import('jsonwebtoken');
          const decodedWithoutVerification = jwt.decode(token);

          if (
            decodedWithoutVerification &&
            typeof decodedWithoutVerification === 'object' &&
            'role' in decodedWithoutVerification
          ) {
            userRole = decodedWithoutVerification.role as string;
            isAdmin = userRole === 'admin' || userRole === 'super-admin';
          } else {
            isAdmin = false;
          }
        } catch (decodeError) {
          console.log('Direct decode failed:', decodeError);
        }
      } else {
        console.log('No token found in cookies');
      }
    }

    const body = await request.json();

    // Add isAdmin flag to the request body
    const requestBody = {
      ...body,
      isAdmin,
    };

    const validation = changePasswordSchema.safeParse(requestBody);

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    // If it's not an admin, ensure oldPassword is provided
    if (!isAdmin && !validation.data.oldPassword) {
      return sendResponse(
        'Old password is required for user password change',
        false,
        null,
        400
      );
    }

    await UserService.changePassword(validation.data);
    return sendResponse('Password changed successfully', true);
  } catch (error: any) {
    console.error('ERROR_CHANGE_PASSWORD', error);
    return sendResponse(error.message, false, null, 500);
  }
}
