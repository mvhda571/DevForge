import { Router } from 'express';
import * as c from '../controllers/roadmapController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { idParam } from '../validation/common.js';
import { createRoadmapSchema, updateRoadmapSchema } from '../validation/learning.js';

const r = Router();
r.use(requireAuth, requireRole('student'));
r.get('/', c.list);
r.get('/active', c.active);
r.post('/', validate({ body: createRoadmapSchema }), c.create);
r.get('/:id', validate({ params: idParam }), c.detail);
r.patch('/:id', validate({ params: idParam, body: updateRoadmapSchema }), c.update);
r.delete('/:id', validate({ params: idParam }), c.remove);
export default r;
