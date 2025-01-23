const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082';

export const API_ENDPOINTS = {
  USERS: `${BASE_URL}/private/users`,
  PRODUCTS: `${BASE_URL}/products`,
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  COURSES: {
    BASE: `${BASE_URL}/private/courses`,
    GET_ALL: `${BASE_URL}/private/courses`,
    GET_ENROLL: `${BASE_URL}/private/courses/enroll/details`,
    ADD: `${BASE_URL}/private/courses`,
    UPDATE: (courseId: string) => `${BASE_URL}/private/courses/${courseId}`,
    GET_BY_ID: (courseId: string) => `${BASE_URL}/private/courses/${courseId}`,
    GET_CHAPTER: (chapterId: string) =>
      `${BASE_URL}/private/courses/chapter/${chapterId}`,
    ENROLL: `${BASE_URL}/private/courses/enroll`,
    GET_ENROLLED_BY_USER: (userId: string) =>
      `${BASE_URL}/private/courses/user/${userId}`,
    GET_USER_COURSE: (userId: string) =>
      `${BASE_URL}/private/courses/user/${userId}`,
  },
  PUBLIC_COURSES: {
    BASE: `${BASE_URL}/public/courses`,
  },
  QUIZ_SURVEY: {
    GET_QUIZ_SURVEY: `${BASE_URL}/public/quiz-survey`,
  },
};
