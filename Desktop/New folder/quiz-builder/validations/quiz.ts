import { z } from 'zod';

export const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  category: z.string().optional(),
  timeLimit: z.number().min(1, 'Time limit must be at least 1 minute'),
  passingScore: z.number().min(1, 'Passing score must be at least 1%').max(100, 'Passing score cannot exceed 100%'),
  randomizeQuestions: z.boolean(),
  randomizeOptions: z.boolean(),
  status: z.enum(['draft', 'published', 'archived']),
});

export type QuizFormData = z.infer<typeof quizSchema>;