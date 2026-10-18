import { single, multiple, tf, short } from './helpers.js';

export default [
  {
    slug: 'js-variables',
    topic: 'javascript-asoslari',
    title: 'JavaScript: o‘zgaruvchilar va ma’lumot turlari',
    summary: 'let, const, ma’lumot turlari va oddiy amallar — JavaScript bilan ishlashning birinchi qadami.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['let va const farqini tushuntirish', 'Asosiy ma’lumot turlarini bilish', 'Shablon satrlardan foydalanish'],
    definitions: [
      { term: 'O‘zgaruvchi', meaning: 'Qiymatni saqlash uchun nomlangan joy.' },
      { term: 'const', meaning: 'Qayta tayinlab bo‘lmaydigan o‘zgaruvchi e’lon qilish kalit so‘zi.' },
      { term: 'let', meaning: 'Qiymati keyin o‘zgarishi mumkin bo‘lgan o‘zgaruvchi e’lon qilish kalit so‘zi.' },
      { term: 'Ma’lumot turi', meaning: 'Qiymat qaysi turga mansubligi: string, number, boolean, null, undefined, object.' }
    ],
    sections: [
      { heading: 'const va let', body: 'Zamonaviy JavaScriptda ikki kalit so‘z ishlatiladi. Odatiy qoida: hammasini `const` bilan e’lon qiling, faqat qiymat o‘zgarishi kerak bo‘lsa `let` ishlating. Eski `var` dan foydalanmaslik tavsiya etiladi.', code: 'const ism = "Madina";\nlet ball = 80;\nball = ball + 10; // 90\n// ism = "Aziz"; // Xato! const qayta tayinlanmaydi' },
      { heading: 'Asosiy turlar', body: '- **string** — matn: `"salom"`\n- **number** — son: `42`, `3.14`\n- **boolean** — `true` yoki `false`\n- **undefined** — qiymat berilmagan\n- **null** — ataylab “bo‘sh”\n- **object** va **array** — murakkab tuzilmalar\n\nTurini bilish uchun `typeof` operatori: `typeof 42` → `"number"`.' },
      { heading: 'Shablon satrlar', body: 'Teskari qo‘shtirnoq (backtick) ichida `${}` yordamida o‘zgaruvchilarni matnga qo‘yish mumkin.', code: 'const ism = "Jasur";\nconst yosh = 16;\nconsole.log(`${ism} ${yosh} yoshda`); // Jasur 16 yoshda' }
    ],
    examples: [
      { title: 'Xarid hisoblash', steps: ['Narx va sonni const bilan saqlaymiz.', 'Jami summani hisoblaymiz.', 'Natijani shablon satr bilan chiqaramiz.'], code: 'const narx = 12000;\nconst soni = 3;\nconst jami = narx * soni;\nconsole.log(`Jami: ${jami} so‘m`);', result: 'Jami: 36000 so‘m' }
    ],
    exercises: [
      { prompt: 'Ismingiz va sevimli faningizni o‘zgaruvchilarga saqlang va “Men … , sevimli fanim …” gapini chiqaring.', hint: 'Shablon satr ishlating.', solution: 'const ism = "…"; const fan = "…"; console.log(`Men ${ism}, sevimli fanim ${fan}`);' },
      { prompt: 'typeof "5" va typeof 5 natijalari qanday?', hint: 'Qo‘shtirnoq ichidagi son — matn.', solution: '"string" va "number".' }
    ],
    summaryPoints: ['Avval const, kerak bo‘lsa let.', 'Asosiy turlar: string, number, boolean, null, undefined.', 'typeof turini aniqlaydi.', 'Shablon satr: `${o‘zgaruvchi}`.'],
    tutor: {
      simple: 'O‘zgaruvchi — ustiga nom yozilgan quti. const — muhrlangan quti, ichidagini almashtirib bo‘lmaydi. let — oddiy quti, ichidagini almashtirsa bo‘ladi.',
      analogies: ['O‘zgaruvchilarni maktab shkafchalariga o‘xshating: har birining nomi (raqami) bor va ichida narsa saqlanadi. const — qulfi kodini o‘zgartirib bo‘lmaydigan shkafcha, let — kodini o‘zgartirish mumkin bo‘lgani.', 'Ma’lumot turlari — oshxonadagi idishlar: suyuqlik (string) shishada, donlar (number) bankada, “bor/yo‘q” belgisi (boolean) chiroq kaliti kabi. Har bir turga mos amallar bor.'],
      extraExamples: ['Harorat: let harorat = 18; harorat = harorat + 5; — kunduzi harorat oshdi, shuning uchun let.', 'Mantiqiy qiymat: const royxatdanOtgan = true; if (royxatdanOtgan) console.log("Xush kelibsiz!");'],
      steps: ['Qiymat o‘zgaradimi? Yo‘q bo‘lsa const, ha bo‘lsa let tanlang.', 'Tushunarli nom bering (masalan, umumiyBall, x emas).', '= belgisi bilan qiymat tayinlang.', 'console.log() bilan natijani tekshiring.'],
      hints: ['“Assignment to constant variable” xatosi chiqdimi? const bilan e’lon qilingan o‘zgaruvchini qayta tayinlayapsiz.', '"5" + 3 natijasi nega "53"? Bir tomon matn bo‘lsa, + birlashtiradi.'],
      practice: ['Do‘kon kassasi: 3 ta mahsulot narxini o‘zgaruvchilarga saqlang, jami summani va 10% chegirmali summani hisoblang.', 'Har xil turdagi 5 ta qiymat yarating va har biri uchun typeof natijasini chiqaring.'],
      checks: [
        { question: 'let va const farqi nima?', answer: 'const bilan e’lon qilingan o‘zgaruvchini qayta tayinlab bo‘lmaydi, let bilan esa mumkin.' },
        { question: '"10" + 5 natijasi qanday va nima uchun?', answer: '"105", chunki bir tomon matn bo‘lgani uchun + amali satrlarni birlashtiradi.' }
      ]
    },
    quiz: [
      single('Qiymati o‘zgarmaydigan o‘zgaruvchi qanday e’lon qilinadi?', ['let', 'const', 'var', 'static'], 'const', 'const qayta tayinlanmaydi.', 'let qiymatni o‘zgartirishga ruxsat beradi.', 'const'),
      single('typeof true natijasi?', ['"true"', '"boolean"', '"bool"', '"string"'], '"boolean"', 'true — boolean turidagi qiymat.', 'Mantiqiy qiymatlar turi boolean.', 'Ma’lumot turlari'),
      single('const x = 5; x = 6; qatorlari bajarilganda nima bo‘ladi?', ['x 6 bo‘ladi', 'Xatolik yuz beradi', 'x 11 bo‘ladi', 'Hech narsa'], 'Xatolik yuz beradi', 'const qayta tayinlanmaydi — TypeError.', 'const o‘zgaruvchiga yangi qiymat berib bo‘lmaydi.', 'const'),
      short('"3" + 4 ifodasining natijasini yozing (qo‘shtirnoqsiz).', ['34'], 'Matn + son = matn birlashuvi: "34".', 'Bir tomon string bo‘lsa, + birlashtiradi, qo‘shmaydi.', 'Tur o‘zgarishi'),
      tf('Shablon satrlarda o‘zgaruvchi ${} ichida yoziladi.', true, '`Salom, ${ism}` kabi.', 'Teskari qo‘shtirnoq va ${} birgalikda ishlatiladi.', 'Shablon satr')
    ]
  },
  {
    slug: 'js-functions',
    topic: 'javascript-asoslari',
    title: 'Funksiyalar',
    summary: 'Kodni qayta ishlatish uchun funksiyalar: parametrlar, return, strelkali funksiyalar va ko‘rinish sohasi.',
    difficulty: 'beginner',
    durationMinutes: 30,
    order: 2,
    objectives: ['Funksiya e’lon qilish va chaqirish', 'Parametr va argument farqini tushuntirish', 'return va strelkali funksiyalardan foydalanish'],
    definitions: [
      { term: 'Funksiya', meaning: 'Nomlangan, qayta ishlatiladigan kod bloki.' },
      { term: 'Parametr', meaning: 'Funksiya e’lonidagi o‘zgaruvchi nomi.' },
      { term: 'Argument', meaning: 'Funksiya chaqirilganda beriladigan haqiqiy qiymat.' },
      { term: 'return', meaning: 'Funksiyadan natija qaytaradi va uning ishini tugatadi.' }
    ],
    sections: [
      { heading: 'Nega funksiya kerak?', body: 'Bir xil kodni ko‘p joyda yozish o‘rniga, uni funksiyaga o‘rab, kerak paytda chaqiramiz. Bu xatolarni kamaytiradi va kodni o‘qishni osonlashtiradi.' },
      { heading: 'E’lon qilish va chaqirish', body: 'Funksiya parametrlar qabul qiladi va `return` orqali natija qaytaradi.', code: 'function salomlash(ism) {\n  return `Salom, ${ism}!`;\n}\n\nconsole.log(salomlash("Laylo")); // Salom, Laylo!' },
      { heading: 'Strelkali funksiyalar', body: 'Qisqa yozuv. Agar tanasi bitta ifoda bo‘lsa, `return` va jingalak qavslar shart emas.', code: 'const kvadrat = (x) => x * x;\nconst qoshish = (a, b) => a + b;\nconsole.log(kvadrat(4)); // 16' }
    ],
    examples: [
      { title: 'Baho funksiyasi', steps: ['Ballni parametr sifatida olamiz.', 'Shartlar bilan bahoni aniqlaymiz.', 'Natijani return qilamiz.'], code: 'function baho(ball) {\n  if (ball >= 86) return "A’lo";\n  if (ball >= 71) return "Yaxshi";\n  if (ball >= 56) return "Qoniqarli";\n  return "Qayta topshirish";\n}\nconsole.log(baho(78)); // Yaxshi' }
    ],
    exercises: [
      { prompt: 'Ikki sonning kattasini qaytaruvchi kattasi(a, b) funksiyasini yozing.', hint: 'if yoki uchlik operator ishlating.', solution: 'const kattasi = (a, b) => (a > b ? a : b);' },
      { prompt: 'Selsiydan Farengeytga o‘tkazuvchi funksiya yozing (F = C × 9/5 + 32).', hint: 'Bitta parametr yetarli.', solution: 'const farengeyt = (c) => c * 9 / 5 + 32;' }
    ],
    summaryPoints: ['Funksiya — qayta ishlatiladigan kod bloki.', 'Parametr — e’londa, argument — chaqiruvda.', 'return natija qaytaradi.', 'Strelkali funksiyalar qisqa yoziladi.'],
    tutor: {
      simple: 'Funksiya — sharbat mashinasi. Unga meva (argument) solasiz, u ishlov beradi va sharbat (return) qaytaradi. Har safar mashinani qaytadan qurish shart emas — shunchaki ishlatasiz.',
      analogies: ['Funksiyani telefoningizdagi tezkor raqamga o‘xshating: bir marta sozlaysiz (e’lon qilasiz), keyin bitta tugma bilan (chaqiruv) butun jarayon bajariladi.', 'Retsept kartochkasi: “X kishilik choy damlash” — X parametr. Bugun 3 kishi uchun (argument 3), ertaga 5 kishi uchun ishlatasiz. Retsept bitta, natija har xil.'],
      extraExamples: ['Chegirma funksiyasi: const chegirma = (narx, foiz) => narx * (1 - foiz / 100); chegirma(200000, 25) → 150000.', 'Juftlikni tekshirish: const juftmi = (n) => n % 2 === 0; juftmi(7) → false.'],
      steps: ['Funksiya nima qilishi kerakligini bir gapda yozing.', 'Qanday kirish ma’lumotlari (parametrlar) kerakligini aniqlang.', 'Tanasida hisob-kitobni yozing.', 'Natijani return qiling.', 'Turli argumentlar bilan chaqirib tekshiring.'],
      hints: ['Funksiya undefined qaytaryaptimi? return yozishni unutmadingizmi?', 'Funksiyani faqat e’lon qildingizmi yoki chaqirdingiz ham? Chaqirish uchun nomidan keyin () kerak.'],
      practice: ['Talabaning 3 ta fan bali bo‘yicha o‘rtacha ballni hisoblaydigan funksiya yozing.', 'Parol uzunligi 8 dan kam bo‘lsa "Zaif", aks holda "Yaxshi" qaytaruvchi funksiya yozing.'],
      checks: [
        { question: 'Parametr va argumentning farqi nima?', answer: 'Parametr funksiya e’lonidagi nom, argument esa chaqirilganda berilgan haqiqiy qiymat.' },
        { question: 'return yozilmagan funksiya nima qaytaradi?', answer: 'undefined.' }
      ]
    },
    quiz: [
      single('const f = (x) => x + 2; f(5) natijasi?', ['5', '7', '52', 'undefined'], '7', '5 + 2 = 7.', 'x o‘rniga 5 qo‘yiladi va 2 qo‘shiladi.', 'Strelkali funksiya'),
      single('function salom(ism) { ... } — bu yerda ism nima?', ['Argument', 'Parametr', 'Qaytuvchi qiymat', 'Global o‘zgaruvchi'], 'Parametr', 'E’londagi nom — parametr.', 'Chaqiruvda beriladigan qiymat argument, e’londagi nom parametr.', 'Parametr'),
      tf('return bajarilgandan keyin funksiyadagi qolgan kod ishlamaydi.', true, 'return funksiyani tugatadi.', 'return natija qaytarib, funksiyadan chiqadi.', 'return'),
      single('return yozilmagan funksiya qaysi qiymatni qaytaradi?', ['0', 'null', 'undefined', 'false'], 'undefined', 'Natija berilmasa undefined qaytadi.', 'JavaScriptda standart qaytuvchi qiymat undefined.', 'return'),
      short('const kv = n => n * n; kv(3) + kv(2) natijasi? (faqat son)', ['13'], '9 + 4 = 13.', 'kv(3) = 9, kv(2) = 4.', 'Funksiya chaqiruvi')
    ]
  },
  {
    slug: 'js-arrays-objects',
    topic: 'javascript-asoslari',
    title: 'Massivlar va obyektlar',
    summary: 'Ma’lumotlarni ro‘yxat (massiv) va kalit–qiymat juftliklari (obyekt) ko‘rinishida saqlash va ular bilan ishlash.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 3,
    objectives: ['Massiv yaratish, elementga murojaat qilish va qo‘shish', 'Obyekt yaratish va xususiyatlarni o‘qish', 'Obyektlar massivi bilan ishlash'],
    definitions: [
      { term: 'Massiv', meaning: 'Tartiblangan qiymatlar ro‘yxati; indeks 0 dan boshlanadi.' },
      { term: 'Indeks', meaning: 'Massivdagi element o‘rni raqami.' },
      { term: 'Obyekt', meaning: 'Kalit–qiymat juftliklaridan iborat tuzilma.' },
      { term: 'Xususiyat', meaning: 'Obyektdagi bitta kalit va uning qiymati.' }
    ],
    sections: [
      { heading: 'Massivlar', body: 'Massiv kvadrat qavsda yoziladi. Elementlarga indeks orqali murojaat qilinadi — birinchi element indeksi 0.', code: 'const fanlar = ["Matematika", "Fizika", "Ingliz tili"];\nconsole.log(fanlar[0]); // Matematika\nconsole.log(fanlar.length); // 3\nfanlar.push("Kimyo"); // oxiriga qo‘shish' },
      { heading: 'Obyektlar', body: 'Obyekt jingalak qavsda yoziladi va narsani tavsiflaydi.', code: 'const talaba = {\n  ism: "Dilnoza",\n  yosh: 17,\n  fanlar: ["Biologiya", "Kimyo"]\n};\nconsole.log(talaba.ism); // Dilnoza\ntalaba.shahar = "Samarqand"; // yangi xususiyat' },
      { heading: 'Obyektlar massivi', body: 'Haqiqiy ilovalarda ma’lumot ko‘pincha obyektlar massivi bo‘ladi: talabalar ro‘yxati, mahsulotlar katalogi. API’dan keladigan JSON ham shunday tuzilgan.', code: 'const kurslar = [\n  { nomi: "HTML", soat: 6 },\n  { nomi: "CSS", soat: 8 }\n];\nconsole.log(kurslar[1].nomi); // CSS' }
    ],
    examples: [
      { title: 'Massiv bo‘ylab yurish', steps: ['for...of sikli har bir elementni beradi.', 'Har birini ekranga chiqaramiz.'], code: 'const ballar = [70, 85, 92];\nlet jami = 0;\nfor (const b of ballar) {\n  jami += b;\n}\nconsole.log(jami / ballar.length); // 82.33…' }
    ],
    exercises: [
      { prompt: '5 ta sevimli kitobingizdan massiv yarating va oxirgi elementni chiqaring.', hint: 'Oxirgi indeks = length − 1.', solution: 'kitoblar[kitoblar.length - 1]' },
      { prompt: 'Telefon obyektini yarating: model, narx, rang. Keyin narxni 10% ga oshiring.', hint: 'telefon.narx = telefon.narx * 1.1', solution: 'const telefon = { model: "X", narx: 3000000, rang: "qora" }; telefon.narx *= 1.1;' }
    ],
    summaryPoints: ['Massiv — tartiblangan ro‘yxat, indeks 0 dan.', 'push oxiriga qo‘shadi, length uzunlikni beradi.', 'Obyekt — kalit: qiymat juftliklari.', 'Real ma’lumotlar ko‘pincha obyektlar massivi.'],
    tutor: {
      simple: 'Massiv — raqamlangan tokchalar: 0-tokcha, 1-tokcha, 2-tokcha. Obyekt — shaxsiy anketa: “Ism: …”, “Yosh: …”. Massiv tartib uchun, obyekt tavsif uchun.',
      analogies: ['Massivni poyezd vagonlariga o‘xshating: vagonlar ketma-ket, raqamlangan (0 dan) va har birida yuk bor. Obyekt esa bitta vagonning yuk xati: “mahsulot: olma, og‘irlik: 2 tonna”.', 'Telefoningizdagi kontaktlar ro‘yxati — massiv. Har bir kontakt (ism, raqam, email) — obyekt. Demak, kontaktlar — obyektlar massivi.'],
      extraExamples: ['Savatcha: const savat = [{ nomi: "Non", narx: 4000 }, { nomi: "Sut", narx: 12000 }]; savat.length → 2.', 'Ichma-ich obyekt: const user = { ism: "Ali", manzil: { shahar: "Buxoro" } }; user.manzil.shahar → "Buxoro".'],
      steps: ['Ma’lumot ro‘yxatmi yoki tavsifmi — aniqlang.', 'Ro‘yxat bo‘lsa massiv [], tavsif bo‘lsa obyekt {} tanlang.', 'Elementga murojaat: massivda [indeks], obyektda .kalit.', 'Kerak bo‘lsa push yoki yangi kalit bilan qo‘shing.'],
      hints: ['undefined chiqdimi? Massiv indeksi 0 dan boshlanishini esladingizmi?', 'Obyekt xususiyati nomida xato yo‘qmi? JavaScript katta-kichik harfni farqlaydi.'],
      practice: ['Sinfingizdagi 4 nafar o‘quvchi uchun obyektlar massivi yarating (ism, ball) va eng yuqori ballni toping.', 'Kitob obyektini yarating va uning barcha kalitlarini Object.keys() bilan chiqaring.'],
      checks: [
        { question: 'const a = [10, 20, 30]; a[1] nimaga teng?', answer: '20, chunki indeks 0 dan boshlanadi.' },
        { question: 'Obyekt va massivni qachon ishlatish kerak?', answer: 'Tartiblangan bir turdagi elementlar ro‘yxati uchun massiv, bitta narsaning xususiyatlarini tavsiflash uchun obyekt.' }
      ]
    },
    quiz: [
      single('const m = ["a", "b", "c"]; m[2] = ?', ['"a"', '"b"', '"c"', 'undefined'], '"c"', 'Indeks 2 — uchinchi element.', 'Indeks 0 dan boshlanadi: 0 → a, 1 → b, 2 → c.', 'Indeks'),
      single('Massiv oxiriga element qo‘shuvchi metod?', ['add()', 'push()', 'append()', 'insert()'], 'push()', 'push oxiriga qo‘shadi.', 'JavaScript massivlarida push ishlatiladi.', 'Massiv metodlari'),
      single('const u = { ism: "Ali", yosh: 15 }; u.yosh = ?', ['"Ali"', '15', 'undefined', '"yosh"'], '15', 'yosh kalitining qiymati 15.', 'Nuqta orqali kalit qiymati olinadi.', 'Obyekt'),
      short('const r = [4, 8, 15, 16]; r.length qiymati? (faqat son)', ['4'], 'Massivda 4 ta element bor.', 'length elementlar sonini beradi, oxirgi indeksni emas.', 'length'),
      tf('Massivning birinchi elementi indeksi 1 ga teng.', false, 'Birinchi element indeksi 0.', 'JavaScriptda indekslash 0 dan boshlanadi.', 'Indeks')
    ]
  },
  {
    slug: 'js-map-filter',
    topic: 'javascript-asoslari',
    title: 'Massiv metodlari: map, filter, reduce',
    summary: 'Sikl yozmasdan massivlarni o‘zgartirish, saralash va yig‘ish — zamonaviy JavaScriptning eng kuchli vositalari.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 4,
    objectives: ['map bilan har bir elementni o‘zgartirish', 'filter bilan shartga mos elementlarni ajratish', 'reduce bilan bitta natijaga yig‘ish'],
    definitions: [
      { term: 'map', meaning: 'Har bir elementga funksiya qo‘llab, yangi massiv qaytaradi; uzunlik o‘zgarmaydi.' },
      { term: 'filter', meaning: 'Shart rost bo‘lgan elementlardan yangi massiv qaytaradi.' },
      { term: 'reduce', meaning: 'Massivni bitta qiymatga (yig‘indi, obyekt va h.k.) yig‘adi.' },
      { term: 'Callback', meaning: 'Boshqa funksiyaga argument sifatida beriladigan funksiya.' }
    ],
    sections: [
      { heading: 'map — o‘zgartirish', body: 'Har bir elementni boshqa narsaga aylantiradi. Asl massiv o‘zgarmaydi.', code: 'const narxlar = [10000, 25000, 40000];\nconst dollarda = narxlar.map((n) => n / 12700);\nconst ikkiBaravar = narxlar.map((n) => n * 2); // [20000, 50000, 80000]' },
      { heading: 'filter — saralash', body: 'Callback `true` qaytargan elementlar yangi massivga tushadi.', code: 'const ballar = [45, 78, 92, 55, 66];\nconst otganlar = ballar.filter((b) => b >= 60); // [78, 92, 66]' },
      { heading: 'reduce — yig‘ish', body: 'Akkumulyator (yig‘uvchi) va joriy elementni oladi. Ikkinchi argument — boshlang‘ich qiymat.', code: 'const jami = ballar.reduce((yigindi, b) => yigindi + b, 0); // 336' },
      { heading: 'Zanjir qilib ishlatish', body: 'Metodlarni ketma-ket ulash mumkin: avval filtrlab, keyin o‘zgartirib, oxirida yig‘ish.', code: 'const mahsulotlar = [\n  { nomi: "Daftar", narx: 5000, soni: 3 },\n  { nomi: "Ruchka", narx: 2000, soni: 0 },\n  { nomi: "Kitob", narx: 45000, soni: 1 }\n];\nconst jamiSumma = mahsulotlar\n  .filter((m) => m.soni > 0)\n  .map((m) => m.narx * m.soni)\n  .reduce((s, x) => s + x, 0); // 60000' }
    ],
    examples: [
      { title: 'Talabalar ismlari', steps: ['Obyektlar massividan faqat ismlarni olish — map.', 'Ballari 80 dan yuqorilarni ajratish — filter.'], code: 'const talabalar = [{ ism: "Ali", ball: 85 }, { ism: "Vali", ball: 72 }];\nconst ismlar = talabalar.map((t) => t.ism); // ["Ali", "Vali"]\nconst alochilar = talabalar.filter((t) => t.ball > 80); // [{ ism: "Ali", ... }]' }
    ],
    exercises: [
      { prompt: '[1, 2, 3, 4, 5, 6] massividan juft sonlarni ajrating.', hint: 'filter va % operatori.', solution: 'arr.filter((n) => n % 2 === 0) → [2, 4, 6]' },
      { prompt: '["olma", "nok"] massivini katta harflarga aylantiring.', hint: 'map va toUpperCase().', solution: 'arr.map((s) => s.toUpperCase()) → ["OLMA", "NOK"]' },
      { prompt: '[3, 7, 10] yig‘indisini reduce bilan toping.', hint: 'Boshlang‘ich qiymat 0.', solution: 'arr.reduce((s, x) => s + x, 0) → 20' }
    ],
    summaryPoints: ['map — har bir elementni o‘zgartiradi, uzunlik saqlanadi.', 'filter — shartga mos elementlarni qoldiradi.', 'reduce — bitta qiymatga yig‘adi.', 'Ular asl massivni o‘zgartirmaydi.'],
    tutor: {
      simple: 'map — har bir mevani sharbatga aylantirish (soni o‘zgarmaydi). filter — faqat pishgan mevalarni tanlab olish. reduce — hamma sharbatni bitta katta idishga quyish.',
      analogies: ['Zavod konveyerini tasavvur qiling: filter — sifat nazoratchisi (yaroqsizlarini olib tashlaydi), map — bo‘yoq stansiyasi (har bir mahsulotni bo‘yaydi), reduce — qadoqlash (hammasini bitta qutiga soladi).', 'Imtihon natijalari: map — har bir ballni bahoga aylantirish, filter — faqat o‘tganlar ro‘yxati, reduce — sinfning umumiy bali.'],
      extraExamples: ['Narxlarni formatlash: [5000, 12000].map((n) => n.toLocaleString() + " so‘m") → ["5,000 so‘m", "12,000 so‘m"].', 'Qidiruv: kurslar.filter((k) => k.nomi.toLowerCase().includes("css")) — qidiruv maydoni shunday ishlaydi.'],
      steps: ['Natijada nima kerak: o‘zgartirilgan ro‘yxat (map), qisqartirilgan ro‘yxat (filter) yoki bitta qiymat (reduce)?', 'Callback funksiyasini yozing: bitta element bilan nima qilish kerak?', 'Natijani yangi o‘zgaruvchiga saqlang.', 'console.log bilan tekshiring.'],
      hints: ['map ichida return qilishni unutmadingizmi? Jingalak qavs ishlatsangiz, return shart.', 'reduce noto‘g‘ri natija beryaptimi? Boshlang‘ich qiymatni (masalan, 0) berdingizmi?'],
      practice: ['Universitetlar massividan (nomi, mamlakat) faqat Germaniyadagilarni ajratib, ularning nomlarini ro‘yxat qiling.', 'Haftalik qadamlar massividan 8000 dan ko‘p qadam bosilgan kunlar sonini va umumiy qadamlarni toping.'],
      checks: [
        { question: '[1, 2, 3].map(x => x * 10) natijasi qanday?', answer: '[10, 20, 30].' },
        { question: 'map va filter natijasidagi massiv uzunligi bo‘yicha farq nima?', answer: 'map uzunlikni saqlaydi, filter esa uzunlikni kamaytirishi mumkin.' }
      ]
    },
    quiz: [
      single('[2, 4, 6].map(x => x / 2) natijasi?', ['[1, 2, 3]', '[4, 8, 12]', '[2, 4, 6]', '6'], '[1, 2, 3]', 'Har bir element 2 ga bo‘linadi.', 'map har bir elementga funksiyani qo‘llaydi.', 'map'),
      single('[5, 12, 8, 20].filter(x => x > 10) natijasi?', ['[12, 20]', '[5, 8]', '[12, 8, 20]', '2'], '[12, 20]', 'Faqat 10 dan kattalari qoladi.', 'filter shart rost bo‘lgan elementlarni qoldiradi.', 'filter'),
      short('[1, 2, 3, 4].reduce((s, x) => s + x, 0) natijasi? (faqat son)', ['10'], '1 + 2 + 3 + 4 = 10.', 'reduce barcha elementlarni yig‘indiga qo‘shadi.', 'reduce'),
      tf('map metodi asl massivni o‘zgartiradi.', false, 'map yangi massiv qaytaradi, asl massiv o‘zgarmaydi.', 'Asl massiv saqlanib qoladi — bu xavfsiz dasturlash uslubi.', 'map'),
      single('Massiv uzunligi albatta saqlanadigan metod?', ['filter', 'map', 'reduce', 'Hech biri'], 'map', 'map har bir elementga bitta natija beradi.', 'filter elementlarni olib tashlashi, reduce bitta qiymat qaytarishi mumkin.', 'map')
    ]
  },
  {
    slug: 'dom-manipulation',
    topic: 'brauzer-js',
    title: 'DOM bilan ishlash',
    summary: 'JavaScript yordamida sahifadagi elementlarni topish, o‘zgartirish va foydalanuvchi harakatlariga javob berish.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 1,
    objectives: ['DOM tushunchasini izohlash', 'querySelector bilan element topish va o‘zgartirish', 'addEventListener bilan hodisalarni tinglash'],
    definitions: [
      { term: 'DOM', meaning: 'Document Object Model — brauzer HTML sahifani daraxt ko‘rinishidagi obyektlar sifatida ifodalashi.' },
      { term: 'Hodisa (event)', meaning: 'Foydalanuvchi yoki brauzer harakati: bosish, yozish, sahifa yuklanishi.' },
      { term: 'Hodisa tinglovchisi', meaning: 'Hodisa yuz berganda chaqiriladigan funksiya.' }
    ],
    sections: [
      { heading: 'DOM — sahifa daraxti', body: 'Brauzer HTMLni o‘qib, har bir tegni obyektga aylantiradi. JavaScript shu obyektlar orqali sahifani “jonli” o‘zgartira oladi: matnni almashtiradi, rang beradi, yangi element qo‘shadi.' },
      { heading: 'Elementni topish va o‘zgartirish', body: '`document.querySelector()` CSS selektori bo‘yicha birinchi mos elementni qaytaradi.', code: 'const sarlavha = document.querySelector("h1");\nsarlavha.textContent = "Yangi sarlavha";\nsarlavha.classList.add("faol");' },
      { heading: 'Hodisalarni tinglash', body: '`addEventListener` foydalanuvchi harakatiga javob beradi.', code: '<button id="tugma">Bosing</button>\n<p id="hisob">0</p>\n\nconst tugma = document.querySelector("#tugma");\nconst hisob = document.querySelector("#hisob");\nlet son = 0;\ntugma.addEventListener("click", () => {\n  son += 1;\n  hisob.textContent = son;\n});' },
      { heading: 'Xavfsizlik eslatmasi', body: 'Foydalanuvchi kiritgan matnni sahifaga qo‘yishda `innerHTML` o‘rniga `textContent` ishlating. Aks holda zararli kod (XSS hujumi) bajarilishi mumkin.' }
    ],
    examples: [
      { title: 'Ro‘yxatga element qo‘shish', steps: ['Input qiymatini o‘qiymiz.', 'Yangi <li> yaratamiz.', 'Uni ro‘yxatga qo‘shamiz va inputni tozalaymiz.'], code: 'const input = document.querySelector("#vazifa");\nconst royxat = document.querySelector("#royxat");\ndocument.querySelector("#qosh").addEventListener("click", () => {\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  royxat.append(li);\n  input.value = "";\n});' }
    ],
    exercises: [
      { prompt: 'Tugma bosilganda sahifa fonini o‘zgartiradigan kod yozing.', hint: 'document.body.classList.toggle("tun")', solution: 'tugma.addEventListener("click", () => document.body.classList.toggle("tun"));' },
      { prompt: 'Nima uchun foydalanuvchi matnini innerHTML bilan qo‘yish xavfli?', hint: 'Matn ichida <script> yoki zararli atribut bo‘lsa-chi?', solution: 'innerHTML matnni HTML sifatida talqin qiladi va zararli kod bajarilishi mumkin; textContent esa uni oddiy matn sifatida qo‘yadi.' }
    ],
    summaryPoints: ['DOM — sahifaning obyekt daraxti.', 'querySelector element topadi.', 'textContent va classList bilan o‘zgartiriladi.', 'addEventListener hodisalarga javob beradi.', 'Foydalanuvchi matni uchun textContent — xavfsizroq.'],
    tutor: {
      simple: 'DOM — sahifaning pulti. JavaScript bu pult orqali “bu sarlavha matnini o‘zgartir”, “tugma bosilsa, raqamni oshir” degan buyruqlar beradi.',
      analogies: ['DOMni oila shajarasiga o‘xshating: <html> — bobo, <body> — ota, ichidagi <div> va <p> — farzandlar. querySelector — shajara ichidan kerakli odamni topish.', 'addEventListener — eshik qo‘ng‘irog‘i. Siz oldindan “qo‘ng‘iroq chalinsa, eshikni och” deb kelishib qo‘yasiz. Kimdir tugmani bossa (hodisa), kelishilgan harakat bajariladi.'],
      extraExamples: ['Parolni ko‘rsatish: tugma bosilganda input.type = input.type === "password" ? "text" : "password".', 'Belgi hisoblagich: textarea.addEventListener("input", () => { hisob.textContent = textarea.value.length; }).'],
      steps: ['HTML da elementga id yoki class bering.', 'JavaScriptda querySelector bilan uni toping.', 'addEventListener bilan kerakli hodisani tinglang.', 'Hodisa funksiyasida elementni o‘zgartiring (textContent, classList).', 'Brauzerda sinab ko‘ring va konsoldagi xatolarni tekshiring.'],
      hints: ['querySelector null qaytaryaptimi? Skript HTML elementdan oldin yuklanmayaptimi? <script defer> ishlating.', 'Id selektori uchun # belgisini qo‘ydingizmi?'],
      practice: ['“Vazifalar ro‘yxati” mini-ilovasini yarating: qo‘shish, bajarildi deb belgilash (class bilan) va o‘chirish.', 'Tungi/kunduzgi rejim tugmasini yarating.'],
      checks: [
        { question: 'textContent va innerHTML farqi nima?', answer: 'textContent matnni oddiy matn sifatida qo‘yadi, innerHTML esa HTML sifatida talqin qiladi; foydalanuvchi matni uchun textContent xavfsizroq.' },
        { question: 'Tugma bosilishini qanday tinglaysiz?', answer: 'element.addEventListener("click", funksiya) orqali.' }
      ]
    },
    quiz: [
      single('CSS selektori bo‘yicha birinchi mos elementni qaytaruvchi metod?', ['getElement()', 'querySelector()', 'findElement()', 'select()'], 'querySelector()', 'document.querySelector() CSS selektorini qabul qiladi.', 'querySelector aynan CSS selektorlari bilan ishlaydi.', 'querySelector'),
      single('Tugma bosilishi qaysi hodisa?', ['press', 'click', 'tap', 'push'], 'click', '"click" hodisasi.', 'Brauzerda bosish hodisasi "click" deb ataladi.', 'Hodisalar'),
      tf('Foydalanuvchi kiritgan matnni sahifaga qo‘yishda textContent innerHTML ga qaraganda xavfsizroq.', true, 'textContent HTMLni bajarmaydi.', 'innerHTML zararli kodni bajarishi mumkin (XSS).', 'Xavfsizlik'),
      single('Elementga class qo‘shishning to‘g‘ri usuli?', ['el.class = "faol"', 'el.classList.add("faol")', 'el.addClass("faol")', 'el.style.class("faol")'], 'el.classList.add("faol")', 'classList.add class qo‘shadi.', 'DOM elementlarida classList obyekti ishlatiladi.', 'classList'),
      single('DOM nima?', ['Ma’lumotlar bazasi', 'Sahifaning obyektlar daraxti', 'CSS kutubxonasi', 'Server dasturi'], 'Sahifaning obyektlar daraxti', 'Brauzer HTMLni obyektlar daraxtiga aylantiradi.', 'DOM — Document Object Model, sahifa tuzilmasining obyekt ko‘rinishi.', 'DOM')
    ]
  },
  {
    slug: 'async-js',
    topic: 'brauzer-js',
    title: 'Asinxron JavaScript',
    summary: 'Kutish talab qiladigan amallar: callback, Promise va async/await yordamida sahifani “qotirmasdan” ishlash.',
    difficulty: 'advanced',
    durationMinutes: 35,
    order: 2,
    objectives: ['Sinxron va asinxron kod farqini tushuntirish', 'Promise holatlarini bilish', 'async/await va try/catch bilan ishlash'],
    definitions: [
      { term: 'Asinxron', meaning: 'Natijani kutayotganda boshqa kodning bajarilishini to‘xtatmaydigan amal.' },
      { term: 'Promise', meaning: 'Kelajakda tayyor bo‘ladigan natijani ifodalovchi obyekt: pending, fulfilled yoki rejected.' },
      { term: 'async/await', meaning: 'Promise bilan ishlashni sinxron kodga o‘xshash qilib yozish sintaksisi.' }
    ],
    sections: [
      { heading: 'Nega asinxronlik kerak?', body: 'Serverdan ma’lumot olish soniyalar talab qilishi mumkin. Agar brauzer shu vaqt kutib qolsa, sahifa “qotadi” — tugmalar ishlamaydi. Asinxron kod kutish davomida boshqa ishlarni davom ettirishga imkon beradi.' },
      { heading: 'Promise', body: 'Promise uch holatda bo‘ladi: **pending** (kutilmoqda), **fulfilled** (muvaffaqiyatli), **rejected** (xato).', code: 'const kutish = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nkutish(1000).then(() => console.log("1 soniya o‘tdi"));' },
      { heading: 'async/await', body: '`await` Promise natijasini kutadi, lekin faqat `async` funksiya ichida ishlaydi. Xatolarni `try/catch` bilan ushlaymiz.', code: 'async function yuklash() {\n  try {\n    console.log("Yuklanmoqda...");\n    await kutish(1000);\n    console.log("Tayyor!");\n  } catch (xato) {\n    console.error("Xatolik:", xato);\n  }\n}' },
      { heading: 'Bajarilish tartibi', body: 'console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C"); — natija A, C, B. Chunki setTimeout hatto 0 ms bo‘lsa ham navbatga qo‘yiladi va joriy kod tugagandan keyin bajariladi.' }
    ],
    examples: [
      { title: 'Ketma-ket kutish', steps: ['Birinchi amalni kutamiz.', 'Natijadan foydalanib ikkinchisini boshlaymiz.', 'Xatolikni catch bilan ushlaymiz.'], code: 'async function profilniKorsat() {\n  try {\n    const user = await userniOl();\n    const kurslar = await kurslarniOl(user.id);\n    console.log(kurslar);\n  } catch (e) {\n    console.log("Ma’lumot olinmadi");\n  }\n}' }
    ],
    exercises: [
      { prompt: 'console.log(1); setTimeout(() => console.log(2), 0); console.log(3); — natija tartibini yozing.', hint: 'setTimeout navbatga qo‘yiladi.', solution: '1, 3, 2' },
      { prompt: '2 soniya kutib, “Vaqt tugadi” deb chiqaradigan async funksiya yozing.', hint: 'kutish(2000) dan foydalaning.', solution: 'async function f() { await kutish(2000); console.log("Vaqt tugadi"); }' }
    ],
    summaryPoints: ['Asinxron kod sahifani qotirmaydi.', 'Promise: pending → fulfilled yoki rejected.', 'await faqat async funksiyada ishlaydi.', 'Xatolarni try/catch bilan ushlang.'],
    tutor: {
      simple: 'Asinxron — restoranda buyurtma berib, ovqat tayyor bo‘lguncha telefoningizni ko‘rib o‘tirish. Siz oshpaz yonida qotib turmaysiz. Ovqat tayyor bo‘lganda sizni chaqirishadi — bu Promise bajarildi.',
      analogies: ['Promise — kafedagi elektron chaqiruvchi (pager). U sizga “ovqat tayyor bo‘ladi” deb va’da beradi. Hozircha kutasiz (pending), keyin u yonadi — ovqat tayyor (fulfilled) yoki “kechirasiz, tugab qoldi” (rejected).', 'Kir yuvish mashinasi: uni yoqasiz va kutib turmasdan dars qilasiz. Mashina tugatganda signal beradi. await — “signalni kut, keyin kirni os” degani.'],
      extraExamples: ['Bir vaqtda bir nechta so‘rov: const [a, b] = await Promise.all([fetch(url1), fetch(url2)]); — ikkala so‘rov parallel ketadi va vaqt tejaladi.', 'Yuklanish holati: loading = true; await malumotOl(); loading = false; — foydalanuvchiga “Yuklanmoqda…” ko‘rsatish uchun.'],
      steps: ['Funksiya oldiga async yozing.', 'Kutish kerak bo‘lgan amal oldiga await qo‘ying.', 'Kodni try blokiga o‘rang.', 'catch blokida xatoni foydalanuvchiga tushunarli tarzda ko‘rsating.', 'Kerak bo‘lsa finally’da yuklanish holatini o‘chiring.'],
      hints: ['“await is only valid in async functions” xatosi? Funksiya oldiga async qo‘shing.', 'Natija o‘rniga Promise {<pending>} chiqyaptimi? await yozishni unutgansiz.'],
      practice: ['3 soniyalik ortga sanoq yarating: har soniyada raqamni yangilang va oxirida “Boshlandi!” deb chiqaring.', 'Tasodifiy ravishda muvaffaqiyatli yoki xato bilan tugaydigan Promise yarating va ikkala holatni ham to‘g‘ri qayta ishlang.'],
      checks: [
        { question: 'Promise qanday uch holatda bo‘lishi mumkin?', answer: 'Pending (kutilmoqda), fulfilled (muvaffaqiyatli bajarildi) va rejected (xato bilan tugadi).' },
        { question: 'await kalit so‘zini qayerda ishlatish mumkin?', answer: 'Faqat async deb belgilangan funksiya ichida (yoki modul darajasida).' }
      ]
    },
    quiz: [
      single('Promise muvaffaqiyatli tugaganda qaysi holatga o‘tadi?', ['pending', 'fulfilled', 'rejected', 'waiting'], 'fulfilled', 'Muvaffaqiyat — fulfilled.', 'rejected xato holati, pending esa kutish.', 'Promise'),
      single('console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C"); natija?', ['A B C', 'A C B', 'B A C', 'C A B'], 'A C B', 'setTimeout navbatga qo‘yiladi va joriy kod tugagach bajariladi.', '0 ms bo‘lsa ham setTimeout darhol bajarilmaydi.', 'Bajarilish tartibi'),
      tf('await faqat async funksiya ichida ishlatiladi.', true, 'Oddiy funksiyada await sintaksis xatosi beradi.', 'async kalit so‘zi await’ga ruxsat beradi.', 'async/await'),
      single('async funksiyada xatolarni ushlash uchun nima ishlatiladi?', ['if/else', 'try/catch', 'switch', 'for'], 'try/catch', 'try/catch await xatolarini ushlaydi.', 'Xatolarni ushlash uchun try/catch kerak.', 'Xatolarni qayta ishlash'),
      single('Asinxron kodning asosiy afzalligi?', ['Kod qisqaroq bo‘ladi', 'Kutish vaqtida sahifa qotib qolmaydi', 'Internet tezlashadi', 'Xatolar yo‘qoladi'], 'Kutish vaqtida sahifa qotib qolmaydi', 'Brauzer boshqa ishlarni davom ettiradi.', 'Asinxronlik tezlikni emas, javob beruvchanlikni ta’minlaydi.', 'Asinxronlik')
    ]
  },
  {
    slug: 'fetch-api',
    topic: 'brauzer-js',
    title: 'Fetch API',
    summary: 'Serverdan ma’lumot olish va yuborish: fetch, JSON, HTTP holat kodlari va xatolarni to‘g‘ri qayta ishlash.',
    difficulty: 'advanced',
    durationMinutes: 35,
    order: 3,
    objectives: ['fetch bilan GET va POST so‘rov yuborish', 'JSON javobni o‘qish', 'response.ok va xatolarni tekshirish'],
    definitions: [
      { term: 'API', meaning: 'Dasturlar o‘zaro ma’lumot almashishi uchun belgilangan interfeys.' },
      { term: 'JSON', meaning: 'Ma’lumot almashish uchun matnli format, JavaScript obyektlariga o‘xshaydi.' },
      { term: 'HTTP holat kodi', meaning: 'Server javobining natijasini bildiruvchi raqam: 200 — muvaffaqiyat, 404 — topilmadi, 500 — server xatosi.' }
    ],
    sections: [
      { heading: 'GET so‘rov', body: '`fetch` Promise qaytaradi. Javobni JSON ga aylantirish uchun `response.json()` ham kutiladi.', code: 'async function kurslarniOl() {\n  const javob = await fetch("https://api.misol.uz/kurslar");\n  if (!javob.ok) {\n    throw new Error(`Server xatosi: ${javob.status}`);\n  }\n  const kurslar = await javob.json();\n  return kurslar;\n}' },
      { heading: 'Muhim tuzoq: fetch 404 da xato bermaydi', body: 'fetch faqat tarmoq uzilganda reject bo‘ladi. Server 404 yoki 500 qaytarsa ham Promise muvaffaqiyatli tugaydi! Shuning uchun har doim `response.ok` ni tekshiring.' },
      { heading: 'POST so‘rov', body: 'Ma’lumot yuborishda usul, sarlavhalar va tana (body) beriladi.', code: 'await fetch("/api/eslatmalar", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ matn: "Matematikani takrorlash" })\n});' },
      { heading: 'Foydalanuvchi tajribasi', body: 'Yaxshi ilova so‘rov davomida “Yuklanmoqda…” ko‘rsatadi, xato bo‘lsa tushunarli xabar beradi va muvaffaqiyatsiz so‘rovdan keyin “Bajarildi” demaydi.' }
    ],
    examples: [
      { title: 'Ro‘yxatni sahifada ko‘rsatish', steps: ['Yuklanish holatini ko‘rsatamiz.', 'fetch bilan ma’lumot olamiz va ok ni tekshiramiz.', 'Ro‘yxatni chizamiz yoki xato xabarini ko‘rsatamiz.'], code: 'holat.textContent = "Yuklanmoqda...";\ntry {\n  const kurslar = await kurslarniOl();\n  royxat.innerHTML = "";\n  kurslar.forEach((k) => {\n    const li = document.createElement("li");\n    li.textContent = k.nomi;\n    royxat.append(li);\n  });\n  holat.textContent = "";\n} catch (e) {\n  holat.textContent = "Ma’lumotni yuklab bo‘lmadi. Qayta urinib ko‘ring.";\n}' }
    ],
    exercises: [
      { prompt: 'Server 404 qaytarganda fetch Promise’i reject bo‘ladimi? Qanday tekshirasiz?', hint: 'response.ok', solution: 'Yo‘q, reject bo‘lmaydi. if (!response.ok) throw new Error(...) bilan tekshiriladi.' },
      { prompt: '{ ism: "Ali" } obyektini POST so‘rovda yuborish uchun body ni qanday yozasiz?', hint: 'Obyektni matnga aylantirish kerak.', solution: 'body: JSON.stringify({ ism: "Ali" }) va Content-Type: application/json sarlavhasi.' }
    ],
    summaryPoints: ['fetch Promise qaytaradi.', 'response.json() ham await qilinadi.', 'Har doim response.ok ni tekshiring.', 'POST da JSON.stringify va Content-Type kerak.', 'Yuklanish va xato holatlarini ko‘rsating.'],
    tutor: {
      simple: 'fetch — serverga xat yuborish. Xat yetib boradi va javob keladi. Lekin javob “kechirasiz, topilmadi” (404) bo‘lishi ham mumkin — shuning uchun javobni ochib, ichida nima yozilganini (response.ok) tekshirish kerak.',
      analogies: ['fetch — restoranga onlayn buyurtma. Buyurtma yetib bordi (fetch muvaffaqiyatli), lekin restoran “bu taom yo‘q” deb javob berishi mumkin (404). Ilova buni tekshirmasa, siz bo‘sh qutini kutib qolasiz.', 'JSON — xalqaro pochta qutisi o‘lchami: hamma davlatlar bir xil standartdagi qutini qabul qiladi. JavaScript obyektini yuborishdan oldin JSON.stringify bilan “qadoqlaysiz”, kelganda .json() bilan “ochasiz”.'],
      extraExamples: ['Ob-havo: const javob = await fetch(`/api/ob-havo?shahar=Toshkent`); const { harorat } = await javob.json(); — kelgan obyektdan faqat haroratni olamiz.', 'Holat kodlari: 201 — yaratildi, 400 — so‘rov noto‘g‘ri, 401 — tizimga kirish kerak, 403 — ruxsat yo‘q.'],
      steps: ['fetch(url) ni await bilan chaqiring.', 'response.ok ni tekshiring; noto‘g‘ri bo‘lsa xato tashlang.', 'await response.json() bilan ma’lumotni oling.', 'Ma’lumotni sahifada ko‘rsating.', 'Butun jarayonni try/catch ga o‘rang va xatoni foydalanuvchiga ko‘rsating.'],
      hints: ['Ma’lumot o‘rniga Promise ko‘ryapsizmi? response.json() oldiga await qo‘ydingizmi?', 'Server xato qaytarsa ham ilovangiz “Muvaffaqiyatli” deyaptimi? response.ok tekshiruvini qo‘shing.'],
      practice: ['Ochiq API (masalan, tasodifiy iqtiboslar) dan ma’lumot olib, uni kartochkada ko‘rsating; yuklanish va xato holatlarini ham qo‘shing.', 'Forma ma’lumotlarini POST so‘rov bilan yuboradigan va server javobiga qarab xabar ko‘rsatadigan funksiya yozing.'],
      checks: [
        { question: 'Nima uchun fetch dan keyin response.ok ni tekshirish kerak?', answer: 'Chunki fetch faqat tarmoq xatosida reject bo‘ladi; 404 yoki 500 javoblarida ham muvaffaqiyatli tugaydi.' },
        { question: 'POST so‘rovda JavaScript obyektini qanday yuborasiz?', answer: 'body: JSON.stringify(obyekt) va headers ichida Content-Type: application/json.' }
      ]
    },
    quiz: [
      single('HTTP 404 kodi nimani bildiradi?', ['Muvaffaqiyat', 'Topilmadi', 'Server xatosi', 'Ruxsat yo‘q'], 'Topilmadi', '404 — resurs topilmadi.', '200 muvaffaqiyat, 500 server xatosi, 403 ruxsat yo‘q.', 'Holat kodlari'),
      tf('Server 500 qaytarganda fetch Promise’i avtomatik reject bo‘ladi.', false, 'fetch faqat tarmoq xatosida reject bo‘ladi.', 'Server xatosini response.ok orqali o‘zingiz tekshirishingiz kerak.', 'response.ok'),
      single('JSON javobni obyektga aylantirish uchun?', ['JSON.parse(response)', 'await response.json()', 'response.text', 'response.object()'], 'await response.json()', 'response.json() Promise qaytaradi, shuning uchun await kerak.', 'Fetch javobidagi tanani o‘qish uchun response.json() ishlatiladi.', 'JSON'),
      single('Obyektni so‘rov tanasida yuborish uchun uni nimaga aylantirish kerak?', ['JSON.stringify()', 'toString()', 'String()', 'Hech nimaga'], 'JSON.stringify()', 'JSON.stringify obyektni JSON matnga aylantiradi.', 'Tana matn bo‘lishi kerak; obyektni JSON.stringify bilan aylantiring.', 'POST so‘rov'),
      multiple('Yaxshi fetch amaliyotlarini tanlang.', ['response.ok ni tekshirish', 'Yuklanish holatini ko‘rsatish', 'Xato bo‘lsa ham “Saqlandi” deb chiqarish', 'try/catch ishlatish'], ['response.ok ni tekshirish', 'Yuklanish holatini ko‘rsatish', 'try/catch ishlatish'], 'Bular ishonchli va halol foydalanuvchi tajribasini beradi.', 'Muvaffaqiyatsiz so‘rovdan keyin “Saqlandi” deyish foydalanuvchini aldaydi.', 'Foydalanuvchi tajribasi')
    ]
  }
];
