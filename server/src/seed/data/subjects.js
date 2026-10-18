export const subjects = [
  { slug: 'matematika', name: 'Matematika', icon: 'Sigma', color: 'blue', order: 1, description: 'Algebra, funksiyalar, mantiq, foiz, nisbat va statistika.' },
  { slug: 'informatika', name: 'Informatika', icon: 'Cpu', color: 'violet', order: 2, description: 'Raqamli dunyo asoslari va algoritmik fikrlash.' },
  { slug: 'web', name: 'Web dasturlash', icon: 'Code2', color: 'indigo', order: 3, description: 'HTML, CSS, JavaScript, React, Git va loyihani joylashtirish.' },
  { slug: 'ingliz-tili', name: 'Ingliz tili', icon: 'Languages', color: 'sky', order: 4, description: 'Asosiy grammatika va dasturchilar uchun texnik ingliz tili.' },
  { slug: 'biologiya', name: 'Biologiya', icon: 'Dna', color: 'emerald', order: 5, description: 'Hujayradan odam organizmigacha.' },
  { slug: 'kimyo', name: 'Kimyo', icon: 'FlaskConical', color: 'teal', order: 6, description: 'Atom tuzilishi, kimyoviy bog‘lar va organik kimyo asoslari.' },
  { slug: 'iqtisodiyot', name: 'Iqtisodiyot', icon: 'TrendingUp', color: 'amber', order: 7, description: 'Talab va taklif, pul, inflyatsiya va shaxsiy moliya.' }
];

export const topics = [
  { slug: 'algebra-asoslari', subject: 'matematika', name: 'Algebra asoslari', stage: 'beginner', order: 1, objectives: ['Tenglamalarni yechish', 'Funksiya va grafikni tushunish'] },
  { slug: 'mantiq', subject: 'matematika', name: 'Mantiqiy fikrlash', stage: 'beginner', order: 2, objectives: ['Mantiqiy mulohaza qurish', 'Shartli fikrlash'] },
  { slug: 'amaliy-matematika', subject: 'matematika', name: 'Foiz va nisbat', stage: 'beginner', order: 3, objectives: ['Foizlarni hisoblash', 'Nisbat va proporsiyadan foydalanish'] },
  { slug: 'statistika', subject: 'matematika', name: 'Statistika asoslari', stage: 'intermediate', order: 4, prerequisites: ['amaliy-matematika'], objectives: ['O‘rtacha, mediana va modani hisoblash', 'Ma’lumotlardan xulosa chiqarish'] },

  { slug: 'raqamli-asoslar', subject: 'informatika', name: 'Raqamli dunyo asoslari', stage: 'beginner', order: 1, objectives: ['Kompyuter ma’lumotni qanday saqlashini tushunish'] },
  { slug: 'algoritmik-fikrlash', subject: 'informatika', name: 'Algoritmik fikrlash', stage: 'beginner', order: 2, prerequisites: ['mantiq'], objectives: ['Algoritm tuzish', 'Muammoni qismlarga ajratish'] },

  { slug: 'html-asoslari', subject: 'web', name: 'HTML asoslari', stage: 'beginner', order: 1, objectives: ['Veb-sahifa tuzilishini yaratish', 'Semantik teglardan foydalanish'] },
  { slug: 'css-maket', subject: 'web', name: 'CSS va sahifa maketi', stage: 'beginner', order: 2, prerequisites: ['html-asoslari'], objectives: ['Sahifani bezash', 'Flexbox va Grid bilan maket qurish', 'Moslashuvchan dizayn'] },
  { slug: 'javascript-asoslari', subject: 'web', name: 'JavaScript asoslari', stage: 'intermediate', order: 3, prerequisites: ['algoritmik-fikrlash'], objectives: ['O‘zgaruvchi va funksiyalar', 'Massiv va obyektlar bilan ishlash'] },
  { slug: 'brauzer-js', subject: 'web', name: 'Brauzerda JavaScript', stage: 'intermediate', order: 4, prerequisites: ['javascript-asoslari', 'html-asoslari'], objectives: ['DOM bilan ishlash', 'Asinxron kod va Fetch API'] },
  { slug: 'git', subject: 'web', name: 'Git va hamkorlik', stage: 'intermediate', order: 5, objectives: ['Versiyalarni boshqarish', 'GitHub’da ishlash'] },
  { slug: 'react', subject: 'web', name: 'React bilan interfeys', stage: 'advanced', order: 6, prerequisites: ['brauzer-js'], objectives: ['Komponentlar, props va state', 'Hooklar, marshrutlash va API'] },
  { slug: 'loyiha', subject: 'web', name: 'Loyiha va joylashtirish', stage: 'advanced', order: 7, prerequisites: ['git'], objectives: ['Loyihani yig‘ish va internetga joylash'] },

  { slug: 'ingliz-asoslari', subject: 'ingliz-tili', name: 'Ingliz tili asoslari', stage: 'beginner', order: 1, objectives: ['Asosiy zamonlar', 'Texnik lug‘at'] },
  { slug: 'texnik-ingliz', subject: 'ingliz-tili', name: 'Texnik ingliz tili', stage: 'intermediate', order: 2, prerequisites: ['ingliz-asoslari'], objectives: ['Hujjatlarni o‘qish', 'Professional muloqot'] },

  { slug: 'hujayra', subject: 'biologiya', name: 'Hujayra biologiyasi', stage: 'beginner', order: 1, objectives: ['Hujayra tuzilishini bilish'] },
  { slug: 'odam-organizmi', subject: 'biologiya', name: 'Odam organizmi', stage: 'intermediate', order: 2, prerequisites: ['hujayra'], objectives: ['Organ tizimlari', 'Fiziologiya asoslari'] },

  { slug: 'umumiy-kimyo', subject: 'kimyo', name: 'Umumiy kimyo', stage: 'beginner', order: 1, objectives: ['Atom tuzilishi', 'Kimyoviy bog‘lar'] },
  { slug: 'organik-kimyo', subject: 'kimyo', name: 'Organik kimyo', stage: 'intermediate', order: 2, prerequisites: ['umumiy-kimyo'], objectives: ['Uglerod birikmalari asoslari'] },

  { slug: 'iqtisod-asoslari', subject: 'iqtisodiyot', name: 'Iqtisodiyot asoslari', stage: 'beginner', order: 1, objectives: ['Bozor qanday ishlashini tushunish'] },
  { slug: 'moliyaviy-savodxonlik', subject: 'iqtisodiyot', name: 'Moliyaviy savodxonlik', stage: 'beginner', order: 2, objectives: ['Shaxsiy byudjet tuzish'] }
];
