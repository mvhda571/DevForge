import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Award, Bell, BookOpen, Bookmark, Bot, Briefcase, CalendarClock, Compass, GraduationCap, LayoutDashboard, LogOut, MapPin, Menu, Moon,
  PanelLeftClose, PanelLeftOpen, Route, Settings, Shield, Sparkles, Sun, Users, X, Landmark, HeartHandshake
} from 'lucide-react';
import Logo from '../components/ui/Logo.jsx';
import Dropdown from '../components/ui/Dropdown.jsx';
import NotificationBell from '../components/NotificationBell.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useT } from '../i18n/index.jsx';
import { cx } from '../lib/format.js';

function navFor(role, t) {
  const explore = {
    title: t('nav.explore'),
    items: [
      { to: '/careers', label: t('nav.careers'), icon: Briefcase },
      { to: '/universities', label: t('nav.universities'), icon: Landmark },
      { to: '/map', label: t('nav.map'), icon: MapPin }
    ]
  };
  const personal = { title: t('nav.personal'), items: [{ to: '/app/notifications', label: t('nav.notifications'), icon: Bell }, { to: '/app/settings', label: t('nav.settings'), icon: Settings }] };
  if (role === 'student') {
    return [
      {
        title: t('nav.learning'),
        items: [
          { to: '/app', label: t('nav.dashboard'), icon: LayoutDashboard, end: true },
          { to: '/app/assessment', label: t('nav.assessment'), icon: Compass },
          { to: '/app/results', label: t('nav.results'), icon: Sparkles },
          { to: '/app/roadmaps', label: t('nav.roadmaps'), icon: Route },
          { to: '/app/lessons', label: t('nav.library'), icon: BookOpen },
          { to: '/app/advisor', label: t('nav.advisor'), icon: Bot }
        ]
      },
      explore,
      {
        title: t('nav.personal'),
        items: [
          { to: '/app/favorites', label: t('nav.favorites'), icon: Bookmark },
          { to: '/app/reminders', label: t('nav.reminders'), icon: CalendarClock },
          { to: '/app/groups', label: t('nav.groups'), icon: Users },
          { to: '/app/achievements', label: t('nav.achievements'), icon: Award },
          ...personal.items
        ]
      }
    ];
  }
  const homes = {
    teacher: [{ to: '/teacher', label: t('nav.teacherHome'), icon: GraduationCap, end: true }, { to: '/app/lessons', label: t('nav.library'), icon: BookOpen }],
    parent: [{ to: '/parent', label: t('nav.parentHome'), icon: HeartHandshake, end: true }],
    admin: [{ to: '/admin', label: t('nav.adminHome'), icon: Shield, end: true }, { to: '/app/lessons', label: t('nav.library'), icon: BookOpen }]
  };
  return [{ title: t('nav.dashboard'), items: homes[role] || [] }, explore, personal];
}

function NavItem({ item, collapsed, onNavigate }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cx(
          'group flex items-center gap-3 rounded-control px-3 py-2 text-[14px] transition-colors',
          collapsed && 'justify-center px-0',
          isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
        )
      }
    >
      {({ isActive }) => (
        <>
          <item.icon className={cx('h-[18px] w-[18px] shrink-0', isActive ? 'text-[#A996FF]' : 'text-slate-400 group-hover:text-slate-200')} aria-hidden />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {collapsed && <span className="sr-only">{item.label}</span>}
        </>
      )}
    </NavLink>
  );
}

