import env from './config/env.js';
import { connectDb } from './config/db.js';
import { createApp } from './app.js';
import { startScheduler } from './services/scheduler.js';
import { aiStatus } from './services/ai/provider.js';

async function main() {
  try {
    await connectDb();
    console.log('[db] MongoDB ulandi');
  } catch (err) {
    console.error('[db] MongoDB ga ulanib bo‘lmadi:', err.message);
    console.error('[db] MONGO_URI sozlamasini tekshiring. Server to‘xtatildi.');
    process.exit(1);
  }
  const app = createApp();
  app.listen(env.port, () => {
    const ai = aiStatus();
    console.log(`[server] DevForge API http://localhost:${env.port} manzilida ishlamoqda`);
    console.log(`[ai] Rejim: ${ai.mode}${ai.mode === 'live' ? ` (${ai.provider}, ${ai.model})` : ' — demo javoblar ishlatiladi'}`);
  });
  startScheduler();
}

main();
