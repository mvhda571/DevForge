import { single, multiple, tf, short } from './helpers.js';

export default [
  {
    slug: 'binary-numbers',
    topic: 'raqamli-asoslar',
    title: 'Ikkilik sanoq tizimi',
    summary: 'Kompyuter nega faqat 0 va 1 ni tushunadi? Ikkilik sonlarni o‘nlikka va aksincha o‘tkazishni o‘rganamiz.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['Bit va bayt tushunchalarini izohlash', 'Ikkilik sonni o‘nlik songa o‘tkazish', 'O‘nlik sonni ikkilik songa o‘tkazish'],
    definitions: [
      { term: 'Bit', meaning: 'Ma’lumotning eng kichik birligi; faqat 0 yoki 1 qiymat oladi.' },
      { term: 'Bayt', meaning: '8 bitdan iborat guruh; 256 xil qiymatni (0–255) ifodalaydi.' },
      { term: 'Ikkilik sanoq tizimi', meaning: 'Faqat 0 va 1 raqamlaridan foydalanadigan, asosi 2 bo‘lgan sanoq tizimi.' },
      { term: 'Razryad qiymati', meaning: 'Raqam turgan o‘rinning “og‘irligi”; ikkilik tizimda o‘ngdan chapga 1, 2, 4, 8, 16…' }
    ],
    sections: [
      { heading: 'Nega aynan 0 va 1?', body: 'Kompyuter ichidagi millionlab tranzistorlar kalitga o‘xshaydi: tok o‘tadi (1) yoki o‘tmaydi (0). Ikki holatni ishonchli farqlash oson, shuning uchun barcha ma’lumot — matn, rasm, musiqa — oxir-oqibat 0 va 1 lar ketma-ketligi sifatida saqlanadi.' },
      { heading: 'Razryadlar qanday ishlaydi', body: 'O‘nlik tizimda 352 = 3·100 + 5·10 + 2·1. Ikkilik tizimda xuddi shunday, faqat og‘irliklar 2 ning darajalari: 1, 2, 4, 8, 16, 32, 64, 128.\n\nMasalan, 1011₂ = 1·8 + 0·4 + 1·2 + 1·1 = 11.' },
      { heading: 'O‘nlikdan ikkilikka', body: 'Sonni ketma-ket 2 ga bo‘lib, qoldiqlarni yozib boramiz. Qoldiqlarni pastdan yuqoriga o‘qiymiz.\n\n13 ÷ 2 = 6 (qoldiq 1), 6 ÷ 2 = 3 (0), 3 ÷ 2 = 1 (1), 1 ÷ 2 = 0 (1) → 1101₂.' }
    ],
    examples: [
      { title: '10110₂ ni o‘nlikka o‘tkazish', steps: ['Razryad og‘irliklari: 16, 8, 4, 2, 1.', 'Birlar turgan o‘rinlar: 16, 4, 2.', '16 + 4 + 2 = 22.'], result: '10110₂ = 22' },
      { title: '25 ni ikkilikka o‘tkazish', steps: ['25 ÷ 2 = 12, qoldiq 1', '12 ÷ 2 = 6, qoldiq 0', '6 ÷ 2 = 3, qoldiq 0', '3 ÷ 2 = 1, qoldiq 1', '1 ÷ 2 = 0, qoldiq 1', 'Pastdan yuqoriga: 11001.'], result: '25 = 11001₂' }
    ],
    exercises: [
      { prompt: '111₂ ni o‘nlikka o‘tkazing.', hint: '4 + 2 + 1', solution: '7' },
      { prompt: '18 ni ikkilikka o‘tkazing.', hint: '16 + 2', solution: '10010₂' },
      { prompt: 'Bir baytda nechta turli qiymat saqlash mumkin va nima uchun?', hint: 'Har bir bit 2 ta holatga ega, bitlar soni 8.', solution: '2⁸ = 256 ta qiymat (0 dan 255 gacha).' }
    ],
    summaryPoints: ['Kompyuter ma’lumotni 0 va 1 bilan saqlaydi.', '8 bit = 1 bayt.', 'Ikkilik razryadlar og‘irligi: 1, 2, 4, 8, 16…', 'O‘nlikdan ikkilikka — 2 ga bo‘lib, qoldiqlarni teskari o‘qish.'],
    tutor: {
      simple: 'Tasavvur qiling, sizda faqat yoqib-o‘chiriladigan chiroqlar bor. Yoniq — 1, o‘chiq — 0. Chiroqlarning har biri o‘z “narxiga” ega: 1, 2, 4, 8. Yoniq chiroqlar narxini qo‘shsangiz, son hosil bo‘ladi.',
      analogies: ['Pul bilan o‘ylab ko‘ring: sizda faqat 1, 2, 4, 8 va 16 so‘mlik tangalar bor, har biridan bittadan. Istalgan summani (0 dan 31 gacha) faqat ba’zi tangalarni olish orqali yig‘ish mumkin. Qaysi tanga olindi — 1, olinmadi — 0. Bu aynan ikkilik yozuv!', 'Barmoqlaringiz bilan sanash: odatda 10 gacha sanaymiz. Lekin har bir barmoqni “bukilgan/ochiq” deb ikkilik tarzda ishlatsangiz, bir qo‘l bilan 31 gacha sanash mumkin.'],
      extraExamples: ['Rang kodlari: ekranda har bir piksel rangi qizil, yashil va ko‘k uchun bittadan bayt bilan saqlanadi. Har biri 0–255 oralig‘ida, shuning uchun 256³ ≈ 16.7 million rang bor.', 'Harf “A” kompyuterda 65 raqami bilan kodlanadi, ikkilikda bu 01000001.'],
      steps: ['Ikkilik sonni yozing va har bir raqam ostiga o‘ngdan chapga 1, 2, 4, 8, 16… yozing.', '1 turgan o‘rinlardagi og‘irliklarni belgilang.', 'Belgilangan og‘irliklarni qo‘shing — bu o‘nlik son.'],
      hints: ['O‘ngdagi eng chekka raqam og‘irligi 1 ekanini esladingizmi?', 'O‘nlikdan ikkilikka o‘tkazishda qoldiqlarni qaysi tartibda o‘qish kerak?'],
      practice: ['Tug‘ilgan kuningiz sanasini (masalan, 23) ikkilik tizimga o‘tkazing.', '00101010₂ baytini o‘nlikka o‘tkazing va javobni tekshiring.'],
      checks: [
        { question: '1000₂ o‘nlik tizimda nechaga teng?', answer: '8, chunki 1 to‘rtinchi razryadda turibdi va uning og‘irligi 8.' },
        { question: 'Nima uchun kompyuterlar ikkilik tizimdan foydalanadi?', answer: 'Chunki elektron kalitlar (tranzistorlar) ikki holatni — tok bor/yo‘q — ishonchli farqlaydi.' }
      ]
    },
    quiz: [
      single('101₂ o‘nlik tizimda nechaga teng?', ['3', '5', '6', '101'], '5', '4 + 0 + 1 = 5.', 'Og‘irliklar 4, 2, 1. Birlar 4 va 1 o‘rnida.', 'Ikkilikdan o‘nlikka'),
      single('12 soni ikkilik tizimda qanday yoziladi?', ['1010', '1100', '1110', '0011'], '1100', '8 + 4 = 12 → 1100.', '12 = 8 + 4. 8 va 4 o‘rinlariga 1, qolganlariga 0.', 'O‘nlikdan ikkilikka'),
      single('1 baytda nechta bit bor?', ['2', '4', '8', '16'], '8', '1 bayt = 8 bit.', 'Bayt sakkizta bitdan tashkil topadi.', 'Bit va bayt'),
      tf('Bir bayt bilan 0 dan 255 gacha bo‘lgan sonlarni ifodalash mumkin.', true, '2⁸ = 256 ta qiymat: 0…255.', '8 bit 2⁸ = 256 ta turli kombinatsiya beradi.', 'Bit va bayt'),
      short('11111₂ ni o‘nlikka o‘tkazing (faqat son).', ['31'], '16 + 8 + 4 + 2 + 1 = 31.', 'Barcha razryadlar 1: og‘irliklarning hammasini qo‘shing.', 'Ikkilikdan o‘nlikka')
    ]
  },
  {
    slug: 'algorithms',
    topic: 'algoritmik-fikrlash',
    title: 'Algoritmlar',
    summary: 'Algoritm — muammoni yechish uchun aniq qadamlar ketma-ketligi. Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlarni o‘rganamiz.',
    difficulty: 'beginner',
    durationMinutes: 30,
    order: 1,
    objectives: ['Algoritmning xossalarini sanab berish', 'Chiziqli, tarmoqlanuvchi va siklik algoritmlarni farqlash', 'Oddiy masala uchun psevdokod yozish'],
    definitions: [
      { term: 'Algoritm', meaning: 'Muayyan natijaga olib keluvchi aniq, chekli va tushunarli buyruqlar ketma-ketligi.' },
      { term: 'Tarmoqlanish', meaning: 'Shartga qarab turli yo‘ldan borish (agar … bo‘lsa … aks holda …).' },
      { term: 'Sikl (takrorlash)', meaning: 'Buyruqlarni shart bajarilguncha yoki belgilangan marta qaytarish.' },
      { term: 'Psevdokod', meaning: 'Algoritmni oddiy tilga yaqin, dasturlash tiliga bog‘lanmagan holda yozish.' }
    ],
    sections: [
      { heading: 'Algoritm hamma joyda', body: 'Choy damlash, maktabga borish yo‘li, matematik masala yechish — barchasi algoritm. Kompyuter algoritmni juda tez bajaradi, lekin u faqat aniq yozilgan buyruqlarni tushunadi. “Bir oz tuz sep” kabi noaniq buyruq kompyuter uchun yaroqsiz.' },
      { heading: 'Algoritm xossalari', body: '- **Aniqlik:** har bir qadam bir ma’noli.\n- **Cheklilik:** algoritm qachondir tugaydi.\n- **Natijaviylik:** to‘g‘ri natija beradi.\n- **Ommaviylik:** bir turdagi barcha masalalar uchun ishlaydi.' },
      { heading: 'Uch asosiy tuzilma', body: '1. **Chiziqli:** qadamlar ketma-ket bajariladi.\n2. **Tarmoqlanuvchi:** shartga qarab yo‘l tanlanadi.\n3. **Siklik:** qadamlar takrorlanadi.\n\nIstalgan murakkab dastur shu uchta “g‘isht”dan quriladi.', code: 'AGAR ball >= 60 BO‘LSA\n  yoz "O‘tdi"\nAKS HOLDA\n  yoz "Qayta topshiring"\nTUGADI' }
    ],
    examples: [
      { title: 'Eng katta sonni topish', steps: ['eng_katta ← ro‘yxatdagi birinchi son.', 'Ro‘yxatdagi har bir son uchun takrorla:', '  agar son > eng_katta bo‘lsa, eng_katta ← son.', 'Oxirida eng_katta ni chiqar.'], code: 'eng_katta = sonlar[0]\nhar_bir son UCHUN sonlar ICHIDA:\n  AGAR son > eng_katta:\n    eng_katta = son\nyoz eng_katta', result: '[4, 9, 2, 7] uchun javob 9.' },
      { title: '1 dan 5 gacha yig‘indi', steps: ['yig‘indi ← 0', 'i 1 dan 5 gacha: yig‘indi ← yig‘indi + i', 'yig‘indi ni chiqar'], result: '15' }
    ],
    exercises: [
      { prompt: 'Svetoforda ko‘chani kesib o‘tish algoritmini tarmoqlanish bilan yozing.', hint: 'Yashil, sariq, qizil holatlarni ko‘rib chiqing.', solution: 'AGAR chiroq yashil bo‘lsa — o‘ng va chapga qarab, o‘t; AKS HOLDA — kut va qayta tekshir.' },
      { prompt: 'Ro‘yxatdagi juft sonlar sonini sanaydigan psevdokod yozing.', hint: 'Son juft — 2 ga bo‘lganda qoldiq 0.', solution: 'sanoq ← 0; har bir son uchun: agar son mod 2 = 0 bo‘lsa, sanoq ← sanoq + 1; sanoq ni chiqar.' },
      { prompt: '“Shampun: sur, chay, takrorla.” Bu algoritmning qaysi xossasi buzilgan?', hint: 'Qachon to‘xtash kerak?', solution: 'Cheklilik — to‘xtash sharti yo‘q, cheksiz takrorlanadi.' }
    ],
    summaryPoints: ['Algoritm — aniq qadamlar ketma-ketligi.', 'Xossalar: aniqlik, cheklilik, natijaviylik, ommaviylik.', 'Uch tuzilma: chiziqli, tarmoqlanuvchi, siklik.'],
    tutor: {
      simple: 'Algoritm — robotga beriladigan juda aniq yo‘riqnoma. Robot hech narsani taxmin qilmaydi, shuning uchun har bir qadamni aniq aytishingiz kerak: “2 qadam oldinga yur”, “agar devor bo‘lsa, o‘ngga buril”.',
      analogies: ['Algoritm — oshxona retsepti. Ingredientlar — kirish ma’lumotlari, pishirish qadamlari — buyruqlar, tayyor taom — natija. “Piyoz qizarguncha qovur” — bu sikl, “agar tuz kam bo‘lsa, qo‘sh” — bu tarmoqlanish.', 'Navigator ilovasini o‘ylang: u sizga “200 metrdan keyin o‘ngga buriling” deydi. Agar tirbandlik bo‘lsa, boshqa yo‘l taklif qiladi (tarmoqlanish), har chorrahada yana yo‘nalishni tekshiradi (sikl).'],
      extraExamples: ['Lug‘atdan so‘z qidirish: o‘rtasini ochasiz; kerakli so‘z oldinroqda bo‘lsa, chap yarmiga, keyinroqda bo‘lsa, o‘ng yarmiga o‘tasiz va takrorlaysiz. Bu “ikkiga bo‘lib qidirish” algoritmi — juda tez ishlaydi.', 'Sumkani yig‘ish: dars jadvalini ochasiz, har bir fan uchun (sikl) darslik va daftar borligini tekshirasiz; yo‘q bo‘lsa, qo‘shasiz (tarmoqlanish).'],
      steps: ['Kirish ma’lumotlari nima ekanini aniqlang.', 'Kutilgan natijani aniq yozing.', 'Natijaga olib boradigan qadamlarni ketma-ket yozing.', 'Shartlar kerak bo‘lgan joyni belgilang (AGAR).', 'Takrorlanadigan qismni sikl bilan yozing.', 'Algoritmni kichik misol bilan qo‘lda tekshirib ko‘ring.'],
      hints: ['Algoritmni yozishdan oldin kichik misolni qo‘lda yechib ko‘ring — qanday qadamlar qildingiz?', 'Sikl qachon to‘xtashini aniq yozdingizmi?'],
      practice: ['Telefoningizdagi kontaktlar ro‘yxatidan ma’lum ismni qidirish algoritmini psevdokodda yozing.', '1 dan 100 gacha bo‘lgan sonlar ichida 3 ga ham, 5 ga ham bo‘linadiganlarini chiqaradigan algoritm tuzing.'],
      checks: [
        { question: 'Tarmoqlanuvchi algoritmning chiziqli algoritmdan farqi nima?', answer: 'Tarmoqlanuvchi algoritmda shartga qarab turli qadamlar bajariladi, chiziqlida esa barcha qadamlar doim ketma-ket bajariladi.' },
        { question: 'Cheklilik xossasi nimani anglatadi?', answer: 'Algoritm cheklangan sondagi qadamdan keyin albatta tugashi kerak.' }
      ]
    },
    quiz: [
      single('Quyidagilardan qaysi biri algoritmning xossasi EMAS?', ['Aniqlik', 'Cheklilik', 'Noaniqlik', 'Natijaviylik'], 'Noaniqlik', 'Algoritm aniq bo‘lishi kerak, noaniqlik uning xossasi emas.', 'Algoritmning har bir qadami bir ma’noli bo‘lishi shart.', 'Algoritm xossalari'),
      single('“AGAR … BO‘LSA … AKS HOLDA …” qaysi tuzilmaga misol?', ['Chiziqli', 'Tarmoqlanuvchi', 'Siklik', 'Rekursiv'], 'Tarmoqlanuvchi', 'Shartga qarab yo‘l tanlanadi.', 'Shart bo‘yicha tanlov — tarmoqlanish.', 'Tarmoqlanish'),
      single('Quyidagi psevdokod natijasi qanday? s ← 0; i 1 dan 4 gacha: s ← s + i; yoz s', ['4', '6', '10', '24'], '10', '1 + 2 + 3 + 4 = 10.', 'Sikl har qadamda i ni s ga qo‘shadi.', 'Sikl'),
      tf('“Suvni qaynaguncha isit” buyrug‘ida takrorlash (sikl) mavjud.', true, 'Shart bajarilguncha harakat takrorlanadi.', 'Qaynaguncha — bu shart bajarilguncha davom etadigan takrorlash.', 'Sikl'),
      multiple('Qaysi buyruqlar kompyuter uchun yetarlicha aniq? (bir nechtasini tanlang)', ['Bir oz kut', 'x ga 5 ni qo‘sh', 'Ekranga “Salom” deb yoz', 'Yaxshilab tekshir'], ['x ga 5 ni qo‘sh', 'Ekranga “Salom” deb yoz'], 'Bu buyruqlar bir ma’noli.', '“Bir oz” va “yaxshilab” noaniq — kompyuter ularni tushunmaydi.', 'Aniqlik')
    ]
  },
  {
    slug: 'computational-thinking',
    topic: 'algoritmik-fikrlash',
    title: 'Hisoblash tafakkuri',
    summary: 'Dekompozitsiya, qonuniyat topish, abstraksiya va algoritm — murakkab muammolarni yechishning to‘rt ustuni.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 2,
    objectives: ['Hisoblash tafakkurining to‘rt komponentini tushuntirish', 'Katta muammoni kichik qismlarga ajratish', 'Abstraksiya yordamida keraksiz tafsilotlarni chetlab o‘tish'],
    definitions: [
      { term: 'Dekompozitsiya', meaning: 'Murakkab muammoni kichikroq, boshqariladigan qismlarga bo‘lish.' },
      { term: 'Qonuniyat topish', meaning: 'Muammolar yoki ma’lumotlardagi o‘xshashlik va takrorlanishlarni aniqlash.' },
      { term: 'Abstraksiya', meaning: 'Muhim jihatlarga e’tibor qaratib, keraksiz tafsilotlarni chetga surish.' }
    ],
    sections: [
      { heading: 'Bu faqat dasturchilar uchun emas', body: 'Hisoblash tafakkuri — muammolarni kompyuter yecha oladigan tarzda o‘ylash usuli. Uni shifokor tashxis qo‘yishda, muhandis ko‘prik loyihalashda, o‘quvchi imtihonga tayyorlanishda ishlatadi.' },
      { heading: 'To‘rt ustun', body: '1. **Dekompozitsiya:** “Tug‘ilgan kun tashkil qilish” → mehmonlar ro‘yxati, taom, joy, bezak.\n2. **Qonuniyat:** har yili tug‘ilgan kunda bir xil tayyorgarlik qadamlari takrorlanadi.\n3. **Abstraksiya:** metro xaritasi masofani emas, bekatlar tartibini ko‘rsatadi — bu yo‘lovchiga yetarli.\n4. **Algoritm:** hammasini aniq rejaga aylantirish.' },
      { heading: 'Amalda qo‘llash', body: 'Har qanday katta vazifa oldida o‘zingizga savol bering: “Buni qanday qismlarga bo‘lish mumkin? Avval shunga o‘xshash nimani yechganman? Qaysi tafsilot muhim emas? Qadamlar qanday tartibda bo‘ladi?”' }
    ],
    examples: [
      { title: 'Imtihonga tayyorlanish', steps: ['Dekompozitsiya: mavzular ro‘yxatini tuzish.', 'Qonuniyat: o‘tgan yilgi testlarda qaysi mavzular ko‘p uchragan?', 'Abstraksiya: asosiy formula va tushunchalarga e’tibor, ikkinchi darajali faktlarni keyinga qoldirish.', 'Algoritm: har kunlik reja — 2 mavzu + 10 ta masala + takrorlash.'], result: 'Katta va qo‘rqinchli vazifa aniq kunlik qadamlarga aylandi.' }
    ],
    exercises: [
      { prompt: '“Sinf uchun veb-sayt yaratish” vazifasini kamida 4 qismga ajrating.', hint: 'Sahifalar, kontent, dizayn, joylashtirish haqida o‘ylang.', solution: 'Masalan: sahifalar tuzilmasi, matn va rasmlar, dizayn, kod yozish, sinovdan o‘tkazish, internetga joylash.' },
      { prompt: '2, 4, 8, 16, … ketma-ketligidagi qonuniyatni toping va keyingi ikki sonni yozing.', hint: 'Har bir son oldingisidan qanday hosil bo‘lyapti?', solution: 'Har safar 2 ga ko‘payadi: 32, 64.' },
      { prompt: 'Ob-havo ilovasi uchun abstraksiya: foydalanuvchiga qaysi ma’lumotlar muhim, qaysilari keraksiz?', hint: 'Oddiy foydalanuvchi nimani bilmoqchi?', solution: 'Muhim: harorat, yog‘ingarchilik, shamol. Keraksiz: sun’iy yo‘ldosh ma’lumotlarining xom raqamlari.' }
    ],
    summaryPoints: ['Dekompozitsiya — bo‘lib tashla.', 'Qonuniyat — o‘xshashlikni top.', 'Abstraksiya — muhimiga e’tibor qarat.', 'Algoritm — aniq reja tuz.'],
    tutor: {
      simple: 'Katta fil yeyish uchun uni kichik bo‘laklarga bo‘lish kerak — bu dekompozitsiya. Avval ham shunday bo‘lak yeganmisiz? — qonuniyat. Suyaklarni yemaysiz — abstraksiya. Qaysi tartibda yeyishni rejalashtirasiz — algoritm.',
      analogies: ['LEGO qurilishini o‘ylang: katta qal’ani (muammo) kichik bloklarga bo‘lasiz (dekompozitsiya), bir xil minoralarni bir xil usulda qurasiz (qonuniyat), har bir g‘ishtning rangi emas, shakli muhim (abstraksiya), yo‘riqnomaga qarab bosqichma-bosqich qurasiz (algoritm).', 'Shifokor ishini tasavvur qiling: bemor shikoyatlarini alohida belgilarga ajratadi, ularni ma’lum kasalliklar belgilari bilan solishtiradi, muhim belgilarga e’tibor qaratadi va tekshiruv rejasini tuzadi.'],
      extraExamples: ['Futbol murabbiyi: jamoani himoya, yarim himoya va hujumga bo‘ladi; raqib o‘yinlarida takrorlanuvchi taktikani topadi; asosiy kuchli o‘yinchilarga e’tibor qaratadi; mashg‘ulot rejasini tuzadi.', 'Xona yig‘ishtirish: xonani zonalarga bo‘lasiz (stol, javon, pol), har bir zona uchun bir xil qadam (keraksizni chiqar, joyiga qo‘y), mayda narsalar uchun bitta quti (abstraksiya).'],
      steps: ['Muammoni bir gapda yozing.', 'Uni 3–6 ta kichik qismga ajrating.', 'Har bir qism uchun ilgari yechgan o‘xshash masalalarni eslang.', 'Har bir qismda nima muhim, nima keraksiz — ajrating.', 'Qismlarni bajarish tartibini belgilab, reja tuzing.'],
      hints: ['Vazifani bir gapda ifodalashdan boshlang. Keyin “buning uchun nimalar kerak?” deb so‘rang.', 'Bu muammoga o‘xshash nimani avval yechgansiz?'],
      practice: ['O‘zingizning bir haftalik o‘qish rejangizni hisoblash tafakkurining to‘rt bosqichi bilan tuzing.', 'Maktab oshxonasidagi navbatni qisqartirish muammosini dekompozitsiya qiling va bitta yechim taklif qiling.'],
      checks: [
        { question: 'Abstraksiya nima va unga kundalik hayotdan misol keltiring.', answer: 'Muhim jihatlarni ajratib, keraksiz tafsilotlarni chetlab o‘tish. Masalan, metro xaritasi faqat bekatlar tartibini ko‘rsatadi, aniq masofani emas.' },
        { question: 'Dekompozitsiya nima uchun foydali?', answer: 'Murakkab muammo kichik qismlarga bo‘linsa, har birini yechish osonlashadi va ishni rejalash mumkin bo‘ladi.' }
      ]
    },
    quiz: [
      single('Murakkab muammoni kichik qismlarga bo‘lish nima deyiladi?', ['Abstraksiya', 'Dekompozitsiya', 'Qonuniyat topish', 'Kompilyatsiya'], 'Dekompozitsiya', 'Dekompozitsiya — bo‘lib tashlash.', 'Abstraksiya tafsilotlarni chetga surish, dekompozitsiya esa bo‘laklarga bo‘lish.', 'Dekompozitsiya'),
      single('Metro xaritasida masofalar aniq ko‘rsatilmasligi qaysi tushunchaga misol?', ['Dekompozitsiya', 'Algoritm', 'Abstraksiya', 'Sikl'], 'Abstraksiya', 'Yo‘lovchi uchun muhim bo‘lmagan tafsilot olib tashlangan.', 'Keraksiz tafsilotlarni olib tashlash — abstraksiya.', 'Abstraksiya'),
      single('3, 6, 9, 12, … ketma-ketligida keyingi son?', ['13', '14', '15', '18'], '15', 'Har safar 3 qo‘shiladi.', 'Qonuniyat: har bir keyingi son oldingisidan 3 ga katta.', 'Qonuniyat'),
      tf('Hisoblash tafakkuri faqat dasturchilarga kerak.', false, 'Uni shifokor, muhandis, o‘qituvchi va boshqalar ham ishlatadi.', 'Bu muammolarni yechishning umumiy usuli, istalgan kasbda foydali.', 'Hisoblash tafakkuri'),
      multiple('Hisoblash tafakkurining komponentlarini tanlang.', ['Dekompozitsiya', 'Qonuniyat topish', 'Yodlash', 'Abstraksiya'], ['Dekompozitsiya', 'Qonuniyat topish', 'Abstraksiya'], 'To‘rt ustun: dekompozitsiya, qonuniyat, abstraksiya, algoritm.', 'Yodlash hisoblash tafakkuri komponenti emas.', 'Hisoblash tafakkuri')
    ]
  }
];
