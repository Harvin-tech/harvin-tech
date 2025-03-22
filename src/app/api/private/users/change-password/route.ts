// app/api/users/change-password/route.ts
import dbConnect from '@/backend/config/db.config';
import { changePasswordSchema } from '@/backend/schema/user.schema';
import { UserService } from '@/backend/services/user.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // const token = await getToken();
    const body = await request.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    // if (token?.email !== validation.data.email) {
    //   return sendResponse('Email does not match', false, null, 400);
    // }

    await UserService.changePassword(body);
    return sendResponse('Password changed successfully', true);
  } catch (error: any) {
    console.error('ERROR_CHANGE_PASSWORD', error);
    return sendResponse(error.message, false, null, 500);
  }
}
