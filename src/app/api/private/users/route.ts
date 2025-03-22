// app/api/users/route.ts
import dbConnect from '@/backend/config/db.config';
import { getUserSchema } from '@/backend/schema/user.schema';
import { UserService } from '@/backend/services/user.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Authentication check
    // const token = await getToken();
    // if (!token || !['admin', 'super-admin'].includes(token.role)) {
    //   return sendResponse('Unauthorized', false, null, 401);
    // }

    // Query validation
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    const validation = getUserSchema.safeParse({ query });

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const users = await UserService.findAllUsers(query);
    return sendResponse('Users fetched successfully', true, users);
  } catch (error: any) {
    console.error('ERROR_FIND_ALL_USERS', error);
    return sendResponse(error.message, false, null, 500);
  }
}
