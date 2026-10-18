import { z } from 'zod';
import { ROLES } from '../models/User.js';
import { shortText } from './common.js';

export const userUpdateSchema = z.object({
  role: z.enum(ROLES).optional(),
  status: z.enum(['active', 'disabled']).optional()
});

const traitMap = z.record(z.string().max(30), z.number().min(0).max(5));

export const careerSchema = z.object({
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/, 'Faqat lotin harflari, raqam va chiziqcha').max(60),
  name: z.string().trim().min(2).max(100),
  category: z.string().trim().min(2).max(60),
  icon: z.string().max(40).optional(),
  description: z.string().trim().min(10).max(2000),
  traits: traitMap.optional(),
  schoolSubjects: z.array(shortText(60)).max(20).optional(),
  skills: z.array(shortText(80)).max(30).optional(),
  strengths: z.array(shortText(80)).max(20).optional(),
  learningPath: z.array(shortText(200)).max(20).optional(),
  directions: z.array(shortText(100)).max(20).optional(),
  nextAction: shortText(300).optional(),
  workEnvironment: shortText(300).optional(),
  roadmapLessons: z.array(z.string().max(80)).max(100).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional()
});

export const questionSchema = z.object({
  text: z.string().trim().min(5).max(300).optional(),
  hint: shortText(300).optional(),
  active: z.boolean().optional(),
  options: z
    .array(z.object({ key: z.string().min(1).max(10), label: z.string().trim().min(1).max(200), traits: traitMap }))
    .min(2)
    .max(8)
    .optional()
});

export const lessonUpdateSchema = z.object({
  title: z.string().trim().min(2).max(200).optional(),
  summary: shortText(500).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  durationMinutes: z.coerce.number().int().min(5).max(180).optional(),
  published: z.boolean().optional(),
  sections: z.array(z.object({ heading: shortText(200), body: z.string().max(8000), code: z.string().max(4000).optional() })).max(30).optional()
});

export const quizUpdateSchema = z.object({
  passPercent: z.coerce.number().int().min(1).max(100).optional(),
  questions: z
    .array(
      z.object({
        _id: z.string().optional(),
        type: z.enum(['single', 'multiple', 'truefalse', 'short']),
        prompt: z.string().trim().min(3).max(500),
        options: z.array(shortText(300)).max(8).default([]),
        correct: z.array(shortText(300)).min(1),
        explanation: shortText(1000).optional(),
        wrongExplanation: shortText(1000).optional(),
        concept: shortText(120).optional()
      })
    )
    .min(1)
    .max(20)
    .optional()
});

const sourced = { verified: z.boolean().optional(), source: shortText(300).optional() };

export const universitySchema = z.object({
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/).max(80),
  name: z.string().trim().min(2).max(200),
  localName: shortText(200).optional(),
  country: z.string().trim().min(2).max(60),
  city: z.string().trim().min(2).max(80),
  website: z.string().trim().url().max(300).optional().or(z.literal('')),
  type: z.enum(['public', 'private']),
  description: shortText(2000).optional(),
  fields: z.array(shortText(60)).max(30).optional(),
  degreeLevels: z.array(shortText(30)).max(5).optional(),
  languages: z.array(shortText(30)).max(10).optional(),
  programs: z.array(z.object({ name: shortText(150), degree: shortText(30), language: shortText(30) })).max(100).optional(),
  tuition: z
    .object({
      min: z.number().min(0).nullable().optional(),
      max: z.number().min(0).nullable().optional(),
      currency: shortText(5).optional(),
      period: shortText(20).optional(),
      note: shortText(300).optional(),
      ...sourced
    })
    .optional(),
  scholarships: z.array(z.object({ name: shortText(150), description: shortText(500).optional(), url: shortText(300).optional(), ...sourced })).max(20).optional(),
  admission: z.object({ requirements: z.array(shortText(300)).max(30).optional(), ...sourced }).optional(),
  deadlines: z.array(z.object({ label: shortText(150), date: z.coerce.date(), ...sourced })).max(20).optional(),
  location: z.object({ lat: z.number().min(-90).max(90).nullable(), lng: z.number().min(-180).max(180).nullable(), approximate: z.boolean().optional() }).optional(),
  dataStatus: z.enum(['demo', 'partial', 'verified']).optional(),
  lastVerifiedAt: z.coerce.date().nullable().optional(),
  active: z.boolean().optional()
});
