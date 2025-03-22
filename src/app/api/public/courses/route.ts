// app/api/private/course/route.ts
import dbConnect from '@/backend/config/db.config';
import {
  addCourseSchema,
  getCourseSchema,
} from '@/backend/schema/course.schema';
import { CourseService } from '@/backend/services/course.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const validation = getCourseSchema.safeParse({ query });
    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const courses = await CourseService.getAllCourse(query);
    return sendResponse('Courses fetched successfully', true, courses);
  } catch (error: any) {
    console.error('ERROR_GET_COURSE', error);
    return sendResponse(error.message, false, null, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = addCourseSchema.safeParse({ body });

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    const course = await CourseService.createCourse(body);
    return sendResponse('Course added successfully', true, course, 201);
  } catch (error: any) {
    console.error('ERROR_ADD_COURSE', error);
    return sendResponse(error.message, false, null, 500);
  }
}
