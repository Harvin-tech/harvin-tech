import { API_ENDPOINTS } from '@/config/backend-routes';
import apiClient from './apiClient';

interface Course {
  title: string;
  description: string;
  status: Number;
  category: string;
  // Add other course properties as needed
}

export const getCourses = async () => {
  const response = await apiClient.get(API_ENDPOINTS.COURSES.BASE);
  return response.data;
};

export const getCourseById = async (courseId: string) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COURSES.GET_BY_ID(courseId)
  );
  return response.data;
};

export const addCourse = async (courseData: Course) => {
  console.log(API_ENDPOINTS.COURSES.ADD);
  const response = await apiClient.post(API_ENDPOINTS.COURSES.ADD, courseData);
  return response.data;
};

export const updateCourse = async (
  courseId: string,
  courseData: Partial<Course>
) => {
  const response = await apiClient.patch(
    API_ENDPOINTS.COURSES.UPDATE(courseId),
    courseData
  );
  return response.data;
};

export const getChapterById = async (chapterId: string) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COURSES.GET_CHAPTER(chapterId)
  );
  return response.data;
};

export const enrollCourse = async (courseId: string, userId: string) => {
  const response = await apiClient.post(API_ENDPOINTS.COURSES.ENROLL, {
    courseId,
    userId,
  });
  return response.data;
};

export const getEnrollDetail = async () => {
  const response = await apiClient.get(API_ENDPOINTS.COURSES.GET_ENROLL);
  return response.data;
};
export const getEnrolledCourseByUser = async (userId: string) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COURSES.GET_ENROLLED_BY_USER(userId)
  );
  return response.data;
};

export const getUserCourse = async (userId: string) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COURSES.GET_USER_COURSE(userId)
  );
  return response.data;
};

export const getEnrolledCourse = async (userId: string) => {
  const response = await apiClient.get(API_ENDPOINTS.COURSES.GET_BY_ID(userId));
  return response.data;
};

export const getCourseChapter = async (chapterId: string) => {
  const response = await apiClient.get(
    API_ENDPOINTS.COURSES.GET_CHAPTER(chapterId)
  );
  return response.data;
};
