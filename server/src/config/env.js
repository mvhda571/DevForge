import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd,
  isTest: process.env.NODE_ENV === 'test',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devforge',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === 'true' : isProd,
  ai: {
    provider: (process.env.AI_PROVIDER || 'demo').toLowerCase(),
    model: process.env.AI_MODEL || '',
    apiKey: process.env.AI_API_KEY || '',
    baseUrl: process.env.AI_BASE_URL || '',
    maxTokens: Number(process.env.AI_MAX_TOKENS || 900),
    timeoutMs: Number(process.env.AI_TIMEOUT_MS || 30000)
  },
  overpassUrl: process.env.OVERPASS_URL || 'https://overpass-api.de/api/interpreter',
  overpassEnabled: process.env.OVERPASS_ENABLED !== 'false'
};

if (!env.jwtSecret) {
  if (isProd) throw new Error('JWT_SECRET muhit o‘zgaruvchisi majburiy');
  env.jwtSecret = 'dev-only-insecure-secret-change-me';
}

export default env;
