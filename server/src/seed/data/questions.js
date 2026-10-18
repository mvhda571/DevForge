const o = (key, label, traits) => ({ key, label, traits });

export default [
  {
    code: 'q01',
    dimension: 'interests',
    text: 'Bo‘sh vaqtingizda ko‘proq nima bilan shug‘ullanishni yoqtirasiz?',
    options: [
      o('a', 'Kompyuter, ilovalar yoki o‘yinlar qanday ishlashini sinab ko‘rish', { technical: 3, research: 1 }),
      o('b', 'Chizish, dizayn qilish yoki rasmga olish', { creative: 3, visual: 3 }),
      o('c', 'Odamlarga yordam berish, ko‘ngillilik', { care: 3, social: 2 }),
      o('d', 'Kitob o‘qish, munozara qilish', { communication: 2, justice: 2, research: 1 }),
      o('e', 'Kichik biznes yoki savdo g‘oyalarini o‘ylash', { business: 3, leadership: 1 }),
      o('f', 'Narsalarni yasash yoki ta’mirlash', { practical: 3, technical: 1 })
    ]
  },
  {
    code: 'q02',
    dimension: 'subjects',
    text: 'Qaysi fanlar sizga eng ko‘p yoqadi? (ko‘pi bilan 2 ta)',
    hint: 'Eng qiziqarli deb bilgan ikki fanni tanlang.',
    multiple: true,
    maxSelect: 2,
    options: [
      o('a', 'Matematika', { math: 3, analytical: 1 }),
      o('b', 'Informatika', { technical: 3, analytical: 1 }),
      o('c', 'Biologiya', { science: 3, care: 1 }),
      o('d', 'Kimyo', { science: 3, detail: 1 }),
      o('e', 'Fizika', { science: 1, practical: 2, math: 1, analytical: 1 }),
      o('f', 'Tarix va huquq', { justice: 3, communication: 1 }),
      o('g', 'Ingliz tili va adabiyot', { communication: 3, creative: 1 }),
      o('h', 'Tasviriy san’at', { visual: 3, creative: 2 }),
      o('i', 'Iqtisodiyot', { business: 3, math: 1 })
    ]
  },
  {
    code: 'q03',
    dimension: 'problem_solving',
    text: 'Murakkab muammoga duch kelsangiz, odatda nima qilasiz?',
    options: [
      o('a', 'Uni mantiqiy qismlarga ajratib, birma-bir yechaman', { analytical: 3, math: 1 }),
      o('b', 'G‘ayrioddiy, yangi yechim izlayman', { creative: 3 }),
      o('c', 'Boshqalar bilan maslahatlashaman', { social: 2, communication: 2 }),
      o('d', 'Darhol sinab ko‘raman va natijaga qarab o‘zgartiraman', { practical: 2, research: 2 }),
      o('e', 'Avval ma’lumot va dalillar to‘playman', { research: 3, detail: 1, justice: 1 })
    ]
  },
  {
    code: 'q04',
    dimension: 'creativity',
    text: 'Quyidagi ishlardan qaysi biri sizni ko‘proq ilhomlantiradi?',
    options: [
      o('a', 'Chiroyli va qulay ilova interfeysi yaratish', { visual: 3, creative: 2 }),
      o('b', 'Qiziqarli maqola, hikoya yoki video kontent tayyorlash', { creative: 2, communication: 2 }),
      o('c', 'Bino yoki mexanizm loyihasini chizish', { practical: 2, visual: 1, math: 2 }),
      o('d', 'Benuqson ishlaydigan dastur yoki tizim qurish', { technical: 3, analytical: 1 }),
      o('e', 'Aniq qoidalar asosida tartibli ish bajarish', { detail: 3 })
    ]
  },
  {
    code: 'q05',
    dimension: 'technical',
    text: 'Texnologiya haqida qaysi fikr sizga ko‘proq mos keladi?',
    options: [
      o('a', 'Dasturlar ichida nima bo‘layotganini bilish juda qiziq', { technical: 3, research: 1 }),
      o('b', 'Tizimlarni buzg‘unchilardan himoya qilish qiziq', { technical: 2, detail: 2, justice: 1 }),
      o('c', 'Ma’lumotlardan xulosa chiqarish menga yoqadi', { analytical: 3, math: 1 }),
      o('d', 'Texnologiyadan foydalanaman, lekin ichki tuzilishi qiziq emas', { social: 1, communication: 1 }),
      o('e', 'Qurilmalar, mashinalar va robotlar qiziq', { practical: 3, science: 1 })
    ]
  },
  {
    code: 'q06',
    dimension: 'communication',
    text: 'Jamoaviy ishda odatda qanday rol o‘ynaysiz?',
    options: [
      o('a', 'G‘oya beruvchi', { creative: 2, leadership: 1 }),
      o('b', 'Tashkilotchi va yetakchi', { leadership: 3, business: 1 }),
      o('c', 'Boshqalarga tushuntiruvchi', { communication: 3, social: 2 }),
      o('d', 'O‘z qismini mustaqil va aniq bajaruvchi', { detail: 2, technical: 1, analytical: 1 }),
      o('e', 'Hamma bilan til topishuvchi va yordam beruvchi', { care: 2, social: 2 })
    ]
  },
  {
    code: 'q07',
    dimension: 'environment',
    text: 'Qanday muhitda ishlashni xohlardingiz?',
    options: [
      o('a', 'Kompyuter qarshisida, ofisda yoki masofadan', { technical: 2, analytical: 1 }),
      o('b', 'Shifoxona yoki laboratoriyada', { science: 2, care: 2 }),
      o('c', 'Maktabda, odamlar orasida', { social: 3, communication: 1 }),
      o('d', 'Qurilish maydoni yoki ishlab chiqarishda', { practical: 3 }),
      o('e', 'O‘z kompaniyamda, erkin jadval bilan', { business: 2, leadership: 2 }),
      o('f', 'Ijodiy studiyada', { creative: 2, visual: 2 })
    ]
  },
  {
    code: 'q08',
    dimension: 'strengths',
    text: 'Do‘stlaringiz sizni ko‘pincha nima uchun maqtashadi?',
    options: [
      o('a', 'Aniqligim va tartibliligim uchun', { detail: 3 }),
      o('b', 'Gapga ustaligim va ishontira olishim uchun', { communication: 2, justice: 1, business: 1 }),
      o('c', 'Mehribonligim va sabrliligim uchun', { care: 3, social: 1 }),
      o('d', 'Tez hisoblashim va zehnim uchun', { math: 3, analytical: 1 }),
      o('e', 'Ijodkorligim va didim uchun', { creative: 2, visual: 2 }),
      o('f', 'Tashabbuskorligim uchun', { leadership: 3 })
    ]
  },
  {
    code: 'q09',
    dimension: 'learning',
    text: 'Yangi narsani qanday o‘rganishni afzal ko‘rasiz?',
    options: [
      o('a', 'Video, rasm va sxemalar orqali', { visual: 2, creative: 1 }),
      o('b', 'O‘zim qilib ko‘rib', { practical: 2, technical: 1 }),
      o('c', 'Kitob va manbalarni o‘qib', { research: 2, communication: 1, justice: 1 }),
      o('d', 'Boshqalar bilan muhokama qilib', { social: 2, communication: 2 }),
      o('e', 'Masala va mashqlar yechib', { math: 2, analytical: 2 })
    ]
  },
  {
    code: 'q10',
    dimension: 'ambitions',
    text: '10 yildan keyin qaysi natija sizni eng ko‘p quvontiradi?',
    options: [
      o('a', 'Ko‘p odam foydalanadigan mahsulot yaratganim', { technical: 2, business: 1, creative: 1 }),
      o('b', 'Odamlarning sog‘lig‘ini tiklashga hissa qo‘shganim', { care: 3, science: 2 }),
      o('c', 'O‘z kompaniyamga ega bo‘lganim', { business: 3, leadership: 2 }),
      o('d', 'Adolat va inson huquqlarini himoya qilganim', { justice: 3, communication: 1 }),
      o('e', 'Ko‘plab shogirdlar tarbiyalaganim', { social: 3, communication: 1 }),
      o('f', 'Betakror bino yoki ixtiro yaratganim', { practical: 2, visual: 2, creative: 1 })
    ]
  },
  {
    code: 'q11',
    dimension: 'tasks',
    text: 'Quyidagi vazifalardan qaysi birini tanlagan bo‘lardingiz?',
    options: [
      o('a', 'Savdo jadvalidan qonuniyat va trend topish', { analytical: 3, math: 2, business: 1 }),
      o('b', 'Ijtimoiy tarmoq uchun reklama kampaniyasi tuzish', { communication: 2, creative: 2, business: 1 }),
      o('c', 'Veb-saytdagi xavfsizlik zaifligini topish', { technical: 2, detail: 2, analytical: 1 }),
      o('d', 'Bemorlar tahlillari natijalarini o‘rganish', { science: 3, detail: 1, care: 1 }),
      o('e', 'Shartnomadagi xatolarni tekshirish', { justice: 3, detail: 2 })
    ]
  },
  {
    code: 'q12',
    dimension: 'news',
    text: 'Qaysi sohadagi yangiliklar sizni ko‘proq qiziqtiradi?',
    options: [
      o('a', 'Sun’iy intellekt va dasturlar', { technical: 3, research: 1 }),
      o('b', 'Tibbiyotdagi kashfiyotlar', { science: 3, care: 1 }),
      o('c', 'Iqtisodiyot va bozorlar', { business: 3, analytical: 1 }),
      o('d', 'Me’morchilik va shaharsozlik', { visual: 2, practical: 2 }),
      o('e', 'Ta’lim va psixologiya', { social: 2, care: 1, communication: 1 }),
      o('f', 'Huquq va jamiyat', { justice: 3, communication: 1 })
    ]
  },
  {
    code: 'q13',
    dimension: 'work_style',
    text: 'Ish uslubingizni qaysi gap yaxshiroq ta’riflaydi?',
    options: [
      o('a', 'Har bir tafsilotni diqqat bilan tekshiraman', { detail: 3 }),
      o('b', 'Umumiy manzarani ko‘rib, strategiya tuzaman', { leadership: 2, business: 1, analytical: 1 }),
      o('c', 'Tez sinab ko‘raman va xatolardan o‘rganaman', { practical: 2, technical: 1, creative: 1 }),
      o('d', 'Mavzuni chuqur tadqiq qilaman', { research: 3, science: 1 })
    ]
  },
  {
    code: 'q14',
    dimension: 'people_things',
    text: 'Ko‘proq nima bilan ishlash sizga yoqadi?',
    options: [
      o('a', 'Odamlar bilan', { social: 3, communication: 1, care: 1 }),
      o('b', 'Ma’lumotlar va raqamlar bilan', { analytical: 2, math: 2 }),
      o('c', 'G‘oyalar va dizaynlar bilan', { creative: 2, visual: 2 }),
      o('d', 'Texnika va qurilmalar bilan', { practical: 2, technical: 2 }),
      o('e', 'Matnlar va qonunlar bilan', { justice: 2, communication: 2, detail: 1 })
    ]
  }
].map((q, i) => ({ multiple: false, maxSelect: 1, hint: '', ...q, order: i + 1 }));
