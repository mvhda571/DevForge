import { Router } from 'express';
import { z } from 'zod';
import * as c from '../controllers/quizController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { objectId } from '../validation/common.js';
import { quizSubmitSchema } from '../validation/learning.js';

const lessonParam = z.object({ lessonId: objectId });
const checkSchema = z.object({ questionId: z.string().min(1).max(40), answer: z.array(z.string().max(300)).max(10) });
const r = Router();
r.use(requireAuth);
r.get('/attempts', c.attempts);
r.post('/lesson/:lessonId/check', validate({ params: lessonParam, body: checkSchema }), c.check);
r.post('/lesson/:lessonId/submit', requireRole('student'), validate({ params: lessonParam, body: quizSubmitSchema }), c.submit);
export default r;
