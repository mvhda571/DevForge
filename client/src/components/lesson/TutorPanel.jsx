import { useEffect, useRef, useState } from 'react';
import { Bot, ClipboardCheck, Lightbulb, ListOrdered, MessageCircleQuestion, Repeat2, Send, Sparkles, Trash2, Wrench } from 'lucide-react';
import Markdown from '../ui/Markdown.jsx';
import AiModeBadge from '../AiModeBadge.jsx';
import { api } from '../../lib/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { cx } from '../../lib/format.js';

export const TUTOR_ACTIONS = [
  { action: 'explain_again', label: 'Tushunmadim', icon: MessageCircleQuestion },
  { action: 'simpler', label: 'Soddaroq tushuntir', icon: Sparkles },
  { action: 'another_example', label: 'Boshqa misol ber', icon: Repeat2 },
  { action: 'step_by_step', label: 'Bosqichma-bosqich ko‘rsat', icon: ListOrdered },
  { action: 'check_me', label: 'Meni tekshir', icon: ClipboardCheck },
  { action: 'practice', label: 'Amaliy topshiriq ber', icon: Wrench },
  { action: 'hint', label: 'Maslahat ber', icon: Lightbulb }
];

export default function TutorPanel({ lesson, request, onRequestHandled, className }) {
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [concept, setConcept] = useState('');
  const [lastDemo, setLastDemo] = useState(null);
  const listRef = useRef(null);
  const handledRef = useRef(null);

  useEffect(() => {
    let alive = true;
    api.get(`/ai/tutor/${lesson._id}`).then((d) => alive && setMessages(d.conversation?.messages || [])).catch(() => {});
    return () => {
      alive = false;
    };
  }, [lesson._id]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (action, message = '', conceptOverride) => {
    if (busy) return;
    const c = conceptOverride ?? concept;
    const label = TUTOR_ACTIONS.find((a) => a.action === action)?.label;
    const userText = action === 'free' ? message : `${label}${c ? `: ${c}` : ''}`;
    setMessages((m) => [...m, { role: 'user', content: userText, _pending: true }]);
    setBusy(true);
    try {
      const d = await api.post('/ai/tutor', { lessonId: lesson._id, action, message: message || undefined, concept: c || undefined });
      setMessages((m) => [...m.filter((x) => !x._pending), { role: 'user', content: userText }, d.reply]);
      setLastDemo({ demo: d.demo, fallback: d.fallback });
      if (d.fallback) toast.info('AI provayder vaqtincha javob bermadi, demo javob ko‘rsatildi.');
    } catch (err) {
      setMessages((m) => m.filter((x) => !x._pending));
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!request || handledRef.current === request.nonce) return;
    handledRef.current = request.nonce;
    if (request.concept) setConcept(request.concept);
    send(request.action, '', request.concept || '');
    onRequestHandled?.();
  }, [request]);

  const submit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    send('free', text);
  };

  const clear = async () => {
    try {
      await api.delete(`/ai/tutor/${lesson._id}`);
      setMessages([]);
      toast.success('Suhbat tozalandi');
    } catch (err) {
      toast.error(err);
    }
  };

  const concepts = (lesson.definitions || []).map((d) => d.term);

  return (
    <section className={cx('flex min-h-0 flex-col', className)} aria-label="AI ustoz">
      <header className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white"><Bot className="h-4 w-4" aria-hidden /></span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">AI ustoz</p>
          <p className="truncate text-xs text-muted">{lesson.title}</p>
        </div>
        <AiModeBadge demo={lastDemo?.demo} />
        {messages.length > 0 && (
          <button onClick={clear} className="rounded-control p-1.5 text-muted hover:bg-sunken hover:text-danger" aria-label="Suhbatni tozalash"><Trash2 className="h-4 w-4" /></button>
        )}
      </header>

      <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.length === 0 && !busy && (
          <div className="rounded-control bg-sunken/70 p-4 text-sm text-muted">
            <p className="font-medium text-ink">Men shu dars bo‘yicha yordam beraman.</p>
            <p className="mt-1">Quyidagi tugmalardan birini bosing yoki savolingizni yozing. Topshiriqlarda javobni darhol aytmayman — o‘ylashga yordam beraman.</p>
          </div>
        )}
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <p key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-white">{m.content}</p>
          ) : (
            <div key={i} className="max-w-[95%] rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink">
              <Markdown text={m.content} className="[&_p]:my-1.5 [&_ul]:my-1.5 [&_ol]:my-1.5" />
              {m.demo && <p className="mt-1.5 text-[11px] text-warning">Demo javob</p>}
            </div>
          )
        )}
        {busy && (
          <div className="flex w-16 items-center gap-1 rounded-2xl border border-line bg-surface px-3.5 py-3" role="status" aria-label="AI javob yozmoqda">
            {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />)}
          </div>
        )}
      </div>

      <div className="border-t border-line p-3">
        {concepts.length > 0 && (
          <label className="mb-2 flex items-center gap-2 text-xs text-muted">
            Tushuncha:
            <select value={concept} onChange={(e) => setConcept(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-2 py-1 text-xs text-ink">
              <option value="">Butun dars</option>
              {concepts.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        )}
        <div className="mb-2 flex flex-wrap gap-1.5">
          {TUTOR_ACTIONS.map((a) => (
            <button key={a.action} type="button" disabled={busy} onClick={() => send(a.action)} className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-ink transition-colors hover:border-primary/50 hover:text-primary-ink disabled:opacity-50">
              <a.icon className="h-3.5 w-3.5" aria-hidden />
              {a.label}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="flex gap-2">
          <label className="sr-only" htmlFor={`tutor-input-${lesson._id}`}>AI ustozga savol</label>
          <input id={`tutor-input-${lesson._id}`} value={input} onChange={(e) => setInput(e.target.value)} maxLength={2000} placeholder="Savol yoki javobingizni yozing…" className="field py-2 text-sm" />
          <button type="submit" disabled={busy || !input.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-control bg-primary text-white hover:bg-primary-ink disabled:opacity-50" aria-label="Yuborish">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
