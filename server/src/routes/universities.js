import { Router } from 'express';
import * as c from '../controllers/universityController.js';
import { optionalAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { aiLimiter } from '../middleware/rateLimits.js';

const r = Router();
r.get('/', optionalAuth, validate({ query: c.listQuery }), c.list);
r.get('/filters', c.filters);
r.get('/compare', c.compare);
r.get('/:slug', optionalAuth, c.detail);
r.get('/:slug/nearby', aiLimiter, validate({ query: c.nearbyQuery }), c.nearby);
export default r;
