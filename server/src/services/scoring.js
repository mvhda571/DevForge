import { TRAIT_KEYS, traitLabel } from './traits.js';

const toObj = (m) => (m instanceof Map ? Object.fromEntries(m) : m || {});

export function maxPossibleByTrait(questions) {
  const max = Object.fromEntries(TRAIT_KEYS.map((k) => [k, 0]));
  for (const q of questions) {
    const picks = q.multiple ? Math.max(1, q.maxSelect || 1) : 1;
    for (const trait of TRAIT_KEYS) {
      const values = q.options.map((o) => Number(toObj(o.traits)[trait] || 0)).sort((a, b) => b - a);
      max[trait] += values.slice(0, picks).reduce((s, v) => s + v, 0);
    }
  }
  return max;
}

export function rawTraitPoints(questions, answers) {
  const points = Object.fromEntries(TRAIT_KEYS.map((k) => [k, 0]));
  const ans = toObj(answers);
  for (const q of questions) {
    const chosen = ans[q.code] || [];
    const limit = q.multiple ? Math.max(1, q.maxSelect || 1) : 1;
    for (const key of chosen.slice(0, limit)) {
      const opt = q.options.find((o) => o.key === key);
      if (!opt) continue;
      for (const [trait, val] of Object.entries(toObj(opt.traits))) {
        if (trait in points) points[trait] += Number(val) || 0;
      }
    }
  }
  return points;
}

export function computeTraitProfile(questions, answers) {
  const max = maxPossibleByTrait(questions);
  const raw = rawTraitPoints(questions, answers);
  const absolute = {};
  for (const t of TRAIT_KEYS) absolute[t] = max[t] > 0 ? raw[t] / max[t] : 0;
  const peak = Math.max(...Object.values(absolute), 0);
  const relative = {};
  for (const t of TRAIT_KEYS) relative[t] = peak > 0 ? round(absolute[t] / peak, 3) : 0;
  return { raw, max, absolute, relative };
}

export function scoreCareer(career, relativeProfile) {
  const weights = toObj(career.traits);
  let weighted = 0;
  let totalWeight = 0;
  const contributions = [];
  for (const [trait, w] of Object.entries(weights)) {
    const weight = Number(w) || 0;
    if (weight <= 0) continue;
    const userScore = relativeProfile[trait] || 0;
    weighted += weight * userScore;
    totalWeight += weight;
    contributions.push({ trait, label: traitLabel(trait), weight, userScore: round(userScore, 3), points: round(weight * userScore, 3) });
  }
  const score = totalWeight > 0 ? Math.round((weighted / totalWeight) * 100) : 0;
  contributions.sort((a, b) => b.points - a.points);
  return { score, contributions };
}

export function rankCareers(careers, relativeProfile, favoriteSubjects = []) {
  const favs = favoriteSubjects.map((s) => s.toLowerCase());
  return careers
    .map((career) => {
      const { score, contributions } = scoreCareer(career, relativeProfile);
      const matchedStrengths = contributions.filter((c) => c.weight >= 2 && c.userScore >= 0.6).map((c) => c.label);
      const matchedSubjects = (career.schoolSubjects || []).filter((s) => favs.includes(s.toLowerCase()));
      return {
        career: career._id,
        slug: career.slug,
        name: career.name,
        score,
        contributions,
        matchedStrengths,
        reasons: buildReasons(career, contributions, matchedSubjects)
      };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

export function buildReasons(career, contributions, matchedSubjects = []) {
  const reasons = contributions
    .filter((c) => c.userScore > 0)
    .slice(0, 3)
    .map((c) => {
      const importance = c.weight >= 3 ? 'juda muhim' : c.weight >= 2 ? 'muhim' : 'foydali';
      return `${c.label}: javoblaringizda ${Math.round(c.userScore * 100)}% darajada namoyon bo‘ldi, bu esa ${career.name.toLowerCase()} uchun ${importance} xususiyat.`;
    });
  if (matchedSubjects.length) {
    reasons.push(`Sevimli fanlaringiz (${matchedSubjects.join(', ')}) bu kasb uchun tavsiya etilgan fanlarga mos keladi.`);
  }
  const gap = contributions.find((c) => c.weight >= 2 && c.userScore < 0.35);
  if (gap) reasons.push(`Rivojlantirish kerak bo‘lgan jihat: ${gap.label.toLowerCase()}.`);
  return reasons;
}

function round(n, d = 2) {
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

export const SCORING_METHOD = {
  version: 'weighted-traits-v1',
  summary:
    'Har bir javob variantiga 15 ta xususiyat bo‘yicha ball biriktirilgan. Har bir xususiyat balingiz uning maksimal mumkin bo‘lgan qiymatiga bo‘linadi, so‘ng eng kuchli xususiyatingizga nisbatan 0–1 oralig‘ida o‘lchanadi. Har bir kasbning xususiyatlar og‘irligi (1–3) bor. Moslik foizi = Σ(og‘irlik × sizning balingiz) ÷ Σ(og‘irlik) × 100.',
  disclaimer:
    'Bu natija ilmiy tasdiqlangan psixologik tashxis emas. U javoblaringiz asosida taxminiy yo‘nalish beradi va qaror qabul qilishda yordamchi vosita sifatida ishlatilishi kerak.'
};
