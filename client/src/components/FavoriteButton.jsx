import { Bookmark, BookmarkCheck } from 'lucide-react';
import Button from './ui/Button.jsx';

export default function FavoriteButton({ active, onClick, compact = false, label = 'Saqlash' }) {
  const Icon = active ? BookmarkCheck : Bookmark;
  if (compact) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} aria-label={active ? 'Saqlanganlardan olib tashlash' : label} className={`grid h-9 w-9 place-items-center rounded-control transition-colors ${active ? 'bg-primary-soft text-primary-ink' : 'text-muted hover:bg-sunken hover:text-ink'}`}>
        <Icon className="h-[18px] w-[18px]" />
      </button>
    );
  }
  return (
    <Button variant={active ? 'subtle' : 'secondary'} icon={Icon} onClick={onClick} aria-pressed={active}>
      {active ? 'Saqlangan' : label}
    </Button>
  );
}
