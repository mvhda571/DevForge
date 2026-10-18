import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, ExternalLink, Pencil, Trash2, UserX } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import { Input, Textarea } from '../../components/ui/Field.jsx';
import { EmptyState, ErrorState, PageSkeleton } from '../../components/ui/Feedback.jsx';
import { useApi, useDocumentTitle } from '../../hooks/useApi.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { formatDate, toLocalInput } from '../../lib/format.js';
import { AssignmentForm } from './TeacherGroup.jsx';

function GradeForm({ sub, maxScore, onSaved }) {
  const toast = useToast();
  const [score, setScore] = useState(sub.score ?? '');
  const [feedback, setFeedback] = useState(sub.feedback || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const n = Number(score);
    if (score === '' || Number.isNaN(n) || n < 0 || n > maxScore) {
      setError(`0 dan ${maxScore} gacha ball kiriting`);
      return;
    }
    setSaving(true);
    try {
      const d = await api.patch(`/assignments/submissions/${sub._id}/grade`, { score: n, feedback: feedback.trim() });
      toast.success('Baho saqlandi, o‘quvchiga bildirishnoma yuborildi');
      onSaved(d.submission);
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-[140px_1fr_auto] sm:items-end">
      <Input label={`Ball (maks. ${maxScore})`} type="number" min={0} max={maxScore} step="any" value={score} error={error} onChange={(e) => { setScore(e.target.value); setError(''); }} />
      <Textarea label="Izoh" optional rows={2} value={feedback} onChange={(e) => setFeedback(e.target.value)} maxLength={3000} />
      <Button type="submit" loading={saving} icon={CheckCircle2}>{sub.status === 'graded' ? 'Yangilash' : 'Baholash'}</Button>
    </form>
  );
}

export default function TeacherAssignment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi(`/assignments/${id}`);
  const [dialog, setDialog] = useState(null);
  const [busy, setBusy] = useState(false);
  useDocumentTitle(data?.assignment?.title || 'Topshiriq');

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (data.role !== 'owner') return <ErrorState error={{ message: 'Bu topshiriqni boshqarish huquqingiz yo‘q.' }} />;
  const a = data.assignment;
  const subs = data.submissions;
  const graded = subs.filter((s) => s.status === 'graded').length;

  const save = async (body) => {
    setBusy(true);
    try {
      const { lessonId, ...rest } = body;
      const d = await api.patch(`/assignments/${a._id}`, rest);
      setData((prev) => ({ ...prev, assignment: { ...prev.assignment, ...d.assignment, lesson: prev.assignment.lesson } }));
      toast.success('Topshiriq yangilandi');
      setDialog(null);
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await api.delete(`/assignments/${a._id}`);
      toast.success('Topshiriq o‘chirildi');
      navigate(`/teacher/groups/${a.group}`);
    } catch (err) {
      toast.error(err);
      setBusy(false);
    }
  };

  const onGraded = (updated) => setData((prev) => ({ ...prev, submissions: prev.submissions.map((s) => (s._id === updated._id ? { ...s, ...updated, student: s.student } : s)) }));

  return (
    <div>
      <Link to={`/teacher/groups/${a.group}`} className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />{data.groupName}</Link>
      <PageHeader
        title={a.title}
        description={`Muddat: ${formatDate(a.dueAt, true)} · Maksimal ball: ${a.maxScore}`}
        actions={<><Button variant="secondary" icon={Pencil} onClick={() => setDialog('edit')}>Tahrirlash</Button><Button variant="ghost" icon={Trash2} onClick={() => setDialog('delete')}>O‘chirish</Button></>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <h2 className="section-title">Javoblar <span className="text-muted">({subs.length})</span></h2>
          {!subs.length ? <EmptyState icon={CheckCircle2} title="Hali javob yo‘q" description="O‘quvchilar javob yuborganda shu yerda paydo bo‘ladi va sizga bildirishnoma keladi." /> : subs.map((s) => {
            const late = new Date(s.createdAt) > new Date(a.dueAt);
            return (
              <article key={s._id} className="panel p-5">
                <header className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ink">{s.student?.name}</p>
                    <p className="text-xs text-muted">{formatDate(s.updatedAt || s.createdAt, true)}</p>
                  </div>
                  <div className="flex gap-2">
                    {late && <Badge tone="warning">Kechikkan</Badge>}
                    {s.status === 'graded' ? <Badge tone="success">{s.score}/{a.maxScore}</Badge> : <Badge tone="signal">Baholanmagan</Badge>}
                  </div>
                </header>
                {s.content && <p className="mt-3 whitespace-pre-wrap text-[15px] text-ink">{s.content}</p>}
                {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer nofollow" className="mt-3 inline-flex items-center gap-1.5 break-all text-sm text-primary-ink hover:underline"><ExternalLink className="h-4 w-4 shrink-0" aria-hidden />{s.link}</a>}
                <GradeForm sub={s} maxScore={a.maxScore} onSaved={onGraded} />
              </article>
            );
          })}
        </div>

        <aside className="space-y-4">
          <Card title="Holat">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Topshirgan</dt><dd className="font-medium text-ink">{subs.length}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Baholangan</dt><dd className="font-medium text-ink">{graded}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Kutilmoqda</dt><dd className="font-medium text-ink">{data.pending.length}</dd></div>
            </dl>
          </Card>
          {a.description && <Card title="Topshiriq matni"><p className="whitespace-pre-wrap text-sm text-ink">{a.description}</p></Card>}
          {a.lesson && (
            <Card title="Bog‘liq dars">
              <Link to={`/app/lessons/${a.lesson.slug}`} className="inline-flex items-center gap-2 text-sm text-primary-ink hover:underline"><BookOpen className="h-4 w-4" aria-hidden />{a.lesson.title}</Link>
            </Card>
          )}
          {data.pending.length > 0 && (
            <Card title="Javob yubormaganlar">
              <ul className="space-y-1.5 text-sm">{data.pending.map((p) => <li key={p.id} className="flex items-center gap-2 text-ink"><UserX className="h-4 w-4 text-muted" aria-hidden />{p.name}</li>)}</ul>
            </Card>
          )}
        </aside>
      </div>

      <Dialog
        open={dialog === 'edit'}
        onClose={() => setDialog(null)}
        title="Topshiriqni tahrirlash"
        size="lg"
        footer={<><Button variant="secondary" onClick={() => setDialog(null)}>Bekor qilish</Button><Button type="submit" form="edit-assignment" loading={busy}>Saqlash</Button></>}
      >
        <AssignmentForm id="edit-assignment" withLesson={false} initial={{ title: a.title, description: a.description || '', lessonId: '', dueAt: toLocalInput(a.dueAt), maxScore: a.maxScore }} onSubmit={save} />
      </Dialog>
      <Dialog
        open={dialog === 'delete'}
        onClose={() => setDialog(null)}
        title="Topshiriqni o‘chirish"
        size="sm"
        description="Topshiriq va unga yuborilgan barcha javoblar butunlay o‘chiriladi."
        footer={<><Button variant="secondary" onClick={() => setDialog(null)}>Bekor qilish</Button><Button variant="danger" loading={busy} onClick={remove}>O‘chirish</Button></>}
      />
    </div>
  );
}
