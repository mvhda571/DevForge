import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bot, MessageSquarePlus, Send, Trash2, MessagesSquare } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import Markdown from '../../components/ui/Markdown.jsx';
import AiModeBadge from '../../components/AiModeBadge.jsx';
import { Skeleton } from '../../components/ui/Feedback.jsx';
import { api } from '../../lib/api.js';
import { cx, relativeTime } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';
import { useDocumentTitle } from '../../hooks/useApi.js';

const STARTERS = [
  'Kasb testi natijalarimni tushuntirib bering',
  'Frontend dasturchi va UI/UX dizayner farqi nima?',
  'Menga haftalik o‘quv reja tuzib bering',
  'Darajamga mos qanday loyihalar qilsam bo‘ladi?',
  'Grant va kontrakt farqi nima?',
  'Data analyst uchun qanday ko‘nikmalar kerak?'
];

export default function Advisor() {
  useDocumentTitle('AI maslahatchi');
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const activeId = params.get('c');
  const [convs, setConvs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [followups, setFollowups] = useState(STARTERS.slice(0, 3));
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingConv, setLoadingConv] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [demo, setDemo] = useState(undefined);
  const listRef = useRef(null);

  const loadList = () => api.get('/ai/conversations?kind=advisor').then((d) => setConvs(d.conversations)).catch((e) => { setConvs([]); toast.error(e); });
  useEffect(() => { loadList(); }, []);

  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      setFollowups(STARTERS.slice(0, 3));
      return;
    }
    setLoadingConv(true);
    api.get(`/ai/conversations/${activeId}`).then((d) => setMessages(d.conversation.messages)).catch((e) => { toast.error(e); setParams({}); }).finally(() => setLoadingConv(false));
  }, [activeId]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (text) => {
    const message = text.trim();
    if (!message || busy) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: message }]);
    setBusy(true);
    try {
      const d = await api.post('/ai/advisor', { message, conversationId: activeId || undefined });
      setMessages((m) => [...m, d.reply]);
      setFollowups(d.followups || []);
      setDemo(d.demo);
      if (!activeId) {
        setParams({ c: d.conversationId }, { replace: true });
        loadList();
      }
    } catch (err) {
      setMessages((m) => m.slice(0, -1));
      setInput(message);
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/ai/conversations/${toDelete}`);
      toast.success('Suhbat o‘chirildi');
      if (toDelete === activeId) setParams({});
      setToDelete(null);
      loadList();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="-mx-4 -my-6 grid h-[calc(100vh-4rem)] md:-mx-6 md:-my-8 lg:grid-cols-[280px_1fr]">
      <aside className="hidden flex-col border-r border-line bg-surface lg:flex">
        <div className="p-4">
          <Button className="w-full" icon={MessageSquarePlus} onClick={() => setParams({})}>Yangi suhbat</Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <p className="px-2 pb-2 text-xs font-medium text-muted">Suhbatlar tarixi</p>
          {convs === null ? (
            <div className="space-y-2 px-2"><Skeleton className="h-10" /><Skeleton className="h-10" /></div>
          ) : convs.length === 0 ? (
            <p className="px-2 text-sm text-muted">Hali suhbat yo‘q.</p>
          ) : (
            <ul className="space-y-0.5">
              {convs.map((c) => (
                <li key={c._id} className="group flex items-center">
                  <button onClick={() => setParams({ c: c._id })} className={cx('min-w-0 flex-1 rounded-lg px-2.5 py-2 text-left', c._id === activeId ? 'bg-primary-soft' : 'hover:bg-sunken')}>
                    <span className="block truncate text-sm text-ink">{c.title}</span>
                    <span className="text-xs text-muted">{relativeTime(c.updatedAt)}</span>
                  </button>
                  <button onClick={() => setToDelete(c._id)} className="rounded p-1.5 text-muted opacity-0 hover:text-danger focus:opacity-100 group-hover:opacity-100" aria-label={`“${c.title}” suhbatini o‘chirish`}><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <section className="flex min-h-0 flex-col" aria-label="AI kasb maslahatchisi">
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 md:px-6">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white"><Bot className="h-5 w-5" aria-hidden /></span>
          <div className="min-w-0 flex-1">
            <h1 className="font-sans text-base font-semibold tracking-normal text-ink">AI kasb maslahatchisi</h1>
            <p className="truncate text-xs text-muted">Profilingiz va test natijalaringizni hisobga oladi</p>
          </div>
          <AiModeBadge demo={demo} />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setParams({})} aria-label="Yangi suhbat"><MessageSquarePlus className="h-5 w-5" /></Button>
          {activeId && <Button variant="ghost" size="icon" onClick={() => setToDelete(activeId)} aria-label="Suhbatni o‘chirish"><Trash2 className="h-4 w-4" /></Button>}
        </header>

        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-6" aria-live="polite">
          <div className="mx-auto max-w-3xl space-y-4">
            {loadingConv ? (
              <Skeleton className="h-24" />
            ) : messages.length === 0 ? (
              <div className="py-6 text-center">
                <MessagesSquare className="mx-auto h-10 w-10 text-primary" aria-hidden />
                <h2 className="mt-3 text-xl text-ink">Nima haqida gaplashamiz?</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">Kasblar, ko‘nikmalar, o‘quv reja, loyihalar va universitetga qabul tushunchalari bo‘yicha savol bering. Aniq narx, grant yoki muddatlarni taxmin qilmayman — ularni rasmiy saytdan tekshirishni tavsiya qilaman.</p>
                <div className="mx-auto mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
                  {STARTERS.map((s) => (
                    <button key={s} onClick={() => send(s)} className="rounded-control border border-line bg-surface px-4 py-3 text-left text-sm text-ink transition-colors hover:border-primary/50">{s}</button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) =>
                m.role === 'user' ? (
                  <p key={i} className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[15px] text-white">{m.content}</p>
                ) : (
                  <div key={i} className="flex gap-3">
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-ink"><Bot className="h-4 w-4" aria-hidden /></span>
                    <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-line bg-surface px-4 py-3 text-[15px] text-ink">
                      <Markdown text={m.content} className="[&_p]:my-2" />
                      {m.demo && <p className="mt-2 text-xs text-warning">Demo javob — oldindan tayyorlangan bilimlar asosida</p>}
                    </div>
                  </div>
                )
              )
            )}
            {busy && (
              <div className="flex gap-1 pl-10" role="status" aria-label="Javob yozilmoqda">
                {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />)}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-line bg-bg px-4 py-3 md:px-6">
          <div className="mx-auto max-w-3xl">
            {messages.length > 0 && followups.length > 0 && !busy && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {followups.map((f) => <button key={f} onClick={() => send(f)} className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink hover:border-primary/50">{f}</button>)}
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <label htmlFor="advisor-input" className="sr-only">Xabar</label>
              <textarea
                id="advisor-input"
                rows={1}
                value={input}
                maxLength={2000}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Savolingizni yozing… (Shift+Enter — yangi qator)"
                className="field max-h-40 min-h-[44px] resize-none"
              />
              <Button type="submit" size="icon" className="h-11 w-11" disabled={busy || !input.trim()} aria-label="Yuborish"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </div>
      </section>

      <Dialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} title="Suhbatni o‘chirasizmi?" description="Suhbat butunlay o‘chiriladi va uni tiklab bo‘lmaydi." size="sm" footer={<><Button variant="secondary" onClick={() => setToDelete(null)}>Bekor qilish</Button><Button variant="danger" onClick={remove}>O‘chirish</Button></>} />
    </div>
  );
}
