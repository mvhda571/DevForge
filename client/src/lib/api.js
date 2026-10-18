const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
let csrfToken = null;
let csrfPromise = null;

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function readCookie(name) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

async function ensureCsrf(force = false) {
  if (!force) {
    csrfToken = csrfToken || readCookie('df_csrf');
    if (csrfToken) return csrfToken;
  }
  csrfPromise ||= fetch(`${BASE}/api/auth/csrf`, { credentials: 'include' })
    .then((r) => r.json())
    .then((j) => (csrfToken = j.data.csrfToken))
    .finally(() => (csrfPromise = null));
  return csrfPromise;
}

async function request(method, path, body, { retry = true, signal, keepalive } = {}) {
  const headers = { Accept: 'application/json' };
  const unsafe = method !== 'GET';
  if (unsafe) headers['X-CSRF-Token'] = await ensureCsrf();
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
      keepalive
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Server bilan aloqa yo‘q. Internet aloqangizni tekshiring.', 0);
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    if (res.status === 403 && unsafe && retry && /tokeni/.test(json?.error?.message || '')) {
      await ensureCsrf(true);
      return request(method, path, body, { retry: false, signal });
    }
    if (res.status === 401) window.dispatchEvent(new CustomEvent('df:unauthorized'));
    throw new ApiError(json?.error?.message || `So‘rov bajarilmadi (${res.status})`, res.status, json?.error?.details);
  }
  return { data: json.data, meta: json.meta };
}

export const api = {
  get: (path, opts) => request('GET', path, undefined, opts).then((r) => r.data),
  getWithMeta: (path, opts) => request('GET', path, undefined, opts),
  post: (path, body = {}, opts) => request('POST', path, body, opts).then((r) => r.data),
  put: (path, body = {}) => request('PUT', path, body).then((r) => r.data),
  patch: (path, body = {}) => request('PATCH', path, body).then((r) => r.data),
  delete: (path, body) => request('DELETE', path, body).then((r) => r.data)
};

export function qs(params) {
  const s = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') s.set(k, v);
  const str = s.toString();
  return str ? `?${str}` : '';
}
