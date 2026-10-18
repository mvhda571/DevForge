import { z } from 'zod';
import { objectId, shortText } from './common.js';

export const answerSchema = z.object({
  questionCode: z.string().min(1).max(40),
  answer: z.array(z.string().min(1).max(20)).min(1, 'Javobni tanlang').max(5),
  currentIndex: z.coerce.number().int().min(0).max(50).optional()
});

export const compareQuery = z.object({
  slugs: z
    .string()
    .transform((s) => s.split(',').map((x) => x.trim()).filter(Boolean))
    .refine((arr) => arr.length >= 2 && arr.length <= 3, 'Taqqoslash uchun 2–3 ta kasb tanlang')
});

export const createRoadmapSchema = z.object({
  careerSlug: z.string().min(1).max(60),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  dailyMinutes: z.coerce.number().int().min(10).max(240).optional(),
  studyDaysPerWeek: z.coerce.number().int().min(1).max(7).optional(),
  goal: shortText(300).optional()
});

export const updateRoadmapSchema = z.object({
  dailyMinutes: z.coerce.number().int().min(10).max(240).optional(),
  studyDaysPerWeek: z.coerce.number().int().min(1).max(7).optional(),
  goal: shortText(300).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  makeActive: z.boolean().optional()
});

export const quizSubmitSchema = z.object({
  answers: z
    .array(z.object({ questionId: z.string().min(1).max(40), answer: z.array(z.string().max(300)).max(10) }))
    .min(1)
    .max(20)
});

export const exerciseSchema = z.object({ index: z.coerce.number().int().min(0).max(30), done: z.boolean() });
export const timeSchema = z.object({ seconds: z.coerce.number().int().min(1).max(3600) });

export const TUTOR_ACTIONS = ['explain_again', 'simpler', 'another_example', 'step_by_step', 'check_me', 'practice', 'hint', 'free'];

export const tutorSchema = z.object({
  lessonId: objectId,
  action: z.enum(TUTOR_ACTIONS),
  message: shortText(2000).optional(),
  concept: shortText(200).optional()
});

export const advisorSchema = z.object({
  conversationId: objectId.optional(),
  message: z.string().trim().min(1, 'Xabar bo‘sh').max(2000)
});
