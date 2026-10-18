import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import env from './config/env.js';
import api from './routes/index.js';
import { csrfProtection } from './middleware/csrf.js';
import { apiLimiter } from './middleware/rateLimits.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import { dbState } from './config/db.js';
import { aiStatus } from './services/ai/provider.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
  // Chrome Private Network Access: lets a public site (e.g. Vercel) call this API on localhost
  app.use((req, res, next) => {
    if (req.get('access-control-request-private-network')) res.set('Access-Control-Allow-Private-Network', 'true');
    next();
  });
  app.use(
    cors({
      origin: (origin, cb) => cb(null, !origin || env.clientOrigins.includes(origin)),
      credentials: true
    })
  );
  app.use(express.json({ limit: '200kb' }));
  app.use(cookieParser());
  if (!env.isTest) {
    morgan.token('safe-url', (req) => req.originalUrl.split('?')[0]);
    app.use(morgan(':method :safe-url :status :response-time ms'));
  }

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', db: dbState(), ai: aiStatus().mode, time: new Date().toISOString() } });
  });

  app.use('/api', apiLimiter, csrfProtection, api);
  app.use('/api', notFoundHandler);

  const here = path.dirname(fileURLToPath(import.meta.url));
  const dist = path.resolve(here, '../../client/dist');
  if (env.isProd && fs.existsSync(dist)) {
    app.use(express.static(dist, { maxAge: '7d', index: false }));
    app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  app.use(errorHandler);
  return app;
}
