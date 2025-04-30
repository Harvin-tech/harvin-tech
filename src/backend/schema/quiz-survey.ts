import { z } from 'zod';

export const postQuizSurveySchema = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email(),
      mobile: z.number().nullable().optional(),
      selectedProgram: z.string(),
      goal: z.string(),
      track: z.string(),
    })
    .strict(),
});
