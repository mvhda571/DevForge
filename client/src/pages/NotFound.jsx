import Button from '../components/ui/Button.jsx';
import { useDocumentTitle } from '../hooks/useApi.js';

export default function NotFound() {
  useDocumentTitle('Sahifa topilmadi');
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 text-2xl text-ink">Bu sahifa topilmadi</h1>
      <p className="mt-2 text-muted">Manzil noto‘g‘ri yozilgan yoki sahifa ko‘chirilgan bo‘lishi mumkin.</p>
      <div className="mt-6 flex gap-3">
        <Button to="/">Bosh sahifaga qaytish</Button>
        <Button to="/careers" variant="secondary">Kasblarni ko‘rish</Button>
      </div>
    </div>
  );
}
