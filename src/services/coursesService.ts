import { API_ENDPOINTS } from '@/config/backend-routes';
import { nextApiClient } from './apiClient';

interface Course {
  title: string;
  description: string;
  status: Number;
  category: string;
  // Add other course properties as needed
}

export const getCourses = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const response = await nextApiClient.get(
    `/api/public/courses?${queryParams.toString()}`
  );
  return response.data;
};

export const getCourseById = async (courseId: string) => {
  const response = await nextApiClient.get(`/api/private/courses/${courseId}`);
  return response.data;
};

export const addCourse = async (courseData: Course) => {
  const response = await nextApiClient.post('/api/private/courses', courseData);
  return response.data;
};

export const updateCourse = async (
  courseId: string,
  courseData: Partial<Course>
) => {
  const response = await nextApiClient.patch(
    `/api/private/courses/${courseId}`,
    courseData
  );
  return response.data;
};

export const getChapterById = async (chapterId: string) => {
  const response = await nextApiClient.get(
    `/api/private/courses/chapters/${chapterId}`
  );
  return response.data;
};

export const enrollCourse = async (courseId: string, userId: string) => {
  const response = await nextApiClient.post('/api/private/courses/enroll', {
    courseId,
    userId,
  });
  return response.data;
};

export const getEnrollDetail = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);

  const response = await nextApiClient.get(
    `/api/private/courses/enroll/details?${queryParams.toString()}`
  );
  return response.data;
};

export const getEnrolledCourseByUser = async (userId: string) => {
  const response = await nextApiClient.get(
    `/api/private/courses/enroll/user/${userId}`
  );
  return response.data;
};

export const getUserCourse = async (userId: string) => {
  const response = await nextApiClient.get(
    `/api/private/courses/user/${userId}`
  );
  return response.data;
};

export const getEnrolledCourse = async (userId: string) => {
  const response = await nextApiClient.get(`/api/private/courses/${userId}`);
  return response.data;
};

export const getCourseChapter = async (chapterId: string) => {
  const response = await nextApiClient.get(
    `/api/private/courses/chapters/${chapterId}`
  );
  return response.data;
};
