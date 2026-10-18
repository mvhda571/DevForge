import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import { Input, Textarea } from '../../components/ui/Field.jsx';
import { ErrorState, PageSkeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { formatDate } from '../../lib/format.js';
import { AssignmentStatus } from './Groups.jsx';

export default function AssignmentView() {
  const { id } = useParams();
  const toast = useToast();
  const { refresh } = useAuth();
  const { data, loading, error, reload, setData } = useApi(`/assignments/${id}`);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  useDocumentTitle(data?.assignment?.title || 'Topshiriq');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  const a = data.assignment;
  const sub = data.submission;
  const values = form || { content: sub?.content || '', link: sub?.link || '' };
  const graded = sub?.status === 'graded';

  const submit = async (e) => {
    e.preventDefault();
    if (!values.content.trim() && !values.link.trim()) {
      toast.error('Javob matni yoki havolani kiriting');
      return;
    }
    setSaving(true);
    try {
      const d = await api.post(`/assignments/${a._id}/submit`, { content: values.content.trim(), link: values.link.trim() });
      setData((prev) => ({ ...prev, submission: d.submission }));
      setForm(null);
      refresh();
      toast.success(d.late ? 'Javob yuborildi (muddatdan keyin)' : 'Javob yuborildi');
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/app/groups" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" />Topshiriqlar</Link>
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2"><h1 className="page-title">{a.title}</h1><AssignmentStatus a={{ ...a, submission: sub }} /></div>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted"><Clock className="h-4 w-4" aria-hidden />Muddat: {formatDate(a.dueAt, true)} · Maksimal ball: {a.maxScore}</p>
      </header>
      <Card title="Topshiriq">
        <p className="whitespace-pre-line text-[15px] text-ink">{a.description || 'Tavsif berilmagan.'}</p>
        {a.lesson && <Button to={`/app/lessons/${a.lesson.slug}`} variant="secondary" size="sm" icon={BookOpen} className="mt-4">Bog‘liq dars: {a.lesson.title}</Button>}
      </Card>
      {graded && (
        <Card title="Baho va izoh" className="mt-4 border-success/40">
          <p className="font-display text-2xl font-semibold text-ink">{sub.score} / {a.maxScore}</p>
          {sub.feedback && <p className="mt-2 flex gap-2 text-[15px] text-ink"><MessageSquare className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{sub.feedback}</p>}
        </Card>
      )}
      <Card title={sub ? 'Sizning javobingiz' : 'Javob yuborish'} className="mt-4">
        {graded ? (
          <div className="space-y-2 text-[15px] text-ink">
            {sub.content && <p className="whitespace-pre-line">{sub.content}</p>}
            {sub.link && <a href={sub.link} target="_blank" rel="noopener noreferrer" className="text-primary-ink hover:underline">{sub.link}</a>}
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Textarea label="Javob" rows={6} maxLength={10000} value={values.content} onChange={(e) => setForm({ ...values, content: e.target.value })} />
            <Input label="Havola" optional type="url" placeholder="https://github.com/…" value={values.link} onChange={(e) => setForm({ ...values, link: e.target.value })} />
            <Button type="submit" loading={saving}>{sub ? 'Javobni yangilash' : 'Javobni yuborish'}</Button>
          </form>
        )}
      </Card>
    </div>
  );
}
