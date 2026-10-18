import { useState } from 'react';
import { ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Dialog from '../../components/ui/Dialog.jsx';
import { Input, Select, Textarea, Toggle } from '../../components/ui/Field.jsx';
import { ErrorState, Skeleton } from '../../components/ui/Feedback.jsx';
import { useApi } from '../../hooks/useApi.js';
import { lines, useAction } from '../../hooks/useAction.js';
import { useToast } from '../../context/ToastContext.jsx';
import { api } from '../../lib/api.js';
import { formatDate } from '../../lib/format.js';
import { DATA_STATUS } from '../Universities.jsx';

const EMPTY = {
  slug: '', name: '', localName: '', country: '', city: '', website: '', type: 'public', description: '', fields: [], degreeLevels: [], languages: [],
  tuition: { min: null, max: null, currency: 'USD', period: 'yil', note: '', verified: false, source: '' },
  admission: { requirements: [], verified: false, source: '' },
  location: { lat: null, lng: null, approximate: true },
  dataStatus: 'demo', lastVerifiedAt: null, active: true
};

const numOrNull = (v) => (v === '' || v === null || v === undefined ? null : Number(v));

function UniversityForm({ initial, isNew, onSubmit }) {
  const toast = useToast();
  const u = { ...EMPTY, ...initial, tuition: { ...EMPTY.tuition, ...initial.tuition }, admission: { ...EMPTY.admission, ...initial.admission }, location: { ...EMPTY.location, ...initial.location } };
  const [f, setF] = useState({
    ...u,
    fields: u.fields.join('\n'),
    degreeLevels: u.degreeLevels.join(', '),
    languages: u.languages.join(', '),
    requirements: u.admission.requirements.join('\n'),
    lastVerifiedAt: u.lastVerifiedAt ? String(u.lastVerifiedAt).slice(0, 10) : ''
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setNested = (group, k, v) => setF({ ...f, [group]: { ...f[group], [k]: v } });
  const csv = (s) => s.split(',').map((x) => x.trim()).filter(Boolean);

  const submit = (e) => {
    e.preventDefault();
    if (!/^[a-z0-9-]+$/.test(f.slug)) return toast.error('Slug faqat kichik lotin harflari, raqam va chiziqcha');
    if (f.name.trim().length < 2 || f.country.trim().length < 2 || f.city.trim().length < 2) return toast.error('Nomi, davlat va shaharni kiriting');
    if (f.website && !/^https?:\/\//.test(f.website)) return toast.error('Sayt manzili http(s):// bilan boshlansin');
    const lat = numOrNull(f.location.lat);
    const lng = numOrNull(f.location.lng);
    if ((lat === null) !== (lng === null) || (lat !== null && (Math.abs(lat) > 90 || Math.abs(lng) > 180))) return toast.error('Koordinatalar noto‘g‘ri');
    if (f.tuition.verified && !f.tuition.source.trim()) return toast.error('Tasdiqlangan to‘lov uchun manba ko‘rsating');
    if (f.admission.verified && !f.admission.source.trim()) return toast.error('Tasdiqlangan talablar uchun manba ko‘rsating');
    onSubmit({
      slug: f.slug,
      name: f.name.trim(),
      localName: f.localName.trim(),
      country: f.country.trim(),
      city: f.city.trim(),
      website: f.website.trim(),
      type: f.type,
      description: f.description.trim(),
      fields: lines(f.fields),
      degreeLevels: csv(f.degreeLevels),
      languages: csv(f.languages),
      tuition: { ...f.tuition, min: numOrNull(f.tuition.min), max: numOrNull(f.tuition.max) },
      admission: { requirements: lines(f.requirements), verified: f.admission.verified, source: f.admission.source.trim() },
      location: { lat, lng, approximate: f.location.approximate },
      dataStatus: f.dataStatus,
      lastVerifiedAt: f.lastVerifiedAt || null,
      active: f.active
    });
  };

  return (
    <form id="uni-form" onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nomi" value={f.name} onChange={set('name')} maxLength={200} />
        <Input label="Slug" value={f.slug} onChange={set('slug')} disabled={!isNew} maxLength={80} />
        <Input label="Mahalliy nomi" optional value={f.localName} onChange={set('localName')} maxLength={200} />
        <Input label="Rasmiy sayt" optional value={f.website} onChange={set('website')} placeholder="https://" maxLength={300} />
        <Input label="Davlat" value={f.country} onChange={set('country')} maxLength={60} />
        <Input label="Shahar" value={f.city} onChange={set('city')} maxLength={80} />
        <Select label="Turi" value={f.type} onChange={set('type')} options={[{ value: 'public', label: 'Davlat' }, { value: 'private', label: 'Xususiy' }]} />
        <Select label="Ma’lumot holati" value={f.dataStatus} onChange={set('dataStatus')} options={Object.entries(DATA_STATUS).map(([value, s]) => ({ value, label: s.label }))} />
        <Input label="Oxirgi tekshiruv sanasi" optional type="date" value={f.lastVerifiedAt} onChange={set('lastVerifiedAt')} />
      </div>
      <Textarea label="Tavsif" optional rows={3} value={f.description} onChange={set('description')} maxLength={2000} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Textarea label="Yo‘nalishlar" hint="Har qatorda bitta" rows={4} value={f.fields} onChange={set('fields')} />
        <Input label="Daraja" hint="Vergul bilan: Bakalavr, Magistr" value={f.degreeLevels} onChange={set('degreeLevels')} />
        <Input label="Ta’lim tillari" hint="Vergul bilan" value={f.languages} onChange={set('languages')} />
      </div>

      <fieldset className="space-y-3 rounded-control border border-line p-3">
        <legend className="px-1 text-sm font-semibold text-ink">To‘lov</legend>
        <div className="grid gap-3 sm:grid-cols-4">
          <Input label="Min" type="number" min={0} value={f.tuition.min ?? ''} onChange={(e) => setNested('tuition', 'min', e.target.value)} />
          <Input label="Maks" type="number" min={0} value={f.tuition.max ?? ''} onChange={(e) => setNested('tuition', 'max', e.target.value)} />
          <Input label="Valyuta" value={f.tuition.currency} onChange={(e) => setNested('tuition', 'currency', e.target.value)} maxLength={5} />
          <Input label="Davr" value={f.tuition.period} onChange={(e) => setNested('tuition', 'period', e.target.value)} maxLength={20} />
        </div>
        <Input label="Manba (havola yoki hujjat)" optional value={f.tuition.source} onChange={(e) => setNested('tuition', 'source', e.target.value)} maxLength={300} />
        <Toggle label="Tasdiqlangan" description="Faqat rasmiy manba bilan solishtirilgan bo‘lsa yoqing" checked={f.tuition.verified} onChange={(v) => setNested('tuition', 'verified', v)} />
      </fieldset>

      <fieldset className="space-y-3 rounded-control border border-line p-3">
        <legend className="px-1 text-sm font-semibold text-ink">Qabul talablari</legend>
        <Textarea label="Talablar" hint="Har qatorda bitta" rows={3} value={f.requirements} onChange={set('requirements')} />
        <Input label="Manba" optional value={f.admission.source} onChange={(e) => setNested('admission', 'source', e.target.value)} maxLength={300} />
        <Toggle label="Tasdiqlangan" checked={f.admission.verified} onChange={(v) => setNested('admission', 'verified', v)} />
      </fieldset>

      <fieldset className="space-y-3 rounded-control border border-line p-3">
        <legend className="px-1 text-sm font-semibold text-ink">Joylashuv</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Kenglik (lat)" type="number" step="any" value={f.location.lat ?? ''} onChange={(e) => setNested('location', 'lat', e.target.value)} />
          <Input label="Uzunlik (lng)" type="number" step="any" value={f.location.lng ?? ''} onChange={(e) => setNested('location', 'lng', e.target.value)} />
        </div>
        <Toggle label="Taxminiy koordinata" checked={f.location.approximate} onChange={(v) => setNested('location', 'approximate', v)} />
      </fieldset>
      <Toggle label="Faol" description="Nofaol universitetlar katalogda ko‘rinmaydi" checked={f.active} onChange={(v) => setF({ ...f, active: v })} />
      <p className="text-xs text-muted">Grantlar va muddatlar ro‘yxati seed fayli orqali boshqariladi; tahrirlash ularni saqlab qoladi.</p>
    </form>
  );
}

export default function AdminUniversities() {
  const { data, loading, error, reload } = useApi('/admin/universities?limit=100');
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [run, busy] = useAction();

  const save = async (body) => {
    const ok = editing.isNew
      ? await run(() => api.post('/admin/universities', body), 'Universitet qo‘shildi')
      : await run(() => api.put(`/admin/universities/${editing.u._id}`, body), 'Universitet yangilandi');
    if (ok) { setEditing(null); reload(); }
  };
  const remove = async () => {
    if (await run(() => api.delete(`/admin/universities/${deleting._id}`), 'Universitet o‘chirildi')) { setDeleting(null); reload(); }
  };

  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (loading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button icon={Plus} onClick={() => setEditing({ isNew: true, u: EMPTY })}>Universitet qo‘shish</Button></div>
      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr>
              <th className="px-4 py-3 font-medium" scope="col">Universitet</th>
              <th className="px-4 py-3 font-medium" scope="col">Joylashuv</th>
              <th className="px-4 py-3 font-medium" scope="col">Holat</th>
              <th className="px-4 py-3 font-medium" scope="col">Tekshirilgan</th>
              <th className="px-4 py-3" scope="col"><span className="sr-only">Amallar</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.universities.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{u.name} {!u.active && <Badge>Nofaol</Badge>}</p>
                  {u.website && <a href={u.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted hover:text-primary-ink">{u.website.replace(/^https?:\/\//, '')}<ExternalLink className="h-3 w-3" aria-hidden /></a>}
                </td>
                <td className="px-4 py-3 text-muted">{u.city}, {u.country}</td>
                <td className="px-4 py-3"><Badge tone={DATA_STATUS[u.dataStatus]?.tone}>{DATA_STATUS[u.dataStatus]?.label}</Badge></td>
                <td className="px-4 py-3 text-muted">{u.lastVerifiedAt ? formatDate(u.lastVerifiedAt) : '—'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Button size="iconSm" variant="ghost" onClick={() => setEditing({ isNew: false, u })} aria-label={`${u.name}ni tahrirlash`}><Pencil className="h-4 w-4" /></Button>
                  <Button size="iconSm" variant="ghost" onClick={() => setDeleting(u)} aria-label={`${u.name}ni o‘chirish`}><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={editing?.isNew ? 'Yangi universitet' : `Tahrirlash: ${editing?.u.name}`}
        size="lg"
        footer={<><Button variant="secondary" onClick={() => setEditing(null)}>Bekor qilish</Button><Button type="submit" form="uni-form" loading={busy}>Saqlash</Button></>}
      >
        {editing && <UniversityForm key={editing.u._id || 'new'} initial={editing.u} isNew={editing.isNew} onSubmit={save} />}
      </Dialog>
      <Dialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Universitetni o‘chirish"
        size="sm"
        description={deleting ? `${deleting.name} katalogdan butunlay o‘chiriladi. Faqat yashirish kerak bo‘lsa, “Faol” belgisini o‘chiring.` : ''}
        footer={<><Button variant="secondary" onClick={() => setDeleting(null)}>Bekor qilish</Button><Button variant="danger" loading={busy} onClick={remove}>O‘chirish</Button></>}
      />
    </div>
  );
}
