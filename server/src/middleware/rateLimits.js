import rateLimit from 'express-rate-limit';
import env from '../config/env.js';

const message = { success: false, error: { message: 'Juda ko‘p so‘rov yuborildi. Birozdan keyin qayta urinib ko‘ring.' } };
const skip = () => env.isTest;

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message,
  skip
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => (req.user ? String(req.user._id) : req.ip),
  validate: { keyGeneratorIpFallback: false },
  message,
  skip
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message,
  skip
});
