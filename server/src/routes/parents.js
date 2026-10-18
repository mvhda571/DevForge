import { Router } from 'express';
import { z } from 'zod';
import * as c from '../controllers/parentController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimits.js';
import { idParam, objectId } from '../validation/common.js';
import { linkResponseSchema, parentInviteSchema } from '../validation/social.js';

const r = Router();
r.use(requireAuth);
r.post('/invite', authLimiter, requireRole('parent'), validate({ body: parentInviteSchema }), c.invite);
r.get('/links', requireRole('parent', 'student'), c.links);
r.post('/links/:id/respond', requireRole('student'), validate({ params: idParam, body: linkResponseSchema }), c.respond);
r.delete('/links/:id', requireRole('parent', 'student'), validate({ params: idParam }), c.revoke);
r.get('/students/:studentId/overview', requireRole('parent'), validate({ params: z.object({ studentId: objectId }) }), c.studentOverview);
export default r;
