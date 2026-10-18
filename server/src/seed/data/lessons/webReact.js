import { single, multiple, tf, short } from './helpers.js';

export default [
  {
    slug: 'react-components',
    topic: 'react',
    title: 'React komponentlari',
    summary: 'Interfeysni mustaqil, qayta ishlatiladigan bo‘laklarga ajratish: funksional komponentlar va JSX.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 1,
    objectives: ['Komponent nima ekanini tushuntirish', 'JSX qoidalarini bilish', 'Komponentlarni birlashtirib sahifa yaratish'],
    definitions: [
      { term: 'React', meaning: 'Foydalanuvchi interfeysini komponentlar orqali qurish uchun JavaScript kutubxonasi.' },
      { term: 'Komponent', meaning: 'Interfeysning mustaqil, qayta ishlatiladigan bo‘lagi; JSX qaytaruvchi funksiya.' },
      { term: 'JSX', meaning: 'JavaScript ichida HTMLga o‘xshash belgilash yozish sintaksisi.' }
    ],
    sections: [
      { heading: 'Nega komponentlar?', body: 'Katta sahifani kichik bo‘laklarga bo‘lamiz: Navbar, Kartochka, Tugma, Footer. Har bir bo‘lak o‘z vazifasini bajaradi va boshqa joylarda qayta ishlatiladi. Bu LEGO bilan qurishga o‘xshaydi.' },
      { heading: 'Funksional komponent', body: 'Komponent nomi katta harf bilan boshlanadi va JSX qaytaradi.', code: 'function Salomlash() {\n  return <h1>Salom, DevForge!</h1>;\n}\n\nexport default function App() {\n  return (\n    <main>\n      <Salomlash />\n      <p>Birinchi React ilovam</p>\n    </main>\n  );\n}' },
      { heading: 'JSX qoidalari', body: '- Komponent bitta ota element qaytaradi (yoki `<>…</>` fragment).\n- `class` o‘rniga `className`.\n- JavaScript ifodalari `{}` ichida: `<p>{2 + 2}</p>`.\n- Barcha teglar yopilishi kerak: `<img />`.' }
    ],
    examples: [
      { title: 'Kartochka komponenti', steps: ['KursKartochka komponentini yaratamiz.', 'App ichida uch marta ishlatamiz.'], code: 'function KursKartochka() {\n  return (\n    <article className="karta">\n      <h3>HTML asoslari</h3>\n      <p>25 daqiqa</p>\n    </article>\n  );\n}\n\nfunction App() {\n  return (\n    <section className="tor">\n      <KursKartochka />\n      <KursKartochka />\n      <KursKartochka />\n    </section>\n  );\n}' }
    ],
    exercises: [
      { prompt: 'Footer komponentini yarating: unda joriy yil va sayt nomi bo‘lsin.', hint: '{new Date().getFullYear()}', solution: 'function Footer() { return <footer>© {new Date().getFullYear()} DevForge</footer>; }' },
      { prompt: 'Nima uchun <div class="karta"> JSXda xato hisoblanadi?', hint: 'class JavaScriptda band so‘z.', solution: 'JSXda className ishlatiladi: <div className="karta">.' }
    ],
    summaryPoints: ['Komponent — JSX qaytaruvchi funksiya.', 'Nomi katta harf bilan boshlanadi.', 'className, {} ifodalar, yopiq teglar.', 'Kichik komponentlardan katta sahifa quriladi.'],
    tutor: {
      simple: 'Komponent — o‘zingiz yaratgan yangi HTML tegi. <KursKartochka /> deb yozsangiz, React uning ichidagi butun kartochkani chizadi.',
      analogies: ['Komponentlar — LEGO bloklari. Har bir blok o‘zi alohida narsa, lekin ularni birlashtirib uy, mashina yoki kosmik kema qurasiz. Bitta blok buzilsa, faqat uni almashtirasiz.', 'Komponentni pechenye qolipiga o‘xshating: qolip (komponent) bir marta yasaladi, undan istalgancha bir xil pechenye (interfeys bo‘lagi) chiqarish mumkin.'],
      extraExamples: ['Avatar komponenti: function Avatar() { return <img className="avatar" src="/men.png" alt="Profil rasmi" />; } — profil sahifasida, izohlarda va menyuda qayta ishlatiladi.', 'Ichma-ich komponentlar: <Sahifa> ichida <Navbar />, <Kontent />, <Footer />.'],
      steps: ['Sahifa dizaynini to‘rtburchak bloklarga ajrating.', 'Har bir blokka nom bering (katta harf bilan).', 'Har biri uchun JSX qaytaruvchi funksiya yozing.', 'Ularni App komponentida birlashtiring.'],
      hints: ['Komponentingiz ko‘rinmayaptimi? Nomi katta harf bilan boshlanganini tekshiring.', '“Adjacent JSX elements” xatosi? Bir nechta elementni bitta ota yoki <>…</> ichiga o‘rang.'],
      practice: ['O‘zingizning portfolio sahifangizni 4 ta komponentga bo‘lib yarating: Header, Haqimda, Loyihalar, Footer.', 'Tugma komponentini yarating va uni sahifada 3 joyda ishlating.'],
      checks: [
        { question: 'React komponenti nomi qanday harf bilan boshlanishi kerak va nima uchun?', answer: 'Katta harf bilan, chunki React kichik harfli teglarni oddiy HTML teglari deb hisoblaydi.' },
        { question: 'JSXda CSS class qanday yoziladi?', answer: 'className atributi bilan.' }
      ]
    },
    quiz: [
      single('JSXda CSS class qaysi atribut bilan beriladi?', ['class', 'className', 'cssClass', 'style'], 'className', 'class JavaScriptda band so‘z, shuning uchun className.', 'JSX className ishlatadi.', 'JSX'),
      single('Quyidagilardan qaysi biri to‘g‘ri komponent nomi?', ['kursKarta', 'kurs_karta', 'KursKarta', 'kurs-karta'], 'KursKarta', 'Komponent nomi katta harf bilan boshlanadi.', 'Kichik harf bilan boshlangan nom HTML tegi deb qabul qilinadi.', 'Komponent'),
      tf('JSXda JavaScript ifodalari jingalak qavslar {} ichida yoziladi.', true, '<p>{ism}</p> kabi.', 'Ifodalarni JSXga qo‘yish uchun {} ishlatiladi.', 'JSX'),
      single('Komponent bir nechta element qaytarishi uchun ularni nimaga o‘rash kerak?', ['Massivga', 'Fragment <>…</> yoki bitta ota elementga', 'Stringga', 'Hech nimaga'], 'Fragment <>…</> yoki bitta ota elementga', 'Komponent bitta ildiz element qaytaradi.', 'Bir nechta yonma-yon element bitta ota ichida bo‘lishi kerak.', 'JSX'),
      single('React nima?', ['Ma’lumotlar bazasi', 'Interfeys qurish uchun JavaScript kutubxonasi', 'CSS freymvorki', 'Operatsion tizim'], 'Interfeys qurish uchun JavaScript kutubxonasi', 'React UI kutubxonasi.', 'React foydalanuvchi interfeysini komponentlar orqali quradi.', 'React')
    ]
  },
  {
    slug: 'react-props-state',
    topic: 'react',
    title: 'Props va state',
    summary: 'Komponentlarga ma’lumot uzatish (props) va komponent ichidagi o‘zgaruvchan holat (state) — React’ning yuragi.',
    difficulty: 'intermediate',
    durationMinutes: 35,
    order: 2,
    objectives: ['Props orqali ma’lumot uzatish', 'useState bilan holat yaratish va yangilash', 'Props va state farqini tushuntirish'],
    definitions: [
      { term: 'Props', meaning: 'Ota komponentdan bola komponentga uzatiladigan, faqat o‘qiladigan ma’lumotlar.' },
      { term: 'State', meaning: 'Komponentning o‘zi boshqaradigan, vaqt o‘tishi bilan o‘zgaradigan ma’lumoti.' },
      { term: 'Qayta chizish (re-render)', meaning: 'State yoki props o‘zgarganda React komponentni yangilashi.' }
    ],
    sections: [
      { heading: 'Props — sozlamalar', body: 'Props komponentni turli ma’lumot bilan qayta ishlatish imkonini beradi.', code: 'function KursKarta({ nomi, daqiqa }) {\n  return (\n    <article className="karta">\n      <h3>{nomi}</h3>\n      <p>{daqiqa} daqiqa</p>\n    </article>\n  );\n}\n\n<KursKarta nomi="CSS Grid" daqiqa={30} />' },
      { heading: 'State — xotira', body: '`useState` hooki holat va uni yangilovchi funksiyani qaytaradi. State faqat setter orqali o‘zgartiriladi — shunda React sahifani yangilaydi.', code: 'import { useState } from "react";\n\nfunction Hisoblagich() {\n  const [son, setSon] = useState(0);\n  return (\n    <button onClick={() => setSon(son + 1)}>\n      Bosildi: {son}\n    </button>\n  );\n}' },
      { heading: 'Muhim farq', body: '- **Props** — tashqaridan keladi, komponent ularni o‘zgartirmaydi.\n- **State** — ichkarida yashaydi, komponent o‘zi o‘zgartiradi.\n\nMa’lumot yuqoridan pastga oqadi: ota state’ni props sifatida bolaga uzatadi.' }
    ],
    examples: [
      { title: 'Sevimlilarga qo‘shish tugmasi', steps: ['saqlangan nomli boolean state yaratamiz.', 'Tugma bosilganda qiymatni teskarisiga o‘zgartiramiz.', 'Matnni state’ga qarab ko‘rsatamiz.'], code: 'function SaqlashTugmasi() {\n  const [saqlangan, setSaqlangan] = useState(false);\n  return (\n    <button onClick={() => setSaqlangan(!saqlangan)}>\n      {saqlangan ? "Saqlangan" : "Saqlash"}\n    </button>\n  );\n}' }
    ],
    exercises: [
      { prompt: 'Salom komponentini yarating: u ism propini olib, “Salom, {ism}!” deb chiqarsin.', hint: 'function Salom({ ism })', solution: 'function Salom({ ism }) { return <p>Salom, {ism}!</p>; }' },
      { prompt: 'Input’ga yozilgan matnni pastda jonli ko‘rsatadigan komponent yozing.', hint: 'value va onChange ishlating.', solution: 'const [matn, setMatn] = useState(""); <input value={matn} onChange={(e) => setMatn(e.target.value)} /><p>{matn}</p>' }
    ],
    summaryPoints: ['Props — tashqaridan, faqat o‘qish uchun.', 'State — ichkarida, setter orqali o‘zgaradi.', 'State o‘zgarsa, komponent qayta chiziladi.', 'Ma’lumot yuqoridan pastga oqadi.'],
    tutor: {
      simple: 'Props — komponentga berilgan buyurtma varaqasi (“nomi: CSS, vaqt: 30”). State — komponentning cho‘ntak daftari: u yerga o‘zi yozadi va o‘chiradi, masalan “tugma necha marta bosildi”.',
      analogies: ['Props — ota-ona farzandiga bergan ism va tug‘ilgan sana: farzand ularni o‘zi o‘zgartirmaydi. State — farzandning kayfiyati: kun davomida o‘zi o‘zgarib turadi.', 'Televizor: kanal raqami pultdan keladi (props), ovoz balandligi esa televizorning o‘zida saqlanadi va tugmalar bilan o‘zgaradi (state).'],
      extraExamples: ['Tablar: const [faol, setFaol] = useState("darslar"); — qaysi tab bosilsa, faol o‘zgaradi va mos kontent ko‘rinadi.', 'Ota–bola: <Royxat elementlar={vazifalar} /> — ota state’dagi vazifalarni bolaga props sifatida beradi.'],
      steps: ['Ma’lumot qayerdan keladi — tashqaridanmi (props) yoki komponent o‘zi o‘zgartiradimi (state)?', 'Props uchun: funksiya parametrida destrukturizatsiya qiling ({ nomi }).', 'State uchun: const [qiymat, setQiymat] = useState(boshlang‘ich).', 'Hodisada setQiymat(yangi) ni chaqiring.', 'JSXda {qiymat} ni ko‘rsating.'],
      hints: ['State’ni to‘g‘ridan-to‘g‘ri son = son + 1 deb o‘zgartiryapsizmi? Faqat setSon orqali o‘zgartiring.', 'Prop undefined chiqyaptimi? Ota komponentda prop nomi to‘g‘ri yozilganini tekshiring.'],
      practice: ['“Like” tugmasi yarating: bosilganda son oshsin va tugma rangi o‘zgarsin.', 'Mahsulot kartochkasi yarating: nomi va narxi props orqali, “savatdagi soni” esa state orqali boshqarilsin.'],
      checks: [
        { question: 'Props va state o‘rtasidagi asosiy farq nima?', answer: 'Props ota komponentdan keladi va o‘qish uchun, state esa komponentning o‘zida saqlanadi va setter orqali o‘zgaradi.' },
        { question: 'State yangilanganda nima bo‘ladi?', answer: 'React komponentni qayta chizadi (re-render) va sahifa yangi qiymatni ko‘rsatadi.' }
      ]
    },
    quiz: [
      single('useState(0) nimani qaytaradi?', ['Faqat 0', '[qiymat, setter] massivini', 'Obyekt', 'Funksiya'], '[qiymat, setter] massivini', 'Joriy qiymat va uni yangilovchi funksiya.', 'useState juftlik qaytaradi: [son, setSon].', 'useState'),
      tf('Bola komponent props qiymatlarini o‘zi o‘zgartirishi kerak.', false, 'Props faqat o‘qish uchun.', 'Props’ni o‘zgartirish o‘rniga ota komponentdagi state yangilanadi.', 'Props'),
      single('State’ni to‘g‘ri yangilash usuli?', ['son = son + 1', 'setSon(son + 1)', 'this.son++', 'useState(son + 1)'], 'setSon(son + 1)', 'Setter funksiya React’ga o‘zgarish haqida xabar beradi.', 'To‘g‘ridan-to‘g‘ri tayinlash qayta chizishni chaqirmaydi.', 'useState'),
      single('<Karta nomi="CSS" /> — bu yerda nomi nima?', ['State', 'Prop', 'Hook', 'Hodisa'], 'Prop', 'Komponentga uzatilgan atribut — prop.', 'Ota komponent uzatgan qiymatlar props deyiladi.', 'Props'),
      single('React’da ma’lumot asosan qaysi yo‘nalishda oqadi?', ['Pastdan yuqoriga', 'Yuqoridan pastga (otadan bolaga)', 'Tasodifiy', 'Faqat global'], 'Yuqoridan pastga (otadan bolaga)', 'Bir yo‘nalishli ma’lumot oqimi.', 'Ota state’ni props sifatida bolaga beradi.', 'Ma’lumot oqimi')
    ]
  },
  {
    slug: 'react-hooks',
    topic: 'react',
    title: 'React hooklari: useEffect va boshqalar',
    summary: 'Yon effektlar (ma’lumot yuklash, taymer, sarlavhani o‘zgartirish) uchun useEffect va hooklar qoidalari.',
    difficulty: 'advanced',
    durationMinutes: 35,
    order: 3,
    objectives: ['useEffect qachon ishlashini bilish', 'Bog‘liqliklar massivini to‘g‘ri yozish', 'Tozalash funksiyasidan foydalanish', 'Hooklar qoidalarini bilish'],
    definitions: [
      { term: 'Hook', meaning: 'Funksional komponentlarga React imkoniyatlarini qo‘shuvchi maxsus funksiya; nomi use bilan boshlanadi.' },
      { term: 'Yon effekt', meaning: 'Chizishdan tashqari ish: server so‘rovi, taymer, brauzer API’si.' },
      { term: 'Bog‘liqliklar massivi', meaning: 'useEffect qachon qayta ishlashini belgilovchi qiymatlar ro‘yxati.' }
    ],
    sections: [
      { heading: 'useEffect asoslari', body: 'useEffect komponent chizilgandan keyin ishlaydi. Ikkinchi argument — bog‘liqliklar.\n\n- `[]` — faqat bir marta, birinchi chizishdan keyin.\n- `[id]` — id o‘zgarganda.\n- Argumentsiz — har bir chizishdan keyin (kamdan-kam kerak).', code: 'useEffect(() => {\n  document.title = `Darslar (${soni})`;\n}, [soni]);' },
      { heading: 'Tozalash', body: 'Taymer yoki obunani komponent yo‘qolganda to‘xtatish kerak. Buning uchun effekt funksiya qaytaradi.', code: 'useEffect(() => {\n  const id = setInterval(() => setSoniya((s) => s + 1), 1000);\n  return () => clearInterval(id);\n}, []);' },
      { heading: 'Hooklar qoidalari', body: '1. Hooklarni faqat komponent yoki boshqa hookning yuqori darajasida chaqiring — sikl, shart yoki ichki funksiya ichida emas.\n2. Hooklarni faqat React funksiyalarida chaqiring.\n\nBoshqa foydali hooklar: `useRef` (DOMga havola yoki qayta chizishsiz qiymat), `useMemo` (og‘ir hisobni eslab qolish), `useContext` (global ma’lumot).' }
    ],
    examples: [
      { title: 'Sahifa ochilganda ma’lumot yuklash', steps: ['loading, xato va ma’lumot uchun state yaratamiz.', 'useEffect ichida async funksiyani chaqiramiz.', 'Natijaga qarab holatlarni yangilaymiz.'], code: 'const [kurslar, setKurslar] = useState([]);\nconst [loading, setLoading] = useState(true);\n\nuseEffect(() => {\n  async function yukla() {\n    try {\n      const r = await fetch("/api/kurslar");\n      setKurslar(await r.json());\n    } finally {\n      setLoading(false);\n    }\n  }\n  yukla();\n}, []);' }
    ],
    exercises: [
      { prompt: 'Har soniyada vaqtni yangilaydigan Soat komponentini yozing va taymerni tozalashni unutmang.', hint: 'setInterval + return () => clearInterval(id)', solution: 'useEffect(() => { const id = setInterval(() => setVaqt(new Date()), 1000); return () => clearInterval(id); }, []);' },
      { prompt: 'Nima uchun hookni if ichida chaqirish mumkin emas?', hint: 'React hooklarni chaqiruv tartibi bo‘yicha taniydi.', solution: 'React har bir chizishda hooklar bir xil tartibda chaqirilishiga tayanadi; shart ichida bo‘lsa, tartib buziladi.' }
    ],
    summaryPoints: ['useEffect — yon effektlar uchun.', '[] — bir marta, [x] — x o‘zgarganda.', 'Taymer va obunalarni tozalang.', 'Hooklar faqat yuqori darajada chaqiriladi.'],
    tutor: {
      simple: 'useEffect — “chizib bo‘lgandan keyin buni ham qil” degan eslatma. Masalan, sahifa ochilgach, serverdan darslarni olib kel.',
      analogies: ['useEffect — uyga kirgandagi odatlar: chiroqni yoqish (effekt) va chiqib ketayotganda o‘chirish (tozalash). Bog‘liqliklar massivi esa “qachon qayta qilish kerak”: [] — faqat birinchi kirganda, [mehmon] — har safar yangi mehmon kelganda.', 'Bog‘liqliklar massivini signal tizimiga o‘xshating: siz qaysi eshiklarga datchik o‘rnatsangiz (bog‘liqliklar), faqat o‘sha eshik ochilganda signal (effekt) chalinadi.'],
      extraExamples: ['Qidiruv: useEffect(() => { const t = setTimeout(() => qidir(soz), 400); return () => clearTimeout(t); }, [soz]); — foydalanuvchi yozishni to‘xtatgach qidiradi (debounce).', 'useRef bilan fokus: const ref = useRef(); useEffect(() => ref.current.focus(), []); <input ref={ref} />.'],
      steps: ['Effekt nima qilishi kerakligini aniqlang.', 'U qaysi qiymatlarga bog‘liq — ro‘yxat qiling.', 'useEffect(() => { … }, [bog‘liqliklar]) yozing.', 'Taymer, obuna yoki tinglovchi bo‘lsa, tozalash funksiyasini qaytaring.', 'Konsolda effekt necha marta ishlayotganini tekshiring.'],
      hints: ['Effekt cheksiz takrorlanyaptimi? Effekt ichida yangilanadigan state bog‘liqliklarda emasmi yoki massiv umuman berilmaganmi?', 'Komponent yopilgandan keyin ham taymer ishlayaptimi? Tozalash funksiyasini qo‘shing.'],
      practice: ['Pomodoro taymer yarating: 25 daqiqa ortga sanaydi, tugaganda xabar chiqaradi va komponent yopilsa taymer to‘xtaydi.', 'Tanlangan kurs id’si o‘zgarganda uning ma’lumotlarini qayta yuklaydigan komponent yozing.'],
      checks: [
        { question: 'useEffect(fn, []) qachon ishlaydi?', answer: 'Faqat bir marta — komponent birinchi marta chizilgandan keyin.' },
        { question: 'useEffect’dan qaytarilgan funksiya nima uchun kerak?', answer: 'Tozalash uchun: taymer, obuna yoki tinglovchini komponent yo‘qolganda yoki effekt qayta ishlashidan oldin to‘xtatadi.' }
      ]
    },
    quiz: [
      single('useEffect(() => {...}, []) qachon ishlaydi?', ['Har bir chizishda', 'Faqat birinchi chizishdan keyin', 'Hech qachon', 'Har soniyada'], 'Faqat birinchi chizishdan keyin', 'Bo‘sh massiv — bog‘liqlik yo‘q, bir marta.', 'Bo‘sh bog‘liqliklar massivi effektni bir marta ishlatadi.', 'Bog‘liqliklar'),
      tf('Hooklarni if sharti ichida chaqirish mumkin.', false, 'Hooklar har doim bir xil tartibda, yuqori darajada chaqirilishi kerak.', 'Shart ichidagi hook chaqiruv tartibini buzadi.', 'Hooklar qoidalari'),
      single('setInterval ni tozalash uchun useEffect qanday yoziladi?', ['return clearInterval', 'return () => clearInterval(id)', 'clearInterval() effekt boshida', 'Tozalash shart emas'], 'return () => clearInterval(id)', 'Effekt tozalash funksiyasini qaytaradi.', 'Tozalash funksiya sifatida qaytarilishi kerak.', 'Tozalash'),
      single('Quyidagilardan qaysi biri yon effekt?', ['JSX qaytarish', 'Server so‘rovi yuborish', 'Props o‘qish', 'O‘zgaruvchi e’lon qilish'], 'Server so‘rovi yuborish', 'Chizishdan tashqaridagi ish — yon effekt.', 'Server so‘rovi, taymer, document.title — yon effektlar.', 'Yon effekt'),
      single('Hook nomi qanday boshlanadi?', ['get', 'use', 'hook', 'on'], 'use', 'useState, useEffect, useRef…', 'Barcha hooklar use bilan boshlanadi.', 'Hook')
    ]
  },
  {
    slug: 'react-routing',
    topic: 'react',
    title: 'React’da marshrutlash',
    summary: 'Bir sahifali ilovada (SPA) bir nechta sahifa: React Router bilan marshrutlar, havolalar va URL parametrlari.',
    difficulty: 'advanced',
    durationMinutes: 30,
    order: 4,
    objectives: ['SPA tushunchasini izohlash', 'Routes va Route bilan marshrut yaratish', 'Link va useParams dan foydalanish'],
    definitions: [
      { term: 'SPA', meaning: 'Single Page Application — sahifani to‘liq qayta yuklamasdan kontentni almashtiruvchi ilova.' },
      { term: 'Marshrut (route)', meaning: 'URL manzili va unga mos komponent juftligi.' },
      { term: 'URL parametri', meaning: 'Manzildagi o‘zgaruvchan qism, masalan /darslar/:slug.' }
    ],
    sections: [
      { heading: 'Nega marshrutlash?', body: 'Foydalanuvchi /darslar, /profil kabi manzillarga o‘tishi, “Orqaga” tugmasidan foydalanishi va havolani ulashishi kerak. React Router URL’ga qarab kerakli komponentni ko‘rsatadi — sahifa qayta yuklanmaydi.' },
      { heading: 'Asosiy tuzilma', body: 'Ilova BrowserRouter ichiga o‘raladi, marshrutlar Routes ichida beriladi.', code: 'import { BrowserRouter, Routes, Route, Link } from "react-router-dom";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to="/">Bosh sahifa</Link>\n        <Link to="/darslar">Darslar</Link>\n      </nav>\n      <Routes>\n        <Route path="/" element={<Bosh />} />\n        <Route path="/darslar" element={<Darslar />} />\n        <Route path="/darslar/:slug" element={<Dars />} />\n        <Route path="*" element={<Topilmadi />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}' },
      { heading: 'Parametrlar va dasturiy o‘tish', body: '`useParams()` URL parametrlarini beradi, `useNavigate()` kod orqali boshqa sahifaga o‘tkazadi.', code: 'function Dars() {\n  const { slug } = useParams();\n  const navigate = useNavigate();\n  return (\n    <>\n      <h1>Dars: {slug}</h1>\n      <button onClick={() => navigate("/darslar")}>Ro‘yxatga qaytish</button>\n    </>\n  );\n}' }
    ],
    examples: [
      { title: 'Himoyalangan sahifa', steps: ['Foydalanuvchi tizimga kirmagan bo‘lsa, /kirish sahifasiga yo‘naltiramiz.', 'Navigate komponentidan foydalanamiz.'], code: 'function Himoya({ children }) {\n  const { user } = useAuth();\n  return user ? children : <Navigate to="/kirish" replace />;\n}' }
    ],
    exercises: [
      { prompt: '/universitetlar/:slug marshruti uchun komponentda slug ni qanday olasiz?', hint: 'useParams hooki.', solution: 'const { slug } = useParams();' },
      { prompt: 'Nima uchun SPA ichidagi havolalar uchun <a href> o‘rniga <Link> ishlatiladi?', hint: 'Sahifa qayta yuklanishini o‘ylang.', solution: '<Link> sahifani qayta yuklamasdan marshrutni almashtiradi, state saqlanadi va tezroq ishlaydi.' }
    ],
    summaryPoints: ['SPA sahifani qayta yuklamaydi.', 'Routes va Route marshrutlarni belgilaydi.', 'Link — ichki havolalar uchun.', 'useParams va useNavigate — parametr va dasturiy o‘tish.', 'path="*" — 404 sahifasi.'],
    tutor: {
      simple: 'Marshrutlash — ilova ichidagi “eshiklar”. Manzil satrida /darslar yozilsa — darslar xonasi ochiladi, /profil — profil xonasi. Uy (sahifa) qayta qurilmaydi, faqat xona almashadi.',
      analogies: ['React Routerni bino qabulxonasiga o‘xshating: siz xona raqamini aytasiz (URL), qabulxona sizni kerakli xonaga (komponent) yo‘naltiradi. Bunday xona bo‘lmasa — “Topilmadi” (404) xonasiga.', 'URL parametri — mehmonxona kalitidagi xona raqami: /xona/:raqam marshruti bitta, lekin raqam har xil bo‘lishi mumkin — 101, 205, 310.'],
      extraExamples: ['Ichki marshrutlar: /app ichida /app/darslar va /app/profil — umumiy yon panel bir marta chiziladi, ichidagi kontent almashadi (Outlet orqali).', 'Faol havola: <NavLink to="/darslar" className={({ isActive }) => isActive ? "faol" : ""}> — joriy sahifa menyuda ajralib turadi.'],
      steps: ['react-router-dom ni o‘rnating.', 'App’ni BrowserRouter bilan o‘rang.', 'Routes ichida har bir sahifa uchun Route yozing.', 'Navigatsiya uchun Link ishlating.', 'Dinamik sahifada useParams bilan parametrni oling.', 'path="*" bilan 404 sahifasini qo‘shing.'],
      hints: ['Havola bosilganda sahifa to‘liq yangilanyaptimi? <a> o‘rniga <Link> ishlating.', 'useParams undefined qaytaryaptimi? Route path ichidagi parametr nomi (:slug) bilan bir xilmi?'],
      practice: ['3 sahifali mini-ilova yarating: Bosh sahifa, Kasblar ro‘yxati va /kasblar/:slug batafsil sahifasi.', '404 sahifasini yarating va unda bosh sahifaga qaytish havolasini qo‘ying.'],
      checks: [
        { question: 'SPA’da <Link> va <a href> farqi nima?', answer: '<Link> sahifani qayta yuklamasdan marshrutni o‘zgartiradi, <a href> esa butun sahifani serverdan qayta yuklaydi.' },
        { question: 'URL’dagi :id parametrini komponentda qanday olasiz?', answer: 'useParams() hooki orqali: const { id } = useParams().' }
      ]
    },
    quiz: [
      single('URL parametrlarini olish uchun qaysi hook?', ['useState', 'useParams', 'useRoute', 'useUrl'], 'useParams', 'useParams parametrlar obyektini qaytaradi.', 'React Router’da parametrlar useParams orqali olinadi.', 'useParams'),
      single('Mavjud bo‘lmagan barcha manzillar uchun marshrut path qiymati?', ['/404', '*', 'default', '/'], '*', 'path="*" — qolgan barcha manzillar.', 'Yulduzcha hamma mos kelmagan yo‘llarni ushlaydi.', '404'),
      tf('SPA ichida Link bosilganda sahifa serverdan to‘liq qayta yuklanadi.', false, 'Link sahifani qayta yuklamaydi.', 'SPA’ning afzalligi — qayta yuklashsiz o‘tish.', 'SPA'),
      single('Kod orqali boshqa sahifaga o‘tish uchun?', ['useNavigate()', 'window.reload()', 'useHistory.go()', 'Link()'], 'useNavigate()', 'navigate("/manzil") chaqiriladi.', 'Hozirgi React Router’da useNavigate ishlatiladi.', 'Dasturiy o‘tish'),
      short('/darslar/:slug marshrutida /darslar/flexbox manzili ochildi. slug qiymati nima?', ['flexbox'], 'slug = "flexbox".', ':slug o‘rnidagi qism parametr qiymati bo‘ladi.', 'URL parametri')
    ]
  },
  {
    slug: 'react-api',
    topic: 'react',
    title: 'React’da API bilan ishlash',
    summary: 'Serverdan ma’lumot olish, yuklanish va xato holatlari, forma yuborish va xizmat qatlamini ajratish.',
    difficulty: 'advanced',
    durationMinutes: 35,
    order: 5,
    objectives: ['Ma’lumot yuklashning uch holatini boshqarish', 'API chaqiruvlarini alohida xizmat fayliga ajratish', 'Forma yuborish va server javobini to‘g‘ri ko‘rsatish'],
    definitions: [
      { term: 'Xizmat qatlami (service)', meaning: 'API chaqiruvlarini bir joyga jamlagan modul.' },
      { term: 'Yuklanish holati', meaning: 'So‘rov davom etayotganini bildiruvchi state.' },
      { term: 'Optimistik yangilash', meaning: 'Server javobini kutmasdan interfeysni yangilash va xato bo‘lsa orqaga qaytarish.' }
    ],
    sections: [
      { heading: 'Uch holat qoidasi', body: 'Har bir ma’lumot yuklashda uchta holat bo‘ladi: **yuklanmoqda**, **xato**, **ma’lumot**. Ularning har biri uchun interfeys bo‘lishi kerak: skelet yoki spinner, tushunarli xato xabari va “Qayta urinish” tugmasi, hamda bo‘sh holat (“Hali hech narsa yo‘q”).' },
      { heading: 'Xizmat fayli', body: 'API manzillari va fetch mantiqini komponentlardan ajratish kodni toza qiladi.', code: '// api/kurslar.js\nexport async function kurslarniOl() {\n  const r = await fetch("/api/kurslar");\n  if (!r.ok) throw new Error("Kurslarni yuklab bo‘lmadi");\n  return r.json();\n}' },
      { heading: 'Komponentda ishlatish', body: 'Komponent faqat holatlarni boshqaradi va chizadi.', code: 'function Kurslar() {\n  const [holat, setHolat] = useState({ loading: true, xato: null, data: [] });\n\n  useEffect(() => {\n    kurslarniOl()\n      .then((data) => setHolat({ loading: false, xato: null, data }))\n      .catch((e) => setHolat({ loading: false, xato: e.message, data: [] }));\n  }, []);\n\n  if (holat.loading) return <p>Yuklanmoqda...</p>;\n  if (holat.xato) return <p role="alert">{holat.xato}</p>;\n  if (!holat.data.length) return <p>Hozircha kurslar yo‘q</p>;\n  return <ul>{holat.data.map((k) => <li key={k.id}>{k.nomi}</li>)}</ul>;\n}' },
      { heading: 'Ro‘yxatlarda key', body: 'Massivni chizishda har bir elementga noyob `key` bering (odatda id). Indeksni key qilish elementlar tartibi o‘zgarganda xatolarga olib kelishi mumkin.' }
    ],
    examples: [
      { title: 'Forma yuborish', steps: ['Yuborish davomida tugmani o‘chiramiz.', 'Muvaffaqiyatli bo‘lsa — tasdiq xabari.', 'Xato bo‘lsa — xato xabari, muvaffaqiyat emas.'], code: 'async function yuborish(e) {\n  e.preventDefault();\n  setYuborilmoqda(true);\n  try {\n    await eslatmaQosh({ matn });\n    setXabar("Eslatma saqlandi");\n  } catch {\n    setXabar("Saqlab bo‘lmadi. Qayta urinib ko‘ring.");\n  } finally {\n    setYuborilmoqda(false);\n  }\n}' }
    ],
    exercises: [
      { prompt: 'Ma’lumot yuklovchi komponentda qaysi uch holatni ko‘rsatish kerak?', hint: 'Kutish, xato, natija.', solution: 'Yuklanish, xato va ma’lumot (shu jumladan bo‘sh ro‘yxat) holatlari.' },
      { prompt: 'Nega yuborish tugmasini so‘rov davomida disabled qilish foydali?', hint: 'Foydalanuvchi ikki marta bossa-chi?', solution: 'Takroriy so‘rovlar va dublikat yozuvlarning oldini oladi, foydalanuvchiga jarayon ketayotganini bildiradi.' }
    ],
    summaryPoints: ['Yuklanish, xato, ma’lumot va bo‘sh holatlar.', 'API kodini xizmat fayliga ajrating.', 'Ro‘yxatda noyob key.', 'Xato bo‘lsa, muvaffaqiyat xabarini ko‘rsatmang.'],
    tutor: {
      simple: 'API bilan ishlash — do‘stingizga xabar yuborib, javobini kutish. Kutayotganda “yozmoqda…” ko‘rinadi (yuklanish), javob kelmasa “xabar yetkazilmadi” (xato), kelsa — javobni o‘qiysiz (ma’lumot).',
      analogies: ['Xizmat faylini restoran ofitsiantiga o‘xshating: siz (komponent) oshxonaga (server) o‘zingiz kirmaysiz, ofitsiantga (service) buyurtma berasiz. Oshxona manzili o‘zgarsa, faqat ofitsiant bilishi kifoya.', 'Uch holat — taksi ilovasi: “haydovchi qidirilmoqda” (yuklanish), “haydovchi topilmadi” (xato), “haydovchi yo‘lda” (ma’lumot). Har bir holat uchun ekran bor.'],
      extraExamples: ['Qayta urinish: xato holatida <button onClick={yukla}>Qayta urinish</button> — foydalanuvchi sahifani yangilamasdan qayta yuklashi mumkin.', 'Maxsus hook: function useKurslar() { … return { data, loading, error, reload }; } — bir xil yuklash mantiqini bir nechta komponentda qayta ishlatish.'],
      steps: ['API chaqiruvini xizmat fayliga yozing va response.ok ni tekshiring.', 'Komponentda loading, xato va data state’larini yarating.', 'useEffect ichida xizmat funksiyasini chaqiring.', 'Har bir holat uchun alohida JSX qaytaring.', 'Ro‘yxatni key bilan chizing.'],
      hints: ['“Each child in a list should have a unique key” ogohlantirishi? map ichidagi elementga key={element.id} bering.', 'Xato bo‘lganda ham ekranda “Saqlandi” chiqyaptimi? Muvaffaqiyat xabarini faqat try ichida, await’dan keyin ko‘rsating.'],
      practice: ['Universitetlar ro‘yxatini API’dan yuklab, qidiruv maydoni bilan filtrlaydigan komponent yarating (yuklanish, xato va bo‘sh holatlar bilan).', 'Eslatma qo‘shish formasini yarating: yuborish davomida tugma disabled bo‘lsin va natija xabari to‘g‘ri ko‘rsatilsin.'],
      checks: [
        { question: 'Ma’lumot yuklashda qaysi holatlar uchun interfeys bo‘lishi kerak?', answer: 'Yuklanish, xato, bo‘sh natija va ma’lumot mavjud holat.' },
        { question: 'Ro‘yxat elementlariga key nima uchun kerak?', answer: 'React elementlarni samarali va to‘g‘ri yangilashi uchun har birini noyob kalit orqali taniydi.' }
      ]
    },
    quiz: [
      single('Ro‘yxat elementlari uchun eng yaxshi key?', ['Massiv indeksi', 'Math.random()', 'Elementning noyob id’si', 'Element nomi'], 'Elementning noyob id’si', 'Noyob va barqaror id eng ishonchli.', 'Indeks tartib o‘zgarganda, random esa har chizishda o‘zgaradi.', 'key'),
      tf('So‘rov xato bilan tugasa ham foydalanuvchiga “Muvaffaqiyatli saqlandi” deyish mumkin.', false, 'Bu foydalanuvchini chalg‘itadi.', 'Muvaffaqiyat xabari faqat haqiqiy muvaffaqiyatdan keyin ko‘rsatilishi kerak.', 'Halol interfeys'),
      single('API chaqiruvlarini alohida faylga ajratishning asosiy foydasi?', ['Ilova tezroq yuklanadi', 'Kod tartibli va qayta ishlatiladigan bo‘ladi', 'Internet trafigi kamayadi', 'Xatolar yo‘qoladi'], 'Kod tartibli va qayta ishlatiladigan bo‘ladi', 'Mantiq bir joyda, komponentlar sodda.', 'Asosiy foyda — tartib va qayta ishlatish.', 'Xizmat qatlami'),
      multiple('Ma’lumot yuklovchi komponentda bo‘lishi kerak bo‘lgan holatlar?', ['Yuklanish', 'Xato', 'Bo‘sh natija', 'Animatsiyali konfetti'], ['Yuklanish', 'Xato', 'Bo‘sh natija'], 'Bu holatlar foydalanuvchiga nima bo‘layotganini tushuntiradi.', 'Konfetti majburiy emas; asosiysi — yuklanish, xato va bo‘sh holat.', 'Holatlar'),
      single('Forma yuborish davomida tugmani nima qilish tavsiya etiladi?', ['Yashirish', 'Vaqtincha disabled qilish', 'Rangini qizil qilish', 'Hech narsa'], 'Vaqtincha disabled qilish', 'Takroriy yuborishning oldini oladi.', 'disabled holat dublikat so‘rovlarni to‘xtatadi.', 'Forma')
    ]
  },
  {
    slug: 'git-github',
    topic: 'git',
    title: 'Git va GitHub',
    summary: 'Kod tarixini saqlash, xatolardan qaytish va jamoada ishlash: commit, branch, push va pull request.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 1,
    objectives: ['Git va GitHub farqini tushuntirish', 'Asosiy buyruqlar: init, add, commit, push', 'Branch va pull request jarayonini bilish'],
    definitions: [
      { term: 'Git', meaning: 'Fayllar o‘zgarishi tarixini saqlovchi versiyalarni boshqarish tizimi.' },
      { term: 'GitHub', meaning: 'Git repozitoriylarini internetda saqlash va hamkorlik qilish platformasi.' },
      { term: 'Commit', meaning: 'Loyiha holatining izohli “surati”.' },
      { term: 'Branch', meaning: 'Asosiy koddan ajralgan mustaqil ish yo‘nalishi.' }
    ],
    sections: [
      { heading: 'Nega Git kerak?', body: '“sayt_oxirgi_final_2.html” kabi fayl nomlari tanishmi? Git har bir o‘zgarishni tarix sifatida saqlaydi: kim, qachon, nimani o‘zgartirgan. Xato qilsangiz, oldingi holatga qaytishingiz mumkin.' },
      { heading: 'Asosiy jarayon', body: 'O‘zgarishlar uch bosqichdan o‘tadi: ishchi papka → tayyorlash maydoni (staging) → tarix (commit).', code: 'git init                     # repozitoriy yaratish\ngit status                   # holatni ko‘rish\ngit add index.html           # faylni tayyorlash\ngit commit -m "Bosh sahifa qo‘shildi"\ngit remote add origin https://github.com/user/loyiha.git\ngit push -u origin main      # GitHub’ga yuborish' },
      { heading: 'Branch va pull request', body: 'Yangi funksiya ustida alohida branchda ishlang. Tayyor bo‘lgach, GitHub’da pull request oching — jamoa kodni ko‘rib chiqadi va asosiy branchga qo‘shadi.', code: 'git switch -c yangi-menyu\n# ... o‘zgarishlar ...\ngit commit -am "Mobil menyu qo‘shildi"\ngit push origin yangi-menyu' },
      { heading: 'Xavfsizlik', body: 'Parollar, API kalitlari va `.env` fayllarini hech qachon commit qilmang. Ularni `.gitignore` fayliga qo‘shing. Tasodifan GitHub’ga yuklangan kalitni darhol bekor qilib, yangisini oling.' }
    ],
    examples: [
      { title: 'Yaxshi commit xabari', steps: ['Qisqa va aniq: nima o‘zgardi?', 'Buyruq shaklida yozish odat tusiga kirgan.'], code: 'Yomon:  git commit -m "o‘zgarishlar"\nYaxshi: git commit -m "Kirish formasiga parol tekshiruvi qo‘shildi"' }
    ],
    exercises: [
      { prompt: 'Yangi fayl yaratdingiz. Uni GitHub’ga yuborish uchun buyruqlar ketma-ketligini yozing.', hint: 'add → commit → push', solution: 'git add fayl.js; git commit -m "..."; git push' },
      { prompt: '.env faylini Git kuzatmasligi uchun nima qilasiz?', hint: 'Maxsus fayl.', solution: '.gitignore fayliga .env qatorini qo‘shaman.' }
    ],
    summaryPoints: ['Git — tarix, GitHub — onlayn hamkorlik.', 'add → commit → push.', 'Har bir funksiya uchun alohida branch.', 'Maxfiy ma’lumotlarni commit qilmang.'],
    tutor: {
      simple: 'Git — kompyuter o‘yinidagi “saqlash nuqtalari”. Har commit — saqlash. Xato qilsangiz, oldingi saqlashga qaytasiz. GitHub — saqlashlaringizni bulutda saqlaydigan va do‘stlaringiz bilan bo‘lishadigan joy.',
      analogies: ['Branchni daraxt shoxiga o‘xshating: asosiy tana (main) mustahkam turadi, siz yangi shoxda tajriba qilasiz. Shox muvaffaqiyatli o‘ssa, uni tanaga ulaysiz (merge); bo‘lmasa, kesib tashlaysiz.', 'Staging maydoni — pochta konverti: xatga qo‘shmoqchi bo‘lgan qog‘ozlarni konvertga solasiz (git add), keyin konvertni yopib, ustiga izoh yozasiz (git commit) va pochtaga topshirasiz (git push).'],
      extraExamples: ['Oxirgi commit’dagi o‘zgarishlarni ko‘rish: git log --oneline — tarixni qisqa ro‘yxat ko‘rinishida chiqaradi.', 'Jamoadoshning o‘zgarishlarini olish: git pull — GitHub’dagi yangi commit’larni kompyuteringizga yuklab, birlashtiradi.'],
      steps: ['git status bilan nima o‘zgarganini ko‘ring.', 'git add bilan kerakli fayllarni tayyorlang.', 'git commit -m "aniq izoh" bilan saqlang.', 'git push bilan GitHub’ga yuboring.', 'Yangi funksiya uchun git switch -c nom bilan branch oching.'],
      hints: ['commit qilmoqchisiz, lekin “nothing to commit” chiqyaptimi? Avval git add qildingizmi?', 'push rad etildimi? Avval git pull bilan GitHub’dagi yangiliklarni olib keling.'],
      practice: ['GitHub’da shaxsiy repozitoriy oching va avval yaratgan HTML sahifangizni 3 ta mazmunli commit bilan yuklang.', 'Yangi branch oching, sahifaga footer qo‘shing va pull request yarating.'],
      checks: [
        { question: 'Git va GitHub farqi nima?', answer: 'Git — kompyuterda ishlaydigan versiyalarni boshqarish tizimi, GitHub — Git repozitoriylarini onlayn saqlash va hamkorlik platformasi.' },
        { question: 'Nima uchun .env faylini commit qilmaslik kerak?', answer: 'Unda parol va API kalitlari kabi maxfiy ma’lumotlar bo‘ladi; ular ochiq repozitoriyga tushsa, suiiste’mol qilinishi mumkin.' }
      ]
    },
    quiz: [
      single('O‘zgarishlarni tarixga saqlovchi buyruq?', ['git add', 'git commit', 'git push', 'git init'], 'git commit', 'commit holatni tarixga yozadi.', 'add faqat tayyorlaydi, commit saqlaydi.', 'Commit'),
      single('Mahalliy commit’larni GitHub’ga yuboruvchi buyruq?', ['git send', 'git upload', 'git push', 'git pull'], 'git push', 'push masofaviy repozitoriyga yuboradi.', 'pull aksincha — yuklab oladi.', 'Push'),
      tf('API kalitlari saqlangan .env faylini GitHub’ga yuklash xavfsiz.', false, 'Maxfiy ma’lumotlar hech qachon commit qilinmaydi.', '.env ni .gitignore ga qo‘shing.', 'Xavfsizlik'),
      single('Asosiy koddan ajralgan mustaqil ish yo‘nalishi nima deyiladi?', ['Commit', 'Branch', 'Clone', 'Remote'], 'Branch', 'Branch — alohida ish yo‘nalishi.', 'Yangi funksiyalar alohida branchda ishlab chiqiladi.', 'Branch'),
      single('To‘g‘ri tartib qaysi?', ['commit → add → push', 'add → commit → push', 'push → add → commit', 'add → push → commit'], 'add → commit → push', 'Tayyorlash, saqlash, yuborish.', 'Avval tayyorlanadi, keyin saqlanadi, oxirida yuboriladi.', 'Git jarayoni')
    ]
  },
  {
    slug: 'deploy-project',
    topic: 'loyiha',
    title: 'Loyihani yig‘ish va joylashtirish',
    summary: 'Ilovani production uchun yig‘ish, muhit o‘zgaruvchilari, statik hosting va joylashtirishdan keyingi tekshiruvlar.',
    difficulty: 'advanced',
    durationMinutes: 30,
    order: 1,
    objectives: ['Build jarayonini tushuntirish', 'Muhit o‘zgaruvchilaridan xavfsiz foydalanish', 'Joylashtirishdan oldin va keyin nimalarni tekshirishni bilish'],
    definitions: [
      { term: 'Build', meaning: 'Manba kodni brauzer uchun optimallashtirilgan fayllarga aylantirish jarayoni.' },
      { term: 'Deploy', meaning: 'Ilovani foydalanuvchilar kira oladigan serverga joylashtirish.' },
      { term: 'Muhit o‘zgaruvchisi', meaning: 'Kod tashqarisida saqlanadigan sozlama, masalan API manzili yoki maxfiy kalit.' }
    ],
    sections: [
      { heading: 'Build nima qiladi?', body: 'Vite kabi vositalar `npm run build` buyrug‘i bilan kodni siqadi, keraksiz qismlarni olib tashlaydi va `dist` papkasiga tayyor fayllarni chiqaradi. Bu fayllar tezroq yuklanadi.', code: 'npm install\nnpm run build    # dist/ papkasi yaratiladi\nnpm run preview  # production versiyani mahalliy ko‘rish' },
      { heading: 'Muhit o‘zgaruvchilari', body: 'API manzili kabi sozlamalarni `.env` faylda saqlang. Frontend kodiga qo‘yilgan har qanday qiymat brauzerda ko‘rinadi — shuning uchun maxfiy kalitlar faqat serverda bo‘lishi kerak.', code: '# .env (frontend — maxfiy emas)\nVITE_API_URL=https://api.misol.uz\n\n# server/.env (maxfiy, commit qilinmaydi)\nAI_API_KEY=...' },
      { heading: 'Hosting turlari', body: '- **Statik hosting** (frontend uchun): build natijasini yuklaysiz.\n- **Server hosting** (backend uchun): Node.js ilovasi doimiy ishlaydi.\n- **Ma’lumotlar bazasi**: alohida boshqariladigan xizmat yoki o‘z serveringiz.\n\nKo‘plab platformalar GitHub repozitoriyini ulab, har push’da avtomatik joylashtiradi.' },
      { heading: 'Joylashtirishdan keyingi tekshiruv', body: '1. Sahifa ochiladimi, konsolda xato yo‘qmi?\n2. Barcha havolalar ishlaydimi, sahifani yangilaganda 404 chiqmaydimi (SPA uchun barcha yo‘llar index.html ga yo‘naltirilishi kerak)?\n3. Telefonda to‘g‘ri ko‘rinadimi?\n4. HTTPS yoqilganmi?\n5. Kirish, ro‘yxatdan o‘tish va asosiy funksiyalar ishlaydimi?' }
    ],
    examples: [
      { title: 'Joylashtirishga tayyorgarlik ro‘yxati', steps: ['npm run build xatosiz tugaydi.', '.env.example faylida kerakli o‘zgaruvchilar ro‘yxati bor (haqiqiy qiymatlarsiz).', 'README’da o‘rnatish va ishga tushirish buyruqlari yozilgan.', 'Production’da test ma’lumotlari va debug rejimi o‘chirilgan.'], result: 'Loyiha boshqa odam ham ishga tushira oladigan holatda.' }
    ],
    exercises: [
      { prompt: 'Nima uchun AI API kalitini frontend .env fayliga qo‘yish xavfli?', hint: 'Build natijasi brauzerga yuboriladi.', solution: 'Frontend kodidagi barcha qiymatlar brauzerda ko‘rinadi; kalitni har kim ko‘chirib olishi mumkin. Kalit faqat serverda saqlanadi.' },
      { prompt: 'SPA joylashtirilgandan keyin /darslar sahifasini yangilaganda 404 chiqdi. Sababi va yechimi?', hint: 'Server bunday fayl topmaydi.', solution: 'Server /darslar faylini qidiradi; barcha yo‘llarni index.html ga yo‘naltiruvchi (fallback) sozlama kerak.' }
    ],
    summaryPoints: ['npm run build — production fayllari.', 'Maxfiy kalitlar faqat serverda.', 'SPA uchun index.html fallback.', 'Joylashtirgandan keyin asosiy oqimlarni tekshiring.'],
    tutor: {
      simple: 'Deploy — uyda pishirgan taomingizni restoranga olib chiqish. Build — taomni chiroyli qadoqlash, deploy — uni hamma ko‘radigan vitringa qo‘yish.',
      analogies: ['Build’ni kitob nashriga o‘xshating: qo‘lyozma (manba kod) izohlar va qoralamalarga to‘la, nashriyot uni tahrirlab, ixcham kitob (dist) chiqaradi. O‘quvchiga qo‘lyozma emas, kitob kerak.', 'Muhit o‘zgaruvchilari — uy kalitlari. Ularni eshik oldidagi gilam ostiga (frontend kodi) qo‘ymaysiz, ishonchli seyfda (server .env) saqlaysiz.'],
      extraExamples: ['Avtomatik joylashtirish: GitHub’ga push qilasiz → platforma npm run build ni ishga tushiradi → dist papkasi yangilanadi. Xato bo‘lsa, eski versiya ishlashda davom etadi.', 'Sog‘liq tekshiruvi: backend’da /api/health manzili server va ma’lumotlar bazasi holatini qaytaradi — monitoring vositalari uni muntazam tekshiradi.'],
      steps: ['Loyihani mahalliy build qilib, preview’da tekshiring.', 'Kerakli muhit o‘zgaruvchilarini hosting sozlamalariga qo‘shing.', 'Repozitoriyni hosting platformasiga ulang yoki dist ni yuklang.', 'SPA bo‘lsa, index.html fallback’ni sozlang.', 'Jonli saytda asosiy funksiyalarni tekshiring.'],
      hints: ['Build’dan keyin oq sahifa ko‘ryapsizmi? Brauzer konsolini oching — ko‘pincha fayl yo‘li yoki muhit o‘zgaruvchisi xatosi bo‘ladi.', 'Frontend backend’ga ulanmayaptimi? API manzili va CORS sozlamalarini tekshiring.'],
      practice: ['O‘zingizning portfolio sahifangizni bepul statik hosting xizmatiga joylashtiring va havolasini do‘stingiz bilan ulashing.', 'Loyihangiz uchun README yozing: nima qiladi, qanday o‘rnatiladi, qanday ishga tushiriladi.'],
      checks: [
        { question: 'npm run build buyrug‘i nima qiladi?', answer: 'Manba kodni production uchun optimallashtirilgan, siqilgan fayllarga aylantirib, odatda dist papkasiga chiqaradi.' },
        { question: 'Maxfiy API kalitlarini qayerda saqlash kerak?', answer: 'Faqat server tomonidagi muhit o‘zgaruvchilarida; frontend kodida emas va repozitoriyda emas.' }
      ]
    },
    quiz: [
      single('Vite loyihasida production fayllarini yaratuvchi buyruq?', ['npm start', 'npm run build', 'npm install', 'npm test'], 'npm run build', 'build dist papkasini yaratadi.', 'install paketlarni o‘rnatadi, build esa production fayllarini yaratadi.', 'Build'),
      tf('Frontend kodiga qo‘yilgan maxfiy kalitni foydalanuvchilar ko‘ra olmaydi.', false, 'Frontend kodi brauzerga yuklanadi va ko‘rinadi.', 'Maxfiy kalitlar faqat serverda saqlanishi kerak.', 'Muhit o‘zgaruvchilari'),
      single('SPA’da sahifani yangilaganda 404 chiqsa, eng ehtimoliy sabab?', ['Internet sekin', 'Serverda index.html fallback sozlanmagan', 'CSS xatosi', 'Rasm katta'], 'Serverda index.html fallback sozlanmagan', 'Server barcha yo‘llarni index.html ga yo‘naltirishi kerak.', 'Server mavjud bo‘lmagan faylni qidiradi — fallback kerak.', 'SPA joylashtirish'),
      multiple('Joylashtirishdan keyin nimalarni tekshirish kerak?', ['Konsolda xatolar yo‘qligi', 'Mobil ko‘rinish', 'HTTPS', 'Ish stoli fon rasmi'], ['Konsolda xatolar yo‘qligi', 'Mobil ko‘rinish', 'HTTPS'], 'Bu tekshiruvlar sifat va xavfsizlikni ta’minlaydi.', 'Ish stoli fon rasmi saytga aloqador emas.', 'Tekshiruv'),
      single('.env.example faylida nima bo‘lishi kerak?', ['Haqiqiy parollar', 'O‘zgaruvchilar nomi va namunaviy qiymatlar', 'Butun kod', 'Hech narsa'], 'O‘zgaruvchilar nomi va namunaviy qiymatlar', 'Boshqalar qaysi sozlamalar kerakligini biladi, maxfiy ma’lumot oshkor bo‘lmaydi.', 'Haqiqiy qiymatlar hech qachon namunaviy faylga yozilmaydi.', 'Konfiguratsiya')
    ]
  }
];
