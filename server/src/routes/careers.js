import { Router } from 'express';
import * as c from '../controllers/careerController.js';
import { validate } from '../middleware/validate.js';
import { compareQuery } from '../validation/learning.js';

const r = Router();
r.get('/', c.list);
r.get('/compare', validate({ query: compareQuery }), c.compare);
r.get('/:slug', c.detail);
export default r;
