import { createContext, useCallback, useContext, useState } from 'react';
import Dialog from '../components/ui/Dialog.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';

const CelebrationContext = createContext(null);

export function CelebrationProvider({ children }) {
  const [items, setItems] = useState([]);
  const celebrate = useCallback((achievements) => {
    if (achievements?.length) setItems(achievements);
  }, []);
  const close = () => setItems([]);
  return (
    <CelebrationContext.Provider value={celebrate}>
      {children}
      <Dialog open={items.length > 0} onClose={close} title={items.length > 1 ? 'Yangi yutuqlar' : 'Yangi yutuq'} description="Mehnatingiz natija bermoqda." size="sm" footer={<Button onClick={close}>Davom etish</Button>}>
        <ul className="space-y-3">
          {items.map((a) => (
            <li key={a.key || a.title} className="flex items-center gap-3 rounded-control border border-line p-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-ink">
                <Icon name={a.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-medium text-ink">{a.title}</p>
                <p className="text-sm text-muted">{a.description}</p>
              </div>
              {a.xp ? <span className="ml-auto text-sm font-semibold text-primary-ink">+{a.xp} XP</span> : null}
            </li>
          ))}
        </ul>
      </Dialog>
    </CelebrationContext.Provider>
  );
}

export function useCelebrate() {
  return useContext(CelebrationContext);
}
