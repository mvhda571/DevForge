import { z } from 'zod';
import { email, password, shortText } from './common.js';
import { SELF_ASSIGNABLE_ROLES } from '../models/User.js';

const currentYear = new Date().getFullYear();

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Ism kamida 2 belgidan iborat bo‘lsin').max(80),
  email,
  password,
  role: z.enum(SELF_ASSIGNABLE_ROLES).default('student'),
  birthYear: z.coerce.number().int().min(currentYear - 100).max(currentYear - 6).optional(),
  acceptTerms: z.literal(true, { message: 'Foydalanish shartlariga rozilik bildiring' })
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Parolni kiriting').max(128)
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: password
});

export const onboardingSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  learnerType: z.enum(['school', 'applicant', 'university', 'other']).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  interests: z.array(shortText(60)).max(20).optional(),
  favoriteSubjects: z.array(shortText(60)).max(20).optional(),
  careerInterests: z.array(shortText(60)).max(20).optional(),
  dailyMinutes: z.coerce.number().int().min(10).max(240).optional(),
  studyDaysPerWeek: z.coerce.number().int().min(1).max(7).optional(),
  goal: shortText(300).optional(),
  complete: z.boolean().optional()
});

export const updateMeSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  birthYear: z.coerce.number().int().min(currentYear - 100).max(currentYear - 6).nullable().optional(),
  notificationPrefs: z
    .object({
      reminders: z.boolean().optional(),
      deadlines: z.boolean().optional(),
      achievements: z.boolean().optional(),
      groupUpdates: z.boolean().optional()
    })
    .optional()
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1).max(128),
  confirm: z.literal('O‘CHIRISH', { message: 'Tasdiqlash uchun O‘CHIRISH so‘zini yozing' })
});
