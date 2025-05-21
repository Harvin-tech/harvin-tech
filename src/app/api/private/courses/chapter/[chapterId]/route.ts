// app/api/private/course/chapter/[chapterId]/route.ts
import dbConnect from '@/backend/config/db.config';
import { getChapterByIDSchema } from '@/backend/schema/course.schema';
import { CourseService } from '@/backend/services/course.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { chapterId: string } }
) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const validation = getChapterByIDSchema.safeParse({
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

    const chapter = await CourseService.getChapterById(
      params.chapterId,
      Number(query.status)
    );
    return sendResponse('Chapter fetched successfully', true, chapter);
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
