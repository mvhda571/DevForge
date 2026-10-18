import { single, multiple, tf, short } from './helpers.js';

export default [
  {
    slug: 'supply-demand',
    topic: 'iqtisod-asoslari',
    title: 'Talab va taklif',
    summary: 'Narxlar qanday shakllanadi? Talab va taklif qonunlari, muvozanat narxi va bozordagi o‘zgarishlar.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['Talab va taklif qonunlarini tushuntirish', 'Muvozanat narxini aniqlash', 'Tashqi omillarning narxga ta’sirini tahlil qilish'],
    definitions: [
      { term: 'Talab', meaning: 'Iste’molchilar ma’lum narxda sotib olishni xohlaydigan va qodir bo‘lgan mahsulot miqdori.' },
      { term: 'Taklif', meaning: 'Ishlab chiqaruvchilar ma’lum narxda sotishga tayyor bo‘lgan mahsulot miqdori.' },
      { term: 'Muvozanat narxi', meaning: 'Talab miqdori taklif miqdoriga teng bo‘lgan narx.' },
      { term: 'Taqchillik', meaning: 'Talab taklifdan ko‘p bo‘lgan holat.' }
    ],
    sections: [
      { heading: 'Talab qonuni', body: 'Boshqa sharoitlar o‘zgarmasa, narx oshganda talab miqdori kamayadi, narx tushganda oshadi. Masalan, olma arzonlashsa, odamlar uni ko‘proq sotib oladi.' },
      { heading: 'Taklif qonuni', body: 'Narx oshganda ishlab chiqaruvchilar ko‘proq sotishga tayyor bo‘ladi, chunki foyda oshadi. Narx tushsa, taklif kamayadi.' },
      { heading: 'Muvozanat va o‘zgarishlar', body: 'Bozorda talab va taklif egri chiziqlari kesishgan nuqta — muvozanat narxi. Agar narx undan yuqori bo‘lsa — ortiqcha mahsulot (profitsit), past bo‘lsa — taqchillik yuzaga keladi.\n\nTashqi omillar ham ta’sir qiladi: hosil yomon bo‘lsa, taklif kamayib, narx oshadi; mahsulot modaga kirsa, talab oshib, narx ko‘tariladi.' }
    ],
    examples: [
      { title: 'Qishda pomidor narxi', steps: ['Qishda ochiq dalada pomidor yetishtirilmaydi — taklif kamayadi.', 'Talab deyarli o‘zgarmaydi.', 'Natijada narx oshadi.', 'Yozda taklif ko‘payadi va narx tushadi.'], result: 'Mavsumiy narx o‘zgarishi — talab va taklif ta’siri.' }
    ],
    exercises: [
      { prompt: 'Yangi telefon modeli juda mashhur bo‘lib ketdi, lekin zavod ishlab chiqarishni oshira olmadi. Narx bilan nima bo‘ladi?', hint: 'Talab oshdi, taklif o‘zgarmadi.', solution: 'Narx oshadi (yoki taqchillik yuzaga keladi).' },
      { prompt: 'Muvozanat narxidan yuqori narx belgilansa, bozorda nima kuzatiladi?', hint: 'Sotuvchilar ko‘p, xaridorlar kam.', solution: 'Ortiqcha mahsulot (profitsit) yig‘iladi, sotuvchilar narxni tushirishga majbur bo‘ladi.' }
    ],
    summaryPoints: ['Narx ↑ → talab ↓, taklif ↑.', 'Muvozanat — talab = taklif.', 'Taqchillik narxni oshiradi, ortiqcha mahsulot tushiradi.', 'Tashqi omillar egri chiziqlarni siljitadi.'],
    tutor: {
      simple: 'Bozorda xaridorlar arzonroq, sotuvchilar qimmatroq narxni xohlaydi. Ular kelishgan narx — muvozanat narxi. Mahsulot kam bo‘lsa — qimmatlashadi, ko‘p bo‘lsa — arzonlashadi.',
      analogies: ['Talab va taklifni arqon tortishga o‘xshating: bir tomonda xaridorlar (narxni pastga tortadi), bir tomonda sotuvchilar (yuqoriga tortadi). Arqon to‘xtagan nuqta — muvozanat narxi.', 'Konsert chiptalarini o‘ylang: mashhur xonanda, joylar soni cheklangan (taklif kam), xohlovchilar ko‘p (talab yuqori) — chiptalar tez tugaydi va qayta sotuvda narxi oshadi.'],
      extraExamples: ['Bayram oldidan gul narxi oshadi: talab keskin ko‘payadi, taklif esa qisqa muddatda oshirib bo‘lmaydi.', 'Yangi zavod ochilsa, mahsulot taklifi ko‘payadi va narx pasayishi mumkin.'],
      steps: ['Qaysi omil o‘zgardi — talabgami yoki taklifga?', 'Bu omil talab/taklifni oshiradimi yoki kamaytiradimi?', 'Natijada mahsulot ko‘payadimi yoki kamayadimi (taqchillik/ortiqcha)?', 'Narx qaysi tomonga o‘zgarishini xulosa qiling.'],
      hints: ['Hosil yomon bo‘lsa, bu xaridorlarga ta’sir qiladimi yoki ishlab chiqaruvchilarga?', 'Talab qonunida “boshqa sharoitlar o‘zgarmasa” degan shart nima uchun muhim?'],
      practice: ['Mahalliy bozordagi bitta mahsulot narxining yil davomida qanday o‘zgarishini kuzating va sababini talab-taklif orqali tushuntiring.', 'Maktab yarmarkasida pishiriq sotayotganingizni tasavvur qiling: narxni qanday belgilaysiz va nima uchun?'],
      checks: [
        { question: 'Talab qonuni nima deydi?', answer: 'Boshqa sharoitlar o‘zgarmasa, narx oshganda talab miqdori kamayadi, narx tushganda esa oshadi.' },
        { question: 'Taqchillik qachon yuzaga keladi va u narxga qanday ta’sir qiladi?', answer: 'Talab taklifdan ko‘p bo‘lganda; bu narxni oshirishga olib keladi.' }
      ]
    },
    quiz: [
      single('Talab qonuniga ko‘ra narx oshsa, talab miqdori…', ['oshadi', 'kamayadi', 'o‘zgarmaydi', 'nolga teng bo‘ladi'], 'kamayadi', 'Narx va talab miqdori teskari bog‘liq.', 'Qimmatlashgan mahsulotni odamlar kamroq sotib oladi.', 'Talab qonuni'),
      single('Muvozanat narxi qayerda?', ['Talab eng katta bo‘lgan joyda', 'Talab = taklif bo‘lgan joyda', 'Taklif eng kam joyda', 'Narx nolga teng joyda'], 'Talab = taklif bo‘lgan joyda', 'Ikkala egri chiziq kesishadi.', 'Muvozanat — xaridorlar va sotuvchilar miqdori teng bo‘lgan nuqta.', 'Muvozanat'),
      single('Qurg‘oqchilik bug‘doy hosilini kamaytirdi. Non narxi qanday o‘zgarishi kutiladi?', ['Tushadi', 'Oshadi', 'O‘zgarmaydi', 'Nolga tushadi'], 'Oshadi', 'Taklif kamayadi → narx oshadi.', 'Xomashyo taklifi kamaysa, narx ko‘tariladi.', 'Taklifning o‘zgarishi'),
      tf('Narx muvozanatdan past bo‘lsa, taqchillik yuzaga keladi.', true, 'Arzon narxda talab ko‘p, taklif kam.', 'Past narx xaridorlarni ko‘paytiradi, sotuvchilarni kamaytiradi.', 'Taqchillik'),
      multiple('Mahsulot talabini oshirishi mumkin bo‘lgan omillar?', ['Mahsulot modaga kirishi', 'Odamlar daromadi oshishi', 'Mahsulot narxining keskin oshishi', 'Reklama'], ['Mahsulot modaga kirishi', 'Odamlar daromadi oshishi', 'Reklama'], 'Bu omillar xohlovchilar sonini oshiradi.', 'Narxning oshishi talab miqdorini kamaytiradi.', 'Talab omillari')
    ]
  },
  {
    slug: 'money-inflation',
    topic: 'iqtisod-asoslari',
    title: 'Pul va inflyatsiya',
    summary: 'Pulning vazifalari, inflyatsiya nima va u jamg‘armalaringizga qanday ta’sir qiladi.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 2,
    objectives: ['Pulning asosiy vazifalarini sanash', 'Inflyatsiya tushunchasini va sabablarini tushuntirish', 'Inflyatsiyaning xarid qobiliyatiga ta’sirini hisoblash'],
    definitions: [
      { term: 'Pul', meaning: 'Ayirboshlash vositasi, qiymat o‘lchovi va jamg‘arish vositasi sifatida qabul qilingan narsa.' },
      { term: 'Inflyatsiya', meaning: 'Tovar va xizmatlar umumiy narx darajasining vaqt o‘tishi bilan oshishi.' },
      { term: 'Xarid qobiliyati', meaning: 'Ma’lum miqdordagi pulga qancha tovar sotib olish mumkinligi.' },
      { term: 'Markaziy bank', meaning: 'Pul-kredit siyosatini yurituvchi va milliy valyutani boshqaruvchi davlat instituti.' }
    ],
    sections: [
      { heading: 'Pulning vazifalari', body: '1. **Ayirboshlash vositasi** — tovarlarni to‘g‘ridan-to‘g‘ri almashtirish (barter) o‘rniga pul ishlatamiz.\n2. **Qiymat o‘lchovi** — turli narsalar narxini bir birlikda taqqoslaymiz.\n3. **Jamg‘arish vositasi** — qiymatni kelajak uchun saqlaymiz.' },
      { heading: 'Inflyatsiya nima?', body: 'Agar o‘tgan yili 10 000 so‘mga 5 ta non olgan bo‘lsangiz, bu yil faqat 4 tasini olsangiz — pulingizning xarid qobiliyati kamaygan. Yillik inflyatsiya 10% bo‘lsa, o‘rtacha narxlar bir yilda taxminan 10% ga oshgan bo‘ladi.\n\nSabablari: talabning tez o‘sishi, ishlab chiqarish xarajatlarining oshishi, muomaladagi pul miqdorining haddan tashqari ko‘payishi.' },
      { heading: 'Inflyatsiya va jamg‘arma', body: 'Uyda saqlangan naqd pul inflyatsiya tufayli “qadrsizlanadi”. Shuning uchun odamlar jamg‘armalarini daromad keltiruvchi vositalarda (masalan, bank omonatlarida) saqlashga harakat qiladi. Real daromad ≈ foiz stavkasi − inflyatsiya.\n\nMarkaziy banklar odatda inflyatsiyani past va barqaror ushlab turishga intiladi.' }
    ],
    examples: [
      { title: 'Xarid qobiliyatining pasayishi', steps: ['Savat narxi bu yil 1 000 000 so‘m.', 'Inflyatsiya 10% bo‘lsa, kelasi yil ≈ 1 100 000 so‘m.', 'Agar daromad o‘zgarmasa, xuddi shu savatni sotib olish qiyinlashadi.'], result: 'Inflyatsiya daromad o‘sishidan tez bo‘lsa, turmush darajasi pasayadi.' },
      { title: 'Real daromad', steps: ['Omonat yillik 20%.', 'Inflyatsiya 10%.', 'Real daromad ≈ 20% − 10% = 10%.'], result: 'Pulingizning haqiqiy xarid qobiliyati taxminan 10% oshdi (soddalashtirilgan hisob).' }
    ],
    exercises: [
      { prompt: 'Mahsulot 50 000 so‘m edi, inflyatsiya 8%. Bir yildan keyin taxminiy narxi qancha?', hint: '× 1.08', solution: '54 000 so‘m.' },
      { prompt: 'Omonat yillik 12%, inflyatsiya 15%. Real daromad taxminan qanday?', hint: 'Foiz − inflyatsiya.', solution: '≈ −3%, ya’ni xarid qobiliyati kamaygan.' }
    ],
    summaryPoints: ['Pul: ayirboshlash, o‘lchov, jamg‘arish.', 'Inflyatsiya — umumiy narxlarning oshishi.', 'Inflyatsiya xarid qobiliyatini kamaytiradi.', 'Real daromad ≈ nominal foiz − inflyatsiya.'],
    tutor: {
      simple: 'Inflyatsiya — pulning “kichrayishi”. Puling soni o‘zgarmaydi, lekin unga oladigan narsalaring kamayib boradi. Shuning uchun pulni shunchaki yostiq ostida saqlash foydali emas.',
      analogies: ['Inflyatsiyani muzqaymoqqa o‘xshating: qo‘lingizda ushlab tursangiz, u asta-sekin eriydi. Naqd pul ham inflyatsiya sharoitida xuddi shunday “eriydi” — miqdori o‘sha, lekin qiymati kamayadi.', 'Pul — umumiy til. Barter davrida qo‘y egasi poyabzal xohlasa, aynan qo‘y kerak bo‘lgan poyabzalchini topishi kerak edi. Pul hammaga tushunarli “tarjimon” vazifasini bajaradi.'],
      extraExamples: ['10 yil oldin 1 000 so‘mga sotib olish mumkin bo‘lgan narsa bugun ancha qimmat — bu uzoq muddatli inflyatsiya natijasi.', 'Ish haqi 10% oshdi, narxlar esa 15% oshdi — nominal oylik ko‘paydi, lekin real oylik (xarid qobiliyati) kamaydi.'],
      steps: ['Boshlang‘ich narx yoki summani yozing.', 'Inflyatsiyani o‘nli kasrga aylantiring (10% → 0.10).', 'Kelajakdagi narx = narx × (1 + inflyatsiya).', 'Real o‘zgarish ≈ daromad foizi − inflyatsiya.'],
      hints: ['Nominal va real farqini esladingizmi? Biri raqamda, biri xarid qobiliyatida.', 'Real daromad manfiy chiqsa, bu nimani anglatadi?'],
      practice: ['Oilangiz har oy sotib oladigan 5 ta mahsulot narxini yozing va 3 oydan keyin qayta tekshiring. Narxlar necha foizga o‘zgardi?', 'Turli foizli omonat va inflyatsiya darajalari uchun real daromadni hisoblaydigan jadval tuzing.'],
      checks: [
        { question: 'Inflyatsiya nima?', answer: 'Tovar va xizmatlar umumiy narx darajasining vaqt o‘tishi bilan oshishi.' },
        { question: 'Omonat 10%, inflyatsiya 12% bo‘lsa, jamg‘armangiz real qiymati qanday o‘zgaradi?', answer: 'Taxminan 2% ga kamayadi, chunki narxlar foizdan tezroq o‘smoqda.' }
      ]
    },
    quiz: [
      single('Quyidagilardan qaysi biri pulning vazifasi EMAS?', ['Ayirboshlash vositasi', 'Qiymat o‘lchovi', 'Jamg‘arish vositasi', 'Narxlarni doimiy ushlab turish'], 'Narxlarni doimiy ushlab turish', 'Pul o‘zi narxlarni ushlab turmaydi.', 'Pulning uch asosiy vazifasi: ayirboshlash, o‘lchov, jamg‘arish.', 'Pul vazifalari'),
      single('Inflyatsiya nimani anglatadi?', ['Narxlarning umumiy pasayishi', 'Narxlarning umumiy oshishi', 'Pul miqdorining kamayishi', 'Ish haqining oshishi'], 'Narxlarning umumiy oshishi', 'Inflyatsiya — umumiy narx darajasining oshishi.', 'Narxlarning umumiy pasayishi deflyatsiya deyiladi.', 'Inflyatsiya'),
      short('Narx 200 000 so‘m, yillik inflyatsiya 10%. Bir yildan keyingi taxminiy narx? (faqat son)', ['220000', '220 000'], '200 000 × 1.1 = 220 000.', 'Narxni (1 + 0.10) ga ko‘paytiring.', 'Inflyatsiya hisobi'),
      tf('Inflyatsiya sharoitida uyda saqlangan naqd pulning xarid qobiliyati oshadi.', false, 'Aksincha, kamayadi.', 'Narxlar oshgani sari o‘sha pulga kamroq narsa olinadi.', 'Xarid qobiliyati'),
      single('Omonat yillik 18%, inflyatsiya 10%. Real daromad taxminan?', ['28%', '8%', '10%', '−8%'], '8%', '18% − 10% ≈ 8%.', 'Real daromad ≈ nominal foiz − inflyatsiya.', 'Real daromad')
    ]
  },
  {
    slug: 'personal-finance',
    topic: 'moliyaviy-savodxonlik',
    title: 'Shaxsiy moliya asoslari',
    summary: 'Byudjet tuzish, ehtiyoj va xohishni farqlash, jamg‘arish odati va qarzlarga mas’uliyatli yondashuv.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['Shaxsiy byudjet tuzish', 'Ehtiyoj va xohishni farqlash', '50/30/20 qoidasini qo‘llash', 'Qarz va foizning narxini tushunish'],
    definitions: [
      { term: 'Byudjet', meaning: 'Ma’lum davr uchun daromad va xarajatlar rejasi.' },
      { term: 'Ehtiyoj', meaning: 'Yashash uchun zarur xarajat: ovqat, uy-joy, transport, ta’lim.' },
      { term: 'Xohish', meaning: 'Zarur bo‘lmagan, lekin yoqimli xarajat: yangi o‘yin, kafe.' },
      { term: 'Favqulodda jamg‘arma', meaning: 'Kutilmagan xarajatlar uchun ajratilgan zaxira pul.' }
    ],
    sections: [
      { heading: 'Byudjetdan boshlang', body: 'Bir oy davomida barcha daromad va xarajatlaringizni yozib boring. Ko‘pchilik pulining qayerga ketayotganini ko‘rib hayron qoladi. Keyin xarajatlarni toifalarga bo‘ling va reja tuzing.' },
      { heading: '50/30/20 qoidasi', body: 'Daromadni taqsimlashning oddiy namunasi:\n- **50%** — ehtiyojlar\n- **30%** — xohishlar\n- **20%** — jamg‘arma va qarzni qaytarish\n\nBu qat’iy qonun emas — o‘z sharoitingizga moslashtiring. Asosiysi: avval o‘zingizga to‘lang, ya’ni daromad kelishi bilan jamg‘armani ajrating.' },
      { heading: 'Qarzga mas’uliyat bilan', body: 'Kredit yoki muddatli to‘lov — kelajakdagi daromadingizni hozir sarflash. Foiz tufayli umumiy to‘lov narxdan ko‘p bo‘ladi. Qarz olishdan oldin: umumiy to‘lov summasi, oylik to‘lov va kechikish jarimalarini aniqlang. Muhim moliyaviy qarorlarda ota-onangiz yoki mutaxassis bilan maslahatlashing.' }
    ],
    examples: [
      { title: 'Talabaning oylik byudjeti', steps: ['Daromad (stipendiya + yarim kunlik ish): 2 000 000 so‘m.', 'Ehtiyojlar 50%: 1 000 000 (ovqat, transport, aloqa, o‘quv qurollari).', 'Xohishlar 30%: 600 000.', 'Jamg‘arma 20%: 400 000.'], result: 'Yiliga 4 800 000 so‘m jamg‘arma — masalan, noutbuk yoki kurs uchun.' }
    ],
    exercises: [
      { prompt: 'Quyidagilarni ehtiyoj va xohishga ajrating: avtobus chiptasi, yangi krossovka (eskisi yaroqli), darslik, kinoteatr.', hint: 'Usiz yashash yoki o‘qish mumkinmi?', solution: 'Ehtiyoj: avtobus chiptasi, darslik. Xohish: yangi krossovka, kinoteatr.' },
      { prompt: 'Oylik daromad 3 000 000 so‘m. 50/30/20 qoidasi bo‘yicha jamg‘armaga qancha ajratiladi?', hint: '20%', solution: '600 000 so‘m.' }
    ],
    summaryPoints: ['Byudjet — daromad va xarajat rejasi.', 'Ehtiyoj va xohishni farqlang.', '50/30/20 — boshlash uchun qulay namuna.', 'Avval jamg‘armani ajrating.', 'Qarzning umumiy narxini bilib oling.'],
    tutor: {
      simple: 'Pul — rejasiz bo‘lsa, qo‘ldan suvdek oqib ketadi. Byudjet — pulga “yo‘l ko‘rsatish”: qanchasi ovqatga, qanchasi o‘yin-kulgiga, qanchasi kelajak uchun.',
      analogies: ['Byudjetni sport jamoasi tarkibiga o‘xshating: har bir o‘yinchi (pul) o‘z o‘rnida o‘ynaydi — himoyachilar (ehtiyojlar), hujumchilar (xohishlar), zaxira o‘yinchilar (jamg‘arma). Rejasiz jamoa yutqazadi.', 'Favqulodda jamg‘arma — avtomobildagi zaxira g‘ildirak: undan har kuni foydalanmaysiz, lekin kerak bo‘lganda u bo‘lmasa, yo‘lda qolasiz.'],
      extraExamples: ['Kichik xarajatlar kuchi: har kuni 15 000 so‘mlik ichimlik oyiga 450 000, yiliga 5 400 000 so‘m qiladi.', '“24 soat qoidasi”: rejalashtirilmagan qimmat xariddan oldin bir kun kuting — ko‘pincha ehtiyoj yo‘qolib ketadi.'],
      steps: ['Oylik daromadingizni yozing.', 'Barcha xarajatlaringizni bir oy davomida qayd eting.', 'Ularni ehtiyoj, xohish va jamg‘armaga ajrating.', 'Foizlarini hisoblab, 50/30/20 bilan solishtiring.', 'Keyingi oy uchun aniq reja tuzing va natijani kuzating.'],
      hints: ['Xarajat ehtiyojmi yoki xohishmi — bilish uchun “usiz bir oy yashay olamanmi?” deb so‘rang.', 'Jamg‘armani oy oxirida qolganidan emas, oy boshida ajratishga harakat qiling.'],
      practice: ['O‘zingiz uchun bir haftalik xarajatlar jadvalini tuzing va hafta oxirida eng katta xarajat toifasini aniqlang.', 'Orzuyingizdagi bir narsa (masalan, kurs yoki noutbuk) uchun jamg‘arish rejasini tuzing: qancha vaqtda, oyiga qanchadan?'],
      checks: [
        { question: '50/30/20 qoidasi nimani anglatadi?', answer: 'Daromadning taxminan 50% i ehtiyojlarga, 30% i xohishlarga va 20% i jamg‘arma yoki qarzni qaytarishga ajratiladi.' },
        { question: 'Qarz olishdan oldin nimalarni aniqlash kerak?', answer: 'Umumiy to‘lov summasi (foizlar bilan), oylik to‘lov miqdori va kechikish jarimalari, shuningdek uni qaytara olish imkoniyati.' }
      ]
    },
    quiz: [
      single('Quyidagilardan qaysi biri ehtiyoj?', ['Yangi o‘yin konsoli', 'Darslik', 'Kafe', 'Brendli ko‘zoynak'], 'Darslik', 'O‘qish uchun zarur.', 'Ehtiyoj — yashash va o‘qish uchun zarur narsa.', 'Ehtiyoj va xohish'),
      short('Oylik daromad 2 500 000 so‘m. 50/30/20 bo‘yicha ehtiyojlarga qancha? (faqat son)', ['1250000', '1 250 000'], '2 500 000 × 0.5 = 1 250 000.', 'Ehtiyojlar uchun 50%.', '50/30/20'),
      tf('“Avval o‘zingizga to‘lang” — daromad kelishi bilan jamg‘armani ajratish demakdir.', true, 'Jamg‘arma birinchi o‘rinda ajratiladi.', 'Bu odat jamg‘armani muntazam qiladi.', 'Jamg‘arish'),
      single('Favqulodda jamg‘arma nima uchun kerak?', ['Kundalik xaridlar uchun', 'Kutilmagan xarajatlar uchun', 'Faqat sovg‘alar uchun', 'Kerak emas'], 'Kutilmagan xarajatlar uchun', 'Kasallik, buzilgan telefon kabi holatlar uchun zaxira.', 'U rejalashtirilmagan, lekin zarur xarajatlar uchun.', 'Favqulodda jamg‘arma'),
      single('Muddatli to‘lovda odatda nima bo‘ladi?', ['Umumiy to‘lov narxga teng yoki undan ko‘p', 'Mahsulot bepul bo‘ladi', 'Narx doim kamayadi', 'Foiz hech qachon olinmaydi'], 'Umumiy to‘lov narxga teng yoki undan ko‘p', 'Foiz va komissiyalar umumiy summani oshirishi mumkin.', 'Shartlarni o‘qing: ko‘pincha umumiy to‘lov asl narxdan ko‘p bo‘ladi.', 'Qarz')
    ]
  }
];