function Sidebar({ groups, collapsed, onNavigate, user, level }) {
  const t = useT();
  return (
    <div className="flex h-full flex-col bg-navy text-white dark:bg-[#0C1528]">
      <div className={cx('flex h-16 shrink-0 items-center px-4', collapsed && 'justify-center px-0')}>
        <Logo to="/" light compact={collapsed} />
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6 pt-2" aria-label="Asosiy navigatsiya">
        {groups.map((g) => (
          <div key={g.title}>
            {!collapsed && <p className="mb-1.5 px-3 text-xs font-medium text-slate-500">{g.title}</p>}
            <div className="space-y-0.5">{g.items.map((item) => <NavItem key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />)}</div>
          </div>
        ))}
      </nav>
      {user?.role === 'student' && level && !collapsed && (
        <div className="m-3 rounded-control bg-white/5 p-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>{level.level}-daraja</span>
            <span>{user.xp} XP</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#8B73FF]" style={{ width: `${level.progress}%` }} />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">Keyingi darajagacha {Math.max(0, level.nextLevelXp - user.xp)} XP</p>
        </div>
      )}
      <p className={cx('px-4 pb-4 text-[11px] text-slate-500', collapsed && 'sr-only')}>{t('roles.' + user?.role)}</p>
    </div>
  );
}

export default function AppLayout() {
  const { user, level, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const t = useT();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('df-sidebar') === 'collapsed';
    } catch {
      return false;
    }
  });
  const groups = navFor(user?.role, t);

  useEffect(() => setMobileOpen(false), [location.pathname]);
  useEffect(() => {
    try {
      localStorage.setItem('df-sidebar', collapsed ? 'collapsed' : 'open');
    } catch {
      /* storage unavailable */
    }
  }, [collapsed]);

  const onLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-surface focus:px-4 focus:py-2">Asosiy mazmunga o‘tish</a>
      <aside className={cx('fixed inset-y-0 left-0 z-40 hidden transition-[width] duration-200 lg:block', collapsed ? 'w-[72px]' : 'w-64')}>
        <Sidebar groups={groups} collapsed={collapsed} user={user} level={level} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menyu">
          <div className="absolute inset-0 animate-fade-in bg-navy-900/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] animate-rise-in shadow-2xl">
            <Sidebar groups={groups} collapsed={false} user={user} level={level} onNavigate={() => setMobileOpen(false)} />
            <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-4 rounded-control p-1.5 text-slate-300 hover:bg-white/10" aria-label="Menyuni yopish">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className={cx('transition-[padding] duration-200', collapsed ? 'lg:pl-[72px]' : 'lg:pl-64')}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-line bg-bg/85 px-4 backdrop-blur md:px-6">
          <button onClick={() => setMobileOpen(true)} className="grid h-9 w-9 place-items-center rounded-control text-ink hover:bg-sunken lg:hidden" aria-label={t('nav.openMenu')}>
            <Menu className="h-5 w-5" />
          </button>
          <button onClick={() => setCollapsed((c) => !c)} className="hidden h-9 w-9 place-items-center rounded-control text-muted hover:bg-sunken hover:text-ink lg:grid" aria-label={collapsed ? t('nav.expand') : t('nav.collapse')}>
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
          <div className="lg:hidden"><Logo compact /></div>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={toggle} className="grid h-9 w-9 place-items-center rounded-control text-muted hover:bg-sunken hover:text-ink" aria-label={t('nav.theme')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <NotificationBell />
            <Dropdown
              label="Foydalanuvchi menyusi"
              trigger={
                <span className="ml-1 flex items-center gap-2 rounded-control py-1 pl-1 pr-2 hover:bg-sunken">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary-ink">{user?.name?.[0]?.toUpperCase()}</span>
                  <span className="hidden max-w-[140px] truncate text-sm font-medium text-ink sm:block">{user?.name}</span>
                </span>
              }
              items={[
                { header: <div><p className="text-sm font-medium text-ink">{user?.name}</p><p className="truncate text-xs text-muted">{user?.email}</p></div> },
                { divider: true },
                { to: '/app/settings', label: t('nav.settings'), icon: Settings },
                user?.role === 'student' && { to: '/app/achievements', label: t('nav.achievements'), icon: Award },
                { divider: true },
                { label: t('nav.logout'), icon: LogOut, onClick: onLogout, danger: true }
              ]}
            />
          </div>
        </header>
        <main id="main" className="mx-auto w-full max-w-content px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
