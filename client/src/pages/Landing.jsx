import { Link } from 'react-router-dom';
import {
  Bot, BookOpenCheck, Compass, Filter, Flame, GraduationCap, Lightbulb, ListOrdered, MapPin, MessageCircleQuestion, Route, Sparkles, Target, Wrench, ClipboardCheck, Repeat2, Check
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import ForgePath from '../components/ForgePath.jsx';
import { useAuth, homeFor } from '../context/AuthContext.jsx';
import { useDocumentTitle } from '../hooks/useApi.js';

const STEPS = [
  { icon: Compass, title: 'O‘zingni kashf et', text: '14 savollik kasb testi qiziqish, kuchli tomonlar va ish uslubingizni aniqlaydi. Har bir tavsiya nima uchun berilgani ko‘rsatiladi.' },
  { icon: Route, title: 'Shaxsiy rejangni ol', text: 'Tanlagan kasbingiz, darajangiz va kunlik vaqtingizga mos yo‘l xaritasi: bosqichlar, modullar va haftalik maqsadlar.' },
  { icon: Bot, title: 'AI bilan o‘rgan', text: 'Har bir darsda AI ustoz bor: tushunmagan joyni boshqacha tushuntiradi, misol beradi va bilimingizni tekshiradi.' },
  { icon: Target, title: 'Natijangni kuzat', text: 'Tugatilgan darslar, test natijalari va takrorlash kerak bo‘lgan mavzular — barchasi bitta panelda.' }
];

const CAREERS = [
  { slug: 'software-developer', name: 'Dasturchi', icon: 'Code2', text: 'Ilova va veb-saytlar yaratadi, muammolarni algoritmlar orqali yechadi.' },
  { slug: 'ui-ux-designer', name: 'UI/UX dizayner', icon: 'PenTool', text: 'Raqamli mahsulotlarni qulay va chiroyli qiladi, foydalanuvchini o‘rganadi.' },
  { slug: 'doctor', name: 'Shifokor', icon: 'Stethoscope', text: 'Kasalliklarning oldini oladi, tashxis qo‘yadi va davolaydi.' },
  { slug: 'engineer', name: 'Muhandis', icon: 'Cog', text: 'Mashina, inshoot va texnik tizimlarni loyihalaydi.' },
  { slug: 'economist', name: 'Iqtisodchi', icon: 'TrendingUp', text: 'Bozor va pul oqimlarini tahlil qilib, qarorlarga asos tayyorlaydi.' },
  { slug: 'cybersecurity-specialist', name: 'Kiberxavfsizlik mutaxassisi', icon: 'ShieldCheck', text: 'Tizim va ma’lumotlarni hujumlardan himoya qiladi.' }
];

const TUTOR_ACTIONS = [
  { icon: MessageCircleQuestion, label: 'Tushunmadim', text: 'mavzuni butunlay boshqa o‘xshatish bilan tushuntiradi' },
  { icon: Sparkles, label: 'Soddaroq tushuntir', text: 'murakkab atamalarsiz, qisqa gaplar bilan' },
  { icon: Repeat2, label: 'Boshqa misol ber', text: 'darsdagidan farqli hayotiy misol' },
  { icon: ListOrdered, label: 'Bosqichma-bosqich ko‘rsat', text: 'har bir qadamni alohida izohlaydi' },
  { icon: ClipboardCheck, label: 'Meni tekshir', text: 'savol beradi va javobingizni baholaydi' },
  { icon: Wrench, label: 'Amaliy topshiriq ber', text: 'darajangizga mos mashq' },
  { icon: Lightbulb, label: 'Maslahat ber', text: 'javobni emas, yo‘nalishni ko‘rsatadi' }
];

const FAQ = [
  { q: 'DevForge kimlar uchun?', a: 'Maktab o‘quvchilari, abituriyentlar, talabalar va o‘z kasbini endi tanlayotgan har bir kishi uchun. Platforma faqat dasturlash bilan cheklanmaydi: tibbiyot, iqtisodiyot, muhandislik, huquq va boshqa yo‘nalishlar ham bor.' },
  { q: 'Kasb testi natijasiga qanchalik ishonish mumkin?', a: 'Test javoblaringizni 15 ta xususiyat bo‘yicha baholaydi va kasb profillari bilan solishtiradi. Hisoblash usuli natijalar sahifasida ochiq ko‘rsatiladi. Bu ilmiy tasdiqlangan psixologik tashxis emas — qaror qabul qilishda yordamchi vosita.' },
  { q: 'AI ustoz qanday ishlaydi?', a: 'AI ustoz siz o‘qiyotgan dars mazmunini biladi va shu dars doirasida javob beradi. U to‘g‘ridan-to‘g‘ri yechim berish o‘rniga, maslahat va yo‘naltiruvchi savollar bilan o‘ylashga undaydi. AI provayder ulanmagan bo‘lsa, platforma “Demo rejim” belgisini ko‘rsatadi.' },
  { q: 'Universitetlar haqidagi ma’lumot qanchalik aniq?', a: 'Har bir universitet sahifasida ma’lumot holati va oxirgi tekshiruv sanasi ko‘rsatiladi. To‘lov, grant va muddatlar faqat tasdiqlangan bo‘lsa chiqariladi — aks holda “Ma’lumot mavjud emas” deb yoziladi. Qaror qabul qilishdan oldin rasmiy saytni tekshiring.' },
  { q: 'Ota-onalar va o‘qituvchilar nima ko‘radi?', a: 'O‘qituvchi o‘z guruhidagi o‘quvchilarning progressi va topshiriqlarini ko‘radi. Ota-ona faqat o‘quvchi tasdiqlagandan keyin o‘qish natijalarini ko‘ra oladi. AI suhbatlari va shaxsiy eslatmalar hech kimga ko‘rsatilmaydi.' },
  { q: 'Platformadan foydalanish uchun nima kerak?', a: 'Brauzer va internet kifoya. Ro‘yxatdan o‘ting, qisqa anketani to‘ldiring (xohlasangiz keyinroq) va kasb testidan boshlang.' }
];

function HeroPreview() {
  return (
    <div className="relative" aria-label="Platforma interfeysi namunasi">
      <div className="panel overflow-hidden shadow-[0_24px_60px_-28px_rgba(14,26,51,0.35)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div>
            <p className="text-xs text-muted">Yo‘l xaritasi</p>
            <p className="text-sm font-semibold text-ink">Frontend dasturchi</p>
          </div>
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary-ink">Interfeys namunasi</span>
        </div>
        <div className="grid gap-0 sm:grid-cols-[1fr_1.1fr]">
          <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
            <ForgePath
              steps={[
                { title: 'HTML asoslari', meta: '2 dars', state: 'done' },
                { title: 'CSS va sahifa maketi', meta: '4 dars', state: 'done' },
                { title: 'JavaScript asoslari', meta: 'Massiv metodlari', state: 'current' },
                { title: 'Brauzerda JavaScript', meta: '3 dars', state: 'todo' },
                { title: 'React bilan interfeys', meta: '5 dars', state: 'todo' }
              ]}
            />
          </div>
          <div className="flex flex-col gap-3 bg-sunken/60 p-5">
            <div className="flex items-center gap-2 text-xs text-muted">
              <Bot className="h-4 w-4 text-primary" aria-hidden /> AI ustoz · map, filter, reduce
            </div>
            <p className="self-end rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-white">Tushunmadim</p>
            <div className="rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink">
              Zavod konveyerini tasavvur qiling: <strong>filter</strong> yaroqsizlarini ajratadi, <strong>map</strong> har birini bo‘yaydi, <strong>reduce</strong> hammasini bitta qutiga soladi.
            </div>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {['Boshqa misol ber', 'Meni tekshir', 'Maslahat ber'].map((a) => (
                <span key={a} className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-ink">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  useDocumentTitle(null);
  const { user } = useAuth();
  const startLink = user ? (user.role === 'student' ? '/app/assessment' : homeFor(user)) : '/register?next=/app/assessment';

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-content items-center gap-12 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
              <Flame className="h-4 w-4 text-primary" aria-hidden /> Kelajagingni o‘zing yarat
            </p>
            <h1 className="font-display text-[34px] font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[52px]">
              <span className="block">Kelajagingni top.</span>
              <span className="block text-ink/80">Bilimingni oshir.</span>
              <span className="block text-ink/60">Maqsadingga yet.</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-muted">
              DevForge sizga mos kasbni aniqlashga yordam beradi, o‘sha kasb uchun shaxsiy o‘quv yo‘l xaritasini tuzadi va har bir darsda AI ustoz bilan birga o‘rgatadi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={startLink} size="lg" icon={Compass}>Kasbimni topish</Button>
              <Button to="/#imkoniyatlar" size="lg" variant="secondary">Platformani ko‘rish</Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {['14 ta kasb profili', '42 ta o‘zbekcha dars', 'Bepul ro‘yxatdan o‘tish'].map((s) => (
                <li key={s} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" aria-hidden />{s}</li>
              ))}
            </ul>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section id="qanday" className="mx-auto max-w-content px-4 py-16 md:px-6 md:py-20">
        <h2 className="max-w-xl text-2xl text-ink md:text-3xl">Qanday ishlaydi</h2>
        <p className="mt-3 max-w-prose text-muted">To‘rt qadam — testdan birinchi tugallangan darsgacha.</p>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-semibold text-primary">{i + 1}</span>
                <s.icon className="h-5 w-5 text-ink" aria-hidden />
              </div>
              <h3 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="kasblar" className="border-y border-line bg-surface">
        <div className="mx-auto max-w-content px-4 py-16 md:px-6 md:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl text-ink md:text-3xl">Kasblar bilan tanishing</h2>
              <p className="mt-3 max-w-prose text-muted">Har bir kasb uchun kerakli ko‘nikmalar, maktab fanlari va o‘qish yo‘li. Faqat IT emas.</p>
            </div>
            <Button to="/careers" variant="secondary">Barcha 14 kasb</Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREERS.map((c) => (
              <Link key={c.slug} to={`/careers/${c.slug}`} className="group rounded-panel border border-line bg-bg p-5 transition-colors hover:border-primary/50">
                <span className="grid h-10 w-10 place-items-center rounded-control bg-surface text-primary-ink ring-1 ring-line">
                  <Icon name={c.icon} />
                </span>
                <h3 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink group-hover:text-primary-ink">{c.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{c.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="imkoniyatlar" className="mx-auto max-w-content scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-2xl text-ink md:text-3xl">AI ustoz har bir darsda yoningizda</h2>
            <p className="mt-4 max-w-prose text-muted">
              Ustoz qaysi darsni va qaysi tushunchani o‘qiyotganingizni biladi. “Tushunmadim” desangiz, avvalgi matnni takrorlamaydi — boshqa yo‘l bilan tushuntiradi. Topshiriqlarda esa javobni darhol aytmasdan, o‘ylashga yo‘naltiradi.
            </p>
            <Button to={user ? '/app/lessons' : '/register'} className="mt-6" icon={BookOpenCheck}>Darslarni ko‘rish</Button>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {TUTOR_ACTIONS.map((a) => (
              <li key={a.label} className="flex gap-3 rounded-control border border-line bg-surface p-3.5">
                <a.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-ink">{a.label}</p>
                  <p className="text-[13px] text-muted">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy text-white dark:bg-[#0C1528]">
        <div className="mx-auto grid max-w-content gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl text-white md:text-3xl">Yo‘l xaritasi — kasbdan aniq darsgacha</h2>
            <p className="mt-4 max-w-prose text-slate-300">
              Kasb → ko‘nikmalar → fanlar → modullar → darslar → mashqlar → testlar. Darajangiz va kunlik vaqtingizga qarab reja moslashadi: tayyor bo‘lgan bosqichlar ixtiyoriy bo‘ladi, testda qiynalgan mavzular takrorlash ro‘yxatiga tushadi.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              {['Darsni ochish emas, testdan o‘tish progress hisoblanadi', 'Keyingi tavsiya etilgan dars avtomatik aniqlanadi', 'Haftalik maqsad kunlik vaqtingizdan hisoblanadi'].map((t) => (
                <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A996FF]" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-panel border border-white/10 bg-white/5 p-6">
            <div className="mb-5 flex items-center justify-between text-sm">
              <span className="text-slate-300">Iqtisodchi yo‘l xaritasi</span>
              <span className="text-slate-400">Interfeys namunasi</span>
            </div>
            <ol className="space-y-3">
              {[
                { stage: 'Boshlang‘ich bosqich', mods: ['Foiz va nisbat', 'Algebra asoslari', 'Iqtisodiyot asoslari'], done: 3 },
                { stage: 'O‘rta bosqich', mods: ['Statistika asoslari', 'Moliyaviy savodxonlik'], done: 1 },
                { stage: 'Yuqori bosqich', mods: ['Loyiha: oila byudjeti tahlili'], done: 0 }
              ].map((s) => (
                <li key={s.stage} className="rounded-control bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{s.stage}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.mods.map((m, i) => (
                      <span key={m} className={i < s.done ? 'rounded-full bg-[#8B73FF] px-2.5 py-1 text-xs text-white' : 'rounded-full border border-white/15 px-2.5 py-1 text-xs text-slate-300'}>{m}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="panel p-5">
              <div className="flex flex-wrap gap-2 text-xs">
                {['Mamlakat', 'Shahar', 'Yo‘nalish', 'Daraja', 'Davlat / xususiy', 'Grant', 'Ta’lim tili'].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-muted"><Filter className="h-3 w-3" aria-hidden />{f}</span>
                ))}
              </div>
              <ul className="mt-4 divide-y divide-line">
                {[
                  ['KAIST', 'Tejon, Janubiy Koreya'],
                  ['Technische Universität München', 'Myunxen, Germaniya'],
                  ['Toshkent axborot texnologiyalari universiteti', 'Toshkent, O‘zbekiston']
                ].map(([n, l]) => (
                  <li key={n} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{n}</p>
                      <p className="flex items-center gap-1 text-xs text-muted"><MapPin className="h-3 w-3" aria-hidden />{l}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted">To‘lov: ma’lumot mavjud emas</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl text-ink md:text-3xl">Universitetlarni halol ma’lumot bilan solishtiring</h2>
            <p className="mt-4 max-w-prose text-muted">
              O‘zbekiston, Janubiy Koreya, Xitoy, Germaniya, Turkiya va AQSHdagi universitetlar. Tasdiqlanmagan narx yoki muddat hech qachon ko‘rsatilmaydi — o‘rniga rasmiy saytga havola beriladi. Xaritada esa universitet atrofidagi kutubxona, yotoqxona va transport bekatlarini ko‘rasiz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/universities" icon={GraduationCap}>Universitetlar</Button>
              <Button to="/map" variant="secondary" icon={MapPin}>Xaritani ochish</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-content px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-2xl text-ink md:text-3xl">Natijangiz ko‘rinib turadi</h2>
          <p className="mt-3 max-w-prose text-muted">XP faqat haqiqiy o‘qish uchun beriladi: darsni testdan o‘tib tugatish, testdan mukammal natija olish, topshiriq yuborish. Bir xil harakatni takrorlab cheksiz ball yig‘ib bo‘lmaydi.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Flame, title: 'O‘qish izchilligi', text: 'Ketma-ket o‘qigan kunlaringiz hisoblanadi. Tanaffus qilsangiz, jarima yo‘q — shunchaki qaytadan boshlaysiz.' },
              { icon: Target, title: 'Haftalik maqsad', text: 'Kunlik vaqtingizga qarab realistik maqsad: masalan, haftasiga 6 ta dars.' },
              { icon: Sparkles, title: 'Ko‘nikma nishonlari', text: 'Fan bo‘yicha barcha darslarni tugatganingizda nishon olasiz.' }
            ].map((c) => (
              <div key={c.title} className="rounded-panel border border-line bg-bg p-6">
                <c.icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
        <h2 className="text-2xl text-ink md:text-3xl">Ko‘p beriladigan savollar</h2>
        <div className="mt-8 divide-y divide-line rounded-panel border border-line bg-surface">
          {FAQ.map((f) => (
            <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-control text-[15px] font-medium text-ink">
                {f.q}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 md:px-6">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 rounded-panel bg-primary p-8 text-white md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl text-white md:text-[28px]">Birinchi qadam — 10 daqiqalik test</h2>
            <p className="mt-2 max-w-xl text-white/80">Natijada sizga mos uchta kasb, sabablari va boshlash uchun aniq reja olasiz.</p>
          </div>
          <Button to={startLink} size="lg" variant="dark" className="dark:bg-white dark:text-navy" icon={Compass}>Kasbimni topish</Button>
        </div>
      </section>
    </>
  );
}
