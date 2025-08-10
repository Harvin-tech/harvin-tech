// app/api/auth/register/route.ts
import dbConnect from '@/backend/config/db.config';
import { registerSchema } from '@/backend/schema/auth.schema';
import { AuthService } from '@/backend/services/auth.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection is established
    await dbConnect();

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
    console.error('Registration error:', error);

    return sendResponse(
      error.message || 'Registration failed',
      false,
      null,
      500
    );
  }
}
