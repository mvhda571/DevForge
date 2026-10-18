import { Router } from 'express';
import * as c from '../controllers/assignmentController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { idParam } from '../validation/common.js';
import { assignmentSchema, gradeSchema, submissionSchema } from '../validation/social.js';

const teacher = requireRole('teacher', 'admin');
const r = Router();
r.use(requireAuth);
r.get('/', c.list);
r.get('/mine', requireRole('student'), c.mine);
r.post('/', teacher, validate({ body: assignmentSchema }), c.create);
r.patch('/submissions/:id/grade', teacher, validate({ params: idParam, body: gradeSchema }), c.grade);
r.get('/:id', validate({ params: idParam }), c.detail);
r.patch('/:id', teacher, validate({ params: idParam, body: assignmentSchema.omit({ groupId: true, lessonId: true }).partial() }), c.update);
r.delete('/:id', teacher, validate({ params: idParam }), c.remove);
r.post('/:id/submit', requireRole('student'), validate({ params: idParam, body: submissionSchema }), c.submit);
export default r;
