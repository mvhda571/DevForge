import { single, multiple, tf, short } from './helpers.js';

export default [
  {
    slug: 'algebra-equations',
    topic: 'algebra-asoslari',
    title: 'Algebra va tenglamalar',
    summary: 'Noma’lumni topish san’ati: chiziqli tenglamalarni bosqichma-bosqich yechishni o‘rganamiz.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['O‘zgaruvchi va tenglama tushunchasini izohlash', 'Chiziqli tenglamani teng kuchli almashtirishlar bilan yechish', 'Javobni tekshirish odatini shakllantirish'],
    definitions: [
      { term: 'O‘zgaruvchi', meaning: 'Qiymati noma’lum yoki o‘zgarishi mumkin bo‘lgan son o‘rnidagi harf, masalan x.' },
      { term: 'Tenglama', meaning: 'Ikki ifoda tengligini bildiruvchi va noma’lum qatnashgan yozuv, masalan 2x + 3 = 11.' },
      { term: 'Ildiz', meaning: 'Tenglamani to‘g‘ri tenglikka aylantiradigan noma’lum qiymati.' },
      { term: 'Teng kuchli almashtirish', meaning: 'Tenglamaning ikkala tomoniga bir xil amalni bajarish; bunda ildiz o‘zgarmaydi.' }
    ],
    sections: [
      { heading: 'Tenglama — bu tarozi', body: 'Tenglamani pallalari muvozanatda turgan tarozi deb tasavvur qiling. Chap tomonda 2x + 3, o‘ng tomonda 11 turibdi. Tarozi muvozanatini buzmaslik uchun bir pallaga nima qilsak, ikkinchisiga ham xuddi shuni qilishimiz kerak.\n\nMaqsadimiz — x ni yolg‘iz qoldirish, ya’ni “x = son” ko‘rinishiga keltirish.' },
      { heading: 'Asosiy qoidalar', body: '1. Ikkala tomonga bir xil son qo‘shish yoki ayirish mumkin.\n2. Ikkala tomonni noldan farqli bir xil songa ko‘paytirish yoki bo‘lish mumkin.\n3. Hadni bir tomondan ikkinchi tomonga o‘tkazganda uning ishorasi teskarisiga o‘zgaradi — bu aslida 1-qoidaning qisqa yozilishi.' },
      { heading: 'Javobni tekshirish', body: 'Topilgan qiymatni dastlabki tenglamaga qo‘yib ko‘ring. Agar chap va o‘ng tomon teng chiqsa, javob to‘g‘ri. Bu odat imtihonda ko‘plab xatolardan saqlaydi.' }
    ],
    examples: [
      { title: '2x + 3 = 11 tenglamasini yechish', steps: ['Ikkala tomondan 3 ni ayiramiz: 2x = 8.', 'Ikkala tomonni 2 ga bo‘lamiz: x = 4.', 'Tekshiramiz: 2·4 + 3 = 11. To‘g‘ri!'], result: 'x = 4' },
      { title: '5x − 7 = 2x + 8', steps: ['x li hadlarni chapga, sonlarni o‘ngga yig‘amiz: 5x − 2x = 8 + 7.', 'Soddalashtiramiz: 3x = 15.', '3 ga bo‘lamiz: x = 5.', 'Tekshiruv: 5·5 − 7 = 18 va 2·5 + 8 = 18.'], result: 'x = 5' }
    ],
    exercises: [
      { prompt: '3x + 4 = 19 tenglamasini yeching.', hint: 'Avval 4 ni ikkala tomondan ayiring.', solution: '3x = 15, x = 5.' },
      { prompt: '7 − 2x = 1 tenglamasini yeching.', hint: '−2x = 1 − 7 bo‘ladi. Manfiy songa bo‘lishda ehtiyot bo‘ling.', solution: '−2x = −6, x = 3.' },
      { prompt: 'Bir kitob va 3 ta daftar 25 000 so‘m. Kitob 10 000 so‘m bo‘lsa, bitta daftar necha so‘m? Tenglama tuzing.', hint: 'Daftar narxini x deb belgilang.', solution: '10 000 + 3x = 25 000, x = 5 000 so‘m.' }
    ],
    summaryPoints: ['Tenglama — muvozanatdagi tarozi.', 'Ikkala tomonga bir xil amal bajariladi.', 'Hadni o‘tkazganda ishora o‘zgaradi.', 'Javobni har doim tekshiring.'],
    tutor: {
      simple: 'Tenglama — bu “qaysi son yashiringan?” degan topishmoq. Masalan, “biror sonni 2 ga ko‘paytirib, 3 qo‘shsam 11 chiqadi”. Orqaga qarab yuramiz: 11 dan 3 ni olsak 8, 8 ni 2 ga bo‘lsak 4. Yashirin son — 4.',
      analogies: [
        'Sumkangizda bir nechta bir xil olma va yana 3 ta alohida olma bor, jami 11 ta. Agar 3 ta alohida olmani chiqarib qo‘ysangiz, qolgan 8 ta olma ikki teng qutida turibdi. Har bir qutida nechta? 4 ta. Tenglama yechish aynan shunday “chiqarib qo‘yish” va “teng bo‘lish” jarayoni.',
        'Tenglamani shifrlangan xabar deb o‘ylang. Kimdir x ga avval ×2, keyin +3 amalini qo‘llagan. Shifrni ochish uchun amallarni teskari tartibda va teskari ko‘rinishda bajaramiz: avval −3, keyin ÷2.'
      ],
      extraExamples: ['Telefon tarifi: oyiga 20 000 so‘m abonent to‘lovi va har GB uchun 5 000 so‘m. Oy oxirida 45 000 so‘m to‘lansa, necha GB ishlatilgan? 20 000 + 5 000x = 45 000 → 5 000x = 25 000 → x = 5 GB.', 'Ota o‘g‘lidan 3 marta katta, ikkalasining yoshi yig‘indisi 48. O‘g‘il yoshi x bo‘lsa: x + 3x = 48 → 4x = 48 → x = 12. O‘g‘il 12, ota 36 yoshda.'],
      steps: ['Noma’lum qatnashgan hadlarni bir tomonga, sonlarni boshqa tomonga yig‘ing.', 'O‘xshash hadlarni qo‘shing (masalan, 5x − 2x = 3x).', 'Noma’lum oldidagi koeffitsiyentga ikkala tomonni bo‘ling.', 'Javobni dastlabki tenglamaga qo‘yib tekshiring.'],
      hints: ['x ga qanday amallar qo‘llanganini ketma-ket yozib chiqing. Endi ularni teskari tartibda bajaring.', 'Agar ikkala tomonda ham x bo‘lsa, avval ularni bir tomonga yig‘ish kerak emasmi?'],
      practice: ['4x − 9 = 2x + 5 tenglamasini yeching va javobingizni tekshiring.', 'Do‘koningizda ruchka 2 000, qalam 1 500 so‘m. 3 ta ruchka va bir nechta qalam uchun 12 000 so‘m to‘landi. Qalamlar sonini tenglama orqali toping.'],
      checks: [
        { question: 'Nima uchun tenglamaning ikkala tomoniga bir xil son qo‘shish ildizni o‘zgartirmaydi?', answer: 'Chunki tenglik (muvozanat) saqlanadi: ikkala tomon bir xil miqdorga o‘zgaradi, shuning uchun tenglikni qanoatlantiruvchi son o‘sha bo‘lib qoladi.' },
        { question: '6x = 18 tenglamasida x ni topish uchun qanday amal bajarasiz?', answer: 'Ikkala tomonni 6 ga bo‘lamiz, x = 3.' }
      ]
    },
    quiz: [
      single('2x + 5 = 13 tenglamasining ildizi nechaga teng?', ['3', '4', '9', '6.5'], '4', '2x = 13 − 5 = 8, x = 4.', 'Avval 5 ni ayiring: 2x = 8. Keyin 2 ga bo‘ling.', 'Chiziqli tenglama'),
      single('5x − 3 = 2x + 9 tenglamasida x ni toping.', ['2', '3', '4', '12'], '4', '5x − 2x = 9 + 3, 3x = 12, x = 4.', 'x li hadlarni bir tomonga yig‘ish kerak: 3x = 12.', 'Hadlarni o‘tkazish'),
      tf('Hadni tenglamaning bir tomonidan ikkinchi tomoniga o‘tkazganda uning ishorasi o‘zgarmaydi.', false, 'To‘g‘ri, bu gap noto‘g‘ri: o‘tkazilgan had ishorasi teskarisiga o‘zgaradi.', 'Aslida ishora o‘zgaradi, chunki biz ikkala tomondan o‘sha hadni ayiramiz yoki qo‘shamiz.', 'Teng kuchli almashtirish'),
      short('−3x = 12 bo‘lsa, x nechaga teng? (faqat son yozing)', ['-4', '−4'], 'x = 12 ÷ (−3) = −4.', 'Manfiy songa bo‘lganda natija ishorasiga e’tibor bering: 12 ÷ (−3) = −4.', 'Manfiy koeffitsiyent'),
      multiple('Quyidagilardan qaysilari teng kuchli almashtirish hisoblanadi? (bir nechtasini tanlang)', ['Ikkala tomonga 7 qo‘shish', 'Ikkala tomonni 0 ga ko‘paytirish', 'Ikkala tomonni 3 ga bo‘lish', 'Faqat chap tomondan 2 ni ayirish'], ['Ikkala tomonga 7 qo‘shish', 'Ikkala tomonni 3 ga bo‘lish'], 'Ikkala tomonga bir xil amal (0 ga ko‘paytirishdan tashqari) ildizni saqlaydi.', '0 ga ko‘paytirish har qanday tenglamani 0 = 0 ga aylantiradi, bir tomonga amal esa muvozanatni buzadi.', 'Teng kuchli almashtirish')
    ]
  },
  {
    slug: 'functions-graphs',
    topic: 'algebra-asoslari',
    title: 'Funksiyalar va grafiklar',
    summary: 'Funksiya — kirish qiymatini chiqish qiymatiga aylantiruvchi qoida. Chiziqli funksiya grafigini o‘qish va chizishni o‘rganamiz.',
    difficulty: 'beginner',
    durationMinutes: 30,
    order: 2,
    objectives: ['Funksiya tushunchasini kirish–chiqish modeli orqali tushuntirish', 'y = kx + b ko‘rinishidagi funksiya qiymatlarini hisoblash', 'Grafikdan qiymat va o‘sish tezligini o‘qish'],
    definitions: [
      { term: 'Funksiya', meaning: 'Har bir kirish qiymatiga (x) aniq bitta chiqish qiymatini (y) mos qo‘yadigan qoida.' },
      { term: 'Aniqlanish sohasi', meaning: 'Funksiyaga berilishi mumkin bo‘lgan x qiymatlar to‘plami.' },
      { term: 'Burchak koeffitsiyenti (k)', meaning: 'y = kx + b da x bir birlikka oshganda y qanchaga o‘zgarishini bildiradi.' },
      { term: 'Ozod had (b)', meaning: 'x = 0 bo‘lgandagi y qiymati; grafik Oy o‘qini kesib o‘tadigan nuqta.' }
    ],
    sections: [
      { heading: 'Funksiya — sehrli mashina', body: 'Funksiyani mashina deb tasavvur qiling: unga son tashlaysiz (x), u qoidaga ko‘ra ishlov beradi va natija chiqaradi (y). Masalan, f(x) = 2x + 1 qoidasi bo‘yicha 3 kiritilsa, 2·3 + 1 = 7 chiqadi. Muhimi — bitta kirishga faqat bitta chiqish mos keladi.' },
      { heading: 'Chiziqli funksiya y = kx + b', body: 'Bu eng sodda va eng ko‘p ishlatiladigan funksiya. Uning grafigi to‘g‘ri chiziq.\n\n- k > 0 bo‘lsa, chiziq chapdan o‘ngga ko‘tariladi (funksiya o‘suvchi).\n- k < 0 bo‘lsa, chiziq pasayadi (kamayuvchi).\n- k = 0 bo‘lsa, chiziq gorizontal.\n- b grafik Oy o‘qini qayerda kesishini ko‘rsatadi.' },
      { heading: 'Grafik qanday chiziladi', body: 'To‘g‘ri chiziqni chizish uchun ikkita nuqta yetarli. x ga ikkita qulay qiymat bering (masalan, 0 va 2), y ni hisoblang, nuqtalarni koordinata tekisligida belgilang va ularni tutashtiring.' }
    ],
    examples: [
      { title: 'y = 2x + 1 qiymatlar jadvali', steps: ['x = 0 → y = 1', 'x = 1 → y = 3', 'x = 2 → y = 5', 'Har safar x 1 ga oshganda y 2 ga oshadi — bu k = 2.'], result: '(0; 1), (1; 3), (2; 5) nuqtalari bitta to‘g‘ri chiziqda yotadi.' },
      { title: 'Taksi narxi', steps: ['Taksi chaqirish 5 000 so‘m, har kilometr 2 000 so‘m.', 'Narx funksiyasi: y = 2000x + 5000.', '7 km uchun: y = 2000·7 + 5000 = 19 000 so‘m.'], result: 'k = 2000 (km narxi), b = 5000 (boshlang‘ich to‘lov).' }
    ],
    exercises: [
      { prompt: 'f(x) = 3x − 2 bo‘lsa, f(4) ni hisoblang.', hint: 'x o‘rniga 4 ni qo‘ying.', solution: 'f(4) = 3·4 − 2 = 10.' },
      { prompt: 'y = −x + 4 funksiyasi o‘suvchimi yoki kamayuvchi?', hint: 'k ning ishorasiga qarang.', solution: 'k = −1 < 0, demak kamayuvchi.' },
      { prompt: 'Abonement oyiga 50 000 so‘m, har mashg‘ulot qo‘shimcha 10 000 so‘m. Narx funksiyasini yozing va 6 mashg‘ulot narxini toping.', hint: 'b — doimiy to‘lov, k — har mashg‘ulot narxi.', solution: 'y = 10000x + 50000; y(6) = 110 000 so‘m.' }
    ],
    summaryPoints: ['Funksiya — kirishni chiqishga aylantiruvchi qoida.', 'Chiziqli funksiya grafigi — to‘g‘ri chiziq.', 'k — o‘zgarish tezligi, b — boshlang‘ich qiymat.', 'Grafik chizish uchun ikkita nuqta yetarli.'],
    tutor: {
      simple: 'Funksiya — bu retsept. Masalan, “har bir mehmon uchun 2 ta pirog va qo‘shimcha 1 ta pirog”. Mehmonlar soni x bo‘lsa, piroglar soni 2x + 1. 3 mehmon kelsa, 7 ta pirog kerak.',
      analogies: ['Avtomatdan ichimlik sotib olishni tasavvur qiling: tugmani bosasiz (kirish) va doim aynan o‘sha ichimlik chiqadi (chiqish). Bitta tugma ikki xil ichimlik bermaydi — funksiyada ham bitta x ga bitta y mos keladi.', 'Zinapoyani o‘ylang: har bir pog‘ona oldinga 1 qadam, yuqoriga 2 qadam ko‘taradi. Bu k = 2 degani. Zinapoya qaysi balandlikdan boshlanishi esa b.'],
      extraExamples: ['Telefon zaryadi: soat 8:00 da 20% edi va har soatda 15% ga oshadi. y = 15x + 20. 4 soatdan keyin y = 80%.', 'Suv idishdan oqib ketmoqda: dastlab 100 litr, har daqiqada 5 litr kamayadi. y = −5x + 100. 20 daqiqada idish bo‘shaydi, chunki −5·20 + 100 = 0.'],
      steps: ['Funksiya formulasini yozing, masalan y = 2x + 1.', 'x uchun ikkita qiymat tanlang (0 va 2 qulay).', 'Har biri uchun y ni hisoblang.', 'Nuqtalarni koordinata tekisligida belgilang.', 'Ikki nuqtadan to‘g‘ri chiziq o‘tkazing.'],
      hints: ['x o‘rniga son qo‘yishni ko‘paytirishdan boshlang, keyin qo‘shing.', 'Grafik oshyaptimi yoki tushyaptimi — buni faqat x oldidagi songa qarab aytish mumkin emasmi?'],
      practice: ['y = 3x − 1 funksiyasi uchun x = −1, 0, 1, 2 bo‘lgandagi qiymatlar jadvalini tuzing.', 'Kunlik qadamlaringiz: dushanbada 3000, keyin har kuni 500 tadan ko‘p. Funksiya tuzing va yakshanbadagi qadamlar sonini toping.'],
      checks: [
        { question: 'y = 5x + 2 funksiyasida x = 0 bo‘lganda y nechaga teng va bu grafikda nimani bildiradi?', answer: 'y = 2. Bu grafik Oy o‘qini (0; 2) nuqtada kesishini bildiradi — bu ozod had b.' },
        { question: 'k manfiy bo‘lsa, grafik qanday ko‘rinadi?', answer: 'Grafik chapdan o‘ngga pasayadi, funksiya kamayuvchi bo‘ladi.' }
      ]
    },
    quiz: [
      single('f(x) = 4x − 3 bo‘lsa, f(2) nechaga teng?', ['5', '8', '11', '2'], '5', '4·2 − 3 = 5.', 'x o‘rniga 2 ni qo‘ying: 8 − 3 = 5.', 'Funksiya qiymati'),
      single('y = −2x + 6 grafigi Oy o‘qini qaysi nuqtada kesadi?', ['(0; 6)', '(6; 0)', '(0; −2)', '(3; 0)'], '(0; 6)', 'x = 0 da y = b = 6.', 'Oy o‘qida x = 0 bo‘ladi, demak y = 6.', 'Ozod had'),
      tf('y = 3x + 1 funksiyasi o‘suvchi funksiyadir.', true, 'k = 3 > 0, shuning uchun x oshganda y ham oshadi.', 'k ning ishorasiga qarang: musbat k o‘suvchi funksiyani bildiradi.', 'Burchak koeffitsiyenti'),
      single('Funksiyaning eng muhim xossasi qaysi?', ['Har bir x ga aniq bitta y mos keladi', 'Har bir y ga bitta x mos keladi', 'Grafik doim to‘g‘ri chiziq bo‘ladi', 'y doim musbat'], 'Har bir x ga aniq bitta y mos keladi', 'Funksiya ta’rifi aynan shu.', 'Funksiya grafigi egri ham bo‘lishi mumkin; asosiysi — bitta kirishga bitta chiqish.', 'Funksiya ta’rifi'),
      single('Taksi: 4 000 so‘m chaqirish + har km uchun 3 000 so‘m. 5 km narxi qancha?', ['15 000', '19 000', '20 000', '17 000'], '19 000', 'y = 3000·5 + 4000 = 19 000.', 'Funksiya y = 3000x + 4000. Boshlang‘ich to‘lovni unutmang.', 'Chiziqli model')
    ]
  },
  {
    slug: 'logic-thinking',
    topic: 'mantiq',
    title: 'Mantiqiy fikrlash',
    summary: 'Mulohaza, “va”, “yoki”, “emas” amallari va “agar … bo‘lsa” shartlari — dasturlash va hayotiy qarorlarning asosi.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['Mulohaza va uning rost/yolg‘on qiymatini aniqlash', 'VA, YOKI, EMAS amallarini qo‘llash', 'Shartli fikrlash va xulosa chiqarishdagi xatolarni tanish'],
    definitions: [
      { term: 'Mulohaza', meaning: 'Rost yoki yolg‘on ekanligini aniq aytish mumkin bo‘lgan gap.' },
      { term: 'Konyunksiya (VA)', meaning: 'Ikkala mulohaza rost bo‘lgandagina rost bo‘ladigan amal.' },
      { term: 'Dizyunksiya (YOKI)', meaning: 'Kamida bitta mulohaza rost bo‘lsa, rost bo‘ladigan amal.' },
      { term: 'Inkor (EMAS)', meaning: 'Mulohaza qiymatini teskarisiga o‘zgartiruvchi amal.' }
    ],
    sections: [
      { heading: 'Mulohaza nima?', body: '“Toshkent — O‘zbekiston poytaxti” — bu mulohaza, u rost. “5 > 8” ham mulohaza, lekin yolg‘on. “Bugun havo qanday?” esa mulohaza emas, chunki savolni rost yoki yolg‘on deb bo‘lmaydi.' },
      { heading: 'VA, YOKI, EMAS', body: '- **VA**: “Yomg‘ir yog‘yapti VA salqin” — ikkalasi ham bo‘lsagina rost.\n- **YOKI**: “Choy YOKI qahva ichaman” — kamida bittasi bo‘lsa rost.\n- **EMAS**: “Eshik ochiq EMAS” — eshik yopiq bo‘lsa rost.\n\nDasturlashda bular `&&`, `||` va `!` belgilari bilan yoziladi.' },
      { heading: '“Agar … bo‘lsa, … bo‘ladi”', body: '“Agar yomg‘ir yog‘sa, yo‘l ho‘l bo‘ladi.” Yo‘l ho‘l ekanini ko‘rsangiz, albatta yomg‘ir yoqqan degan xulosa noto‘g‘ri — balki suv sepilgandir. Bu ko‘p uchraydigan mantiqiy xato: natijadan sababni qat’iy xulosa qilish.' }
    ],
    examples: [
      { title: 'Kirish sharti', steps: ['Qoida: “Yoshi 16 dan katta VA chiptasi bor bo‘lsa, kiradi.”', 'Ali: 17 yosh, chiptasi yo‘q → rost VA yolg‘on = yolg‘on. Kira olmaydi.', 'Vali: 18 yosh, chiptasi bor → rost VA rost = rost. Kiradi.'], result: 'VA amali uchun ikkala shart bajarilishi shart.' },
      { title: 'Chegirma qoidasi', steps: ['“Talaba YOKI pensioner bo‘lsa, chegirma beriladi.”', 'Talaba bo‘lmagan pensioner → yolg‘on YOKI rost = rost.', 'Na talaba, na pensioner → yolg‘on.'], result: 'YOKI uchun bitta shart yetarli.' }
    ],
    exercises: [
      { prompt: '“3 juft son” mulohazasining inkorini yozing va qiymatini aniqlang.', hint: 'Avval asl mulohaza qiymatini aniqlang.', solution: 'Inkori: “3 juft son emas” — rost (chunki asl mulohaza yolg‘on).' },
      { prompt: 'A = rost, B = yolg‘on. (A VA B) YOKI (EMAS B) ning qiymati qanday?', hint: 'Qavslar ichidan boshlang.', solution: 'A VA B = yolg‘on; EMAS B = rost; yolg‘on YOKI rost = rost.' },
      { prompt: '“Barcha mushuklar hayvon. Barsik — hayvon. Demak, Barsik mushuk.” Bu xulosa to‘g‘rimi?', hint: 'Hayvon bo‘lgan hamma narsa mushukmi?', solution: 'Yo‘q. Barsik it ham bo‘lishi mumkin — xulosa mantiqan asoslanmagan.' }
    ],
    summaryPoints: ['Mulohaza — rost yoki yolg‘on gap.', 'VA — ikkalasi rost; YOKI — kamida bittasi rost; EMAS — teskari.', 'Natijadan sababga qat’iy xulosa qilish — keng tarqalgan xato.'],
    tutor: {
      simple: 'Mantiq — bu “to‘g‘rimi yoki noto‘g‘rimi?” deb tekshirish. VA — “ikkalasi ham kerak”, YOKI — “bittasi yetadi”, EMAS — “teskarisi”.',
      analogies: ['VA amalini ikki qulfli eshik deb tasavvur qiling: eshik ochilishi uchun ikkala kalit ham kerak. YOKI esa ikki eshikli xona: qaysi biri ochiq bo‘lsa ham ichkariga kirasiz.', 'Chiroq va ikki kalitni o‘ylang. Ketma-ket ulangan kalitlar — VA: ikkalasi yoqilsagina chiroq yonadi. Parallel ulangan kalitlar — YOKI: bittasini yoqish yetarli.'],
      extraExamples: ['Telefon ekranini ochish: “Barmoq izi mos YOKI PIN-kod to‘g‘ri”. Bittasi bajarilsa ekran ochiladi.', 'Bank karta orqali to‘lov: “Karta faol VA balans yetarli VA PIN to‘g‘ri”. Bittasi bajarilmasa ham to‘lov o‘tmaydi.'],
      steps: ['Har bir oddiy mulohazani alohida ajrating va harf bilan belgilang (A, B).', 'Har birining rost yoki yolg‘onligini aniqlang.', 'Avval EMAS amallarini, keyin qavs ichini hisoblang.', 'Oxirida VA va YOKI amallarini bajaring.'],
      hints: ['VA bilan bog‘langan gapda bitta yolg‘on qism butun gapni yolg‘on qilmaydimi?', 'Xulosa to‘g‘riligini tekshirish uchun qarshi misol topishga harakat qiling.'],
      practice: ['O‘zingiz uchun “bugun sport bilan shug‘ullanaman” qarorini VA/YOKI shartlari bilan yozing (masalan, vaqt bor VA (havo yaxshi YOKI zal ochiq)).', 'A = “12 toq son”, B = “12 3 ga bo‘linadi”. A YOKI B va A VA B qiymatlarini toping.'],
      checks: [
        { question: 'Agar A rost va B yolg‘on bo‘lsa, “A YOKI B” qiymati qanday?', answer: 'Rost, chunki YOKI uchun kamida bitta mulohaza rost bo‘lishi yetarli.' },
        { question: '“Agar ball 90 dan yuqori bo‘lsa, a’lo baho qo‘yiladi. Sardorga a’lo qo‘yildi.” Sardorning bali 90 dan yuqori deb qat’iy ayta olamizmi?', answer: 'Yo‘q, qat’iy ayta olmaymiz: a’lo baho boshqa sabab bilan ham qo‘yilgan bo‘lishi mumkin. Natijadan sababni qat’iy xulosa qilish xato.' }
      ]
    },
    quiz: [
      single('Quyidagilardan qaysi biri mulohaza?', ['Soat necha bo‘ldi?', '7 — tub son', 'Eshikni yop!', 'Qanday yaxshi kun!'], '7 — tub son', 'Bu gapni rost deb baholash mumkin.', 'Savol, buyruq va undov gaplar rost yoki yolg‘on bo‘lmaydi.', 'Mulohaza'),
      single('A = rost, B = yolg‘on. “A VA B” qiymati?', ['Rost', 'Yolg‘on', 'Aniqlab bo‘lmaydi', 'Ikkalasi ham'], 'Yolg‘on', 'VA uchun ikkala qism ham rost bo‘lishi kerak.', 'Bitta yolg‘on qism VA amalini yolg‘on qiladi.', 'VA amali'),
      single('“EMAS (EMAS A)” nimaga teng?', ['A', 'EMAS A', 'Doim rost', 'Doim yolg‘on'], 'A', 'Ikki marta inkor qilish asl qiymatni qaytaradi.', 'Bir marta inkor teskarisini beradi, ikkinchi inkor yana asliga qaytaradi.', 'Inkor'),
      tf('“Choy YOKI kompot” degan shart, ikkalasi ham bo‘lsa, yolg‘on hisoblanadi.', false, 'Mantiqdagi YOKI ikkalasi rost bo‘lganda ham rost bo‘ladi.', 'Mantiqiy YOKI “kamida bittasi” degani, ikkalasi bo‘lsa ham shart bajariladi.', 'YOKI amali'),
      single('“Agar yomg‘ir yog‘sa, maysa ho‘l bo‘ladi. Maysa ho‘l.” Qaysi xulosa to‘g‘ri?', ['Albatta yomg‘ir yoqqan', 'Yomg‘ir yog‘magan', 'Yomg‘ir yoqqan bo‘lishi mumkin, lekin aniq emas', 'Maysa quruq'], 'Yomg‘ir yoqqan bo‘lishi mumkin, lekin aniq emas', 'Maysani boshqa sabab ham ho‘llagan bo‘lishi mumkin.', 'Natijadan sababni qat’iy xulosa qilish mantiqiy xato.', 'Shartli fikrlash')
    ]
  },
  {
    slug: 'percentages',
    topic: 'amaliy-matematika',
    title: 'Foizlar',
    summary: 'Chegirma, ustama, foiz o‘sish va kamayish — kundalik hayot va iqtisodda eng ko‘p ishlatiladigan hisob-kitoblar.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['Sonning foizini topish', 'Bir son ikkinchisining necha foizi ekanini hisoblash', 'Foizli o‘sish va kamayishni hisoblash'],
    definitions: [
      { term: 'Foiz', meaning: 'Sonning yuzdan bir qismi: 1% = 1/100 = 0.01.' },
      { term: 'Chegirma', meaning: 'Narxning foizda ifodalangan qismiga kamaytirilishi.' },
      { term: 'Foizli o‘zgarish', meaning: '(Yangi qiymat − Eski qiymat) ÷ Eski qiymat × 100%.' }
    ],
    sections: [
      { heading: 'Foiz — yuzdan bir ulush', body: '“Foiz” so‘zi “yuzdan” ma’nosini anglatadi. 25% — bu 100 dan 25 ta, ya’ni chorak qism. Foizni o‘nli kasrga aylantirish uchun 100 ga bo‘lamiz: 25% = 0.25, 7% = 0.07.' },
      { heading: 'Uch asosiy masala', body: '1. **Sonning foizini topish:** 200 ning 15% i = 200 × 0.15 = 30.\n2. **Foiz bo‘yicha sonni topish:** biror sonning 20% i 40 bo‘lsa, son = 40 ÷ 0.2 = 200.\n3. **Necha foiz ekanini topish:** 30 soni 120 ning necha foizi? 30 ÷ 120 × 100% = 25%.' },
      { heading: 'O‘sish va kamayish', body: 'Narx 10% oshsa, yangi narx = eski × 1.10. Narx 10% kamaysa, yangi narx = eski × 0.90.\n\nDiqqat: avval 10% oshib, keyin 10% kamaysa, narx dastlabkiga qaytmaydi! 100 → 110 → 99.' }
    ],
    examples: [
      { title: 'Chegirmali narx', steps: ['Krossovka narxi 400 000 so‘m, chegirma 25%.', 'Chegirma miqdori: 400 000 × 0.25 = 100 000.', 'Yangi narx: 400 000 − 100 000 = 300 000 so‘m.', 'Qisqa yo‘l: 400 000 × 0.75 = 300 000.'], result: '300 000 so‘m' },
      { title: 'Foizli o‘sish', steps: ['O‘tgan oy 800 ta obunachi, bu oy 1000 ta.', 'O‘zgarish: 1000 − 800 = 200.', 'Foiz: 200 ÷ 800 × 100% = 25%.'], result: 'Obunachilar 25% ga oshgan.' }
    ],
    exercises: [
      { prompt: '350 ning 20% ini toping.', hint: '20% = 0.2', solution: '350 × 0.2 = 70.' },
      { prompt: 'Sinfda 30 o‘quvchi, ulardan 12 tasi qiz. Qizlar necha foizni tashkil etadi?', hint: 'Qism ÷ butun × 100%.', solution: '12 ÷ 30 × 100% = 40%.' },
      { prompt: 'Telefon narxi 2 000 000 so‘m edi, 15% qimmatlashdi. Yangi narx qancha?', hint: '1 + 0.15 ga ko‘paytiring.', solution: '2 000 000 × 1.15 = 2 300 000 so‘m.' }
    ],
    summaryPoints: ['1% = 0.01.', 'Sonning foizi: son × foiz/100.', 'Necha foiz: qism ÷ butun × 100%.', 'Ketma-ket foizli o‘zgarishlar oddiy qo‘shilmaydi.'],
    tutor: {
      simple: 'Foiz — 100 ta bo‘lakdan nechtasi. Pitsani 100 bo‘lakka bo‘lsangiz va 25 bo‘lagini olsangiz, 25% olgan bo‘lasiz — bu pitsaning chorak qismi.',
      analogies: ['Telefoningiz batareyasini o‘ylang: 100% — to‘liq, 50% — yarmi, 20% — beshdan bir qismi. Foiz har doim “butunning qanchasi?” degan savolga javob beradi.', 'Foizni “har 100 so‘mdan” deb o‘qing. 15% chegirma — har 100 so‘mdan 15 so‘m tejaysiz. 400 000 so‘mda 4 000 ta “100 so‘m” bor, demak 4 000 × 15 = 60 000 so‘m tejaysiz.'],
      extraExamples: ['Bank omonati: 1 000 000 so‘m yillik 20% bilan qo‘yilsa, bir yildan so‘ng 1 200 000 so‘m bo‘ladi (soliq va shartlar hisobga olinmagan soddalashtirilgan misol).', 'Test natijasi: 40 savoldan 34 tasiga to‘g‘ri javob — 34 ÷ 40 × 100% = 85%.'],
      steps: ['Butun miqdor nima ekanini aniqlang (100% nima?).', 'Foizni o‘nli kasrga aylantiring (foiz ÷ 100).', 'Masala turiga qarab ko‘paytiring yoki bo‘ling.', 'Javob mantiqan to‘g‘riligini tekshiring (masalan, chegirmali narx asl narxdan kichikmi?).'],
      hints: ['Avval “100% nima?” degan savolga javob bering — butun miqdorni toping.', 'Foizni 100 ga bo‘lib, o‘nli kasr ko‘rinishida yozing va keyin ko‘paytiring.'],
      practice: ['Do‘konda 30% chegirma, keyin kassada yana 10% chegirma. 200 000 so‘mlik ko‘ylakning yakuniy narxi qancha? Bu 40% chegirmaga tengmi?', 'Oylik xarajatlaringizni toifalarga bo‘ling (ovqat, transport, ko‘ngilochar) va har birining umumiy xarajatdagi foizini hisoblang.'],
      checks: [
        { question: '80 ning 25% i nechaga teng va qanday hisobladingiz?', answer: '20. 80 × 0.25 = 20 (yoki 80 ning choragi).' },
        { question: 'Narx 20% oshib, keyin 20% kamaysa, dastlabki narxga qaytadimi?', answer: 'Yo‘q. 100 → 120 → 96. Ikkinchi foiz kattaroq songa nisbatan hisoblanadi.' }
      ]
    },
    quiz: [
      single('240 ning 25% i nechaga teng?', ['24', '48', '60', '96'], '60', '240 × 0.25 = 60.', '25% — bu chorak qism: 240 ÷ 4 = 60.', 'Sonning foizi'),
      single('18 soni 72 ning necha foizi?', ['18%', '25%', '40%', '54%'], '25%', '18 ÷ 72 = 0.25 = 25%.', 'Qismni butunga bo‘ling va 100 ga ko‘paytiring.', 'Necha foiz'),
      single('500 000 so‘mlik mahsulotga 20% chegirma. Yangi narx?', ['400 000', '480 000', '100 000', '420 000'], '400 000', '500 000 × 0.8 = 400 000.', 'Chegirma 100 000 so‘m, uni asl narxdan ayirish kerak.', 'Chegirma'),
      tf('Narx 10% oshib, keyin 10% kamaysa, dastlabki narxga teng bo‘ladi.', false, '100 → 110 → 99, ya’ni dastlabkidan 1% kam.', 'Ikkinchi foiz yangi (kattaroq) narxdan hisoblanadi, shuning uchun natija farq qiladi.', 'Ketma-ket foiz'),
      short('Biror sonning 10% i 35 ga teng. Shu sonni toping (faqat son).', ['350'], '35 ÷ 0.1 = 350.', 'Foiz bo‘yicha butunni topish uchun qismni foizning o‘nli kasriga bo‘ling.', 'Butunni topish')
    ]
  },
  {
    slug: 'ratios',
    topic: 'amaliy-matematika',
    title: 'Nisbat va proporsiya',
    summary: 'Retseptlarni o‘zgartirish, xarita masshtabi, valyuta almashtirish — barchasi nisbat va proporsiyaga asoslanadi.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 2,
    objectives: ['Nisbatni yozish va soddalashtirish', 'Proporsiyani tuzish va noma’lum hadni topish', 'Masshtab va to‘g‘ri proporsionallikni qo‘llash'],
    definitions: [
      { term: 'Nisbat', meaning: 'Ikki miqdorni bo‘lish orqali taqqoslash, a : b ko‘rinishida yoziladi.' },
      { term: 'Proporsiya', meaning: 'Ikki nisbatning tengligi: a : b = c : d.' },
      { term: 'Masshtab', meaning: 'Xarita yoki chizmadagi uzunlikning haqiqiy uzunlikka nisbati, masalan 1 : 100 000.' }
    ],
    sections: [
      { heading: 'Nisbat nima?', body: 'Sinfda 12 qiz va 18 o‘g‘il bo‘lsa, qizlar va o‘g‘illar nisbati 12 : 18. Ikkala sonni 6 ga bo‘lib soddalashtiramiz: 2 : 3. Ya’ni har 2 qizga 3 o‘g‘il to‘g‘ri keladi.' },
      { heading: 'Proporsiya va asosiy xossa', body: 'a : b = c : d proporsiyada chetki hadlar ko‘paytmasi o‘rta hadlar ko‘paytmasiga teng: a × d = b × c. Shu xossa yordamida noma’lum hadni topamiz.\n\nMasalan, 3 : 5 = x : 20 → 3 × 20 = 5x → x = 12.' },
      { heading: 'To‘g‘ri va teskari proporsionallik', body: '- **To‘g‘ri:** biri necha marta oshsa, ikkinchisi ham shuncha marta oshadi (mahsulot soni va narxi).\n- **Teskari:** biri oshsa, ikkinchisi shuncha marta kamayadi (ishchilar soni va ishni bajarish vaqti).' }
    ],
    examples: [
      { title: 'Retseptni moslashtirish', steps: ['4 kishilik palovga 1 kg guruch kerak.', '10 kishi uchun: 4 : 1 = 10 : x.', '4x = 10 → x = 2.5 kg.'], result: '2.5 kg guruch' },
      { title: 'Xarita masshtabi', steps: ['Masshtab 1 : 50 000.', 'Xaritada ikki shahar orasi 8 sm.', 'Haqiqiy masofa: 8 × 50 000 = 400 000 sm = 4 km.'], result: '4 km' }
    ],
    exercises: [
      { prompt: '15 : 25 nisbatni soddalashtiring.', hint: 'Ikkala sonning eng katta umumiy bo‘luvchisini toping.', solution: '5 ga bo‘lamiz: 3 : 5.' },
      { prompt: 'x : 6 = 10 : 15 proporsiyadan x ni toping.', hint: 'Chetki hadlar ko‘paytmasi = o‘rta hadlar ko‘paytmasi.', solution: '15x = 60, x = 4.' },
      { prompt: '3 ta ishchi devorni 8 kunda quradi. 6 ta ishchi necha kunda quradi?', hint: 'Bu teskari proporsionallik.', solution: 'Ishchilar 2 marta ko‘p — vaqt 2 marta kam: 4 kun.' }
    ],
    summaryPoints: ['Nisbat — bo‘lish orqali taqqoslash.', 'Proporsiyada a × d = b × c.', 'To‘g‘ri proporsionallikda ikkala miqdor birga oshadi, teskarida biri oshsa ikkinchisi kamayadi.'],
    tutor: {
      simple: 'Nisbat — “har nechtaga nechta”. Limonad uchun “har 1 qoshiq sharbatga 4 qoshiq suv” — bu 1 : 4. Ko‘proq limonad kerak bo‘lsa, ikkalasini ham bir xil marta oshirasiz: 2 : 8, 3 : 12.',
      analogies: ['Rangli bo‘yoq aralashtirishni o‘ylang: aynan o‘sha yashil rangni olish uchun ko‘k va sariqni doimo bir xil nisbatda qo‘shish kerak. Ko‘k ko‘payib ketsa, rang o‘zgaradi — proporsiya buziladi.', 'Fotosuratni kattalashtirish: eni 2 marta oshsa, bo‘yi ham 2 marta oshishi kerak, aks holda rasm cho‘zilib qoladi. Bu to‘g‘ri proporsionallik.'],
      extraExamples: ['Valyuta: 1 dollar 12 700 so‘m deb faraz qilaylik (kurs har kuni o‘zgaradi). 50 dollar uchun: 1 : 12 700 = 50 : x → x = 635 000 so‘m.', 'Avtomobil 3 litr benzinga 40 km yuradi. 15 litr bilan: 3 : 40 = 15 : x → x = 200 km.'],
      steps: ['Qaysi miqdorlar bog‘liqligini aniqlang.', 'Bog‘liqlik to‘g‘rimi yoki teskarimi — tekshiring.', 'Ma’lum qiymatlardan proporsiya tuzing (bir xil birliklar bir tomonda).', 'a × d = b × c xossasidan noma’lumni toping.', 'Javob mantiqan to‘g‘rimi — tekshiring.'],
      hints: ['Agar bir miqdor oshganda ikkinchisi ham oshsa, qaysi proporsionallik bo‘ladi?', 'Proporsiyani yozishda bir xil narsalarni (masalan, kishilar soni) bir ustunga joylashtiring.'],
      practice: ['Sevimli retseptingizni oling va uni 2 barobar ko‘proq odam uchun qayta hisoblang.', 'Uyingizdan maktabgacha bo‘lgan masofani xaritada o‘lchang va masshtab orqali haqiqiy masofani toping.'],
      checks: [
        { question: '2 : 5 = 8 : x proporsiyada x nechaga teng?', answer: 'x = 20, chunki 2x = 40.' },
        { question: 'Tezlik oshganda yo‘lga sarflanadigan vaqt qanday o‘zgaradi va bu qanday proporsionallik?', answer: 'Vaqt kamayadi — bu teskari proporsionallik.' }
      ]
    },
    quiz: [
      single('18 : 24 nisbatning soddalashtirilgan ko‘rinishi?', ['3 : 4', '2 : 3', '9 : 16', '6 : 9'], '3 : 4', 'Ikkala sonni 6 ga bo‘lamiz.', '18 va 24 ning EKUB i 6.', 'Nisbat'),
      single('4 : x = 6 : 15 proporsiyada x = ?', ['8', '10', '12', '22.5'], '10', '6x = 60 → x = 10.', 'Chetki hadlar: 4 va 15; o‘rta hadlar: x va 6. 4·15 = 6x.', 'Proporsiya'),
      single('Masshtab 1 : 100 000. Xaritada 3 sm haqiqatda necha km?', ['0.3 km', '3 km', '30 km', '300 km'], '3 km', '3 × 100 000 = 300 000 sm = 3 km.', 'Santimetrni kilometrga aylantirishda 100 000 ga bo‘ling.', 'Masshtab'),
      tf('Ishchilar soni ortganda ishni bajarish vaqti kamayishi — teskari proporsionallik.', true, 'Biri oshganda ikkinchisi kamayadi.', 'Ikki miqdor qarama-qarshi yo‘nalishda o‘zgarsa, bu teskari proporsionallik.', 'Teskari proporsionallik'),
      single('5 ta daftar 15 000 so‘m. 8 ta daftar qancha?', ['20 000', '24 000', '25 000', '30 000'], '24 000', '1 ta daftar 3 000 so‘m, 8 ta — 24 000.', 'Avval bitta daftar narxini toping.', 'To‘g‘ri proporsionallik')
    ]
  },
  {
    slug: 'statistics',
    topic: 'statistika',
    title: 'Statistika asoslari',
    summary: 'O‘rtacha qiymat, mediana, moda va diapazon yordamida ma’lumotlardan to‘g‘ri xulosa chiqarishni o‘rganamiz.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 1,
    objectives: ['O‘rtacha arifmetik, mediana va modani hisoblash', 'Qaysi ko‘rsatkich qachon mos kelishini tushuntirish', 'Chetga chiquvchi qiymatlar ta’sirini aniqlash'],
    definitions: [
      { term: 'O‘rtacha arifmetik', meaning: 'Barcha qiymatlar yig‘indisini ularning soniga bo‘lish natijasi.' },
      { term: 'Mediana', meaning: 'Qiymatlar o‘sish tartibida terilganda o‘rtada turgan qiymat.' },
      { term: 'Moda', meaning: 'Eng ko‘p takrorlangan qiymat.' },
      { term: 'Diapazon', meaning: 'Eng katta va eng kichik qiymat orasidagi farq.' }
    ],
    sections: [
      { heading: 'Nega statistika kerak?', body: 'Statistika ko‘p sonli ma’lumotni bir nechta tushunarli ko‘rsatkichga “siqadi”. Masalan, 30 o‘quvchining baholarini birma-bir sanash o‘rniga, “o‘rtacha baho 4.2” deb aytish mumkin.' },
      { heading: 'O‘rtacha va mediana', body: 'Baholar: 3, 4, 4, 5, 5. O‘rtacha = (3+4+4+5+5) ÷ 5 = 4.2. Mediana = 4 (o‘rtadagi qiymat).\n\nAgar qiymatlar soni juft bo‘lsa, mediana o‘rtadagi ikki sonning o‘rtachasi: 2, 4, 6, 8 → (4 + 6) ÷ 2 = 5.' },
      { heading: 'Chetga chiquvchi qiymatlar', body: 'Besh kishining oyligi: 3, 3, 4, 4 va 50 million so‘m. O‘rtacha = 12.8 million — lekin bu hech kimning haqiqiy oyligiga o‘xshamaydi! Mediana = 4 million esa vaziyatni yaxshiroq aks ettiradi. Shuning uchun daromad kabi ma’lumotlarda ko‘pincha mediana ishlatiladi.' }
    ],
    examples: [
      { title: 'Haftalik qadamlar', steps: ['Ma’lumot (ming): 6, 8, 7, 10, 6, 12, 6.', 'Tartiblaymiz: 6, 6, 6, 7, 8, 10, 12.', 'O‘rtacha: 55 ÷ 7 ≈ 7.86 ming.', 'Mediana: 7 ming; moda: 6 ming; diapazon: 12 − 6 = 6 ming.'], result: 'Turli ko‘rsatkichlar ma’lumotning turli jihatini ko‘rsatadi.' }
    ],
    exercises: [
      { prompt: '5, 7, 7, 9, 12 qiymatlarining o‘rtachasi, medianasi va modasini toping.', hint: 'Yig‘indi 40.', solution: 'O‘rtacha 8, mediana 7, moda 7.' },
      { prompt: '10, 2, 8, 4 qiymatlarining medianasini toping.', hint: 'Avval tartiblang. Juft sonli qatorda o‘rtadagi ikki sonni oling.', solution: '2, 4, 8, 10 → (4 + 8) ÷ 2 = 6.' },
      { prompt: 'Uy narxlari haqida gapirganda nega o‘rtachadan ko‘ra mediana afzal bo‘lishi mumkin?', hint: 'Juda qimmat bir nechta uyni o‘ylang.', solution: 'Bir nechta juda qimmat uy o‘rtachani keskin oshiradi, mediana esa bunga kam ta’sirlanadi.' }
    ],
    summaryPoints: ['O‘rtacha — yig‘indi ÷ soni.', 'Mediana — tartiblangan qatorning o‘rtasi.', 'Moda — eng ko‘p uchragan qiymat.', 'Chetga chiquvchi qiymatlar o‘rtachani buzadi, medianani kamroq.'],
    tutor: {
      simple: 'O‘rtacha — hammaning konfetini bir joyga yig‘ib, teng bo‘lib bersak, har kimga qanchadan tegadi. Mediana — bo‘yi bo‘yicha saf tortganda o‘rtada turgan bola. Moda — sinfda eng ko‘p uchraydigan ism.',
      analogies: ['O‘rtachani suv sathiga o‘xshatish mumkin: turli balandlikdagi idishlardagi suvni bitta katta hovuzga quysangiz, sath bir tekis bo‘ladi — bu o‘rtacha.', 'Mediana — yo‘lning qoq o‘rtasidagi bekat. Yo‘lning bir uchi juda uzoqqa cho‘zilsa ham, o‘rtadagi bekat unchalik siljimaydi. Shuning uchun mediana chetga chiquvchi qiymatlarga chidamli.'],
      extraExamples: ['Futbol jamoasi 5 o‘yinda: 1, 0, 2, 1, 6 gol urdi. O‘rtacha 2 gol, lekin mediana 1 gol — 6 golli bitta o‘yin o‘rtachani oshirib yuborgan.', 'Do‘konda eng ko‘p sotilgan poyabzal o‘lchami — moda. Do‘kon egasi buyurtmani shunga qarab beradi, chunki o‘rtacha o‘lcham (masalan, 39.6) amalda yo‘q.'],
      steps: ['Ma’lumotlarni o‘sish tartibida yozing.', 'Yig‘indini hisoblab, soniga bo‘ling — o‘rtacha.', 'O‘rtadagi qiymatni toping — mediana.', 'Eng ko‘p takrorlanganini toping — moda.', 'Eng katta va eng kichik farqi — diapazon.'],
      hints: ['Medianani topishdan oldin sonlarni tartiblashni unutmadingizmi?', 'Qiymatlar soni juftmi yoki toqmi? Bu medianani topish usulini o‘zgartiradi.'],
      practice: ['Oxirgi 7 kunda telefonda o‘tkazgan vaqtingizni yozing va o‘rtacha, mediana, diapazonni hisoblang.', 'Sinfdoshlaringizning sevimli fanlari bo‘yicha so‘rov o‘tkazing va modani aniqlang.'],
      checks: [
        { question: '1, 3, 3, 6, 7 qatorining medianasi va modasi nechaga teng?', answer: 'Mediana 3, moda 3.' },
        { question: 'Qaysi ko‘rsatkich juda katta bitta qiymatdan eng ko‘p ta’sirlanadi?', answer: 'O‘rtacha arifmetik.' }
      ]
    },
    quiz: [
      single('4, 6, 8, 10, 12 qiymatlarining o‘rtachasi?', ['6', '8', '10', '40'], '8', 'Yig‘indi 40, soni 5: 40 ÷ 5 = 8.', 'Barcha qiymatlarni qo‘shing va soniga bo‘ling.', 'O‘rtacha'),
      single('9, 2, 7, 4, 5 qiymatlarining medianasi?', ['7', '5', '4', '5.4'], '5', 'Tartiblangan: 2, 4, 5, 7, 9 — o‘rtada 5.', 'Avval tartiblash kerak, keyin o‘rtadagi qiymat olinadi.', 'Mediana'),
      single('3, 5, 5, 6, 8, 5, 3 qatorining modasi?', ['3', '5', '6', '8'], '5', '5 uch marta takrorlangan.', 'Moda — eng ko‘p uchragan qiymat.', 'Moda'),
      tf('Juda katta bitta qiymat medianani o‘rtachaga qaraganda ko‘proq o‘zgartiradi.', false, 'Aksincha: o‘rtacha ko‘proq o‘zgaradi, mediana chetga chiquvchi qiymatlarga chidamli.', 'Mediana faqat o‘rtadagi qiymatga bog‘liq, shuning uchun chetdagi katta son unga kam ta’sir qiladi.', 'Chetga chiquvchi qiymat'),
      short('2, 9, 4, 15 qiymatlarining diapazonini toping (faqat son).', ['13'], '15 − 2 = 13.', 'Diapazon = eng katta − eng kichik.', 'Diapazon')
    ]
  }
];
