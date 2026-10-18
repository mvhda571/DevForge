import { z } from 'zod';
import mongoose from 'mongoose';

export const objectId = z
  .string()
  .refine((v) => mongoose.isValidObjectId(v), { message: 'Identifikator noto‘g‘ri' });

export const idParam = z.object({ id: objectId });

export const pageQuery = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});

export const password = z
  .string()
  .min(8, 'Parol kamida 8 belgidan iborat bo‘lishi kerak')
  .max(128, 'Parol juda uzun')
  .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), 'Parolda kamida bitta harf va bitta raqam bo‘lishi kerak');

export const email = z.string().trim().toLowerCase().email('Email manzil noto‘g‘ri').max(160);

export const shortText = (max = 200) => z.string().trim().max(max);
