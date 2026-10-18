import { Link } from 'react-router-dom';
import { Check, Circle, CircleDot, RotateCcw } from 'lucide-react';
import { ProgressBar } from '../ui/Feedback.jsx';
import { cx } from '../../lib/format.js';

const ICON = {
  completed: { icon: Check, cls: 'text-success' },
  in_progress: { icon: CircleDot, cls: 'text-signal' },
  needs_review: { icon: RotateCcw, cls: 'text-warning' },
  not_started: { icon: Circle, cls: 'text-line' }
};

export default function CourseSidebar({ course, currentId, onNavigate }) {
  return (
    <nav aria-label="Kurs tarkibi" className="flex h-full flex-col">
      <div className="border-b border-line p-4">
        {course.roadmapId ? (
          <Link to={`/app/roadmaps/${course.roadmapId}`} className="text-sm font-semibold text-ink hover:text-primary-ink">{course.title}</Link>
        ) : (
          <p className="text-sm font-semibold text-ink">{course.title}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar value={course.progress.percent} size="sm" />
          <span className="text-xs tabular-nums text-muted">{course.progress.completed}/{course.progress.total}</span>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-3">
        {course.modules.map((m) => (
          <div key={m.title}>
            <p className="mb-1 px-2 text-xs font-medium text-muted">{m.title}{m.optional ? ' (ixtiyoriy)' : ''}</p>
            <ul className="space-y-0.5">
              {m.lessons.map((l) => {
                const st = ICON[l.status] || ICON.not_started;
                const active = l.id === currentId;
                return (
                  <li key={l.id}>
                    <Link to={`/app/lessons/${l.slug}`} onClick={onNavigate} aria-current={active ? 'page' : undefined} className={cx('flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] transition-colors', active ? 'bg-primary-soft font-medium text-primary-ink' : 'text-ink hover:bg-sunken')}>
                      <st.icon className={cx('h-3.5 w-3.5 shrink-0', st.cls)} strokeWidth={3} aria-hidden />
                      <span className="truncate">{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
