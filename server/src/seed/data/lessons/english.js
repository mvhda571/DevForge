import { single, multiple, tf, short } from './helpers.js';

export default [
  {
    slug: 'english-grammar',
    topic: 'ingliz-asoslari',
    title: 'Ingliz tili: asosiy grammatika',
    summary: 'Present Simple, Past Simple va Present Continuous — kundalik va akademik muloqotda eng ko‘p ishlatiladigan zamonlar.',
    difficulty: 'beginner',
    durationMinutes: 30,
    order: 1,
    objectives: ['Uch asosiy zamonni farqlash', 'Uchinchi shaxs birlikda -s qo‘shimchasini to‘g‘ri ishlatish', 'Inkor va so‘roq gaplar tuzish'],
    definitions: [
      { term: 'Present Simple', meaning: 'Odatiy, takrorlanuvchi harakatlar va umumiy haqiqatlar uchun: I study every day.' },
      { term: 'Present Continuous', meaning: 'Hozir davom etayotgan harakat: I am studying now.' },
      { term: 'Past Simple', meaning: 'O‘tmishda tugagan harakat: I studied yesterday.' },
      { term: 'Yordamchi fe’l', meaning: 'Inkor va so‘roq yasashda ishlatiladigan do, does, did, am/is/are.' }
    ],
    sections: [
      { heading: 'Present Simple', body: 'Odatlar va faktlar. He/She/It bilan fe’lga **-s** qo‘shiladi.\n\n- I **work** at home. She **works** at home.\n- Inkor: She **doesn’t work** on Sundays.\n- So‘roq: **Does** she **work** here?\n\nSignal so‘zlar: every day, usually, often, always, never.' },
      { heading: 'Present Continuous', body: 'Ayni paytda bo‘layotgan ish: **am/is/are + fe’l-ing**.\n\n- I **am reading** the documentation.\n- They **are not (aren’t) sleeping**.\n- **Is** he **coding** now?\n\nSignal so‘zlar: now, at the moment, right now.' },
      { heading: 'Past Simple', body: 'Tugagan o‘tmish: to‘g‘ri fe’llarga **-ed** (worked, studied), noto‘g‘ri fe’llar alohida shaklga ega (go → went, write → wrote).\n\n- Inkor: I **didn’t finish** the task.\n- So‘roq: **Did** you **finish** it?\n\nDiqqat: did dan keyin fe’l asl shaklda: Did you **go**? (wented emas!).' }
    ],
    examples: [
      { title: 'Bitta fe’l — uch zamon', steps: ['Present Simple: I write code every day.', 'Present Continuous: I am writing code now.', 'Past Simple: I wrote code yesterday.'], result: 'Zamon harakat qachon va qanday bo‘layotganini ko‘rsatadi.' }
    ],
    exercises: [
      { prompt: 'Qavs ichidagi fe’lni to‘g‘ri shaklga qo‘ying: She (study) English every evening.', hint: 'Har kuni — odat. She — uchinchi shaxs.', solution: 'She studies English every evening.' },
      { prompt: 'Gapni inkor qiling: They went to the library yesterday.', hint: 'Past Simple inkori: didn’t + asl fe’l.', solution: 'They didn’t go to the library yesterday.' },
      { prompt: 'So‘roq gap tuzing: He is fixing the bug.', hint: 'is ni oldinga chiqaring.', solution: 'Is he fixing the bug?' }
    ],
    summaryPoints: ['Present Simple — odatlar, he/she/it + s.', 'Present Continuous — hozir: am/is/are + ing.', 'Past Simple — tugagan o‘tmish: -ed yoki noto‘g‘ri shakl.', 'do/does/did dan keyin fe’l asl shaklda.'],
    tutor: {
      simple: 'Zamonlar — vaqt mashinasi tugmalari. “Har kuni” — Present Simple, “hozir” — Present Continuous, “kecha” — Past Simple. Avval vaqtni aniqlang, keyin shaklni tanlang.',
      analogies: ['Zamonlarni fotosurat va videoga o‘xshating: Present Simple — odatlaringiz albomi (har kuni nima qilasiz), Present Continuous — hozirgi jonli video, Past Simple — kechagi saqlangan rasm.', 'he/she/it bilan qo‘shiladigan -s ni “yolg‘izlik belgisi” deb eslab qoling: bitta odam (u) haqida gapirganda fe’l -s “sherik” oladi: she works, he codes.'],
      extraExamples: ['Dasturchi hayotidan: I usually start work at 9. Right now I am reviewing a pull request. Yesterday I fixed three bugs.', 'Noto‘g‘ri fe’llar: build → built, find → found, learn → learned/learnt, run → ran.'],
      steps: ['Gapda vaqt ko‘rsatkichini toping (every day, now, yesterday).', 'Unga mos zamonni tanlang.', 'Egani tekshiring: he/she/it bo‘lsa, Present Simple’da -s qo‘shing.', 'Inkor yoki so‘roq bo‘lsa, yordamchi fe’lni qo‘shing va asosiy fe’lni asl shaklda qoldiring.'],
      hints: ['Gapda “now” yoki “at the moment” bormi? Unda qaysi zamon kerak?', 'did ishlatgan bo‘lsangiz, asosiy fe’lga -ed qo‘shmang.'],
      practice: ['O‘zingiz haqingizda 6 ta gap yozing: 2 tasi odatlaringiz, 2 tasi hozir nima qilayotganingiz, 2 tasi kecha nima qilganingiz haqida.', 'Do‘stingizga 3 ta so‘roq gap tuzing: Do you…? Are you…? Did you…?'],
      checks: [
        { question: '“She ___ (play) football every Sunday” gapini to‘ldiring va sababini ayting.', answer: 'plays — chunki bu odat (every Sunday) va ega uchinchi shaxs birlik (she).' },
        { question: '“Did you ___ (see) the email?” gapida qaysi shakl ishlatiladi?', answer: 'see — did dan keyin fe’l asl shaklda qoladi.' }
      ]
    },
    quiz: [
      single('He ___ to school every day.', ['go', 'goes', 'going', 'went'], 'goes', 'Present Simple, he bilan -es qo‘shiladi.', 'Har kungi odat va he — uchinchi shaxs: goes.', 'Present Simple'),
      single('Look! The children ___ in the garden.', ['play', 'plays', 'are playing', 'played'], 'are playing', 'Look! — hozir bo‘layotgan harakat.', 'Hozir davom etayotgan harakat — Present Continuous.', 'Present Continuous'),
      single('I ___ a new laptop last week.', ['buy', 'buys', 'bought', 'am buying'], 'bought', 'last week — o‘tmish, buy noto‘g‘ri fe’l: bought.', 'Past Simple’da buy → bought.', 'Past Simple'),
      single('To‘g‘ri so‘roq gapni tanlang.', ['Did you finished the task?', 'Did you finish the task?', 'Do you finished the task?', 'You did finish the task?'], 'Did you finish the task?', 'did + asl fe’l.', 'did dan keyin fe’l asl shaklda bo‘ladi.', 'So‘roq gap'),
      tf('“She don’t like coffee” gapi grammatik jihatdan to‘g‘ri.', false, 'To‘g‘risi: She doesn’t like coffee.', 'Uchinchi shaxs birlikda doesn’t ishlatiladi.', 'Inkor')
    ]
  },
  {
    slug: 'tech-vocabulary',
    topic: 'ingliz-asoslari',
    title: 'Texnik lug‘at',
    summary: 'Dasturlash va IT sohasida eng ko‘p uchraydigan inglizcha atamalar: ma’nosi, talaffuzi va qo‘llanilishi.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 2,
    objectives: ['30 ga yaqin asosiy texnik atamani bilish', 'Atamalarni kontekstda ishlatish', 'Xato xabarlaridagi so‘zlarni tushunish'],
    definitions: [
      { term: 'bug', meaning: 'Dasturdagi xato.' },
      { term: 'deploy', meaning: 'Ilovani serverga joylashtirish.' },
      { term: 'feature', meaning: 'Ilovadagi funksiya, imkoniyat.' },
      { term: 'repository (repo)', meaning: 'Loyiha fayllari va tarixi saqlanadigan joy.' },
      { term: 'request / response', meaning: 'So‘rov / javob (mijoz va server o‘rtasida).' }
    ],
    sections: [
      { heading: 'Kod bilan bog‘liq atamalar', body: '- **variable** — o‘zgaruvchi\n- **function** — funksiya\n- **loop** — sikl\n- **condition** — shart\n- **array** — massiv\n- **object** — obyekt\n- **string** — satr (matn)\n- **boolean** — mantiqiy qiymat (true/false)' },
      { heading: 'Jarayon atamalari', body: '- **to debug** — xatoni topib tuzatish\n- **to refactor** — kodni ishlashini o‘zgartirmasdan yaxshilash\n- **to test** — sinovdan o‘tkazish\n- **to merge** — birlashtirish (branchlarni)\n- **to deploy** — joylashtirish\n- **release** — yangi versiya chiqishi\n- **requirement** — talab' },
      { heading: 'Xato xabarlarini o‘qish', body: 'Ko‘p uchraydigan so‘zlar: **undefined** (aniqlanmagan), **not found** (topilmadi), **failed** (muvaffaqiyatsiz), **unexpected token** (kutilmagan belgi), **permission denied** (ruxsat yo‘q), **timeout** (vaqt tugadi), **deprecated** (eskirgan, kelajakda olib tashlanadi).\n\nMasalan: “TypeError: Cannot read properties of undefined” — aniqlanmagan qiymatning xususiyatini o‘qib bo‘lmaydi.' }
    ],
    examples: [
      { title: 'Jamoa chatidagi gap', steps: ['“I fixed the bug in the login feature and opened a pull request.”', 'Tarjima: Kirish funksiyasidagi xatoni tuzatdim va pull request ochdim.'], result: 'Uchta atama: bug, feature, pull request.' }
    ],
    exercises: [
      { prompt: '“The build failed because of a missing dependency” gapini tarjima qiling.', hint: 'dependency — bog‘liqlik (kerakli paket).', solution: 'Kerakli paket (bog‘liqlik) yo‘qligi sababli build muvaffaqiyatsiz tugadi.' },
      { prompt: 'refactor va debug farqini tushuntiring.', hint: 'Biri xatoni tuzatadi, biri kodni yaxshilaydi.', solution: 'debug — xatoni topib tuzatish; refactor — ishlayotgan kodni natijasini o‘zgartirmay toza va tushunarli qilish.' }
    ],
    summaryPoints: ['Kod atamalari: variable, function, loop, array, object.', 'Jarayon: debug, refactor, test, merge, deploy.', 'Xato xabarlari: undefined, not found, failed, timeout.'],
    tutor: {
      simple: 'Texnik atamalar — dasturchilar “shevasi”. bug — xato, fix — tuzatish, feature — yangi imkoniyat. Ularni bilsangiz, hujjatlar va xato xabarlarini ancha oson tushunasiz.',
      analogies: ['Texnik lug‘atni oshxona atamalariga o‘xshating: oshpaz “marinadlash”, “blanshirlash” desa, boshqa oshpaz darhol tushunadi. Dasturchilar ham “deploy qildim”, “merge qildim” deb qisqa va aniq gaplashadi.', '“bug” so‘zi tarixda kompyuter ichiga kirib qolgan haqiqiy hasharotdan kelib chiqqan degan mashhur hikoya bor — shuning uchun xatoni topish “debug”, ya’ni “hasharotni chiqarish”.'],
      extraExamples: ['“The API returns a 401 error when the token expires.” — Token muddati tugaganda API 401 xatosini qaytaradi.', '“This method is deprecated, use fetch instead.” — Bu metod eskirgan, uning o‘rniga fetch’dan foydalaning.'],
      steps: ['Yangi atamani kontekstdagi gap bilan birga yozing.', 'O‘zbekcha ma’nosini qisqa yozing.', 'O‘zingiz bitta yangi gap tuzing.', 'Bir hafta davomida har kuni 5 ta atamani takrorlang.'],
      hints: ['So‘z ma’nosini bilmasangiz, gapdagi boshqa so‘zlarga qarab taxmin qilib ko‘ring.', '-er qo‘shimchasi ko‘pincha bajaruvchini bildiradi: develop → developer, test → tester.'],
      practice: ['Kodingizdagi 5 ta o‘zgaruvchi nomini inglizcha, ma’noli nomlarga almashtiring (masalan, x → totalPrice).', 'Bir hafta davomida uchragan har bir yangi texnik atamani lug‘at daftaringizga yozib boring.'],
      checks: [
        { question: '“deploy” so‘zi nimani anglatadi?', answer: 'Ilovani foydalanuvchilar kira oladigan serverga joylashtirish.' },
        { question: '“Cannot read properties of undefined” xatosi nimani bildiradi?', answer: 'Qiymati aniqlanmagan (undefined) o‘zgaruvchining xususiyatini o‘qishga urinilgan.' }
      ]
    },
    quiz: [
      single('“bug” so‘zining texnik ma’nosi?', ['Hasharot', 'Dasturdagi xato', 'Yangi funksiya', 'Server'], 'Dasturdagi xato', 'IT’da bug — xato.', 'Texnik kontekstda bug dastur xatosini bildiradi.', 'Lug‘at'),
      single('Ishlayotgan kodni natijasini o‘zgartirmasdan yaxshilash?', ['debug', 'deploy', 'refactor', 'merge'], 'refactor', 'refactor — kodni qayta tuzish.', 'debug xatoni tuzatadi, refactor tuzilmani yaxshilaydi.', 'Jarayon'),
      single('“Permission denied” xabari nimani bildiradi?', ['Fayl topilmadi', 'Ruxsat yo‘q', 'Vaqt tugadi', 'Xotira to‘ldi'], 'Ruxsat yo‘q', 'Permission — ruxsat, denied — rad etildi.', 'Bu xabar kirish huquqi yo‘qligini bildiradi.', 'Xato xabarlari'),
      tf('“deprecated” so‘zi “eng yangi” degan ma’noni bildiradi.', false, 'deprecated — eskirgan, foydalanish tavsiya etilmaydi.', 'Bu so‘z vosita kelajakda olib tashlanishini bildiradi.', 'Xato xabarlari'),
      short('“request” ga javob bo‘ladigan inglizcha atama? (bitta so‘z)', ['response'], 'request — so‘rov, response — javob.', 'Server so‘rovga response (javob) qaytaradi.', 'Lug‘at')
    ]
  },
  {
    slug: 'reading-docs',
    topic: 'texnik-ingliz',
    title: 'Texnik hujjatlarni o‘qish',
    summary: 'Inglizcha hujjatlardan kerakli ma’lumotni tez topish: tuzilmani tushunish, skanerlash va kod misollaridan foydalanish.',
    difficulty: 'intermediate',
    durationMinutes: 25,
    order: 1,
    objectives: ['Hujjat sahifasining odatiy tuzilishini tanish', 'Skanerlash va sinchiklab o‘qish usullarini qo‘llash', 'Parametr, qaytuvchi qiymat va misol bo‘limlarini tushunish'],
    definitions: [
      { term: 'Documentation (docs)', meaning: 'Vosita yoki kutubxonadan qanday foydalanishni tushuntiruvchi rasmiy matn.' },
      { term: 'Syntax', meaning: 'Buyruq yoki funksiyaning yozilish qoidasi.' },
      { term: 'Parameters', meaning: 'Funksiyaga beriladigan qiymatlar tavsifi.' },
      { term: 'Return value', meaning: 'Funksiya qaytaradigan natija tavsifi.' }
    ],
    sections: [
      { heading: 'Hujjat sahifasi tuzilishi', body: 'Ko‘pchilik hujjatlar (masalan, MDN) bir xil tuzilishga ega:\n1. **Description** — qisqa tavsif.\n2. **Syntax** — yozilishi.\n3. **Parameters** — parametrlar.\n4. **Return value** — natija.\n5. **Examples** — misollar.\n6. **Browser compatibility** — qaysi brauzerlarda ishlaydi.' },
      { heading: 'Ikki o‘qish usuli', body: '- **Skanerlash (scanning):** sarlavhalar, kod bloklari va qalin so‘zlarga qarab kerakli joyni tez topish.\n- **Sinchiklab o‘qish (close reading):** topilgan bo‘limni so‘zma-so‘z, misollarni sinab ko‘rgan holda o‘qish.\n\nDastlab hammasini o‘qishga urinmang — avval savolingizga javob beradigan bo‘limni toping.' },
      { heading: 'Foydali iboralar', body: '- **optional** — ixtiyoriy (parametr berilmasa ham bo‘ladi)\n- **required** — majburiy\n- **default** — standart qiymat\n- **returns** — qaytaradi\n- **throws** — xato tashlaydi\n- **Note / Warning** — eslatma / ogohlantirish — bularni albatta o‘qing!' }
    ],
    examples: [
      { title: 'Array.prototype.filter() sahifasini o‘qish', steps: ['Syntax: filter(callbackFn) — callback funksiya beriladi.', 'Parameters: callbackFn har bir element uchun chaqiriladi va true/false qaytarishi kerak.', 'Return value: “A shallow copy of the given array containing just the elements that pass the test” — testdan o‘tgan elementlardan iborat yangi massiv.', 'Examples bo‘limidagi kodni nusxalab, brauzer konsolida sinab ko‘ramiz.'], result: 'Savolga javob: filter yangi massiv qaytaradi va aslini o‘zgartirmaydi.' }
    ],
    exercises: [
      { prompt: '“The second parameter is optional and defaults to 0” gapini tarjima qiling.', hint: 'optional, defaults to.', solution: 'Ikkinchi parametr ixtiyoriy va standart qiymati 0.' },
      { prompt: 'Hujjatda funksiya nima qaytarishini bilmoqchisiz. Qaysi bo‘limga qaraysiz?', hint: 'Natija haqida bo‘lim.', solution: 'Return value bo‘limiga.' }
    ],
    summaryPoints: ['Hujjat tuzilishi: Description, Syntax, Parameters, Return value, Examples.', 'Avval skanerlang, keyin kerakli joyni sinchiklab o‘qing.', 'optional/required/default so‘zlariga e’tibor bering.', 'Misollarni o‘zingiz ishga tushirib ko‘ring.'],
    tutor: {
      simple: 'Hujjatni boshidan oxirigacha roman kabi o‘qish shart emas. U — lug‘at: kerakli so‘zni (bo‘limni) topasiz va faqat o‘shani o‘qiysiz.',
      analogies: ['Hujjatni yangi telefon yo‘riqnomasiga o‘xshating: hech kim uni to‘liq o‘qimaydi. “Ekranni qanday yozib olish?” degan savol tug‘ilganda, mundarijadan kerakli bo‘limni topasiz.', 'Skanerlash — supermarketda kerakli bo‘limni (sut mahsulotlari) belgi lavhalariga qarab topish. Sinchiklab o‘qish — tokchadagi mahsulot tarkibini diqqat bilan o‘qish.'],
      extraExamples: ['“Throws: TypeError if the argument is not a function.” — Agar argument funksiya bo‘lmasa, TypeError xatosi tashlanadi. Demak, funksiya berishni unutmaslik kerak.', '“This feature is experimental.” — Bu imkoniyat tajriba bosqichida; muhim loyihada ehtiyotkorlik bilan foydalaning.'],
      steps: ['Savolingizni aniq yozing (masalan, “filter asl massivni o‘zgartiradimi?”).', 'Hujjat sahifasini oching va sarlavhalarni skanerlang.', 'Kerakli bo‘limni (ko‘pincha Return value yoki Examples) toping.', 'Notanish so‘zlarni lug‘atdan qarang.', 'Misolni nusxalab, o‘zingiz ishga tushiring.'],
      hints: ['Javobni topolmayapsizmi? Ctrl+F bilan sahifadan kalit so‘zni qidiring.', 'Gap tushunarsizmi? Avval undagi fe’l va otni toping — gap asosini tushunish osonlashadi.'],
      practice: ['MDN’da Array.prototype.map sahifasini oching va Return value bo‘limini o‘zbek tiliga tarjima qiling.', 'Biror kutubxonaning README faylini oching va 3 ta savolga javob toping: nima qiladi, qanday o‘rnatiladi, birinchi misol qanday.'],
      checks: [
        { question: 'Hujjatdagi “optional” va “required” so‘zlari nimani bildiradi?', answer: 'optional — ixtiyoriy, berilmasa ham bo‘ladi; required — majburiy, albatta berilishi kerak.' },
        { question: 'Skanerlash va sinchiklab o‘qish farqi nima?', answer: 'Skanerlash — sarlavha va kalit so‘zlar bo‘yicha kerakli joyni tez topish; sinchiklab o‘qish — topilgan qismni diqqat bilan, to‘liq tushunib o‘qish.' }
      ]
    },
    quiz: [
      single('Funksiya natijasi qaysi bo‘limda tasvirlanadi?', ['Syntax', 'Parameters', 'Return value', 'Browser compatibility'], 'Return value', 'Return value — qaytuvchi qiymat.', 'Natija haqida ma’lumot Return value bo‘limida bo‘ladi.', 'Hujjat tuzilishi'),
      single('“This parameter is optional” nimani bildiradi?', ['Parametr majburiy', 'Parametr ixtiyoriy', 'Parametr eskirgan', 'Parametr xato'], 'Parametr ixtiyoriy', 'optional — ixtiyoriy.', 'optional so‘zi berilmasa ham bo‘lishini bildiradi.', 'Iboralar'),
      tf('Hujjatdan foydalanishda har doim boshidan oxirigacha to‘liq o‘qish eng samarali usul.', false, 'Avval skanerlab, kerakli qismni topish samaraliroq.', 'Kerakli bo‘limni topib, o‘shani sinchiklab o‘qish vaqtni tejaydi.', 'O‘qish usullari'),
      single('“defaults to true” iborasining ma’nosi?', ['Har doim xato', 'Standart qiymati true', 'true bo‘lishi taqiqlangan', 'Faqat true qabul qiladi'], 'Standart qiymati true', 'default — standart qiymat.', 'Qiymat berilmasa, true ishlatiladi.', 'Iboralar'),
      single('“Throws an error” nimani anglatadi?', ['Xatoni yashiradi', 'Xato tashlaydi', 'Xatoni tuzatadi', 'Xatoni o‘chiradi'], 'Xato tashlaydi', 'throw — tashlash, ya’ni xato yuzaga keladi.', 'throws — ma’lum holatda xato yuz berishini bildiradi.', 'Iboralar')
    ]
  },
  {
    slug: 'dev-communication',
    topic: 'texnik-ingliz',
    title: 'Professional muloqot',
    summary: 'Jamoada aniq va hurmat bilan yozish: savol berish, holat haqida xabar, xato hisoboti va kod tahliliga javob.',
    difficulty: 'intermediate',
    durationMinutes: 25,
    order: 2,
    objectives: ['Yaxshi savol berish tuzilmasini bilish', 'Qisqa holat hisoboti yozish', 'Xato hisobotini to‘g‘ri tuzish'],
    definitions: [
      { term: 'Status update', meaning: 'Ish qanday borayotgani haqida qisqa hisobot.' },
      { term: 'Bug report', meaning: 'Xatoni qayta takrorlash mumkin bo‘lgan tarzda tasvirlash.' },
      { term: 'Code review', meaning: 'Jamoadoshlar kodni ko‘rib chiqib, fikr bildirishi.' },
      { term: 'Blocker', meaning: 'Ishni davom ettirishga to‘sqinlik qilayotgan muammo.' }
    ],
    sections: [
      { heading: 'Yaxshi savol tuzilmasi', body: '1. Nima qilmoqchisiz (maqsad).\n2. Nima qildingiz (urinishlar).\n3. Nima kutgandingiz va nima bo‘ldi.\n4. Xato matni yoki kichik kod parchasi.\n\nMisol: “I’m trying to load courses from the API. I used fetch with await, but I get ‘undefined’. Expected an array. Here is my code: …”' },
      { heading: 'Qisqa holat hisoboti', body: 'Ko‘p jamoalar kunlik uchrashuvda uch savolga javob beradi:\n- **Yesterday:** I finished the login form.\n- **Today:** I will add password validation.\n- **Blockers:** I need access to the test server.' },
      { heading: 'Xato hisoboti va kod tahlili', body: 'Xato hisobotida: qadamlar (steps to reproduce), kutilgan natija (expected), haqiqiy natija (actual), muhit (brauzer, qurilma).\n\nKod tahliliga javobda minnatdorchilik bildiring va aniq bo‘ling: “Thanks for the review! I renamed the variable and added a test.” Rozi bo‘lmasangiz, sababini hurmat bilan tushuntiring.' }
    ],
    examples: [
      { title: 'Xato hisoboti namunasi', steps: ['Title: Login button does not respond on mobile', 'Steps: 1) Open the site on a phone 2) Enter email and password 3) Tap “Login”', 'Expected: User is logged in', 'Actual: Nothing happens, no error message', 'Environment: Chrome on Android'], result: 'Dasturchi xatoni darhol takrorlab, tuzatishi mumkin.' }
    ],
    exercises: [
      { prompt: 'Bugungi ishingiz haqida inglizcha 3 qatorli holat hisoboti yozing (Yesterday / Today / Blockers).', hint: 'Past Simple, will + fe’l va need.', solution: 'Yesterday: I finished … Today: I will … Blockers: none / I need …' },
      { prompt: '“Kod ishlamayapti, yordam bering” degan savolni qanday yaxshilash mumkin?', hint: 'Maqsad, urinish, natija, xato matni.', solution: 'Nimani qilmoqchi ekaningiz, nimani sinab ko‘rganingiz, kutilgan va haqiqiy natija hamda xato matnini qo‘shish kerak.' }
    ],
    summaryPoints: ['Savol: maqsad, urinish, kutilgan/haqiqiy natija, xato matni.', 'Holat: Yesterday / Today / Blockers.', 'Xato hisoboti: steps, expected, actual, environment.', 'Kod tahliliga hurmat va aniqlik bilan javob bering.'],
    tutor: {
      simple: 'Yaxshi muloqot — boshqalarning vaqtini hurmat qilish. Savolingiz qanchalik aniq bo‘lsa, javob shunchalik tez keladi.',
      analogies: ['Xato hisobotini shifokorga shikoyat aytishga o‘xshating: “yomon his qilyapman” deyish yetarli emas. “Kecha kechqurundan beri boshim og‘riydi, harorat 38” — aniq ma’lumot tez tashxisga yordam beradi.', 'Holat hisoboti — futbol jamoasidagi qisqa signal: “To‘pni oldim, hujumga o‘tyapman, himoyachi to‘sib turibdi”. Hamma vaziyatni bir zumda tushunadi.'],
      extraExamples: ['Muddatni uzaytirish so‘rash: “I need one more day to finish the tests. The API changes took longer than expected.”', 'Yordamni so‘rash: “Could you take a look at my pull request when you have time? I’m not sure about the error handling part.”'],
      steps: ['Maqsadni bir gapda yozing.', 'Nimani sinab ko‘rganingizni sanab o‘ting.', 'Kutilgan va haqiqiy natijani yozing.', 'Xato matni yoki kichik kod parchasini qo‘shing.', 'Xushmuomala yakunlang: “Thanks in advance!”'],
      hints: ['Savolingizni o‘qigan odam qo‘shimcha savol bermasdan tushuna oladimi?', 'Xato matnini skrinshot o‘rniga matn sifatida joylang — uni qidirish oson.'],
      practice: ['Yaqinda duch kelgan biror texnik muammo uchun inglizcha savol yozing (4 qismli tuzilma bilan).', 'Kichik ilovangizdagi bitta xato uchun to‘liq bug report yozing.'],
      checks: [
        { question: 'Yaxshi bug report qanday qismlardan iborat?', answer: 'Takrorlash qadamlari (steps), kutilgan natija (expected), haqiqiy natija (actual) va muhit (environment).' },
        { question: '“Blocker” nimani bildiradi?', answer: 'Ishni davom ettirishga to‘sqinlik qilayotgan muammo.' }
      ]
    },
    quiz: [
      single('Holat hisobotida “Blockers” bo‘limi nimani bildiradi?', ['Tugagan ishlar', 'Rejadagi ishlar', 'Ishga to‘sqinlik qilayotgan muammolar', 'Dam olish kunlari'], 'Ishga to‘sqinlik qilayotgan muammolar', 'Blocker — to‘siq.', 'Blockers — ishni to‘xtatib turgan muammolar.', 'Holat hisoboti'),
      multiple('Yaxshi bug report’da bo‘lishi kerak bo‘lgan qismlar?', ['Steps to reproduce', 'Expected result', 'Actual result', 'Muallifning sevimli rangi'], ['Steps to reproduce', 'Expected result', 'Actual result'], 'Bular xatoni takrorlash va tushunishga yordam beradi.', 'Sevimli rang xatoga aloqador emas.', 'Bug report'),
      single('Kod tahliliga eng professional javob?', ['“Kodim to‘g‘ri, o‘zgartirmayman.”', '“Thanks! I fixed the naming and added a test.”', 'Javob bermaslik', '“Siz noto‘g‘ri tushundingiz.”'], '“Thanks! I fixed the naming and added a test.”', 'Minnatdorchilik va aniq harakat.', 'Hurmat va aniqlik professional muloqot asosi.', 'Code review'),
      tf('“Kod ishlamayapti” degan qisqa savol tez va aniq javob olish uchun yetarli.', false, 'Maqsad, urinishlar, natija va xato matni kerak.', 'Aniq ma’lumot bo‘lmasa, yordam beruvchi taxmin qilishga majbur.', 'Savol berish'),
      single('“Steps to reproduce” nimani anglatadi?', ['Xatoni takrorlash qadamlari', 'Kod yozish qadamlari', 'O‘rnatish qadamlari', 'Test natijalari'], 'Xatoni takrorlash qadamlari', 'reproduce — qayta hosil qilish.', 'Bu xatoni qayta yuzaga keltirish uchun bajariladigan harakatlar.', 'Bug report')
    ]
  }
];
