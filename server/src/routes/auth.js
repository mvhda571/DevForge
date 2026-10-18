import { Router } from 'express';
import * as c from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimits.js';
import { changePasswordSchema, loginSchema, registerSchema } from '../validation/auth.js';

const r = Router();
r.get('/csrf', c.csrf);
r.post('/register', authLimiter, validate({ body: registerSchema }), c.register);
r.post('/login', authLimiter, validate({ body: loginSchema }), c.login);
r.post('/logout', c.logout);
r.get('/me', requireAuth, c.me);
r.post('/change-password', authLimiter, requireAuth, validate({ body: changePasswordSchema }), c.changePassword);
export default r;
