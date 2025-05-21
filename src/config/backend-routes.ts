const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082';

export const API_ENDPOINTS = {
  USERS: `/api/private/users`,
  PRODUCTS: `/api/products`,
  AUTH: {
    LOGIN: `/api/auth/login`,
    REGISTER: `/api/auth/register`,
    LOGOUT: `/api/auth/logout`,
  },
  COURSES: {
    BASE: `/api/private/courses`,
    GET_ALL: `/api/private/courses`,
    GET_ENROLL: `/api/private/courses/enroll/details`,
    ADD: `/api/private/courses`,
    UPDATE: (courseId: string) => `/api/private/courses/${courseId}`,
    GET_BY_ID: (courseId: string) => `/api/private/courses/${courseId}`,
    GET_CHAPTER: (chapterId: string) =>
      `/api/private/courses/chapter/${chapterId}`,
    ENROLL: `/api/private/courses/enroll`,
    GET_ENROLLED_BY_USER: (userId: string) =>
      `/api/private/courses/user/${userId}`,
    GET_USER_COURSE: (userId: string) => `/api/private/courses/user/${userId}`,
  },
  PUBLIC_COURSES: {
    BASE: `/api/public/courses`, // Next Apis
  },
  QUIZ_SURVEY: {
    GET_QUIZ_SURVEY: `/api/public/quiz-survey`,
  },
};
