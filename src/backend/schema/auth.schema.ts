import { z } from 'zod';

// Helper for date validation (YYYY-MM-DD format)
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().nullable().optional(),
    middleName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    dob: z.string().regex(isoDateRegex).nullable().optional(),
    mobile: z.number().int().nullable().optional(),
    photo: z.string().nullable().optional(),
    gender: z.number().int().min(1).max(4).nullable().optional(),
    address: z.string().nullable().optional(),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

// For logout, typically no request body needed
export const logoutSchema = z.object({}).strict();
