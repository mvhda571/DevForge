import { ADVISOR_FOLLOWUPS, detectIntent } from './prompts.js';

const pick = (arr, n) => (arr?.length ? arr[n % arr.length] : null);
const words = (s = '') =>
  String(s)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s‘’']/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

function fallbackSection(lesson, n) {
  const sections = lesson.sections || [];
  if (!sections.length) return lesson.summary;
  const s = sections[(sections.length - 1 - (n % sections.length) + sections.length) % sections.length];
  return `**${s.heading}** haqida boshqa tomondan qaraymiz: ${s.body.split('. ').slice(0, 3).join('. ')}.`;
}

export function demoTutor({ lesson, action, count = 0, message = '', concept = '', pendingCheck = null }) {
  const t = lesson.tutor || {};
  const focus = concept ? ` (“${concept}” tushunchasi)` : '';
  switch (action) {
    case 'explain_again': {
      const analogy = pick(t.analogies, count);
      const exhausted = !t.analogies?.length || count >= t.analogies.length;
      const body = exhausted ? fallbackSection(lesson, count) : analogy;
      return `Keling, boshqacha yondashamiz${focus}.\n\n${body}\n\nEndi o‘zingizga savol bering: bu o‘xshatishdagi qaysi qism darsdagi asosiy tushunchaga mos keladi?`;
    }
    case 'simpler': {
      const defs = (lesson.definitions || []).slice(0, 3).map((d) => `- **${d.term}** — ${d.meaning}`).join('\n');
      const body = count % 2 === 0 && t.simple ? t.simple : `Eng muhim so‘zlarni oddiy qilib aytamiz:\n${defs}`;
      return `Soddaroq qilib tushuntiraman${focus}:\n\n${body}`;
    }
    case 'another_example': {
      const ex = pick(t.extraExamples, count);
      if (ex) return `Mana yangi misol:\n\n${ex}\n\nBu misolni darsdagi misol bilan solishtiring: nimasi o‘xshash, nimasi farqli?`;
      const lessonEx = pick(lesson.examples, count + 1);
      return lessonEx ? `Misol: **${lessonEx.title}**\n\n${lessonEx.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}` : lesson.summary;
    }
    case 'step_by_step': {
      const steps = t.steps?.length ? t.steps : lesson.examples?.[count % (lesson.examples.length || 1)]?.steps || [];
      return `Bosqichma-bosqich ko‘rib chiqamiz${focus}:\n\n${steps.map((s, i) => `**${i + 1}-qadam.** ${s}`).join('\n')}\n\nQaysi qadam tushunarsiz bo‘lsa, menga yozing — o‘sha qadamni alohida tushuntiraman.`;
    }
    case 'check_me': {
      const check = pick(t.checks, count);
      if (!check) return { text: 'Bu dars uchun tekshiruv savollari hali qo‘shilmagan. Mini testni ishlab ko‘ring.' };
      return {
        text: `Tekshiramiz! Javobingizni yozing:\n\n**${check.question}**\n\n_Javobni o‘zingiz o‘ylab ko‘ring — keyin men baholayman._`,
        pendingCheck: count % t.checks.length
      };
    }
    case 'practice': {
      const task = pick(t.practice, count) || pick(lesson.exercises, count)?.prompt;
      return task
        ? `Amaliy topshiriq:\n\n${task}\n\nYechimni yozib ko‘ring. Qiynalsangiz, “Maslahat ber” tugmasini bosing — to‘liq yechimni emas, yo‘nalishni beraman.`
        : 'Bu dars uchun amaliy topshiriq hali qo‘shilmagan.';
    }
    case 'hint': {
      const hint = pick(t.hints, count) || pick(lesson.exercises, count)?.hint;
      return `Maslahat: ${hint || 'Masalani kichik qismlarga bo‘ling va har bir qismni alohida bajaring.'}\n\nEndi shu maslahat asosida keyingi qadam qanday bo‘lishi kerak deb o‘ylaysiz?`;
    }
    default:
      return freeTutorReply({ lesson, message, pendingCheck });
  }
}

