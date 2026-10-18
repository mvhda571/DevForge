import { Router } from 'express';
import * as c from '../controllers/assessmentController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { idParam } from '../validation/common.js';
import { answerSchema } from '../validation/learning.js';

const r = Router();
r.get('/questions', c.questions);
r.use(requireAuth);
r.get('/current', c.current);
r.post('/start', c.start);
r.get('/results', c.history);
r.get('/results/latest', c.latestResult);
r.get('/results/:id', validate({ params: idParam }), c.resultById);
r.put('/:id/answer', validate({ params: idParam, body: answerSchema }), c.answer);
r.post('/:id/complete', validate({ params: idParam }), c.complete);
export default r;
