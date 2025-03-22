// app/api/quiz-survey/route.ts
import dbConnect from '@/backend/config/db.config';
import { postQuizSurveySchema } from '@/backend/schema/quiz-survey';
import { QuizSurveyService } from '@/backend/services/quiz-survey.service';
import { sendResponse } from '@/backend/utils/response';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Parse and validate request body
    const body = await request.json();
    const validation = postQuizSurveySchema.safeParse(body);

    if (!validation.success) {
      return sendResponse(
        'Validation error',
        false,
        validation.error.format(),
        400
      );
    }

    // Process the quiz survey submission
    const result = await QuizSurveyService.postQuizSurvey(body);

    // Determine response based on creation status
    return sendResponse(
      result.created
        ? 'Your quiz submitted successfully'
        : 'Your quiz already submitted',
      true,
      result,
      result.created ? 201 : 200
    );
  } catch (error: any) {
    console.error('Quiz submission error:', error);
    return sendResponse(
      error.message || 'Internal server error',
      false,
      null,
      error.statusCode || 500
    );
  }
}
