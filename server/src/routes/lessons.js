import { Router } from 'express';
import * as c from '../controllers/lessonController.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const r = Router();
r.get('/subjects', c.subjects);
r.get('/', optionalAuth, c.list);
r.get('/:slug', requireAuth, c.detail);
export default r;