function freeTutorReply({ lesson, message, pendingCheck }) {
  const t = lesson.tutor || {};
  if (pendingCheck !== null && pendingCheck !== undefined && t.checks?.[pendingCheck]) {
    const expected = t.checks[pendingCheck].answer;
    const expectedWords = new Set(words(expected));
    const given = words(message);
    const overlap = given.filter((w) => expectedWords.has(w)).length;
    const ratio = expectedWords.size ? overlap / Math.min(expectedWords.size, 6) : 0;
    const verdict =
      ratio >= 0.5
        ? 'Ajoyib, javobingiz asosan to‘g‘ri!'
        : ratio > 0.15
          ? 'Yaxshi urinish, javobingizda to‘g‘ri fikrlar bor, lekin to‘liq emas.'
          : 'Bu safar javob kutilgan fikrdan uzoqroq. Hech qisi yo‘q — keling, birga ko‘ramiz.';
    return { text: `${verdict}\n\nNamunaviy javob: ${expected}\n\n_Eslatma: demo rejimda javobingiz kalit so‘zlar bo‘yicha taxminan baholandi._`, clearCheck: true };
  }
  const q = message.toLowerCase();
  const def = (lesson.definitions || []).find((d) => q.includes(d.term.toLowerCase().split(' ')[0]));
  if (def) {
    return `**${def.term}** — ${def.meaning}\n\nO‘ylab ko‘ring: bu tushuncha darsdagi misolda qayerda ishlatilgan edi?`;
  }
  const section = (lesson.sections || []).find((s) => words(s.heading).some((w) => q.includes(w)));
  if (section) return `${section.body.split('. ').slice(0, 3).join('. ')}.\n\nYana nimani aniqlashtirishimni xohlaysiz?`;
  return `Yaxshi savol. Demo rejimda men faqat shu dars materiallari asosida javob bera olaman. “${lesson.title}” darsining asosiy g‘oyasi:\n\n${lesson.summary}\n\nAniqroq yordam uchun quyidagi tugmalardan foydalaning: “Tushunmadim”, “Boshqa misol ber” yoki “Maslahat ber”.`;
}

