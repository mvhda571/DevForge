import { ShieldCheck, Route, Bot } from 'lucide-react';

export default function AuthFrame({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid max-w-content gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-[1fr_440px] lg:items-center">
      <div className="hidden lg:block">
        <h2 className="max-w-md text-3xl text-ink">O‘qishingiz bitta joyda: test, reja, darslar va natijalar.</h2>
        <ul className="mt-8 space-y-5">
          {[
            { icon: Route, t: 'Kasbingizga mos yo‘l xaritasi', d: 'Bosqichlar, modullar va haftalik maqsadlar.' },
            { icon: Bot, t: 'Dars kontekstini biladigan AI ustoz', d: 'Tushunmagan joyingizni boshqacha tushuntiradi.' },
            { icon: ShieldCheck, t: 'Ma’lumotlaringiz himoyalangan', d: 'AI suhbatlaringizni faqat siz ko‘rasiz.' }
          ].map((i) => (
            <li key={i.t} className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control bg-primary-soft text-primary-ink"><i.icon className="h-5 w-5" aria-hidden /></span>
              <div>
                <p className="font-medium text-ink">{i.t}</p>
                <p className="text-sm text-muted">{i.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="panel p-6 sm:p-8">
        <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
