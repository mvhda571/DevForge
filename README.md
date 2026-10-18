# DevForge — Kelajagingni o‘zing yarat

DevForge — o‘quvchilarga mos kasbni topish, shaxsiy o‘quv yo‘l xaritasi bo‘yicha o‘qish, AI ustoz bilan dars qilish va universitetlarni tanlashda yordam beruvchi ta’lim platformasi. Interfeys o‘zbek (lotin) tilida; tarjimalar `client/src/i18n/` orqali qo‘shiladi.

**Stek:** React 19 + Vite + Tailwind CSS + React Router + Recharts + Leaflet/OpenStreetMap · Node.js + Express 5 + MongoDB/Mongoose + JWT (httpOnly cookie) + Zod.

---

## 1. Tez ishga tushirish

Talablar: **Node.js 20+**, **MongoDB 6+** (lokal yoki Atlas).

```bash
# 1) Bog‘liqliklarni o‘rnatish
cd devforge
npm run setup                      # = npm --prefix server install && npm --prefix client install

# 2) Muhit sozlamalari
cp server/.env.example server/.env # MONGO_URI va JWT_SECRET ni to‘ldiring
cp client/.env.example client/.env # ixtiyoriy

# 3) Ma’lumotlarni yuklash (kasblar, 14 savol, 42 dars + testlar, 28 universitet)
npm run seed                       # faqat kontent
npm run seed:demo                  # kontent + 4 ta demo hisob + demo guruh

# 4) Ishga tushirish (ikki alohida terminalda)
npm run dev:server                 # http://localhost:4000  (API: /api, holat: /api/health)
npm run dev:client                 # http://localhost:5173
```

Production build: `npm run build` → `client/dist/`. Backend: `cd server && npm start` (`NODE_ENV=production` da `JWT_SECRET` majburiy, `COOKIE_SECURE=true` tavsiya etiladi).

Seed skripti **qayta-qayta ishga tushirilsa ham** yozuvlarni takrorlamaydi (slug/kod bo‘yicha upsert).

### Demo hisoblar (`npm run seed:demo` dan keyin)

| Rol | Email | Parol |
|---|---|---|
| O‘quvchi | `student@devforge.demo` | `DEMO_PASSWORD` qiymati (standart: `DevForge2026!`) |
| O‘qituvchi | `teacher@devforge.demo` | xuddi shu |
| Ota-ona | `parent@devforge.demo` | xuddi shu |
| Administrator | `admin@devforge.demo` | xuddi shu |

Demo guruh kodi: **DEMO10A** (o‘quvchi demo guruhga, ota-ona esa o‘quvchiga tasdiqlangan holda bog‘langan). Haqiqiy serverda demo hisoblarni yaratmang yoki `DEMO_PASSWORD` ni o‘zgartiring.

## 2. MongoDB sozlash

- Lokal: `MONGO_URI=mongodb://127.0.0.1:27017/devforge`
- Atlas: `MONGO_URI=mongodb+srv://<user>:<parol>@<cluster>/devforge?retryWrites=true&w=majority`
- Testlar alohida baza ishlatadi: `MONGO_URI_TEST` (testdan keyin o‘chiriladi — asosiy bazani ko‘rsatmang).

Indekslar Mongoose modellari orqali avtomatik yaratiladi.

## 3. AI provayderini sozlash

Kalit faqat serverda saqlanadi, frontendga hech qachon yuborilmaydi.

```env
AI_PROVIDER=anthropic        # yoki openai, yoki demo
AI_API_KEY=...               # provayder kaliti
AI_MODEL=                    # ixtiyoriy (standart: anthropic → claude-sonnet-5-5, openai → gpt-4o-mini)
AI_BASE_URL=                 # ixtiyoriy: OpenAI-mos proksi yoki boshqa endpoint
```

Kalit bo‘lmasa yoki `AI_PROVIDER=demo` bo‘lsa, **demo rejim** ishlaydi: AI ustoz har bir darsning o‘zidagi tayyor materiallardan (soddalashtirish, o‘xshatishlar, qo‘shimcha misollar, bosqichlar, maslahatlar, tekshiruv savollari) foydalanib, takrorlanmaydigan javob beradi. Interfeysda “Demo rejim” va “Demo javob” belgilari ko‘rinadi. Provayder xato bersa, so‘rov demo javobga tushadi va bu ham belgilanadi.

## 4. Imkoniyatlar

**O‘quvchi yo‘li:** ro‘yxatdan o‘tish → onboarding (o‘tkazib yuborish mumkin) → 14 savollik kasb testi (bir ekranda bitta savol, progress, oldingi/keyingi, davom ettirish) → 3 ta tavsiya (moslik %, sabablar, kuchli tomonlar, ko‘nikmalar, fanlar, o‘qish yo‘li, yo‘nalishlar, keyingi qadam) → yo‘l xaritasi → dars + AI ustoz → 5 savollik test → dashboard.

