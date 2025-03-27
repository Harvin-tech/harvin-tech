// utils/response.ts
import { NextResponse } from 'next/server';

type ResponseData = {
  message: string;
  success: boolean;
  data?: any;
  errors?: any;
};

export function sendResponse(
  message: string,
  success: boolean,
  data: any = null,
  status: number = 200,
  errors: any = null
): NextResponse<ResponseData> {
  return NextResponse.json(
    {
      message,
      success,
      data,
      errors,
    },
    { status }
  );
}
