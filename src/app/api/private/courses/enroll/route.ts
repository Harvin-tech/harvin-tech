// app/api/private/course/enroll/route.ts
import dbConnect from '@/backend/config/db.config';
import { enrollCourseSchema } from '@/backend/schema/course.schema';
import { CourseService } from '@/backend/services/course.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const validation = enrollCourseSchema.safeParse({ body });

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const enrollment = await CourseService.enrollCourse(body);
    return sendResponse('Course enrolled successfully', true, enrollment);
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
