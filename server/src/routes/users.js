import { Router } from 'express';
import * as c from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimits.js';
import { deleteAccountSchema, onboardingSchema, updateMeSchema } from '../validation/auth.js';

const r = Router();
r.use(requireAuth);
r.patch('/me', validate({ body: updateMeSchema }), c.updateMe);
r.put('/me/onboarding', validate({ body: onboardingSchema }), c.saveOnboarding);
r.get('/me/completion', c.getCompletion);
r.get('/me/achievements', c.achievements);
r.get('/me/export', c.exportData);
r.delete('/me', authLimiter, validate({ body: deleteAccountSchema }), c.deleteMe);
export default r;
