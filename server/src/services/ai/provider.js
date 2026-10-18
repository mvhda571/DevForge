import env from '../../config/env.js';

const DEFAULT_MODELS = {
  anthropic: 'claude-sonnet-5-5',
  openai: 'gpt-4o-mini'
};

export function aiStatus() {
  const { provider, apiKey } = env.ai;
  const configured = provider !== 'demo' && Boolean(apiKey) && ['anthropic', 'openai'].includes(provider);
  return {
    mode: configured ? 'live' : 'demo',
    provider: configured ? provider : 'demo',
    model: configured ? env.ai.model || DEFAULT_MODELS[provider] : null
  };
}

async function postJson(url, headers, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), env.ai.timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(`AI provayder xatosi (${res.status})`);
      err.providerStatus = res.status;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

async function callAnthropic({ system, messages }) {
  const base = env.ai.baseUrl || 'https://api.anthropic.com';
  const data = await postJson(
    `${base.replace(/\/$/, '')}/v1/messages`,
    { 'x-api-key': env.ai.apiKey, 'anthropic-version': process.env.AI_ANTHROPIC_VERSION || '2023-06-01' },
    { model: env.ai.model || DEFAULT_MODELS.anthropic, max_tokens: env.ai.maxTokens, system, messages }
  );
  return (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
}

async function callOpenAI({ system, messages }) {
  const base = env.ai.baseUrl || 'https://api.openai.com/v1';
  const data = await postJson(
    `${base.replace(/\/$/, '')}/chat/completions`,
    { authorization: `Bearer ${env.ai.apiKey}` },
    {
      model: env.ai.model || DEFAULT_MODELS.openai,
      max_tokens: env.ai.maxTokens,
      messages: [{ role: 'system', content: system }, ...messages]
    }
  );
  return data.choices?.[0]?.message?.content?.trim() || '';
}

export async function generate({ system, messages }) {
  const status = aiStatus();
  if (status.mode !== 'live') return null;
  const call = status.provider === 'anthropic' ? callAnthropic : callOpenAI;
  const text = await call({ system, messages });
  if (!text) throw new Error('AI bo‘sh javob qaytardi');
  return text;
}
