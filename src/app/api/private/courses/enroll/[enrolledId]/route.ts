import dbConnect from '@/backend/config/db.config';
import { updateEnrolledSchema } from '@/backend/schema/course.schema';
import { EnrolledService } from '@/backend/services/enrolled.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { enrolledId: string } }
) {
  // console.log(params , 'route enrolled id')
  try {
    await dbConnect();

    const body = await request.json();
    // const validation = updateEnrolledSchema.safeParse({ params,body });

    // if (!validation.success) {
    //   return sendResponse(
    //     'Validation error',
    //     false,
    //     validation.error.format(),
    //     400
    //   );
    // }

    const enrollment = await EnrolledService.updateEnrollementById(
      params.enrolledId,
      body
    );
    return sendResponse('Course enrolled successfully', true, enrollment);
  } catch (error: any) {
    return sendResponse(error.message, false, null, 500);
  }
}