export function demoAdvisor({ message, ctx, careers }) {
  const intent = detectIntent(message);
  const top = ctx.result?.top || [];
  const daily = ctx.profile?.dailyMinutes || 30;
  const days = ctx.profile?.studyDaysPerWeek || 5;
  const lower = message.toLowerCase();
  const mentioned = careers.filter((c) => lower.includes(c.name.toLowerCase().split(' ')[0].slice(0, 6)));
  const primary = mentioned[0] || careers.find((c) => c.slug === top[0]?.slug) || null;
  let text;

  switch (intent) {
    case 'compare': {
      const pair = mentioned.length >= 2 ? mentioned.slice(0, 2) : top.slice(0, 2).map((t) => careers.find((c) => c.slug === t.slug)).filter(Boolean);
      if (pair.length < 2) {
        text = 'Taqqoslash uchun ikkita kasb nomini yozing, masalan: “Frontend dasturchi va UI/UX dizayner farqi nima?” Shuningdek, “Kasblar” bo‘limidagi taqqoslash vositasidan foydalanishingiz mumkin.';
      } else {
        text = pair
          .map((c) => `**${c.name}**\n- Mohiyati: ${c.description}\n- Asosiy ko‘nikmalar: ${c.skills.slice(0, 5).join(', ')}\n- Muhim fanlar: ${c.schoolSubjects.join(', ')}\n- Ish muhiti: ${c.workEnvironment || 'turlicha'}`)
          .join('\n\n');
        text += '\n\nTanlashda qaysi ish turi sizni ko‘proq quvontirishini o‘ylang va har ikkisidan bittadan kichik amaliy topshiriq bajarib ko‘ring.';
      }
      break;
    }
    case 'plan': {
      const minutes = daily;
      const focus = primary ? primary.name : 'tanlagan yo‘nalishingiz';
      const dayNames = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];
      const tasks = ['Yangi dars o‘qish', 'Darsdagi mashqlar', 'Yangi dars + mini test', 'Takrorlash va xatolar ustida ishlash', 'Kichik amaliy loyiha', 'Haftani yakunlash: test va xulosa', 'Dam olish yoki yengil takrorlash'];
      text = `**${focus} bo‘yicha haftalik reja** (kuniga ~${minutes} daqiqa, haftasiga ${days} kun):\n\n${dayNames
        .slice(0, days)
        .map((d, i) => `- **${d}:** ${tasks[i]}`)
        .join('\n')}\n\nHar kuni oxirida 5 daqiqa ichida nimani o‘rganganingizni qisqa yozib qo‘ying. Charchasangiz, rejani qisqartirish mutlaqo normal.`;
      break;
    }
    case 'skills': {
      const c = primary;
      text = c
        ? `**${c.name}** uchun asosiy ko‘nikmalar:\n${c.skills.map((s) => `- ${s}`).join('\n')}\n\nTavsiya etilgan fanlar: ${c.schoolSubjects.join(', ')}.\n\nBoshlash uchun: ${c.nextAction}`
        : 'Qaysi kasb uchun ko‘nikmalar kerakligini yozing (masalan, “Data analyst uchun qanday ko‘nikmalar kerak?”) yoki avval kasb testini topshiring.';
      break;
    }
    case 'projects': {
      const level = ctx.profile?.level || 'beginner';
      const ideas = {
        beginner: ['Shaxsiy “Men haqimda” sahifasi', 'Kundalik xarajatlar ro‘yxati (jadvalda yoki oddiy dasturda)', 'Sevimli fan bo‘yicha 10 savollik viktorina'],
        intermediate: ['Ob-havo ilovasi (ochiq API bilan)', 'Maktab kutubxonasi uchun kitoblar katalogi', 'Shaxsiy moliya hisob-kitobi va diagrammalar'],
        advanced: ['To‘liq stekli vazifalar menejeri (autentifikatsiya bilan)', 'Ma’lumotlar tahlili bo‘yicha tadqiqot hisoboti', 'Mahalliy muammoni hal qiladigan start-up prototipi']
      }[level];
      text = `Darajangizga mos loyiha g‘oyalari:\n${ideas.map((i, n) => `${n + 1}. ${i}`).join('\n')}\n\nHar bir loyihani kichik bosqichlarga bo‘ling, natijani GitHub yoki portfolioda saqlang.`;
      break;
    }
    case 'university':
      text =
        'Universitetga qabul bo‘yicha umumiy tushunchalar:\n- **Grant** — o‘qish to‘lovi davlat yoki tashkilot tomonidan qoplanadi; tanlov asosida beriladi.\n- **Kontrakt** — o‘qish to‘lovini talaba o‘zi to‘laydi.\n- **Stipendiya** — o‘qish davomida beriladigan moliyaviy yordam.\n- Xorijiy universitetlar odatda til sertifikati (IELTS, TOEFL, TOPIK, HSK va boshqalar), motivatsion xat va hujjatlar talab qiladi.\n\n**Muhim:** aniq talablar, narxlar va muddatlar har yili o‘zgaradi. Men ularni taxmin qilmayman — har doim universitetning rasmiy saytini tekshiring. “Universitetlar” bo‘limida rasmiy saytlarga havolalar bor.';
      break;
    case 'results':
      text = top.length
        ? `Kasb testingiz bo‘yicha eng mos yo‘nalishlar:\n${top.map((r, i) => `${i + 1}. **${r.name}** — ${r.score}% taxminiy moslik. ${r.reasons?.[0] || ''}`).join('\n')}\n\nBu natija javoblaringizdagi xususiyatlar va kasb profillarining og‘irliklari asosida hisoblangan; ilmiy tashxis emas. Eng qiziq tuyulgan kasb uchun yo‘l xaritasini yaratib, bir-ikki dars o‘qib ko‘ring.`
        : 'Hali kasb testini topshirmagansiz. “Kasbimni topish” bo‘limida 14 ta savolga javob bering — natijalarni birga tahlil qilamiz.';
      break;
    case 'resources':
      text =
        'Ishonchli o‘quv manbalarini tanlash bo‘yicha maslahatlar:\n- Avval DevForge yo‘l xaritangizdagi darslarni ketma-ket o‘qing.\n- Dasturlash uchun rasmiy hujjatlar (masalan, MDN Web Docs, React rasmiy sayti) eng ishonchli manba.\n- Fanlar uchun maktab darsliklari va ochiq onlayn kurslar (Khan Academy kabi) foydali.\n- Ingliz tili uchun har kuni 15 daqiqa texnik matn o‘qish odat qiling.\n\nManbalarni ko‘paytirishdan ko‘ra, bitta manbani oxirigacha o‘qish samaraliroq.';
      break;
    case 'goals':
      text = `Maqsad qo‘yish uchun SMART usulini sinab ko‘ring: aniq, o‘lchanadigan, erishiladigan, muhim va muddatli.\n\nMasalan: “4 hafta ichida yo‘l xaritamdagi 8 ta darsni tugataman va har bir mini testdan kamida 80% olaman”.\n\nHozirgi rejangiz: kuniga ${daily} daqiqa, haftasiga ${days} kun. Bu barqaror ritm — asosiysi izchillik, tezlik emas. Dam olish kunlari ham muhim.`;
      break;
    default:
      text = `Salom, ${ctx.user.name}! Men demo rejimdagi maslahatchiman va oldindan tayyorlangan bilimlar asosida javob beraman.\n\nMen quyidagilarda yordam bera olaman:\n- kasblar farqini tushuntirish\n- kerakli ko‘nikmalarni aytish\n- haftalik o‘quv reja tuzish\n- loyiha g‘oyalari berish\n- universitetga qabul tushunchalarini izohlash\n- kasb testi natijalaringizni tahlil qilish`;
  }
  return { text, followups: ADVISOR_FOLLOWUPS[intent] || ADVISOR_FOLLOWUPS.general, intent };
}
