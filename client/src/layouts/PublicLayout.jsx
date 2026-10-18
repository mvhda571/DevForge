import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Logo from '../components/ui/Logo.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth, homeFor } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useT } from '../i18n/index.jsx';
import { cx } from '../lib/format.js';

export function PublicNav() {
  const t = useT();
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/#imkoniyatlar', label: t('nav.features') },
    { to: '/careers', label: t('nav.careers') },
    { to: '/universities', label: t('nav.universities') },
    { to: '/#faq', label: t('nav.faq') }
  ];
  const linkCls = 'rounded-control px-3 py-2 text-sm text-muted transition-colors hover:text-ink';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center gap-6 px-4 md:px-6">
        <Logo />
        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label="Asosiy navigatsiya">
          {links.map((l) =>
            l.to.includes('#') ? (
              <Link key={l.to} to={l.to} className={linkCls}>{l.label}</Link>
            ) : (
              <NavLink key={l.to} to={l.to} end className={({ isActive }) => cx(linkCls, isActive && 'text-ink')}>{l.label}</NavLink>
            )
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggle} className="grid h-9 w-9 place-items-center rounded-control text-muted hover:bg-sunken hover:text-ink" aria-label={t('nav.theme')}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {user ? (
            <Button to={homeFor(user)} size="sm" className="hidden sm:inline-flex">{t('nav.dashboard')}</Button>
          ) : (
            <>
              <Button to="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">{t('nav.login')}</Button>
              <Button to="/register" size="sm" className="hidden sm:inline-flex">{t('nav.start')}</Button>
            </>
          )}
          <button onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-control text-ink hover:bg-sunken md:hidden" aria-expanded={open} aria-label={t('nav.openMenu')}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="animate-fade-in border-t border-line bg-surface px-4 py-3 md:hidden" aria-label="Mobil navigatsiya">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block rounded-control px-3 py-2.5 text-[15px] text-ink hover:bg-sunken">{l.label}</Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
            {user ? (
              <Button to={homeFor(user)} className="col-span-2">{t('nav.dashboard')}</Button>
            ) : (
              <>
                <Button to="/login" variant="secondary">{t('nav.login')}</Button>
                <Button to="/register">{t('nav.start')}</Button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">Kelajagingni o‘zing yarat. Kasb tanlash, shaxsiy o‘quv yo‘l xaritasi va AI ustoz — o‘quvchilar uchun bitta platformada.</p>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal text-ink">Platforma</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/app/assessment" className="hover:text-ink">Kasb testi</Link></li>
            <li><Link to="/careers" className="hover:text-ink">Kasblar katalogi</Link></li>
            <li><Link to="/universities" className="hover:text-ink">Universitetlar</Link></li>
            <li><Link to="/map" className="hover:text-ink">Universitet xaritasi</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal text-ink">Ma’lumot</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/privacy" className="hover:text-ink">Maxfiylik siyosati</Link></li>
            <li><Link to="/privacy#shartlar" className="hover:text-ink">Foydalanish shartlari</Link></li>
            <li><Link to="/#faq" className="hover:text-ink">Ko‘p beriladigan savollar</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal text-ink">Aloqa</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="mailto:hello@devforge.uz" className="hover:text-ink">hello@devforge.uz</a></li>
            <li>Toshkent, O‘zbekiston</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-content px-4 py-5 text-xs text-muted md:px-6">© {new Date().getFullYear()} DevForge. Kasb testi natijalari taxminiy va tavsiyaviy xarakterga ega.</p>
      </div>
    </footer>
  );
}

export default function PublicLayout({ contained = false }) {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-surface focus:px-4 focus:py-2">Asosiy mazmunga o‘tish</a>
      <PublicNav />
      <main id="main" className="flex-1">
        {contained ? <PublicPage><Outlet /></PublicPage> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

export function PublicPage({ children }) {
  return <div className="mx-auto w-full max-w-content px-4 py-8 md:px-6 md:py-10">{children}</div>;
}
