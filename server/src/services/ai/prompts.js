export const ACTION_LABELS = {
  explain_again: 'Tushunmadim',
  simpler: 'Soddaroq tushuntir',
  another_example: 'Boshqa misol ber',
  step_by_step: 'Bosqichma-bosqich ko‘rsat',
  check_me: 'Meni tekshir',
  practice: 'Amaliy topshiriq ber',
  hint: 'Maslahat ber',
  free: 'Savol'
};

const ACTION_INSTRUCTIONS = {
  explain_again:
    'O‘quvchi tushunmadi. Mavzuni BUTUNLAY BOSHQACHA yondashuv bilan tushuntir: yangi o‘xshatish (analogiya), boshqa tartib. Dars matnini va avvalgi javoblaringni takrorlama.',
  simpler: 'Juda sodda tilda, qisqa gaplar bilan, 12 yoshli o‘quvchiga tushuntirgandek izohla. Atamalarni oddiy so‘zlar bilan almashtir.',
  another_example: 'Darsdagi va suhbatdagi misollardan farq qiladigan YANGI, hayotiy misol keltir va uni qisqacha tahlil qil.',
  step_by_step: 'Tushunchani raqamlangan bosqichlarga bo‘lib ko‘rsat. Har bir bosqichda nima uchun shunday qilinishini izohla.',
  check_me: 'O‘quvchini tekshirish uchun BITTA savol ber. Javobni oshkor qilma. Javobni kutayotganingni ayt.',
  practice: 'O‘quvchi darajasiga mos bitta amaliy topshiriq ber: shartlar, kutilgan natija va bitta yo‘naltiruvchi maslahat. Yechimni berma.',
  hint: 'To‘g‘ridan-to‘g‘ri javob berma. Sokratik usulda: yo‘naltiruvchi savol va kichik maslahat ber.',
  free:
    'O‘quvchi savoliga dars mavzusi doirasida javob ber. Agar u topshiriq yechimini so‘rasa, darhol to‘liq yechimni berma — avval maslahat va yo‘naltiruvchi savol ber. Agar u tekshiruv savoliga javob bergan bo‘lsa, javobini baholab, izoh ber.'
};

export function tutorSystemPrompt(lesson, { level = 'beginner', concept } = {}) {
  const definitions = (lesson.definitions || []).map((d) => `- ${d.term}: ${d.meaning}`).join('\n');
  const sections = (lesson.sections || []).map((s) => `## ${s.heading}\n${s.body}`).join('\n\n').slice(0, 6000);
  return [
    'Sen DevForge platformasining AI ustozisan. Faqat o‘zbek tilida (lotin yozuvi) javob ber.',
    'Qoidalar: aniq va do‘stona bo‘l; noaniq bo‘lsang, buni ochiq ayt; faktlarni to‘qib chiqarma; o‘quvchini o‘ylashga undab, Sokratik usuldan foydalan; javoblarni 250 so‘zdan oshirma; markdown ishlatish mumkin (ro‘yxat, `kod`).',
    lesson.notice ? `Muhim eslatma: ${lesson.notice}` : '',
    `O‘quvchi darajasi: ${level}.`,
    `Joriy dars: "${lesson.title}" (${lesson.difficulty}).`,
    concept ? `O‘quvchi aynan shu tushuncha haqida so‘rayapti: ${concept}` : '',
    `Dars maqsadlari:\n${(lesson.objectives || []).map((o) => `- ${o}`).join('\n')}`,
    definitions ? `Asosiy atamalar:\n${definitions}` : '',
    `Dars mazmuni:\n${sections}`
  ]
    .filter(Boolean)
    .join('\n\n');
}

export function tutorUserMessage(action, message) {
  const instruction = ACTION_INSTRUCTIONS[action] || ACTION_INSTRUCTIONS.free;
  return `[Harakat: ${ACTION_LABELS[action]}] ${instruction}${message ? `\n\nO‘quvchi xabari: ${message}` : ''}`;
}

export function advisorSystemPrompt(context) {
  return [
    'Sen DevForge platformasining AI kasb maslahatchisisan. Faqat o‘zbek tilida (lotin yozuvi) javob ber.',
    'Vazifang: kasb tanlash, ko‘nikmalar, o‘quv rejasi, loyihalar va universitetga qabul tushunchalari bo‘yicha amaliy maslahat berish.',
    'Qat’iy qoidalar:',
    '- Universitet talablari, grantlar, narxlar, muddatlar yoki statistikani TO‘QIB CHIQARMA. Aniq bilmasang, “aniq ma’lumotim yo‘q, rasmiy saytdan tekshiring” deb ayt.',
    '- Kasb testi natijasi ilmiy tashxis emasligini kerak bo‘lganda eslat.',
    '- Javoblarni amaliy, tuzilgan va 300 so‘zdan qisqa qil. Haftalik reja so‘ralsa, kunlar bo‘yicha jadval ber.',
    '- O‘quvchiga bosim o‘tkazma, sog‘lom o‘qish rejimini tavsiya qil.',
    `O‘quvchi haqida (faqat shu foydalanuvchiga tegishli, maxfiy):\n${context}`
  ].join('\n');
}

export const ADVISOR_FOLLOWUPS = {
  compare: ['Bu kasblar uchun qaysi fanlar muhim?', 'Qaysi biri bilan boshlashni tavsiya qilasiz?'],
  skills: ['Shu ko‘nikmalar uchun haftalik reja tuzib bering', 'Boshlang‘ich loyiha g‘oyalarini bering'],
  plan: ['Rejani qisqaroq qilib bering', 'Har kuni nimani takrorlashim kerak?'],
  projects: ['Birinchi loyihani bosqichlarga bo‘lib bering', 'Portfolio qanday tuziladi?'],
  university: ['Grant va stipendiya turlari qanday farq qiladi?', 'Qabulga tayyorlanish rejasini tuzing'],
  results: ['Natijalarimga mos haftalik reja tuzing', 'Ikkinchi o‘rindagi kasb haqida batafsil'],
  resources: ['Qaysi tartibda o‘rganishim kerak?', 'Ingliz tilini qanday yaxshilash mumkin?'],
  goals: ['Maqsadni haftalik qadamlarga bo‘ling', 'Motivatsiyani qanday saqlash mumkin?'],
  general: ['Menga qaysi kasb mos kelishi mumkin?', 'Haftalik o‘quv reja tuzib bering', 'Qanday loyihalar qilsam bo‘ladi?']
};

export function detectIntent(text = '') {
  const t = text.toLowerCase();
  if (/(farq|taqqos|solishtir|qaysi biri yaxshi|yoki)/.test(t)) return 'compare';
  if (/(haftalik|reja|jadval|kunlik)/.test(t)) return 'plan';
  if (/(loyiha|proyekt|portfolio|portfolyo)/.test(t)) return 'projects';
  if (/(universitet|oliygoh|grant|stipendiya|qabul|ielts|sat|kontrakt)/.test(t)) return 'university';
  if (/(natija|test|moslik|tavsiya qilingan)/.test(t)) return 'results';
  if (/(manba|kurs|kitob|resurs|qayerdan o‘rgan|qayerdan organ)/.test(t)) return 'resources';
  if (/(maqsad|motivats|vaqt|charcha)/.test(t)) return 'goals';
  if (/(ko‘nikma|konikma|skill|nimani o‘rgan|nimalarni o‘rgan|bilishim kerak)/.test(t)) return 'skills';
  return 'general';
}
