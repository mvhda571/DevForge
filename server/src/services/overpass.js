import env from '../config/env.js';
import { HttpError } from '../utils/http.js';

export const CATEGORIES = {
  university: ['nwr["amenity"~"^(university|college)$"]'],
  library: ['nwr["amenity"="library"]'],
  cafe: ['nwr["amenity"="cafe"]'],
  pharmacy: ['nwr["amenity"="pharmacy"]'],
  shop: ['nwr["shop"~"^(supermarket|convenience|books|stationery|mall)$"]'],
  accommodation: ['nwr["building"="dormitory"]', 'nwr["amenity"="student_accommodation"]', 'nwr["tourism"="hostel"]'],
  transport: ['node["highway"="bus_stop"]', 'node["railway"~"^(station|subway_entrance|tram_stop)$"]', 'node["public_transport"="station"]']
};

const TTL_MS = 6 * 60 * 60 * 1000;
const MAX_ENTRIES = 300;
const cache = new Map();
const inflight = new Map();
let lastRequestAt = 0;

function classify(tags = {}) {
  if (/^(university|college)$/.test(tags.amenity)) return 'university';
  if (tags.amenity === 'library') return 'library';
  if (tags.amenity === 'cafe') return 'cafe';
  if (tags.amenity === 'pharmacy') return 'pharmacy';
  if (tags.shop) return 'shop';
  if (tags.building === 'dormitory' || tags.amenity === 'student_accommodation' || tags.tourism === 'hostel') return 'accommodation';
  return 'transport';
}

export function buildQuery(lat, lng, radius, categories) {
  const parts = categories.flatMap((c) => CATEGORIES[c] || []).map((sel) => `${sel}(around:${radius},${lat},${lng});`);
  return `[out:json][timeout:20];(${parts.join('')});out center tags 250;`;
}

export function normalize(elements = []) {
  return elements
    .map((el) => {
      const lat = el.lat ?? el.center?.lat;
      const lng = el.lon ?? el.center?.lon;
      if (lat == null || lng == null) return null;
      const t = el.tags || {};
      return {
        id: `${el.type}/${el.id}`,
        lat,
        lng,
        category: classify(t),
        name: t.name || t['name:uz'] || t['name:en'] || null,
        address: [t['addr:street'], t['addr:housenumber']].filter(Boolean).join(' ') || null,
        openingHours: t.opening_hours || null,
        website: t.website || null
      };
    })
    .filter(Boolean);
}

function cacheKey(lat, lng, radius, categories) {
  return `${lat.toFixed(3)}:${lng.toFixed(3)}:${radius}:${[...categories].sort().join(',')}`;
}

export async function nearbyPlaces({ lat, lng, radius = 1000, categories }) {
  if (!env.overpassEnabled) throw new HttpError(503, 'Xarita ma’lumotlari xizmati o‘chirilgan');
  const key = cacheKey(lat, lng, radius, categories);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return { places: hit.places, cached: true, fetchedAt: new Date(hit.at) };
  if (inflight.has(key)) return inflight.get(key);

  const task = (async () => {
    const wait = Math.max(0, 1100 - (Date.now() - lastRequestAt));
    if (wait) await new Promise((r) => setTimeout(r, wait));
    lastRequestAt = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch(env.overpassUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'DevForge-Education/1.0' },
        body: `data=${encodeURIComponent(buildQuery(lat, lng, radius, categories))}`,
        signal: controller.signal
      });
      if (!res.ok) throw new Error(`Overpass ${res.status}`);
      const json = await res.json();
      const places = normalize(json.elements);
      if (cache.size >= MAX_ENTRIES) cache.delete(cache.keys().next().value);
      cache.set(key, { at: Date.now(), places });
      return { places, cached: false, fetchedAt: new Date() };
    } catch (err) {
      if (hit) return { places: hit.places, cached: true, stale: true, fetchedAt: new Date(hit.at) };
      throw new HttpError(503, 'Atrofdagi joylar ma’lumotini hozir yuklab bo‘lmadi. Keyinroq qayta urinib ko‘ring.', { reason: err.name === 'AbortError' ? 'timeout' : 'unavailable' });
    } finally {
      clearTimeout(timer);
      inflight.delete(key);
    }
  })();
  inflight.set(key, task);
  return task;
}
