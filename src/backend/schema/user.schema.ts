import { z } from 'zod';

// Common validations
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const userRoles = ['student', 'admin', 'teacher', 'super-admin'] as const;
const statusEnum = z.number().int().min(0).max(2);

export const getUserSchema = z.object({
  search: z.string().optional(),
  status: statusEnum.optional(),
  type: z.enum(userRoles).optional(),
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

export const getUserByIDSchema = z.object({
  params: z
    .object({
      userId: z.string(),
    })
    .strict(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().nullable().optional(),
  middleName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  dob: z.string().regex(isoDateRegex).nullable().optional(),
  mobile: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
  gender: z.number().int().min(1).max(4).nullable().optional(),
  address: z.string().nullable().optional(),
  role: z.enum(userRoles).optional(),
  status: statusEnum.optional(),
});

export const changePasswordSchema = z.object({
  email: z.string().email(),
  oldPassword: z.string().min(6).optional(),
  newPassword: z.string().min(6),
  isAdmin: z.boolean().optional().default(false),
});

export const getUserByToken = z.object({}).strict();
