import { z } from 'zod';
import { objectId, shortText, email } from './common.js';
import { FAVORITE_KINDS } from '../models/Favorite.js';

export const favoriteSchema = z.object({
  kind: z.enum(FAVORITE_KINDS),
  refId: objectId,
  note: shortText(300).optional()
});

export const reminderSchema = z.object({
  kind: z.enum(['study', 'deadline']).default('study'),
  title: z.string().trim().min(2, 'Sarlavha juda qisqa').max(150),
  note: shortText(1000).optional(),
  dueAt: z.coerce.date({ message: 'Sana noto‘g‘ri' }),
  repeat: z.enum(['none', 'daily', 'weekly']).default('none'),
  university: objectId.nullable().optional()
});

export const reminderUpdateSchema = reminderSchema.partial().extend({ done: z.boolean().optional() });

export const groupSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: shortText(500).optional(),
  careerSlug: z.string().max(60).optional()
});

export const joinGroupSchema = z.object({ code: z.string().trim().toUpperCase().min(4).max(12) });

export const assignmentSchema = z.object({
  groupId: objectId,
  title: z.string().trim().min(2).max(150),
  description: shortText(3000).optional(),
  lessonId: objectId.nullable().optional(),
  dueAt: z.coerce.date({ message: 'Muddat noto‘g‘ri' }),
  maxScore: z.coerce.number().int().min(1).max(1000).default(100)
});

export const submissionSchema = z
  .object({
    content: shortText(10000).optional(),
    link: z.string().trim().url('Havola noto‘g‘ri').max(500).optional().or(z.literal(''))
  })
  .refine((v) => (v.content && v.content.length > 0) || (v.link && v.link.length > 0), 'Javob matni yoki havolani kiriting');

export const gradeSchema = z.object({
  score: z.coerce.number().min(0).max(1000),
  feedback: shortText(3000).optional()
});

export const parentInviteSchema = z.object({
  studentEmail: email,
  relation: shortText(40).optional()
});

export const linkResponseSchema = z.object({ accept: z.boolean() });
