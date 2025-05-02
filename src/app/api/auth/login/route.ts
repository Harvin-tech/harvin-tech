// app/api/auth/login/route.ts
import { loginSchema } from '@/backend/schema/auth.schema';
import { AuthService } from '@/backend/services/auth.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const { email, password } = validation.data;
    const { user, token } = await AuthService.login(email, password);

    const response = sendResponse(
      'Login successful',
      true,
      {
        user: (({ password, ...rest }) => rest)(user),
        token,
      },
      200
    );

    // Set cookie
    // response.cookies.set({
    //   name: 'token',
    //   value: token,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    //   maxAge: 7 * 24 * 60 * 60,
    //   path: '/',
    // });

    return response;
  } catch (error: any) {
    return sendResponse(error.message, false, null, 401);
  }
}
