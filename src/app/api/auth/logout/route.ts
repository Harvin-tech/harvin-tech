// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

import { sendResponse } from '@/backend/utils/response';

export async function POST() {
  try {
    const response = sendResponse('Logged out successfully', true, null, 200);

    // Clear cookie
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
