import dbConnect from '@/backend/config/db.config';

import { sendResponse } from '@/backend/utils/response';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { Enrollment } from '@/backend/models';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return sendResponse('Valid userId is required', false, null, 400);
    }

    const enrollment: any = await Enrollment.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!enrollment) {
      return sendResponse(
        'No enrollment found for this userId',
        false,
        null,
        404
      );
    }

    const enrolledDate = new Date(enrollment.createdAt); // or enrolledAt
    const currentDate = new Date();

    const diffInDays =
      (currentDate.getTime() - enrolledDate.getTime()) / (1000 * 3600 * 24);
    const eligible = diffInDays >= 7;

    return sendResponse(
      eligible
        ? '7 days have passed since enrollment'
        : '7 days have not passed yet',
      true,
      {
        enrolledDate,
        daysSinceEnrollment: Math.floor(diffInDays),
        eligible,
      }
    );
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
