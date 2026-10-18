import { single, multiple, tf, short } from './helpers.js';

const MED_NOTICE = 'Bu dars tanishtiruv xarakteridagi ta’limiy material. U professional tibbiy ta’lim, shifokor ko‘rigi yoki tibbiy maslahat o‘rnini bosmaydi. Sog‘lig‘ingiz bo‘yicha savollar bilan shifokorga murojaat qiling.';

export default [
  {
    slug: 'cell-structure',
    topic: 'hujayra',
    title: 'Hujayra tuzilishi',
    summary: 'Hayotning eng kichik birligi — hujayra. Uning asosiy qismlari va ularning vazifalarini o‘rganamiz.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    notice: MED_NOTICE,
    objectives: ['Hujayra nazariyasining asosiy g‘oyalarini aytish', 'Hujayra organoidlari va vazifalarini bilish', 'O‘simlik va hayvon hujayrasini taqqoslash'],
    definitions: [
      { term: 'Hujayra', meaning: 'Barcha tirik organizmlarning tuzilish va faoliyat birligi.' },
      { term: 'Hujayra membranasi', meaning: 'Hujayrani o‘rab turuvchi va moddalar kirib-chiqishini nazorat qiluvchi parda.' },
      { term: 'Yadro', meaning: 'Irsiy axborot (DNK) saqlanadigan va hujayra faoliyatini boshqaruvchi organoid.' },
      { term: 'Mitoxondriya', meaning: 'Hujayra uchun energiya (ATF) ishlab chiqaruvchi organoid.' }
    ],
    sections: [
      { heading: 'Hujayra nazariyasi', body: '1. Barcha tirik organizmlar hujayralardan tuzilgan.\n2. Hujayra — hayotning asosiy birligi.\n3. Yangi hujayralar faqat mavjud hujayralarning bo‘linishidan hosil bo‘ladi.\n\nBakteriyalar bitta hujayradan, odam organizmi esa trillionlab hujayralardan iborat.' },
      { heading: 'Asosiy organoidlar', body: '- **Membrana** — “nazoratchi darvoza”.\n- **Sitoplazma** — hujayra ichidagi suyuq muhit.\n- **Yadro** — “boshqaruv markazi”, DNK saqlanadi.\n- **Mitoxondriya** — “elektr stansiyasi”.\n- **Ribosoma** — oqsil sintez qiladi.\n- **Endoplazmatik to‘r va Golji apparati** — moddalarni tashish va qadoqlash.' },
      { heading: 'O‘simlik va hayvon hujayrasi', body: 'O‘simlik hujayrasida qo‘shimcha ravishda **hujayra devori** (mustahkamlik), **xloroplastlar** (fotosintez) va katta **vakuola** bor. Hayvon hujayrasida hujayra devori va xloroplast bo‘lmaydi.' }
    ],
    examples: [
      { title: 'Mushak hujayrasi nega ko‘p mitoxondriyaga ega?', steps: ['Mushaklar doimiy harakat qiladi.', 'Harakat uchun ko‘p energiya kerak.', 'Energiyani mitoxondriyalar ishlab chiqaradi.'], result: 'Ko‘p energiya talab qiladigan hujayralarda mitoxondriyalar ko‘p bo‘ladi — tuzilish vazifaga mos.' }
    ],
    exercises: [
      { prompt: 'Barg hujayrasida bo‘lib, odam hujayrasida bo‘lmaydigan ikki tuzilmani ayting.', hint: 'Fotosintez va mustahkamlik.', solution: 'Xloroplast va hujayra devori.' },
      { prompt: 'Agar hujayra membranasi shikastlansa, nima bo‘lishi mumkin?', hint: 'Membrana vazifasini eslang.', solution: 'Moddalar kirib-chiqishi nazoratsiz bo‘lib, hujayraning ichki muhiti buziladi.' }
    ],
    summaryPoints: ['Hujayra — hayot birligi.', 'Yadro — boshqaruv, mitoxondriya — energiya, ribosoma — oqsil.', 'O‘simlik hujayrasida devor, xloroplast va katta vakuola bor.'],
    tutor: {
      simple: 'Hujayra — kichkina zavod. Yadro — direktor xonasi, mitoxondriya — elektr stansiyasi, ribosoma — mahsulot ishlab chiqaruvchi sex, membrana — qo‘riqchili darvoza.',
      analogies: ['Hujayrani shaharga o‘xshating: yadro — shahar hokimligi (qarorlar va hujjatlar arxivi), mitoxondriya — elektr stansiyalari, ribosomalar — fabrikalar, Golji apparati — pochta bo‘limi (qadoqlab jo‘natadi), membrana — shahar chegarasidagi nazorat punkti.', 'O‘simlik hujayrasidagi hujayra devorini qal’a devoriga, xloroplastlarni esa tomdagi quyosh panellariga o‘xshatish mumkin — ular quyosh nuridan oziq hosil qiladi.'],
      extraExamples: ['Qizil qon tanachalari (eritrotsitlar) yetuk holatda yadroga ega emas — bu ularga ko‘proq kislorod tashish uchun joy beradi.', 'Nerv hujayralari uzun o‘simtalarga ega — bu signalni uzoq masofaga uzatishga moslashuv.'],
      steps: ['Organoid nomini yozing.', 'Uning asosiy vazifasini bir gapda ayting.', 'Kundalik hayotdan o‘xshatish toping.', 'O‘simlik yoki hayvon hujayrasiga xosligini belgilang.'],
      hints: ['Energiya bilan bog‘liq savolda qaysi organoidni eslash kerak?', 'Fotosintez qayerda boradi — bu faqat o‘simlikka xosmi?'],
      practice: ['O‘simlik va hayvon hujayrasining taqqoslash jadvalini tuzing (kamida 5 ta belgi).', 'Hujayra organoidlari uchun “shahar” modelini rasm yoki sxema ko‘rinishida chizing.'],
      checks: [
        { question: 'Mitoxondriyaning asosiy vazifasi nima?', answer: 'Hujayra uchun energiya (ATF) ishlab chiqarish.' },
        { question: 'Hayvon hujayrasida qaysi tuzilmalar bo‘lmaydi?', answer: 'Hujayra devori va xloroplastlar.' }
      ]
    },
    quiz: [
      single('Irsiy axborot (DNK) asosan qayerda saqlanadi?', ['Ribosomada', 'Yadroda', 'Membranada', 'Vakuolada'], 'Yadroda', 'Yadro — irsiy axborot markazi.', 'DNK asosan yadroda joylashgan.', 'Yadro'),
      single('Hujayraning “elektr stansiyasi”?', ['Golji apparati', 'Mitoxondriya', 'Xloroplast', 'Ribosoma'], 'Mitoxondriya', 'Mitoxondriya ATF ishlab chiqaradi.', 'Energiya mitoxondriyada hosil bo‘ladi.', 'Mitoxondriya'),
      single('Oqsil sintezi qaysi organoidda boradi?', ['Ribosoma', 'Vakuola', 'Membrana', 'Lizosoma'], 'Ribosoma', 'Ribosomalar oqsil yig‘adi.', 'Oqsil sintezi ribosomalarda amalga oshadi.', 'Ribosoma'),
      tf('Hayvon hujayrasida xloroplastlar bo‘ladi.', false, 'Xloroplastlar faqat o‘simlik (va ba’zi suvo‘tlar) hujayrasida.', 'Hayvonlar fotosintez qilmaydi, shuning uchun xloroplast yo‘q.', 'O‘simlik va hayvon hujayrasi'),
      multiple('O‘simlik hujayrasiga xos tuzilmalarni tanlang.', ['Hujayra devori', 'Xloroplast', 'Katta markaziy vakuola', 'Yadro'], ['Hujayra devori', 'Xloroplast', 'Katta markaziy vakuola'], 'Bular o‘simlik hujayrasini ajratib turadi.', 'Yadro ikkala hujayra turida ham bor.', 'O‘simlik hujayrasi')
    ]
  },
  {
    slug: 'human-anatomy',
    topic: 'odam-organizmi',
    title: 'Odam anatomiyasi asoslari',
    summary: 'Odam tanasining asosiy organ tizimlari: tayanch-harakat, qon aylanish, nafas, hazm va nerv tizimlari.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 1,
    notice: MED_NOTICE,
    objectives: ['Tuzilish darajalarini bilish: hujayra → to‘qima → organ → tizim', 'Asosiy organ tizimlari va vazifalarini sanash', 'Tizimlarning o‘zaro bog‘liqligini tushuntirish'],
    definitions: [
      { term: 'Anatomiya', meaning: 'Organizm tuzilishini o‘rganuvchi fan.' },
      { term: 'To‘qima', meaning: 'Tuzilishi va vazifasi o‘xshash hujayralar guruhi.' },
      { term: 'Organ', meaning: 'Bir nechta to‘qimadan tuzilgan va muayyan vazifani bajaruvchi tana qismi.' },
      { term: 'Organlar tizimi', meaning: 'Umumiy vazifani birgalikda bajaruvchi organlar guruhi.' }
    ],
    sections: [
      { heading: 'Tuzilish darajalari', body: 'Hujayra → to‘qima → organ → organlar tizimi → organizm. Masalan: yurak mushagi hujayralari → mushak to‘qimasi → yurak → qon aylanish tizimi → odam.' },
      { heading: 'Asosiy tizimlar', body: '- **Tayanch-harakat:** suyaklar va mushaklar — tayanch, himoya, harakat.\n- **Qon aylanish:** yurak va qon tomirlari — kislorod va oziq tashish.\n- **Nafas:** o‘pka va nafas yo‘llari — gaz almashinuvi.\n- **Hazm:** oshqozon, ichaklar, jigar — oziqni parchalash va so‘rish.\n- **Nerv:** bosh miya, orqa miya, nervlar — boshqaruv va signal uzatish.\n- **Ayirish:** buyraklar — qonni tozalash.' },
      { heading: 'Tizimlar birgalikda ishlaydi', body: 'Yugurganda mushaklar ko‘proq kislorod talab qiladi: nafas tezlashadi (nafas tizimi), yurak tezroq uradi (qon aylanish), nerv tizimi esa bu jarayonlarni boshqaradi. Hech bir tizim yolg‘iz ishlamaydi.' }
    ],
    examples: [
      { title: 'Non bo‘lagining yo‘li', steps: ['Og‘izda chaynaladi va so‘lak bilan aralashadi.', 'Qizilo‘ngach orqali oshqozonga tushadi.', 'Oshqozon va ingichka ichakda parchalanadi, oziq moddalar qonga so‘riladi.', 'Qon aylanish tizimi ularni butun tanaga yetkazadi.'], result: 'Hazm va qon aylanish tizimlari hamkorligi.' }
    ],
    exercises: [
      { prompt: 'Gaz almashinuvi qaysi organda boradi?', hint: 'Nafas tizimi.', solution: 'O‘pkada (alveolalarda).' },
      { prompt: 'Zinadan tez ko‘tarilganda qaysi tizimlar faollashadi va nima uchun?', hint: 'Kamida uchta tizimni ayting.', solution: 'Tayanch-harakat (mushaklar ishlaydi), nafas (kislorod ko‘proq kerak), qon aylanish (kislorodni tez yetkazish), nerv (boshqaruv).' }
    ],
    summaryPoints: ['Hujayra → to‘qima → organ → tizim → organizm.', 'Har bir tizim o‘z vazifasini bajaradi.', 'Tizimlar doimo o‘zaro hamkorlikda ishlaydi.'],
    tutor: {
      simple: 'Tanani katta jamoa deb tasavvur qiling: suyaklar — karkas, mushaklar — dvigatel, yurak — nasos, o‘pka — havo almashtirgich, miya — boshqaruv markazi. Hammasi birga ishlaydi.',
      analogies: ['Organizmni avtomobilga o‘xshating: skelet — kuzov, mushaklar — dvigatel, yurak — yonilg‘i nasosi, qon tomirlari — quvurlar, o‘pka — havo filtri, miya — bort kompyuteri, buyraklar — filtr tizimi.', 'Tuzilish darajalarini kitobga o‘xshating: harflar (hujayralar) so‘z (to‘qima) hosil qiladi, so‘zlar gap (organ), gaplar bob (tizim), boblar esa butun kitob (organizm).'],
      extraExamples: ['Sovuqda titrash: nerv tizimi mushaklarga tez-tez qisqarish buyrug‘ini beradi — bu issiqlik hosil qiladi va tana haroratini saqlashga yordam beradi.', 'Ovqatdan keyin uyquchanlik qisman qon oqimining hazm a’zolariga ko‘proq yo‘naltirilishi bilan izohlanadi — tizimlar resurslarni “taqsimlaydi”.'],
      steps: ['Tizim nomini yozing.', 'Unga kiruvchi asosiy organlarni sanang.', 'Tizimning asosiy vazifasini bir gapda ayting.', 'U qaysi boshqa tizim bilan bog‘liqligini toping.'],
      hints: ['Kislorod tashish haqida gap ketganda qaysi ikki tizimni eslash kerak?', 'To‘qima va organ farqini eslang: organ bir nechta to‘qimadan iborat.'],
      practice: ['Har bir asosiy organ tizimi uchun 1 ta organ va 1 ta vazifa yozilgan jadval tuzing.', 'Ertalabki mashq paytida tanangizda qaysi tizimlar qanday ishlashini qisqa matn qilib yozing.'],
      checks: [
        { question: 'To‘qima va organ farqi nima?', answer: 'To‘qima — o‘xshash hujayralar guruhi, organ esa bir nechta to‘qimadan tuzilgan va muayyan vazifani bajaradigan tana qismi.' },
        { question: 'Qon aylanish tizimining asosiy vazifasi nima?', answer: 'Kislorod, oziq moddalar va boshqa moddalarni tana bo‘ylab tashish, chiqindilarni olib ketish.' }
      ]
    },
    quiz: [
      single('To‘g‘ri tartibni tanlang.', ['Organ → hujayra → to‘qima', 'Hujayra → to‘qima → organ → tizim', 'To‘qima → hujayra → tizim', 'Tizim → organ → hujayra → to‘qima'], 'Hujayra → to‘qima → organ → tizim', 'Oddiydan murakkabga.', 'Hujayralar to‘qima, to‘qimalar organ, organlar tizim hosil qiladi.', 'Tuzilish darajalari'),
      single('Qonni tozalovchi asosiy organ?', ['O‘pka', 'Buyrak', 'Oshqozon', 'Yurak'], 'Buyrak', 'Buyraklar ayirish tizimining asosiy organi.', 'Qonni filtrlash buyraklar vazifasi.', 'Ayirish tizimi'),
      single('Gaz almashinuvi qaysi tizimga xos?', ['Hazm', 'Nafas', 'Tayanch-harakat', 'Ayirish'], 'Nafas', 'O‘pkada kislorod va karbonat angidrid almashinadi.', 'Gaz almashinuvi nafas tizimida boradi.', 'Nafas tizimi'),
      tf('Organ tizimlari bir-biridan mustaqil, alohida ishlaydi.', false, 'Ular doimo hamkorlikda ishlaydi.', 'Masalan, harakat paytida nafas, qon aylanish va nerv tizimlari birga faollashadi.', 'Tizimlar hamkorligi'),
      single('Organizm faoliyatini boshqaruvchi tizim?', ['Nerv tizimi', 'Hazm tizimi', 'Ayirish tizimi', 'Teri'], 'Nerv tizimi', 'Bosh miya va nervlar boshqaruvni amalga oshiradi.', 'Boshqaruv va signal uzatish — nerv tizimi vazifasi.', 'Nerv tizimi')
    ]
  },
  {
    slug: 'human-physiology',
    topic: 'odam-organizmi',
    title: 'Odam fiziologiyasi asoslari',
    summary: 'Organizm qanday ishlaydi: gomeostaz, yurak urishi, nafas olish va tana haroratini boshqarish.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 2,
    notice: MED_NOTICE,
    objectives: ['Gomeostaz tushunchasini izohlash', 'Manfiy teskari aloqa mexanizmini misol bilan tushuntirish', 'Jismoniy yuklama paytidagi o‘zgarishlarni izohlash'],
    definitions: [
      { term: 'Fiziologiya', meaning: 'Organizm va uning qismlari qanday ishlashini o‘rganuvchi fan.' },
      { term: 'Gomeostaz', meaning: 'Organizm ichki muhitining (harorat, qand miqdori va boshqalar) nisbatan barqaror saqlanishi.' },
      { term: 'Manfiy teskari aloqa', meaning: 'O‘zgarish yuz berganda uni kamaytiruvchi javob hosil bo‘lishi.' }
    ],
    sections: [
      { heading: 'Gomeostaz — ichki muvozanat', body: 'Tashqarida qish yoki yoz bo‘lishidan qat’i nazar, sog‘lom odamning tana harorati taxminan 36–37 °C atrofida saqlanadi. Qondagi qand, suv va tuzlar miqdori ham ma’lum chegaralarda ushlab turiladi. Bu holat gomeostaz deyiladi.' },
      { heading: 'Manfiy teskari aloqa', body: 'Organizm termostatga o‘xshaydi:\n1. O‘zgarish: tana qiziydi.\n2. Sezgichlar buni aniqlaydi.\n3. Boshqaruv markazi (miya) javob beradi.\n4. Javob: terlash, teri tomirlarining kengayishi.\n5. Natija: harorat me’yorga qaytadi.' },
      { heading: 'Jismoniy yuklama paytida', body: 'Yugurganda mushaklar ko‘proq kislorod va energiya sarflaydi. Javoban yurak urishi va nafas olish tezlashadi, tana issiqligi oshadi va terlash boshlanadi. Mashg‘ulotdan keyin bu ko‘rsatkichlar asta-sekin me’yorga qaytadi.' }
    ],
    examples: [
      { title: 'Sovuqda nima bo‘ladi?', steps: ['Tana harorati pasaya boshlaydi.', 'Teri tomirlari torayadi — issiqlik yo‘qotish kamayadi.', 'Titrash boshlanadi — mushaklar issiqlik hosil qiladi.', 'Harorat me’yorga yaqinlashadi.'], result: 'Manfiy teskari aloqa haroratni barqaror ushlab turadi.' }
    ],
    exercises: [
      { prompt: 'Issiq kunda ko‘p terlash gomeostaz bilan qanday bog‘liq?', hint: 'Terning bug‘lanishi nima qiladi?', solution: 'Ter bug‘langanda tanani sovutadi — bu haroratni me’yorda saqlash mexanizmi.' },
      { prompt: 'Nima uchun yugurganda nafas tezlashadi?', hint: 'Mushaklarga nima ko‘proq kerak?', solution: 'Mushaklarga ko‘proq kislorod kerak bo‘ladi va ko‘proq karbonat angidrid chiqariladi.' }
    ],
    summaryPoints: ['Gomeostaz — ichki muhit barqarorligi.', 'Manfiy teskari aloqa o‘zgarishni kamaytiradi.', 'Yuklama paytida yurak va nafas tezlashadi, terlash boshlanadi.'],
    tutor: {
      simple: 'Tanangizda “avtomatik sozlagich” bor. Isib ketsangiz — terlaysiz va soviysiz. Sovqotsangiz — titraysiz va isiysiz. Bu tananing muvozanatni saqlashi — gomeostaz.',
      analogies: ['Gomeostazni uy konditsioneriga o‘xshating: siz 22 °C ni o‘rnatasiz. Xona isib ketsa, konditsioner sovutadi; sovib ketsa, isitadi. Tanada sezgichlar, miya va terlash/titrash xuddi shunday ishlaydi.', 'Manfiy teskari aloqani velosipedda muvozanat saqlashga o‘xshatish mumkin: o‘ngga og‘sangiz, rulni chapga burasiz — og‘ish kamayadi va to‘g‘ri harakat tiklanadi.'],
      extraExamples: ['Ko‘p suv ichsangiz, buyraklar ko‘proq siydik ishlab chiqaradi; kam ichsangiz — kamroq. Bu suv muvozanatini saqlash mexanizmi.', 'Ovqatdan keyin qondagi qand oshadi va insulin gormoni uni hujayralarga o‘tishiga yordam beradi — qand miqdori me’yorga qaytadi.'],
      steps: ['Qanday o‘zgarish yuz berdi (masalan, harorat oshdi)?', 'Uni qaysi sezgichlar aniqlaydi?', 'Boshqaruv markazi qayerda?', 'Qanday javob reaksiyasi yuzaga keladi?', 'Natijada ko‘rsatkich qanday o‘zgaradi?'],
      hints: ['Teskari aloqa “manfiy” deyilishi o‘zgarishni kuchaytiradimi yoki kamaytiradimi?', 'Terlashning sovutuvchi ta’siri qaysi jarayon bilan bog‘liq?'],
      practice: ['Bir daqiqa joyida yugurishdan oldin va keyin pulsingizni o‘lchang (sog‘lig‘ingiz imkon bersa) va farqni gomeostaz nuqtai nazaridan izohlang.', 'Tana haroratini boshqarish sxemasini o‘zingiz chizing: o‘zgarish → sezgich → markaz → javob → natija.'],
      checks: [
        { question: 'Gomeostaz nima?', answer: 'Organizm ichki muhitining (harorat, suv, qand miqdori va boshqalar) nisbatan barqaror saqlanishi.' },
        { question: 'Sovuqda titrash qanday vazifani bajaradi?', answer: 'Mushaklar tez qisqarib issiqlik hosil qiladi va tana haroratini oshirishga yordam beradi.' }
      ]
    },
    quiz: [
      single('Gomeostaz nima?', ['Organizm o‘sishi', 'Ichki muhitning barqarorligi', 'Hujayra bo‘linishi', 'Ovqat hazm qilish'], 'Ichki muhitning barqarorligi', 'Gomeostaz — ichki muvozanat.', 'Gomeostaz harorat, suv, qand kabi ko‘rsatkichlarni barqaror saqlashdir.', 'Gomeostaz'),
      single('Issiqda tanani sovutishga yordam beruvchi jarayon?', ['Titrash', 'Terlash', 'Tomirlarning torayishi', 'Nafasni ushlab turish'], 'Terlash', 'Terning bug‘lanishi tanani sovutadi.', 'Titrash va tomirlar torayishi issiqlikni saqlash uchun.', 'Termoregulyatsiya'),
      tf('Manfiy teskari aloqa dastlabki o‘zgarishni kuchaytiradi.', false, 'U o‘zgarishni kamaytiradi va me’yorga qaytaradi.', 'Manfiy teskari aloqa — o‘zgarishga qarshi javob.', 'Teskari aloqa'),
      single('Jismoniy yuklama paytida yurak urishi qanday o‘zgaradi?', ['Sekinlashadi', 'Tezlashadi', 'To‘xtaydi', 'O‘zgarmaydi'], 'Tezlashadi', 'Mushaklarga ko‘proq kislorod yetkazish uchun.', 'Ko‘proq kislorod kerak bo‘lgani uchun yurak tezroq uradi.', 'Yuklama'),
      single('Sog‘lom odamning tana harorati odatda qaysi oraliqda?', ['30–32 °C', '36–37 °C', '39–40 °C', '42–43 °C'], '36–37 °C', 'Me’yoriy harorat taxminan 36–37 °C.', 'Tana harorati gomeostaz orqali taxminan 36–37 °C atrofida saqlanadi.', 'Gomeostaz')
    ]
  },
  {
    slug: 'atomic-structure',
    topic: 'umumiy-kimyo',
    title: 'Atom tuzilishi',
    summary: 'Proton, neytron va elektronlar; atom raqami, massa soni va izotoplar — kimyoning poydevori.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['Atomning tarkibiy qismlarini bilish', 'Atom raqami va massa sonidan zarrachalar sonini topish', 'Izotop tushunchasini tushuntirish'],
    definitions: [
      { term: 'Proton', meaning: 'Yadroda joylashgan musbat zaryadli zarracha.' },
      { term: 'Neytron', meaning: 'Yadroda joylashgan zaryadsiz zarracha.' },
      { term: 'Elektron', meaning: 'Yadro atrofida harakatlanuvchi manfiy zaryadli, juda yengil zarracha.' },
      { term: 'Izotop', meaning: 'Protonlar soni bir xil, neytronlar soni har xil bo‘lgan bir elementning atomlari.' }
    ],
    sections: [
      { heading: 'Atom qismlari', body: 'Atom markazida kichik, lekin og‘ir **yadro** joylashgan — unda protonlar va neytronlar bor. Yadro atrofida **elektronlar** harakatlanadi. Neytral atomda protonlar soni elektronlar soniga teng.' },
      { heading: 'Atom raqami va massa soni', body: '- **Atom raqami (Z)** = protonlar soni. U elementni belgilaydi: 6 ta proton — doimo uglerod.\n- **Massa soni (A)** = protonlar + neytronlar.\n- Neytronlar soni = A − Z.\n\nMasalan, ¹²C: Z = 6, A = 12 → 6 proton, 6 neytron, 6 elektron.' },
      { heading: 'Izotoplar', body: 'Uglerodning ¹²C va ¹⁴C izotoplari bor: ikkalasida 6 proton, lekin ¹⁴C da 8 neytron. Kimyoviy xossalari deyarli bir xil, chunki ular elektronlarga bog‘liq. ¹⁴C arxeologiyada qadimiy topilmalar yoshini aniqlashda ishlatiladi.' }
    ],
    examples: [
      { title: 'Natriy atomi (²³Na, Z = 11)', steps: ['Protonlar = Z = 11.', 'Elektronlar (neytral atom) = 11.', 'Neytronlar = 23 − 11 = 12.'], result: '11 p, 12 n, 11 e' }
    ],
    exercises: [
      { prompt: 'Kislorod: Z = 8, A = 16. Proton, neytron va elektronlar sonini toping.', hint: 'n = A − Z.', solution: '8 proton, 8 neytron, 8 elektron.' },
      { prompt: '³⁵Cl va ³⁷Cl ning farqi nimada?', hint: 'Xlorning Z = 17.', solution: 'Ikkalasida 17 proton; ³⁵Cl da 18, ³⁷Cl da 20 neytron — ular izotoplar.' }
    ],
    summaryPoints: ['Yadro: proton (+) va neytron (0); atrofida elektron (−).', 'Z = protonlar soni, A = proton + neytron.', 'Neytral atomda e = p.', 'Izotoplar neytronlar soni bilan farqlanadi.'],
    tutor: {
      simple: 'Atom — juda kichik “quyosh tizimi”. O‘rtada og‘ir yadro (protonlar va neytronlar), atrofida yengil elektronlar aylanadi. Protonlar soni element “pasporti”.',
      analogies: ['Atomni stadionga o‘xshating: yadro — maydon markazidagi kichik tanga, elektronlar esa tribunalar atrofida yuguradi. Atomning katta qismi — bo‘shliq.', 'Atom raqamini pasport raqamiga o‘xshatish mumkin: protonlar soni o‘zgarsa, bu boshqa “shaxs” — boshqa element bo‘ladi. Neytronlar soni esa vazn kabi: bir odam vazni o‘zgarsa ham o‘sha odamligicha qoladi (izotop).'],
      extraExamples: ['Vodorodning uch izotopi: protiy (0 neytron), deyteriy (1 neytron), tritiy (2 neytron). Hammasida 1 proton.', 'Ion: natriy atomi bitta elektron bersa, Na⁺ ioni hosil bo‘ladi — 11 proton, 10 elektron.'],
      steps: ['Davriy jadvaldan atom raqamini (Z) toping.', 'Protonlar = Z.', 'Neytral atom bo‘lsa, elektronlar = Z.', 'Neytronlar = A − Z.'],
      hints: ['Massa soni neytronlar soniga tengmi yoki proton va neytronlar yig‘indisigami?', 'Ion bo‘lsa, elektronlar soni protonlar sonidan farq qiladi — zaryad belgisiga qarang.'],
      practice: ['Birinchi 10 element uchun (H dan Ne gacha) protonlar sonini yozing.', '¹⁴N (Z = 7) va ¹⁵N izotoplari uchun zarrachalar sonini hisoblang.'],
      checks: [
        { question: 'Elementni nima belgilaydi: protonlar sonimi yoki neytronlar sonimi?', answer: 'Protonlar soni (atom raqami).' },
        { question: '²⁷Al (Z = 13) atomida nechta neytron bor?', answer: '14 ta (27 − 13).' }
      ]
    },
    quiz: [
      single('Musbat zaryadli zarracha?', ['Elektron', 'Neytron', 'Proton', 'Foton'], 'Proton', 'Proton musbat zaryadli.', 'Elektron manfiy, neytron zaryadsiz.', 'Atom qismlari'),
      single('Atom raqami nimaga teng?', ['Neytronlar soniga', 'Protonlar soniga', 'Massa soniga', 'Molekulalar soniga'], 'Protonlar soniga', 'Z = protonlar soni.', 'Atom raqami elementdagi protonlar sonini bildiradi.', 'Atom raqami'),
      short('Z = 6, A = 14 bo‘lgan atomda nechta neytron bor? (faqat son)', ['8'], '14 − 6 = 8.', 'Neytronlar = A − Z.', 'Massa soni'),
      tf('Izotoplar protonlar soni bilan farqlanadi.', false, 'Izotoplar neytronlar soni bilan farqlanadi.', 'Protonlar soni o‘zgarsa, bu boshqa element bo‘ladi.', 'Izotop'),
      single('Neytral atomda elektronlar soni nimaga teng?', ['Neytronlar soniga', 'Protonlar soniga', 'Massa soniga', 'Nolga'], 'Protonlar soniga', 'Zaryadlar muvozanatlashadi.', 'Neytral atomda musbat va manfiy zaryadlar soni teng.', 'Elektronlar')
    ]
  },
  {
    slug: 'chemical-bonds',
    topic: 'umumiy-kimyo',
    title: 'Kimyoviy bog‘lar',
    summary: 'Atomlar nega birikadi? Ion, kovalent va metall bog‘lar hamda ularning moddalar xossalariga ta’siri.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 2,
    objectives: ['Valent elektronlar rolini tushuntirish', 'Ion va kovalent bog‘ni farqlash', 'Bog‘ turidan modda xossalarini taxmin qilish'],
    definitions: [
      { term: 'Valent elektronlar', meaning: 'Atomning tashqi qavatidagi, bog‘ hosil qilishda qatnashadigan elektronlar.' },
      { term: 'Ion bog‘', meaning: 'Elektron berish va olish natijasida hosil bo‘lgan qarama-qarshi zaryadli ionlar orasidagi tortishish.' },
      { term: 'Kovalent bog‘', meaning: 'Atomlar elektron juftlarini umumlashtirishi orqali hosil bo‘ladigan bog‘.' },
      { term: 'Metall bog‘', meaning: 'Metall atomlari orasida erkin elektronlar “buluti” orqali hosil bo‘ladigan bog‘.' }
    ],
    sections: [
      { heading: 'Nega atomlar birikadi?', body: 'Ko‘pchilik atomlar tashqi qavatini to‘ldirib (odatda 8 ta elektron — oktet qoidasi), barqarorroq holatga o‘tishga intiladi. Buning uchun ular elektron beradi, oladi yoki umumlashtiradi.' },
      { heading: 'Ion bog‘', body: 'Odatda metall va metallmas orasida. Natriy bitta elektron beradi (Na⁺), xlor uni oladi (Cl⁻). Qarama-qarshi zaryadlar tortishadi — osh tuzi NaCl hosil bo‘ladi. Ion birikmalar odatda yuqori haroratda suyuqlanadi va suvdagi eritmasi tok o‘tkazadi.' },
      { heading: 'Kovalent bog‘', body: 'Odatda metallmaslar orasida. Suv molekulasida (H₂O) kislorod har bir vodorod bilan bittadan elektron juftini umumlashtiradi. Agar elektronlar bir atomga ko‘proq tortilsa — **qutbli** kovalent bog‘ (suvdagidek), teng taqsimlansa — **qutbsiz** (H₂, O₂).' },
      { heading: 'Metall bog‘', body: 'Metallarda elektronlar bitta atomga bog‘lanmagan, erkin harakatlanadi. Shu sababli metallar tok va issiqlikni yaxshi o‘tkazadi hamda bolg‘alanuvchan bo‘ladi.' }
    ],
    examples: [
      { title: 'NaCl va H₂O ni taqqoslash', steps: ['NaCl: metall + metallmas → ion bog‘ → qattiq, yuqori suyuqlanish harorati.', 'H₂O: metallmas + metallmas → qutbli kovalent bog‘ → oddiy sharoitda suyuqlik.'], result: 'Bog‘ turi moddaning xossalarini belgilaydi.' }
    ],
    exercises: [
      { prompt: 'MgO, CO₂ va Cu ning har birida qaysi bog‘ turi bor?', hint: 'Metall/metallmas tarkibiga qarang.', solution: 'MgO — ion, CO₂ — kovalent (qutbli bog‘lar), Cu — metall bog‘.' },
      { prompt: 'Nima uchun mis simlar elektr o‘tkazgich sifatida ishlatiladi?', hint: 'Metall bog‘ xususiyati.', solution: 'Metall bog‘dagi erkin elektronlar tokni yaxshi o‘tkazadi.' }
    ],
    summaryPoints: ['Atomlar barqaror tashqi qavatga intiladi.', 'Ion bog‘ — elektron berish/olish (metall + metallmas).', 'Kovalent bog‘ — elektron juftini umumlashtirish (metallmaslar).', 'Metall bog‘ — erkin elektronlar.'],
    tutor: {
      simple: 'Atomlar “to‘liq to‘plam”ga ega bo‘lishni xohlaydi. Biri ortiqcha elektronni beradi, boshqasi oladi — ion bog‘. Yoki ikkalasi elektronlarini birga ishlatadi — kovalent bog‘.',
      analogies: ['Ion bog‘ni sovg‘a almashishga o‘xshating: natriy o‘zining ortiqcha elektronini xlorga sovg‘a qiladi va ular endi bir-biriga “bog‘lanib” qoladi (qarama-qarshi zaryadlar tortishadi). Kovalent bog‘ esa ikki do‘stning bitta velosipedni birga ishlatishi.', 'Metall bog‘ni dengizga o‘xshatish mumkin: musbat ionlar orollar, erkin elektronlar esa ularni o‘rab turgan suv. Suv erkin oqadi — shuning uchun metallar tok o‘tkazadi.'],
      extraExamples: ['Olmos — barcha uglerod atomlari kuchli kovalent bog‘lar bilan bog‘langan, shuning uchun u juda qattiq.', 'Suvdagi qutbli bog‘lar suv molekulalarini bir-biriga tortadi — shuning uchun suvning qaynash harorati shunga o‘xshash kichik molekulalarnikidan yuqori.'],
      steps: ['Birikma tarkibidagi elementlarni aniqlang.', 'Ular metallmi yoki metallmas — belgilang.', 'Metall + metallmas → ko‘pincha ion bog‘.', 'Metallmas + metallmas → kovalent bog‘.', 'Faqat metall → metall bog‘.'],
      hints: ['Natriy — metall, xlor — metallmas. Bunday juftlik qaysi bog‘ni hosil qiladi?', 'Elektronlar teng taqsimlanadimi yoki biri ko‘proq tortadimi? Bu qutblilikni belgilaydi.'],
      practice: ['5 ta kundalik modda (tuz, shakar, suv, temir, karbonat angidrid) uchun bog‘ turini aniqlang.', 'Ion va kovalent birikmalar xossalarini taqqoslash jadvalini tuzing.'],
      checks: [
        { question: 'Ion va kovalent bog‘ farqi nima?', answer: 'Ion bog‘da elektronlar bir atomdan boshqasiga o‘tadi va ionlar tortishadi; kovalent bog‘da atomlar elektron juftlarini umumlashtiradi.' },
        { question: 'Nima uchun metallar tokni yaxshi o‘tkazadi?', answer: 'Metall bog‘dagi erkin harakatlanuvchi elektronlar tufayli.' }
      ]
    },
    quiz: [
      single('NaCl dagi bog‘ turi?', ['Kovalent qutbsiz', 'Ion', 'Metall', 'Vodorod'], 'Ion', 'Metall va metallmas — ion bog‘.', 'Natriy elektron beradi, xlor oladi — bu ion bog‘.', 'Ion bog‘'),
      single('H₂ molekulasidagi bog‘?', ['Ion', 'Qutbli kovalent', 'Qutbsiz kovalent', 'Metall'], 'Qutbsiz kovalent', 'Bir xil atomlar elektronlarni teng taqsimlaydi.', 'Bir xil atomlar orasidagi bog‘ qutbsiz kovalent.', 'Kovalent bog‘'),
      single('Metallarning tok o‘tkazishi nimaga bog‘liq?', ['Ionlar harakatsizligiga', 'Erkin elektronlarga', 'Neytronlarga', 'Protonlarga'], 'Erkin elektronlarga', 'Metall bog‘dagi erkin elektronlar tok tashiydi.', 'Tokni erkin elektronlar o‘tkazadi.', 'Metall bog‘'),
      tf('Kovalent bog‘da atomlar elektron juftlarini umumlashtiradi.', true, 'Kovalent bog‘ ta’rifi shu.', 'Kovalent bog‘ — umumiy elektron jufti orqali bog‘lanish.', 'Kovalent bog‘'),
      multiple('Ion birikmalarga xos xossalarni tanlang.', ['Yuqori suyuqlanish harorati', 'Suvdagi eritmasi tok o‘tkazadi', 'Odatda gaz holatida bo‘ladi', 'Qattiq kristall tuzilish'], ['Yuqori suyuqlanish harorati', 'Suvdagi eritmasi tok o‘tkazadi', 'Qattiq kristall tuzilish'], 'Kuchli ion tortishuvi shu xossalarni beradi.', 'Ion birikmalar odatda gaz emas, qattiq kristall moddalar.', 'Ion birikmalar')
    ]
  },
  {
    slug: 'organic-chemistry',
    topic: 'organik-kimyo',
    title: 'Organik kimyo asoslari',
    summary: 'Uglerod birikmalari olami: uglevodorodlar, funksional guruhlar va hayotdagi organik moddalar.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 1,
    objectives: ['Uglerodning o‘ziga xos xususiyatlarini tushuntirish', 'Alkan, alken va alkinlarni farqlash', 'Asosiy funksional guruhlarni tanish'],
    definitions: [
      { term: 'Organik kimyo', meaning: 'Uglerod birikmalarini o‘rganuvchi kimyo bo‘limi.' },
      { term: 'Uglevodorod', meaning: 'Faqat uglerod va vodoroddan tuzilgan birikma.' },
      { term: 'Funksional guruh', meaning: 'Molekulaning kimyoviy xossalarini belgilovchi atomlar guruhi, masalan –OH.' },
      { term: 'Izomer', meaning: 'Molekulyar formulasi bir xil, tuzilishi har xil bo‘lgan moddalar.' }
    ],
    sections: [
      { heading: 'Nega aynan uglerod?', body: 'Uglerod atomi to‘rtta kovalent bog‘ hosil qiladi va boshqa uglerod atomlari bilan uzun zanjir va halqalar tuza oladi. Shu sababli millionlab organik birikmalar mavjud — oqsillar, yog‘lar, uglevodlar, DNK, plastmassalar va dori moddalari.' },
      { heading: 'Uglevodorodlar', body: '- **Alkanlar** — faqat oddiy (bir) bog‘lar: metan CH₄, etan C₂H₆. Umumiy formula CₙH₂ₙ₊₂.\n- **Alkenlar** — kamida bitta qo‘sh bog‘: eten C₂H₄.\n- **Alkinlar** — kamida bitta uch bog‘: etin C₂H₂.\n\nTabiiy gazning asosiy qismi — metan.' },
      { heading: 'Funksional guruhlar', body: '- **–OH (gidroksil)** — spirtlar, masalan etanol.\n- **–COOH (karboksil)** — karbon kislotalar, masalan sirka kislota.\n- **–NH₂ (amino)** — aminlar; aminokislotalarda –NH₂ va –COOH birga bo‘ladi — ular oqsillarning “g‘ishtlari”.' }
    ],
    examples: [
      { title: 'Butan izomerlari (C₄H₁₀)', steps: ['To‘g‘ri zanjirli butan: C–C–C–C.', 'Tarmoqlangan izobutan: markaziy uglerodga uchta CH₃ ulangan.', 'Formula bir xil, tuzilish va xossalar biroz farq qiladi.'], result: 'Izomeriya organik moddalarning xilma-xilligini oshiradi.' }
    ],
    exercises: [
      { prompt: '5 ta uglerodli alkanning formulasini yozing.', hint: 'CₙH₂ₙ₊₂, n = 5.', solution: 'C₅H₁₂ (pentan).' },
      { prompt: 'Sirka tarkibidagi kislotada qaysi funksional guruh bor?', hint: 'Karbon kislota.', solution: '–COOH (karboksil guruhi).' }
    ],
    summaryPoints: ['Uglerod 4 ta bog‘ hosil qiladi va zanjirlar tuzadi.', 'Alkan — bir bog‘, alken — qo‘sh, alkin — uch bog‘.', 'Funksional guruhlar xossalarni belgilaydi: –OH, –COOH, –NH₂.'],
    tutor: {
      simple: 'Organik kimyo — uglerodli “konstruktor”. Uglerodning to‘rtta “qo‘li” bor va u boshqa uglerodlar bilan qo‘l ushlashib, uzun zanjirlar quradi. Zanjirga qo‘shilgan maxsus “bezaklar” (funksional guruhlar) moddaning xarakterini belgilaydi.',
      analogies: ['Uglerod zanjirini marjon iplariga o‘xshating: munchoqlar (uglerod atomlari) ipga tiziladi, ip to‘g‘ri, tarmoqlangan yoki halqa bo‘lishi mumkin. Funksional guruh — marjonga osilgan alohida kulon, u butun marjonning ko‘rinishini o‘zgartiradi.', 'Izomerlarni bir xil LEGO bloklaridan yasalgan turli shakllarga o‘xshatish mumkin: bloklar soni bir xil (formula), lekin mashina yoki uy (tuzilish) — har xil narsa.'],
      extraExamples: ['Glukoza (C₆H₁₂O₆) — o‘simliklar fotosintezda hosil qiladigan va hujayralar energiya uchun ishlatadigan organik modda.', 'Polietilen — eten molekulalarining minglab marta birikishidan hosil bo‘lgan polimer; plastik paketlar shundan tayyorlanadi.'],
      steps: ['Molekuladagi uglerod atomlari sonini sanang.', 'Bog‘lar turini aniqlang (bir, qo‘sh, uch).', 'Funksional guruh bormi — toping.', 'Shu asosda modda sinfini aniqlang (alkan, spirt, kislota…).'],
      hints: ['Formula CₙH₂ₙ₊₂ ga mos keladimi? Unda bu alkan bo‘lishi mumkin.', 'Molekulada –OH bormi? Qaysi sinf bo‘ladi?'],
      practice: ['Birinchi 6 ta alkan nomi va formulasini jadval qilib yozing (metan … geksan).', 'Uyingizdagi 3 ta organik modda tarkibini o‘rganing (yorliqlarga qarang) va ulardagi funksional guruhlarni toping.'],
      checks: [
        { question: 'Uglerod nechta kovalent bog‘ hosil qiladi?', answer: 'To‘rtta.' },
        { question: 'Alken alkandan nimasi bilan farq qiladi?', answer: 'Alkenda kamida bitta qo‘sh bog‘ bor, alkanda faqat oddiy (bir) bog‘lar.' }
      ]
    },
    quiz: [
      single('Uglerod atomi odatda nechta kovalent bog‘ hosil qiladi?', ['2', '3', '4', '6'], '4', 'Uglerod to‘rt valentli.', 'Uglerodning 4 ta valent elektroni bor.', 'Uglerod'),
      single('Metanning formulasi?', ['CH₄', 'C₂H₆', 'C₂H₄', 'CO₂'], 'CH₄', 'Eng sodda alkan — CH₄.', 'Bir uglerodli alkan: CₙH₂ₙ₊₂ → CH₄.', 'Alkanlar'),
      single('–OH guruhi qaysi sinfga xos?', ['Karbon kislotalar', 'Spirtlar', 'Aminlar', 'Alkinlar'], 'Spirtlar', 'Gidroksil guruhi — spirtlar belgisi.', '–COOH kislotalarga, –NH₂ aminlarga xos.', 'Funksional guruhlar'),
      tf('Izomerlarning molekulyar formulasi bir xil, tuzilishi esa har xil.', true, 'Izomer ta’rifi shu.', 'Formula bir xil bo‘lsa ham atomlar boshqacha joylashadi.', 'Izomeriya'),
      short('6 ta uglerodli alkanda nechta vodorod atomi bor? (faqat son)', ['14'], 'C₆H₁₄: 2·6 + 2 = 14.', 'CₙH₂ₙ₊₂ formulasidan foydalaning.', 'Alkanlar')
    ]
  }
];
