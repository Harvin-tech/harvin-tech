// app/api/private/course/user/[userId]/route.ts
import dbConnect from '@/backend/config/db.config';
import { getEnrolledCourseByUserSchema } from '@/backend/schema/course.schema';
import { CourseService } from '@/backend/services/course.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const validation = getEnrolledCourseByUserSchema.safeParse({
      params,
      query,
    });

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const courses = await CourseService.getEnrolledCoursesOfUser(
      validation.data.params.userId,
      validation.data.query
    );
    return sendResponse('User enrollments fetched', true, courses);
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
