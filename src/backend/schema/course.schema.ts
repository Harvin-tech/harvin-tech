import { z } from 'zod';

// Common validations
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const statusEnum = z.number().int().min(-1).max(1);

// Lesson Schema
const lessonSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().optional(),
    video: z.string().url().optional(),
    duration: z.number().optional(),
    type: z.enum([
      'video',
      'content',
      'quiz',
      'assignment',
      'discussion',
      'test',
    ]),
  })
  .strict();

// Chapter Schema
const chapterSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    lessons: z.array(lessonSchema).min(1),
  })
  .strict();

// Course Schemas
export const addCourseSchema = z.object({
  body: z
    .object({
      title: z.string(),
      slug: z.string(),
      subTitle: z.string().nullable().optional(),
      image: z.string().nullable().optional(),
      category: z.string(),
      instructor: z.string().regex(objectIdRegex),
      type: z.enum(['paid', 'free']),
      price: z.number(),
      level: z.enum(['beginner', 'intermediate', 'advanced']),
      mrp: z.number(),
      description: z.string(),
      status: statusEnum,
      chapters: z.array(chapterSchema).min(1),
    })
    .strict(),
});

export const getCourseSchema = z.object({
  search: z.string().optional(),
  status: statusEnum.optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  page: z
    .string()
    .transform(Number)
    .pipe(z.number().int().min(1))
    .optional()
    .default('1'),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().int().min(1))
    .optional()
    .default('10'),
});

export const getCourseByIDSchema = z.object({
  params: z.object({
    courseId: z.string().regex(objectIdRegex),
  }),
  query: z
    .object({
      status: statusEnum.optional(),
    })
    .strict(),
});

export const getCourseBySlugSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
  query: z
    .object({
      status: statusEnum.optional(),
    })
    .strict(),
});

export const updateCourseSchema = z.object({
  params: z.object({
    courseId: z.string().regex(objectIdRegex),
  }),
  body: z
    .object({
      title: z.string().optional(),
      subTitle: z.string().nullable().optional(),
      image: z.string().nullable().optional(),
      category: z.string().optional(),
      instructor: z.string().regex(objectIdRegex).optional(),
      type: z.enum(['paid', 'free']).optional(),
      price: z.number().optional(),
      level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
      mrp: z.number().optional(),
      description: z.string().optional(),
      status: statusEnum.optional(),
    })
    .strict(),
});

export const enrollCourseSchema = z.object({
  body: z
    .object({
      courseId: z.string().regex(objectIdRegex),
      userId: z.string().regex(objectIdRegex),
    })
    .strict(),
});

export const getEnrolledCourseSchema = getCourseSchema; // Reuse same schema

export const getEnrolledCourseByUserSchema = z.object({
  params: z.object({
    userId: z.string().regex(objectIdRegex),
  }),
  query: z
    .object({
      search: z.string().optional(),
      page: z
        .string()
        .transform(Number)
        .pipe(z.number().int().min(1))
        .optional()
        .default('1'),
      limit: z
        .string()
        .transform(Number)
        .pipe(z.number().int().min(1))
        .optional()
        .default('10'),
      status: statusEnum.optional(),
    })
    .strict(),
});

// ID-based schemas (chapter/lesson)
export const getChapterByIDSchema = z.object({
  params: z.object({
    chapterId: z.string().regex(objectIdRegex),
  }),
  query: z
    .object({
      status: statusEnum.optional(),
    })
    .strict(),
});

export const getLessonByIDSchema = z.object({
  params: z.object({
    lessonId: z.string().regex(objectIdRegex),
  }),
  query: z
    .object({
      status: statusEnum.optional(),
    })
    .strict(),
});
