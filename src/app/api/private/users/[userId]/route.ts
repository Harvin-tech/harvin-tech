// app/api/users/[userId]/route.ts
import dbConnect from '@/backend/config/db.config';
import { updateUserSchema } from '@/backend/schema/user.schema';
import { UserService } from '@/backend/services/user.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();

    const user = await UserService.getUserById(params.userId);
    return sendResponse('User fetched successfully', true, user);
  } catch (error: any) {
    console.error('ERROR_GET_USER_BY_ID', error);
    return sendResponse(error.message, false, null, 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const updatedUser = await UserService.updateUserById(params.userId, body);
    return sendResponse('User updated successfully', true, updatedUser);
  } catch (error: any) {
    console.error('Error updating user:', error);
    return sendResponse(error.message, false, null, 500);
  }
}