- **Kasb moslik algoritmi** shaffof: har bir javob 15 ta xususiyatga ball beradi; moslik = Σ(kasb og‘irligi × sizning normallashtirilgan balingiz) ÷ Σ(og‘irlik) × 100. AI faqat izohlaydi, ballni o‘zgartirmaydi; natija psixologik tashxis emasligi aniq yozilgan.
- **14 kasb profili**, saqlash, 3 tagacha taqqoslash, istalgan kasb uchun yo‘l xaritasi.
- **Yo‘l xaritasi:** boshlang‘ich/o‘rta/yuqori bosqichlar, tartiblangan modullar, oldingi talablar, taxminiy vaqt, haftalik maqsad, keyingi dars, takrorlash tavsiyalari, kunlik vaqt va haftalik kunlarni sozlash. Progress **faqat test orqali tugallangan** darslardan hisoblanadi — darsni ochish progress emas.
- **Dars holatlari:** Boshlanmagan · Jarayonda · Tugallangan · Qayta o‘rganish kerak.
- **AI ustoz** dars va tanlangan tushuncha kontekstida ishlaydi: Tushunmadim, Soddaroq tushuntir, Boshqa misol ber, Bosqichma-bosqich ko‘rsat, Meni tekshir, Amaliy topshiriq ber, Maslahat ber. Javobni darhol bermasdan, savollar bilan yo‘naltiradi.
- **Testlar:** bitta/bir nechta javob, to‘g‘ri-noto‘g‘ri, qisqa javob; darhol izoh, avtomatik ball, saqlangan urinishlar, qayta ishlash, zaif tushunchalarni aniqlash.
- **AI maslahatchi:** suhbat tarixi saqlanadi va o‘chiriladi; test natijalari va tugallangan darslardan foydalanadi; universitet talablari, narx va muddatlarni o‘ylab topmaydi.
- **42 ta o‘zbekcha dars** (matematika, informatika, veb-dasturlash, ingliz tili, biologiya, kimyo, iqtisodiyot), har birida maqsadlar, ta’riflar, misollar, mashqlar, xulosa va 5 savollik test. Tibbiyot darslarida “kirish darajasidagi material” ogohlantirishi bor.
- **Universitetlar:** 28 ta yozuv (O‘zbekiston, Janubiy Koreya, Xitoy, Germaniya, Turkiya, AQSh), qidiruv va 8 ta filtr, taqqoslash, saqlash, ariza muddatini eslatmaga qo‘shish. Barcha yozuvlar **“Demo yozuv”** deb belgilangan: nomi, shahri, rasmiy sayti va taxminiy koordinatalari bor; to‘lov, qabul talablari va muddatlar tasdiqlanmagani uchun **“Ma’lumot mavjud emas”** deb ko‘rsatiladi. Admin tasdiqlangan ma’lumotni manbasi bilan kiritishi mumkin.
- **Xarita:** Leaflet + OpenStreetMap; universitet atrofidagi kutubxona, kafe, dorixona, do‘kon, turar joy va transport (Overpass API orqali), kategoriya filtrlari, radius, popuplar. Server keshi (6 soat), so‘rovlar oralig‘i va eskirgan keshga qaytish bor; xizmat ishlamasa xarita tushunarli xabar bilan ishlashda davom etadi.
- **Dashboard:** salomlashish, profil to‘liqligi, izchillik, o‘qish vaqti, yo‘l xaritasi progressi, bugungi reja, haftalik maqsad, so‘nggi testlar, takrorlash kerak mavzular, ko‘nikmalar, saqlanganlar, eslatmalar, yutuqlar, grafiklar. Yangi foydalanuvchiga bo‘sh grafik o‘rniga “4 qadam” onboarding ko‘rsatiladi.
- **Gamifikatsiya:** XP, darajalar, izchillik, yutuqlar, nishonlash oynasi. XP har bir dars/yutuq uchun **bir marta** beriladi; bosimli yoki manipulyativ matnlar yo‘q.
- **Saqlanganlar, eslatmalar, bildirishnomalar:** kasb/universitet/dars saqlash, shaxsiy va ariza muddati eslatmalari, ilova ichidagi bildirishnomalar, o‘qilgan deb belgilash, sozlamalar. Email/SMS/push **ulanmagan** va shunday deb ko‘rsatiladi.

**O‘qituvchi:** guruh yaratish, noyob qo‘shilish kodi (yangilash mumkin), o‘quvchilar ro‘yxati va progressi, o‘quvchi kartasi, topshiriq (muddat, maksimal ball, bog‘liq dars), javoblar, baholash va izoh, guruh tahlili. Faqat o‘z guruhlarini ko‘radi.

**Ota-ona:** o‘quvchi emaili orqali so‘rov → o‘quvchi o‘z sozlamalarida tasdiqlaydi yoki rad etadi → tasdiqdan keyin progress, tugallangan darslar, test xulosalari, muddatlar, haftalik hisobot. AI suhbatlari va shaxsiy eslatmalar ko‘rsatilmaydi; har ikki tomon bog‘lanishni bekor qila oladi.

