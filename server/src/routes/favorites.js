import { Router } from 'express';
import { z } from 'zod';
import * as c from '../controllers/favoriteController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { idParam, objectId } from '../validation/common.js';
import { favoriteSchema } from '../validation/social.js';

const r = Router();
r.use(requireAuth);
r.get('/', c.list);
r.post('/', validate({ body: favoriteSchema }), c.add);
r.delete('/by-ref/:kind/:refId', validate({ params: z.object({ kind: z.string(), refId: objectId }) }), c.removeByRef);
r.delete('/:id', validate({ params: idParam }), c.remove);
export default r;
