// app/api/private/course/enroll/details/route.ts
import dbConnect from '@/backend/config/db.config';
import { getEnrolledCourseSchema } from '@/backend/schema/course.schema';
import { CourseService } from '@/backend/services/course.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const validation = getEnrolledCourseSchema.safeParse({ query });
    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const courses = await CourseService.getEnrolledAllCourse(query);
    return sendResponse('Enrolled courses fetched', true, courses);
  } catch (error: any) {
    console.error('ERROR_GET_COURSE', error);
    return sendResponse(error.message, false, null, 500);
  }
}
