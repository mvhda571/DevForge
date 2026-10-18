import { single, multiple, tf, short } from './helpers.js';

export default [
  {
    slug: 'html-fundamentals',
    topic: 'html-asoslari',
    title: 'HTML asoslari',
    summary: 'HTML — veb-sahifaning skeleti. Teglar, atributlar va hujjat tuzilishini o‘rganib, birinchi sahifangizni yaratasiz.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 1,
    objectives: ['HTML hujjatining asosiy tuzilishini yozish', 'Sarlavha, paragraf, havola va rasm teglaridan foydalanish', 'Teg va atribut farqini tushuntirish'],
    definitions: [
      { term: 'HTML', meaning: 'HyperText Markup Language — veb-sahifa mazmuni va tuzilishini belgilash tili.' },
      { term: 'Teg', meaning: 'Burchakli qavslardagi belgi, masalan <p>; ko‘pincha ochiluvchi va yopiluvchi juft bo‘ladi.' },
      { term: 'Element', meaning: 'Ochiluvchi teg, mazmun va yopiluvchi tegdan iborat butunlik.' },
      { term: 'Atribut', meaning: 'Elementga qo‘shimcha ma’lumot beruvchi xususiyat, masalan href yoki alt.' }
    ],
    sections: [
      { heading: 'Veb-sahifa uch qatlamdan iborat', body: 'HTML — tuzilish (skelet), CSS — ko‘rinish (kiyim), JavaScript — xatti-harakat (mushaklar). Brauzer HTML faylni o‘qib, uni sahifa sifatida chizadi.' },
      { heading: 'Hujjat tuzilishi', body: 'Har bir HTML hujjat `<!DOCTYPE html>` bilan boshlanadi. `<head>` ichida sahifa haqida ma’lumot (sarlavha, kodlash), `<body>` ichida esa foydalanuvchi ko‘radigan mazmun bo‘ladi.', code: '<!DOCTYPE html>\n<html lang="uz">\n  <head>\n    <meta charset="UTF-8">\n    <title>Mening sahifam</title>\n  </head>\n  <body>\n    <h1>Salom, dunyo!</h1>\n    <p>Bu mening birinchi sahifam.</p>\n  </body>\n</html>' },
      { heading: 'Eng ko‘p ishlatiladigan teglar', body: '- `<h1>`…`<h6>` — sarlavhalar (h1 eng muhim).\n- `<p>` — paragraf.\n- `<a href="...">` — havola.\n- `<img src="..." alt="...">` — rasm (yopiluvchi tegi yo‘q).\n- `<ul>`, `<ol>`, `<li>` — ro‘yxatlar.\n\n`alt` atributi rasm ko‘rinmasa yoki ekran o‘quvchi dastur ishlatilsa, rasm mazmunini tushuntiradi.' }
    ],
    examples: [
      { title: 'Havola va rasm', steps: ['Havola uchun `<a>` tegi va `href` atributi ishlatiladi.', 'Rasm uchun `<img>` tegi, `src` (manzil) va `alt` (tavsif) atributlari kerak.'], code: '<a href="https://developer.mozilla.org">MDN hujjatlari</a>\n<img src="mushuk.jpg" alt="Deraza oldida o‘tirgan kulrang mushuk">', result: 'Bosiladigan havola va tavsifli rasm.' },
      { title: 'Ro‘yxat', steps: ['Tartibsiz ro‘yxat — `<ul>`.', 'Har bir band — `<li>`.'], code: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>' }
    ],
    exercises: [
      { prompt: 'O‘zingiz haqingizda sahifa yarating: ismingiz (h1), qisqa ma’lumot (p) va sevimli 3 ta fan ro‘yxati.', hint: '<h1>, <p>, <ul> va <li> teglari yetarli.', solution: '<h1>Ism</h1><p>…</p><ul><li>…</li><li>…</li><li>…</li></ul>' },
      { prompt: 'Nima uchun <img> tegida alt atributi muhim?', hint: 'Ko‘rish imkoniyati cheklangan foydalanuvchilarni o‘ylang.', solution: 'Rasm yuklanmasa yoki ekran o‘quvchi ishlatilsa, alt matni rasm mazmunini yetkazadi.' }
    ],
    summaryPoints: ['HTML — sahifa tuzilishi.', '<head> — ma’lumot, <body> — ko‘rinadigan mazmun.', 'Atributlar elementga qo‘shimcha ma’lumot beradi.', 'Rasmlarga har doim mazmunli alt yozing.'],
    tutor: {
      simple: 'HTML — matnga “yorliq” yopishtirish. “Bu sarlavha”, “bu paragraf”, “bu rasm” deb brauzerga aytasiz. Yorliqlar burchakli qavslarda yoziladi: <h1>Sarlavha</h1>.',
      analogies: ['HTML — uyning qurilish chizmasi: qayerda xona, eshik, deraza bo‘lishini belgilaydi. Devor rangi va mebel (CSS) keyin keladi.', 'Gazeta sahifasini o‘ylang: katta sarlavha, kichik sarlavha, matn, rasm va uning ostidagi izoh. HTML teglari aynan shu rollarni belgilaydi — <h1>, <h2>, <p>, <img> va alt.'],
      extraExamples: ['Jadval: <table><tr><td>Ism</td><td>Ball</td></tr></table> — ma’lumotni qator va ustunlarda ko‘rsatadi.', 'Telefon raqamiga havola: <a href="tel:+998901234567">Qo‘ng‘iroq qilish</a> — mobil qurilmada bosilganda qo‘ng‘iroq boshlanadi.'],
      steps: ['Bo‘sh fayl yarating va uni index.html deb saqlang.', '<!DOCTYPE html> va <html> tegini yozing.', '<head> ichiga <meta charset> va <title> qo‘shing.', '<body> ichiga mazmunni yozing.', 'Faylni brauzerda ochib natijani ko‘ring.'],
      hints: ['Har bir ochilgan tegni yopdingizmi? <p> … </p>.', 'Rasm ko‘rinmasa, src manzili fayl nomi bilan to‘liq mos kelishini tekshiring.'],
      practice: ['Sevimli taomingiz retsepti sahifasini yarating: sarlavha, rasm, ingredientlar ro‘yxati (ul) va tayyorlash qadamlari (ol).', 'Uchta foydali saytga havolalar ro‘yxatini yarating.'],
      checks: [
        { question: '<head> va <body> qismlarining farqi nima?', answer: '<head> sahifa haqida ma’lumot (sarlavha, kodlash) saqlaydi va ko‘rinmaydi, <body> esa foydalanuvchi ko‘radigan mazmunni o‘z ichiga oladi.' },
        { question: 'Havola yaratish uchun qaysi teg va atribut ishlatiladi?', answer: '<a> tegi va href atributi.' }
      ]
    },
    quiz: [
      single('Havola yaratish uchun qaysi teg ishlatiladi?', ['<link>', '<a>', '<href>', '<url>'], '<a>', '<a href="..."> havola yaratadi.', '<link> CSS ulash uchun, havola uchun <a> kerak.', 'Havola'),
      single('Foydalanuvchiga ko‘rinadigan mazmun qaysi teg ichida bo‘ladi?', ['<head>', '<title>', '<body>', '<meta>'], '<body>', 'Ko‘rinadigan mazmun <body> ichida.', '<head> ichidagi narsalar sahifada ko‘rinmaydi.', 'Hujjat tuzilishi'),
      single('Rasmning matnli tavsifi qaysi atributda yoziladi?', ['title', 'src', 'alt', 'desc'], 'alt', 'alt — muqobil matn.', 'src rasm manzili, tavsif esa alt.', 'Atribut'),
      tf('<img> tegi yopiluvchi </img> tegini talab qiladi.', false, '<img> — bo‘sh element, yopiluvchi tegi yo‘q.', '<img> ichida mazmun bo‘lmaydi, shuning uchun u yopilmaydi.', 'Teg'),
      single('Eng muhim (asosiy) sarlavha qaysi teg?', ['<h6>', '<header>', '<h1>', '<title>'], '<h1>', 'h1 — birinchi darajali sarlavha.', '<title> brauzer yorlig‘idagi nom, sahifa sarlavhasi esa <h1>.', 'Sarlavhalar')
    ]
  },
  {
    slug: 'semantic-html',
    topic: 'html-asoslari',
    title: 'Semantik HTML',
    summary: 'header, nav, main, article, footer — ma’noli teglar sahifani qidiruv tizimlari va ekran o‘quvchilar uchun tushunarli qiladi.',
    difficulty: 'beginner',
    durationMinutes: 20,
    order: 2,
    objectives: ['Semantik teglarning vazifasini tushuntirish', 'Sahifani semantik bo‘limlarga ajratish', 'Semantikaning foydalanish qulayligi (accessibility) va SEO uchun ahamiyatini bilish'],
    definitions: [
      { term: 'Semantik teg', meaning: 'Mazmunning ma’nosini bildiruvchi teg, masalan <nav> — navigatsiya.' },
      { term: 'Accessibility (qulaylik)', meaning: 'Sayt imkoniyati cheklangan foydalanuvchilar uchun ham qulay bo‘lishi.' },
      { term: 'Ekran o‘quvchi', meaning: 'Ko‘rish imkoniyati cheklanganlar uchun sahifani ovoz chiqarib o‘qiydigan dastur.' }
    ],
    sections: [
      { heading: 'div bilan muammo', body: 'Hamma narsani `<div>` bilan qurish mumkin, lekin `<div>` hech qanday ma’no bildirmaydi. Ekran o‘quvchi yoki qidiruv tizimi qayerda menyu, qayerda asosiy maqola ekanini bilolmaydi.' },
      { heading: 'Asosiy semantik teglar', body: '- `<header>` — sahifa yoki bo‘lim sarlavhasi.\n- `<nav>` — navigatsiya havolalari.\n- `<main>` — sahifaning asosiy mazmuni (bittagina).\n- `<article>` — mustaqil mazmun (maqola, post).\n- `<section>` — mavzuli bo‘lim.\n- `<aside>` — qo‘shimcha ma’lumot.\n- `<footer>` — pastki qism.', code: '<header>\n  <nav>\n    <a href="/">Bosh sahifa</a>\n    <a href="/kurslar">Kurslar</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>HTML nima?</h1>\n    <p>...</p>\n  </article>\n</main>\n<footer>© 2026 DevForge</footer>' },
      { heading: 'Nega bu muhim', body: 'Semantik HTML ekran o‘quvchilarga “asosiy mazmunga o‘tish” imkonini beradi, qidiruv tizimlariga sahifani to‘g‘ri tushunishga yordam beradi va kodni boshqa dasturchilar uchun o‘qilishi oson qiladi. Tugma uchun `<button>`, havola uchun `<a>` ishlatish ham semantikaning bir qismi.' }
    ],
    examples: [
      { title: 'Blog sahifasini semantik qilish', steps: ['Logo va menyu → <header> ichida <nav>.', 'Maqola → <main> ichida <article>.', 'Muallif haqida blok → <aside>.', 'Mualliflik huquqi → <footer>.'], result: 'Sahifa tuzilishi brauzer va yordamchi texnologiyalar uchun tushunarli.' }
    ],
    exercises: [
      { prompt: 'Maktab yangiliklari sahifasi uchun semantik tuzilma yozing (header, nav, main, 2 ta article, footer).', hint: 'Har bir yangilik — alohida <article>.', solution: '<header><nav>…</nav></header><main><article>…</article><article>…</article></main><footer>…</footer>' },
      { prompt: 'Bosilganda forma yuboradigan element uchun <div> emas, qaysi teg mos?', hint: 'Klaviatura bilan ham ishlashi kerak.', solution: '<button type="submit"> — u klaviatura va ekran o‘quvchilar bilan avtomatik ishlaydi.' }
    ],
    summaryPoints: ['Semantik teglar mazmun ma’nosini bildiradi.', '<main> sahifada bitta bo‘ladi.', 'Semantika accessibility va SEO uchun muhim.', 'Tugma — <button>, havola — <a>.'],
    tutor: {
      simple: 'Semantik HTML — har bir qutiga to‘g‘ri yozuv yopishtirish. “Menyu” qutisiga <nav>, “asosiy matn” qutisiga <main>. Shunda hamma — odamlar ham, dasturlar ham — nima qayerdaligini darhol tushunadi.',
      analogies: ['Kitobni tasavvur qiling: muqova (header), mundarija (nav), boblar (article, section), izohlar (aside) va oxirgi sahifa (footer). Semantik teglar veb-sahifaga xuddi shunday kitob tuzilishini beradi.', 'Ko‘chirish paytidagi qutilarni o‘ylang: hamma qutiga “narsalar” deb yozsangiz (div), yangi uyda nimani qayerga qo‘yishni bilmaysiz. “Oshxona”, “kitoblar” deb yozsangiz (semantik teglar), hamma narsa tez topiladi.'],
      extraExamples: ['Onlayn do‘kon: har bir mahsulot kartochkasi <article>, filtrlash paneli <aside>, kategoriyalar menyusi <nav>.', 'Forma: <label for="email">Email</label><input id="email"> — label matni input bilan bog‘lanadi va ekran o‘quvchi uni to‘g‘ri o‘qiydi.'],
      steps: ['Sahifani qog‘ozda bloklarga bo‘ling.', 'Har bir blokka rol bering: sarlavha, menyu, asosiy mazmun, yon panel, pastki qism.', 'Rollarga mos teglarni tanlang.', 'Faqat hech qaysi semantik teg mos kelmasa, <div> ishlating.'],
      hints: ['Bu blok sahifadan ajratib olinsa ham mustaqil ma’noga egami? Agar ha bo‘lsa, <article> mos kelishi mumkin.', 'Navigatsiya havolalari qaysi teg ichida bo‘lishi kerak?'],
      practice: ['Avvalgi darsda yaratgan “Men haqimda” sahifangizni semantik teglar bilan qayta tuzing.', 'Sevimli yangiliklar saytingiz bosh sahifasini qog‘ozda semantik bloklarga ajratib chizing.'],
      checks: [
        { question: '<main> tegi sahifada nechta bo‘lishi kerak va nima uchun?', answer: 'Bitta, chunki u sahifaning yagona asosiy mazmunini belgilaydi.' },
        { question: 'Semantik HTML kimlarga va qanday foyda beradi?', answer: 'Ekran o‘quvchidan foydalanuvchilarga (tuzilishni tushunish), qidiruv tizimlariga (indekslash) va dasturchilarga (kodni o‘qish osonligi).' }
      ]
    },
    quiz: [
      single('Navigatsiya havolalari uchun qaysi semantik teg mos?', ['<section>', '<nav>', '<aside>', '<menu-bar>'], '<nav>', '<nav> navigatsiya uchun mo‘ljallangan.', 'Havolalar menyusi — <nav>.', 'Semantik teglar'),
      single('Sahifaning asosiy mazmuni qaysi tegda bo‘ladi?', ['<body>', '<main>', '<div>', '<article>'], '<main>', '<main> — asosiy mazmun.', '<body> butun sahifani o‘raydi, asosiy mazmun esa <main>.', 'Semantik teglar'),
      tf('Semantik teglar ekran o‘quvchi dasturlarga sahifani tushunishda yordam beradi.', true, 'Ular mazmun rolini bildiradi.', 'Semantik teglar aynan accessibility uchun muhim.', 'Accessibility'),
      single('Mustaqil ma’noga ega blog posti uchun eng mos teg?', ['<article>', '<span>', '<aside>', '<footer>'], '<article>', 'Mustaqil mazmun — <article>.', '<aside> qo‘shimcha ma’lumot uchun.', 'Semantik teglar'),
      single('Bosiladigan amal (masalan, “Yuborish”) uchun eng to‘g‘ri element?', ['<div onclick>', '<span>', '<button>', '<p>'], '<button>', '<button> klaviatura va ekran o‘quvchilar bilan avtomatik ishlaydi.', '<div> semantik emas va klaviaturadan foydalanishni qo‘llab-quvvatlamaydi.', 'Semantika')
    ]
  },
  {
    slug: 'css-fundamentals',
    topic: 'css-maket',
    title: 'CSS asoslari',
    summary: 'Selektorlar, xususiyatlar, ranglar va box model — sahifaga ko‘rinish berishning asosiy vositalari.',
    difficulty: 'beginner',
    durationMinutes: 30,
    order: 1,
    objectives: ['CSS qoidasi tuzilishini yozish', 'Teg, class va id selektorlarini farqlash', 'Box model: content, padding, border, margin'],
    definitions: [
      { term: 'CSS', meaning: 'Cascading Style Sheets — HTML elementlarining ko‘rinishini belgilovchi til.' },
      { term: 'Selektor', meaning: 'Qoida qaysi elementlarga qo‘llanishini ko‘rsatadi, masalan .karta.' },
      { term: 'Box model', meaning: 'Har bir element to‘rtburchak quti: mazmun, ichki chegara (padding), chegara (border) va tashqi masofa (margin).' },
      { term: 'Kaskad', meaning: 'Bir nechta qoida to‘qnashganda qaysi biri ustun bo‘lishini aniqlovchi tartib.' }
    ],
    sections: [
      { heading: 'CSS qoidasi', body: 'Qoida selektor va xususiyatlar blokidan iborat.', code: 'h1 {\n  color: #1e293b;\n  font-size: 32px;\n}\n\n.karta {\n  background: white;\n  padding: 16px;\n  border-radius: 12px;\n}' },
      { heading: 'Selektorlar', body: '- **Teg:** `p { }` — barcha paragraflar.\n- **Class:** `.tugma { }` — `class="tugma"` bo‘lgan elementlar (ko‘p marta ishlatiladi).\n- **Id:** `#logo { }` — `id="logo"` bo‘lgan yagona element.\n\nAmalda ko‘pincha class selektorlari ishlatiladi.' },
      { heading: 'Box model', body: 'Har bir element — quti. Ichkaridan tashqariga: mazmun → padding (ichki bo‘shliq) → border (chegara) → margin (boshqa elementlardan masofa).\n\n`box-sizing: border-box` qo‘yilsa, width padding va border’ni ham o‘z ichiga oladi — bu hisob-kitobni osonlashtiradi.' }
    ],
    examples: [
      { title: 'Chiroyli tugma', steps: ['HTML: <button class="tugma">Boshlash</button>', 'Fon va matn rangini beramiz.', 'Ichki bo‘shliq va burchak yumaloqligini qo‘shamiz.', 'Sichqoncha ustiga kelganda rangni o‘zgartiramiz.'], code: '.tugma {\n  background: #6d28d9;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n}\n.tugma:hover {\n  background: #5b21b6;\n}' }
    ],
    exercises: [
      { prompt: '.ogohlantirish classiga sariq fon, to‘q matn rangi va 12px ichki bo‘shliq bering.', hint: 'background, color, padding xususiyatlari.', solution: '.ogohlantirish { background: #fef3c7; color: #78350f; padding: 12px; }' },
      { prompt: 'Element eni 200px, padding 20px, border 2px. box-sizing: content-box bo‘lsa, umumiy eni qancha?', hint: 'Padding va border ikkala tomonda.', solution: '200 + 2·20 + 2·2 = 244px.' }
    ],
    summaryPoints: ['CSS qoidasi = selektor + xususiyatlar.', 'Class — qayta ishlatiladigan uslub.', 'Box model: content → padding → border → margin.', 'border-box hisobni soddalashtiradi.'],
    tutor: {
      simple: 'CSS — HTMLga kiyim kiygizish. “Barcha sarlavhalar ko‘k rangda bo‘lsin”, “bu kartochka oq fonda va burchaklari yumaloq bo‘lsin” deb yozasiz.',
      analogies: ['Box modelni sovg‘a qutisiga o‘xshating: sovg‘aning o‘zi — content, uning atrofidagi yumshoq qog‘oz — padding, qutining devori — border, qutilar orasidagi masofa — margin.', 'Class selektorini maktab formasiga o‘xshatish mumkin: bir xil formadagi barcha o‘quvchilar bir xil ko‘rinadi. Id esa bitta o‘quvchining shaxsiy nishoni — u faqat bitta.'],
      extraExamples: ['Matnni markazlash: .sarlavha { text-align: center; } — sarlavhani konteyner o‘rtasiga joylaydi.', 'Shrift: body { font-family: "Inter", sans-serif; line-height: 1.6; } — butun sahifa o‘qilishi qulay bo‘ladi.'],
      steps: ['Qaysi elementni bezamoqchisiz — aniqlang.', 'Unga class bering (HTMLda).', 'CSS faylida .class selektori bilan qoida yozing.', 'Xususiyatlarni birma-bir qo‘shib, brauzerda natijani tekshiring.'],
      hints: ['Uslub qo‘llanmayaptimi? Class nomi HTML va CSSda bir xil yozilganini tekshiring (nuqta faqat CSSda).', 'Element kutilganidan kengroqmi? padding va border hisobga olinganini tekshiring.'],
      practice: ['Profil kartochkasini yarating: rasm, ism, kasb va “Bog‘lanish” tugmasi. Uni CSS bilan bezang.', 'O‘z sahifangiz uchun 3 ta rangdan iborat rang palitrasini tanlang va uni sarlavha, matn va tugmalarga qo‘llang.'],
      checks: [
        { question: 'Class va id selektorlarining farqi nima?', answer: 'Class bir nechta elementda ishlatiladi (.nom), id esa sahifada faqat bitta elementga tegishli (#nom).' },
        { question: 'Padding va margin farqi nima?', answer: 'Padding — chegaraning ichidagi bo‘shliq (mazmun bilan border orasida), margin — chegaradan tashqaridagi boshqa elementlar bilan masofa.' }
      ]
    },
    quiz: [
      single('class="karta" bo‘lgan elementlarni tanlaydigan selektor?', ['#karta', '.karta', 'karta', '*karta'], '.karta', 'Class selektori nuqta bilan boshlanadi.', '# id uchun, class uchun nuqta ishlatiladi.', 'Selektor'),
      single('Element chegarasi ichidagi bo‘shliq qaysi xususiyat?', ['margin', 'padding', 'border', 'gap'], 'padding', 'Padding — ichki bo‘shliq.', 'Margin tashqi masofa, ichki bo‘shliq esa padding.', 'Box model'),
      single('Matn rangini o‘zgartiruvchi xususiyat?', ['font-color', 'text-color', 'color', 'background'], 'color', 'color xususiyati matn rangini belgilaydi.', 'CSSda matn rangi uchun shunchaki color ishlatiladi.', 'Xususiyatlar'),
      tf('box-sizing: border-box qo‘yilganda width ichiga padding va border ham kiradi.', true, 'Bu hisob-kitobni osonlashtiradi.', 'border-box rejimida belgilangan eni padding va border’ni o‘z ichiga oladi.', 'Box model'),
      short('Eni 100px, padding 10px, border 5px, box-sizing: content-box. Umumiy eni necha px? (faqat son)', ['130'], '100 + 2·10 + 2·5 = 130.', 'Padding va border ikkala tomonda qo‘shiladi.', 'Box model')
    ]
  },
  {
    slug: 'flexbox',
    topic: 'css-maket',
    title: 'Flexbox',
    summary: 'Elementlarni bir qator yoki ustunda tekislash, oraliq berish va markazlashtirishning eng qulay usuli.',
    difficulty: 'beginner',
    durationMinutes: 25,
    order: 2,
    objectives: ['Flex konteyner va flex elementlarni farqlash', 'justify-content va align-items yordamida tekislash', 'gap va flex-wrap dan foydalanish'],
    definitions: [
      { term: 'Flex konteyner', meaning: 'display: flex berilgan ota element.' },
      { term: 'Asosiy o‘q (main axis)', meaning: 'Elementlar joylashadigan yo‘nalish; flex-direction bilan belgilanadi.' },
      { term: 'Ko‘ndalang o‘q (cross axis)', meaning: 'Asosiy o‘qqa perpendikulyar yo‘nalish.' }
    ],
    sections: [
      { heading: 'Flexbox nima beradi', body: 'Ota elementga `display: flex` bersangiz, uning bolalari bir qatorga tiziladi. Endi ularni tekislash, oraliq qo‘yish va tartibini boshqarish juda oson.' },
      { heading: 'Asosiy xususiyatlar', body: '- `flex-direction: row | column` — yo‘nalish.\n- `justify-content` — asosiy o‘q bo‘yicha tekislash: `flex-start`, `center`, `space-between`, `space-around`.\n- `align-items` — ko‘ndalang o‘q bo‘yicha: `stretch`, `center`, `flex-start`.\n- `gap` — elementlar orasidagi masofa.\n- `flex-wrap: wrap` — joy yetmasa keyingi qatorga o‘tish.', code: '.menyu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}' },
      { heading: 'Mashhur trik: markazlashtirish', body: 'Elementni konteynerning qoq o‘rtasiga qo‘yish uchun: `display: flex; justify-content: center; align-items: center;`. Bu yillar davomida CSSning eng og‘riqli masalasi edi — Flexbox uni uch qatorda hal qildi.' }
    ],
    examples: [
      { title: 'Navigatsiya paneli', steps: ['Konteynerga display: flex beramiz.', 'Logo chapda, menyu o‘ngda bo‘lishi uchun justify-content: space-between.', 'Vertikal tekislash uchun align-items: center.'], code: '<nav class="panel">\n  <span>DevForge</span>\n  <div class="havolalar">...</div>\n</nav>\n\n.panel { display: flex; justify-content: space-between; align-items: center; }' }
    ],
    exercises: [
      { prompt: 'Uchta kartochkani bir qatorda, orasida 20px masofa bilan joylashtiring.', hint: 'display: flex va gap.', solution: '.qator { display: flex; gap: 20px; }' },
      { prompt: 'Elementlarni ustun shaklida joylashtirish uchun qaysi xususiyat kerak?', hint: 'Yo‘nalishni o‘zgartirish.', solution: 'flex-direction: column;' }
    ],
    summaryPoints: ['display: flex konteynerni yoqadi.', 'justify-content — asosiy o‘q, align-items — ko‘ndalang o‘q.', 'gap oraliq beradi.', 'Markazlashtirish: center + center.'],
    tutor: {
      simple: 'Flexbox — javondagi kitoblarni tartiblash. “Hammasini chapga”, “o‘rtaga”, “oralarini teng qilib” deb buyruq berasiz va kitoblar o‘zi joylashadi.',
      analogies: ['Avtobus bekatidagi navbatni tasavvur qiling. flex-direction — navbat yo‘nalishi, justify-content — odamlar navbat bo‘ylab qanday taqsimlangani (zich yoki teng oraliqda), align-items — har kimning bo‘yi bo‘yicha qanday tekislangani.', 'Kiyim ilgichi: ilgaklar (elementlar) ip (asosiy o‘q) bo‘ylab joylashadi. space-between — birinchi va oxirgi ilgak chetlarda, qolganlari teng oraliqda.'],
      extraExamples: ['Kartochka pastki qismi: .footer { display: flex; justify-content: space-between; } — narx chapda, “Savatga” tugmasi o‘ngda.', 'Mobil menyu: .menyu { display: flex; flex-direction: column; gap: 8px; } — havolalar ustun bo‘lib tiziladi.'],
      steps: ['Tekislamoqchi bo‘lgan elementlarning otasini toping.', 'Otaga display: flex bering.', 'Yo‘nalishni tanlang (row yoki column).', 'justify-content bilan asosiy o‘q bo‘yicha tekislang.', 'align-items bilan ko‘ndalang o‘q bo‘yicha tekislang.', 'gap bilan oraliq qo‘shing.'],
      hints: ['display: flex ni bolaga emas, ota elementga berdingizmi?', 'flex-direction: column bo‘lsa, justify-content endi vertikal ishlashini unutmang.'],
      practice: ['DevForge uslubidagi sarlavha paneli yarating: chapda logo, o‘rtada 3 ta havola, o‘ngda “Kirish” tugmasi.', 'Ekran o‘rtasida turgan kirish formasi yarating (Flexbox markazlashtirish bilan).'],
      checks: [
        { question: 'justify-content va align-items farqi nima?', answer: 'justify-content asosiy o‘q bo‘yicha, align-items ko‘ndalang o‘q bo‘yicha tekislaydi.' },
        { question: 'Elementni konteyner markaziga qanday qo‘yasiz?', answer: 'Konteynerga display: flex; justify-content: center; align-items: center; beriladi.' }
      ]
    },
    quiz: [
      single('Flexboxni yoqish uchun qaysi qiymat kerak?', ['display: block', 'display: flex', 'position: flex', 'flex: on'], 'display: flex', 'Konteynerga display: flex beriladi.', 'Flexbox display xususiyati orqali yoqiladi.', 'Flex konteyner'),
      single('Elementlarni asosiy o‘q bo‘yicha chetlarga va teng oraliqda joylashtiradigan qiymat?', ['center', 'space-between', 'stretch', 'flex-end'], 'space-between', 'Birinchi va oxirgi element chetlarda, qolganlari teng oraliqda.', 'center hammasini o‘rtaga to‘playdi; teng oraliq uchun space-between.', 'justify-content'),
      single('Flex elementlar orasidagi masofani belgilovchi xususiyat?', ['margin-between', 'gap', 'spacing', 'padding'], 'gap', 'gap — elementlar orasidagi masofa.', 'gap aynan shu maqsad uchun.', 'gap'),
      tf('flex-direction: column bo‘lganda justify-content vertikal yo‘nalishda ishlaydi.', true, 'Asosiy o‘q vertikal bo‘ladi.', 'Yo‘nalish o‘zgarsa, asosiy o‘q ham o‘zgaradi.', 'O‘qlar'),
      multiple('Elementni konteyner markaziga qo‘yish uchun kerakli xususiyatlarni tanlang.', ['display: flex', 'justify-content: center', 'align-items: center', 'float: center'], ['display: flex', 'justify-content: center', 'align-items: center'], 'Uchala xususiyat birga markazlashtiradi.', 'float: center degan qiymat CSSda mavjud emas.', 'Markazlashtirish')
    ]
  },
  {
    slug: 'css-grid',
    topic: 'css-maket',
    title: 'CSS Grid',
    summary: 'Ikki o‘lchamli maketlar: qator va ustunlardan iborat to‘r yordamida murakkab sahifa tuzilmalarini yaratish.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 3,
    objectives: ['Grid konteyner yaratish', 'grid-template-columns va fr birligidan foydalanish', 'Grid va Flexbox qachon ishlatilishini farqlash'],
    definitions: [
      { term: 'Grid', meaning: 'Elementlarni qator va ustunlar to‘ri bo‘yicha joylashtiruvchi CSS tizimi.' },
      { term: 'fr birligi', meaning: 'Bo‘sh joyning ulushi; 1fr 2fr — ikkinchi ustun birinchisidan ikki marta keng.' },
      { term: 'Track', meaning: 'Grid ichidagi bitta qator yoki ustun.' }
    ],
    sections: [
      { heading: 'Flexbox va Grid farqi', body: 'Flexbox bir o‘lchamli: bitta qator YOKI bitta ustun. Grid ikki o‘lchamli: qatorlar VA ustunlar bir vaqtda. Kartochkalar galereyasi yoki sahifaning umumiy maketi uchun Grid juda qulay.' },
      { heading: 'Asosiy sintaksis', body: '`grid-template-columns` ustunlarni belgilaydi. `repeat(3, 1fr)` — uchta teng ustun.', code: '.galereya {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}' },
      { heading: 'Avtomatik moslashuvchan to‘r', body: '`repeat(auto-fill, minmax(220px, 1fr))` — har bir ustun kamida 220px bo‘ladi, ekran kengligiga qarab ustunlar soni avtomatik o‘zgaradi. Media query yozmasdan moslashuvchan galereya!', code: '.kartalar {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 16px;\n}' }
    ],
    examples: [
      { title: 'Sahifa maketi', steps: ['Ikki ustun: yon panel 250px, asosiy qism qolgan joy.', 'grid-template-columns: 250px 1fr.', 'Sarlavha ikkala ustunni egallashi uchun: grid-column: 1 / -1.'], code: '.sahifa {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  gap: 20px;\n}\n.sarlavha { grid-column: 1 / -1; }' }
    ],
    exercises: [
      { prompt: '4 ta teng ustunli to‘r yarating, oraliq 12px.', hint: 'repeat(4, 1fr)', solution: '.tor { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }' },
      { prompt: 'grid-template-columns: 1fr 2fr 1fr bo‘lsa va konteyner eni 800px (gap yo‘q) bo‘lsa, o‘rta ustun eni qancha?', hint: 'Jami 4 ulush.', solution: '800 ÷ 4 × 2 = 400px.' }
    ],
    summaryPoints: ['Grid — ikki o‘lchamli maket.', 'fr — bo‘sh joy ulushi.', 'repeat(auto-fill, minmax()) — avtomatik moslashuvchan to‘r.', 'Umumiy maket — Grid, komponent ichi — ko‘pincha Flexbox.'],
    tutor: {
      simple: 'Grid — shaxmat taxtasi. Siz nechta ustun va qator bo‘lishini aytasiz, keyin har bir elementni katakka qo‘yasiz.',
      analogies: ['Grid — Excel jadvali yoki shaxmat taxtasi: kataklar qator va ustunlarda joylashgan. Flexbox esa bitta javon — narsalar faqat bir qatorda tiziladi.', 'fr birligini pitsa bo‘laklariga o‘xshating: 1fr 2fr 1fr — pitsa 4 bo‘lakka bo‘lingan, o‘rtadagi do‘stga 2 bo‘lak, chetdagilarga bittadan.'],
      extraExamples: ['Fotogalereya: grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) — telefonda 2, planshetda 4, kompyuterda 6 ta ustun avtomatik.', 'Dashboard: .panel { display: grid; grid-template-columns: 2fr 1fr; } — chapda katta grafik, o‘ngda kichik statistika.'],
      steps: ['Konteynerga display: grid bering.', 'grid-template-columns bilan ustunlarni belgilang.', 'gap bilan oraliq qo‘ying.', 'Kerak bo‘lsa, alohida elementlarga grid-column bilan bir nechta ustun egallashni bering.'],
      hints: ['Ustunlar teng bo‘lishi kerakmi? Unda repeat(n, 1fr) ishlating.', 'Ekran torayganda ustunlar siqilib ketyaptimi? minmax() bilan minimal enni bering.'],
      practice: ['Universitetlar ro‘yxati uchun kartochkalar galereyasini Grid bilan yarating — u telefon va kompyuterda chiroyli ko‘rinsin.', 'Klassik blog maketini yarating: sarlavha tepada, asosiy matn va yon panel yonma-yon, pastki qism ostida.'],
      checks: [
        { question: 'Grid va Flexbox ning asosiy farqi nima?', answer: 'Grid ikki o‘lchamli (qator va ustun), Flexbox esa bir o‘lchamli (bitta yo‘nalish).' },
        { question: 'grid-template-columns: repeat(3, 1fr) nimani bildiradi?', answer: 'Uchta teng kenglikdagi ustun.' }
      ]
    },
    quiz: [
      single('Uchta teng ustun yaratadigan qiymat?', ['columns: 3', 'repeat(3, 1fr)', '3fr', 'grid-3'], 'repeat(3, 1fr)', 'repeat(3, 1fr) — uchta teng ustun.', 'Ustunlar grid-template-columns ichida repeat bilan belgilanadi.', 'grid-template-columns'),
      single('fr birligi nimani bildiradi?', ['Piksel', 'Shrift o‘lchami', 'Bo‘sh joy ulushi', 'Foiz'], 'Bo‘sh joy ulushi', 'fr — fraction, ya’ni ulush.', 'fr mavjud bo‘sh joyni proporsional taqsimlaydi.', 'fr birligi'),
      tf('CSS Grid bir vaqtning o‘zida qator va ustunlarni boshqarishga imkon beradi.', true, 'Grid ikki o‘lchamli maket tizimi.', 'Aynan shu xususiyat Gridni Flexboxdan ajratib turadi.', 'Grid'),
      single('Element barcha ustunlarni egallashi uchun?', ['grid-column: 1 / -1', 'width: all', 'grid-row: span all', 'column: full'], 'grid-column: 1 / -1', 'Birinchi chiziqdan oxirgisigacha.', '-1 oxirgi chiziqni bildiradi.', 'grid-column'),
      short('1fr 3fr ustunli, eni 600px (gap yo‘q) to‘rda ikkinchi ustun eni necha px? (faqat son)', ['450'], '600 ÷ 4 × 3 = 450.', 'Jami 4 ulush, ikkinchi ustunga 3 ulush.', 'fr birligi')
    ]
  },
  {
    slug: 'responsive-design',
    topic: 'css-maket',
    title: 'Moslashuvchan dizayn',
    summary: 'Sayt telefon, planshet va kompyuterda birdek qulay bo‘lishi uchun media query, nisbiy birliklar va mobile-first yondashuv.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    order: 4,
    objectives: ['viewport meta tegining vazifasini tushuntirish', 'Media query yozish', 'Mobile-first yondashuvni qo‘llash'],
    definitions: [
      { term: 'Moslashuvchan dizayn', meaning: 'Sahifa turli ekran o‘lchamlariga moslashib, qulay ko‘rinishi.' },
      { term: 'Media query', meaning: 'Ma’lum shart (masalan, ekran eni) bajarilganda qo‘llanadigan CSS qoidalari.' },
      { term: 'Mobile-first', meaning: 'Avval kichik ekran uchun uslub yozib, keyin kattaroq ekranlar uchun kengaytirish.' },
      { term: 'rem', meaning: 'Ildiz (html) shrift o‘lchamiga nisbatan birlik; odatda 1rem = 16px.' }
    ],
    sections: [
      { heading: 'Viewport meta tegi', body: 'Usiz mobil brauzer sahifani kompyuter ekrani kabi kichraytirib ko‘rsatadi. Har bir sahifaning `<head>` qismiga quyidagini qo‘shing:', code: '<meta name="viewport" content="width=device-width, initial-scale=1">' },
      { heading: 'Media query', body: 'Mobile-first yondashuvda asosiy uslublar telefon uchun yoziladi, kattaroq ekranlar uchun `min-width` sharti bilan qo‘shimcha qoidalar beriladi.', code: '.kartalar {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 768px) {\n  .kartalar { grid-template-columns: repeat(2, 1fr); }\n}\n\n@media (min-width: 1024px) {\n  .kartalar { grid-template-columns: repeat(3, 1fr); }\n}' },
      { heading: 'Moslashuvchan elementlar', body: '- Rasmlar uchun `max-width: 100%; height: auto;` — konteynerdan chiqib ketmaydi.\n- Matn uchun `rem` birligi — foydalanuvchi shrift sozlamalarini hurmat qiladi.\n- Bosiladigan elementlar telefonda kamida 44×44px bo‘lishi tavsiya etiladi.\n- Gorizontal aylantirish (scroll) paydo bo‘lmasligini tekshiring.' }
    ],
    examples: [
      { title: 'Telefonda ustunga aylanadigan menyu', steps: ['Telefon uchun: flex-direction: column.', '768px dan katta ekranda: flex-direction: row.'], code: '.menyu { display: flex; flex-direction: column; gap: 8px; }\n@media (min-width: 768px) {\n  .menyu { flex-direction: row; }\n}' }
    ],
    exercises: [
      { prompt: 'Ekran eni 600px dan katta bo‘lganda sarlavha shriftini 2rem dan 3rem ga oshiradigan media query yozing.', hint: '@media (min-width: 600px)', solution: 'h1 { font-size: 2rem; } @media (min-width: 600px) { h1 { font-size: 3rem; } }' },
      { prompt: 'Rasm telefonda konteynerdan chiqib ketmoqda. Qanday tuzatasiz?', hint: 'Maksimal en.', solution: 'img { max-width: 100%; height: auto; }' }
    ],
    summaryPoints: ['viewport meta tegini unutmang.', 'Mobile-first: min-width media querylar.', 'Rasmlarga max-width: 100%.', 'Nisbiy birliklar (rem, %, fr) moslashuvchanlikni oshiradi.'],
    tutor: {
      simple: 'Moslashuvchan dizayn — suvga o‘xshash sayt: qaysi idishga (ekran) quysangiz, o‘sha shaklni oladi. Telefonda hammasi ustun bo‘lib turadi, kompyuterda esa yonma-yon joylashadi.',
      analogies: ['Kiyim o‘lchamlarini o‘ylang: bir xil ko‘ylakni S, M, L o‘lchamda tikish. Media querylar — har bir o‘lcham uchun alohida bichim, lekin mato (mazmun) bir xil.', 'Restoran menyusini tasavvur qiling: devordagi katta menyuda hamma taom bir qarashda ko‘rinadi, telefon ilovasida esa ular ro‘yxat bo‘lib ketma-ket chiqadi. Mazmun bir, joylashuv ekranga mos.'],
      extraExamples: ['Jadvalni telefonda aylantiriladigan qilish: .jadval-qobiq { overflow-x: auto; } — jadval sahifani buzmaydi.', 'Yashirish: @media (max-width: 640px) { .yon-panel { display: none; } } — telefonda yon panel o‘rniga menyu tugmasi ko‘rsatiladi.'],
      steps: ['<head> ga viewport meta tegini qo‘shing.', 'Avval telefon (eng tor ekran) uchun uslublarni yozing.', 'Ekran kengayganda maket qayerda “sinishini” kuzating.', 'O‘sha joyda min-width media query qo‘shing.', 'Brauzerning qurilma rejimida turli o‘lchamlarda tekshiring.'],
      hints: ['Telefonda sahifa juda kichik ko‘rinyaptimi? viewport meta tegini tekshiring.', 'Gorizontal scroll paydo bo‘ldimi? Qaysi element ekrandan kengroq ekanini toping.'],
      practice: ['Avval yaratgan kartochkalar galereyangizni telefon (1 ustun), planshet (2 ustun) va kompyuter (3 ustun) uchun moslashtiring.', 'Sevimli saytingizni brauzerning qurilma rejimida oching va maket qanday o‘zgarishini tahlil qiling.'],
      checks: [
        { question: 'Mobile-first yondashuv nimani anglatadi?', answer: 'Avval kichik ekranlar uchun uslub yoziladi, keyin min-width media querylar bilan kattaroq ekranlar uchun kengaytiriladi.' },
        { question: 'viewport meta tegi bo‘lmasa nima bo‘ladi?', answer: 'Mobil brauzer sahifani kompyuter kengligida chizib, uni kichraytirib ko‘rsatadi — matn juda mayda bo‘ladi.' }
      ]
    },
    quiz: [
      single('Ekran eni 768px va undan katta bo‘lganda ishlaydigan media query?', ['@media (max-width: 768px)', '@media (min-width: 768px)', '@screen 768', '@media (width > 768)'], '@media (min-width: 768px)', 'min-width — “kamida shuncha”.', 'max-width aksincha, kichik ekranlar uchun.', 'Media query'),
      single('Rasm konteynerdan chiqib ketmasligi uchun?', ['width: 100vw', 'max-width: 100%', 'overflow: hidden', 'float: left'], 'max-width: 100%', 'Rasm konteyner enidan oshmaydi.', 'max-width: 100% rasmni konteyner bilan cheklaydi.', 'Moslashuvchan rasm'),
      tf('Mobile-first yondashuvda asosan max-width media querylar ishlatiladi.', false, 'Mobile-first’da min-width ishlatiladi.', 'Avval telefon uslubi, keyin min-width bilan kattaroq ekranlar.', 'Mobile-first'),
      single('1rem odatda necha px ga teng?', ['10px', '12px', '16px', '20px'], '16px', 'Brauzerning standart shrift o‘lchami 16px.', 'rem ildiz shrift o‘lchamiga bog‘liq, odatda 16px.', 'rem'),
      multiple('Moslashuvchan sahifa uchun yaxshi amaliyotlarni tanlang.', ['viewport meta tegi', 'Barcha o‘lchamlarni qat’iy px da berish', 'Rasmlarga max-width: 100%', 'Telefonda kamida 44px bosish maydoni'], ['viewport meta tegi', 'Rasmlarga max-width: 100%', 'Telefonda kamida 44px bosish maydoni'], 'Bu amaliyotlar sahifani turli ekranlarda qulay qiladi.', 'Qat’iy px o‘lchamlar moslashuvchanlikni kamaytiradi.', 'Moslashuvchan dizayn')
    ]
  }
];
