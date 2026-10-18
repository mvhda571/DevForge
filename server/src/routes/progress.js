import { Router } from 'express';
import { z } from 'zod';
import * as c from '../controllers/progressController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { objectId } from '../validation/common.js';
import { exerciseSchema, timeSchema } from '../validation/learning.js';

const lessonParam = z.object({ lessonId: objectId });
const r = Router();
r.use(requireAuth, requireRole('student'));
r.get('/dashboard', c.dashboard);
r.post('/:lessonId/start', validate({ params: lessonParam }), c.start);
r.post('/:lessonId/exercise', validate({ params: lessonParam, body: exerciseSchema }), c.exercise);
r.post('/:lessonId/time', validate({ params: lessonParam, body: timeSchema }), c.time);
r.post('/:lessonId/complete', validate({ params: lessonParam }), c.complete);
export default r;
