// app/api/private/course/[courseId]/route.ts
import dbConnect from '@/backend/config/db.config';
import {
  getCourseByIDSchema,
  getCourseBySlugSchema,
  updateCourseSchema,
} from '@/backend/schema/course.schema';
import { CourseService } from '@/backend/services/course.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const validation = getCourseBySlugSchema.safeParse({
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

    const course = await CourseService.getCourseBySlug(
      params.slug,
      Number(query.status)
    );
    return sendResponse('Course fetched successfully', true, course);
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const body = await request.json();
    const validation = updateCourseSchema.safeParse({
      params,
      body,
    });

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const updatedCourse = await CourseService.updateCourseById(
      validation.data.params.courseId,
      validation.data.body
    );
    return sendResponse('Course updated successfully', true, updatedCourse);
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
