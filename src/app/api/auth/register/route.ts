// app/api/auth/register/route.ts
import { registerSchema } from '@/backend/schema/auth.schema';
import { AuthService } from '@/backend/services/auth.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const user = await AuthService.register(body);
    return sendResponse('User registered successfully', true, user, 201);
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