**Administrator:** statistika, foydalanuvchilar (rol, bloklash, o‘chirish), kasblar (og‘irliklar bilan), test savollari, darslar va testlar muharriri, universitetlar (tasdiq belgisi va manba bilan), kontent tekshiruvi, audit jurnali.

**Xavfsizlik va maxfiylik:** bcrypt, httpOnly JWT cookie + CSRF (double-submit), rol serverda tekshiriladi (mijoz yuborgan rol inobatga olinmaydi, ro‘yxatdan o‘tishda admin roli tanlanmaydi), auth/AI/xarita uchun rate limit, Helmet, CORS ro‘yxati, Zod validatsiya, xavfsiz xato javoblari, audit jurnali, hisob va barcha ma’lumotlarni o‘chirish, rol/holat o‘zgarganda sessiyalar bekor qilinadi.

## 5. Loyiha tuzilmasi

```
devforge/
├── package.json              # umumiy skriptlar
├── client/                   # React + Vite
│   └── src/
│       ├── App.jsx           # marshrutlar (lazy loading)
│       ├── components/       # ui/ (Button, Card, Dialog, Field, Tabs…), lesson/, charts/, StudentOverview…
│       ├── context/          # Auth, Theme, Toast, Celebration
│       ├── hooks/            # useApi, useAction, useFavorites…
│       ├── i18n/             # uz.js — tarjimalar
│       ├── layouts/          # PublicLayout, AppLayout (yig‘iladigan sidebar), Shell
│       ├── lib/              # api.js (CSRF, xatolar), format.js
│       └── pages/            # umumiy, student/, teacher/, parent/, admin/
└── server/
    ├── src/
    │   ├── app.js, server.js
    │   ├── config/           # env, db
    │   ├── controllers/      # domen bo‘yicha
    │   ├── middleware/       # auth, csrf, rateLimits, validate, error
    │   ├── models/           # 25 ta Mongoose model
    │   ├── routes/           # /api/auth, users, careers, assessments, ai, roadmaps, lessons, quizzes,
    │   │                     # progress, universities, favorites, groups, assignments, parents, notifications, admin
    │   ├── services/         # scoring, progressCalc, roadmap, gamification, ai/, overpass, audit…
    │   ├── validation/       # Zod sxemalar
    │   └── seed/             # seed.js + data/ (kasblar, savollar, darslar, universitetlar)
    └── tests/                # node:test + supertest
```

## 6. Testlar

```bash
npm test            # server: 37 ta test (alohida test bazasi kerak — MONGO_URI_TEST)
npm run build       # client production build
```

Qamrab olingan: CSRF, zaif parol, rolni o‘zi tayinlash taqiqlangani, kirish/chiqish, 401/403; to‘liq o‘quvchi yo‘li (onboarding → test → natija → yo‘l xaritasi → darsni ochish progress bermasligi → yiqilgan/o‘tgan test holatlari → XP faqat bir marta → qayta yuklashda saqlanish → dashboard); AI ustoz kontekst va takrorlanmaslik (demo); maslahatchi suhbatini saqlash/o‘chirish; saqlanganlar va eslatmalar; universitet filtrlari; xarita xizmati o‘chganda xato; o‘qituvchi boshqa guruhni ko‘ra olmasligi; topshiriq→javob→baho; ota-ona faqat tasdiqlangan bog‘lanish bilan; admin himoyasi va o‘zini pastga tushira olmasligi; hisobni o‘chirish; moslik algoritmi, test baholash va progress hisob-kitoblari.

## 7. Holat jadvali

| Imkoniyat | Holat |
|---|---|
| Auth, rollar, onboarding, kasb testi, yo‘l xaritasi, darslar, testlar, progress, dashboard, gamifikatsiya | Ishlaydi |
| O‘qituvchi, ota-ona, admin panellari | Ishlaydi |
| Saqlanganlar, taqqoslash, eslatmalar, ilova ichidagi bildirishnomalar | Ishlaydi |
| AI ustoz va maslahatchi | Demo rejim ishlaydi; haqiqiy LLM `AI_PROVIDER` + `AI_API_KEY` bilan |
| Xarita atrofidagi joylar | Overpass API ga internet orqali ulanishni talab qiladi; ishlamasa xabar ko‘rsatiladi |
| Universitet to‘lovi, talablari, muddatlari | Seed’da tasdiqlanmagan — “Ma’lumot mavjud emas”; admin manba bilan kiritadi |
| Email / SMS / push bildirishnomalar | Ulanmagan (faqat ilova ichida) |
| Ingliz va rus tillari | Arxitektura tayyor (`i18n/`), tarjimalar qo‘shilmagan |

## 8. Ma’lum cheklovlar

- Asosiy dars mazmuni (bo‘limlar, misollar) seed fayllarida saqlanadi; admin panelda sarlavha, qiyinlik, nashr holati va testlar tahrirlanadi.
- Grantlar va universitet muddatlari ro‘yxatini admin paneldan to‘liq tahrirlash hali yo‘q (to‘lov va talablar tahrirlanadi).
- O‘qish vaqti dars sahifasidagi faol vaqt bo‘yicha taxminiy hisoblanadi.
