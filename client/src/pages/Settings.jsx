import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, HeartHandshake, KeyRound, Shield, Trash2, UserRound, Bell, GraduationCap } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Dialog from '../components/ui/Dialog.jsx';
import { ChipGroup, Input, Select, Textarea, Toggle } from '../components/ui/Field.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useApi, useDocumentTitle } from '../hooks/useApi.js';
import { api } from '../lib/api.js';
import { formatDate } from '../lib/format.js';

const INTERESTS = ['Texnologiya', 'Dizayn', 'Tibbiyot', 'Biznes', 'Fan va tadqiqot', 'San’at', 'Sport', 'Ijtimoiy faoliyat', 'Huquq', 'Muhandislik', 'Ta’lim', 'Til o‘rganish'];
const SUBJECTS = ['Matematika', 'Informatika', 'Fizika', 'Kimyo', 'Biologiya', 'Ingliz tili', 'Ona tili va adabiyot', 'Tarix', 'Iqtisodiyot', 'Tasviriy san’at', 'Geografiya'];
const year = new Date().getFullYear();

function ProfileCard() {
  const { user, setSession } = useAuth();
  const toast = useToast();
  const [name, setName] = useState(user.name);
  const [birthYear, setBirthYear] = useState(user.birthYear || '');
  const [saving, setSaving] = useState(false);
  const save = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error('Ism kamida 2 belgidan iborat bo‘lsin');
    const by = birthYear === '' ? null : Number(birthYear);
    if (by !== null && (by < year - 100 || by > year - 6)) return toast.error('Tug‘ilgan yil noto‘g‘ri');
    setSaving(true);
    try {
      setSession(await api.patch('/users/me', { name: name.trim(), birthYear: by }));
      toast.success('Profil saqlandi');
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
    return undefined;
  };
  return (
    <Card title="Profil" description={`${user.email} · ${{ student: 'O‘quvchi', teacher: 'O‘qituvchi', parent: 'Ota-ona', admin: 'Administrator' }[user.role]}`}>
      <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
        <Input label="Ism" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
        <Input label="Tug‘ilgan yil" optional type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
        <div className="sm:col-span-2"><Button type="submit" loading={saving}>Saqlash</Button></div>
      </form>
    </Card>
  );
}

function LearningCard() {
  const { profile, setSession } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ level: profile?.level || 'beginner', interests: profile?.interests || [], favoriteSubjects: profile?.favoriteSubjects || [], dailyMinutes: profile?.dailyMinutes || 30, studyDaysPerWeek: profile?.studyDaysPerWeek || 5, goal: profile?.goal || '' });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    try {
      setSession(await api.put('/users/me/onboarding', { ...form, dailyMinutes: Number(form.dailyMinutes), studyDaysPerWeek: Number(form.studyDaysPerWeek), complete: true }));
      toast.success('O‘quv profili saqlandi');
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Card title="O‘quv profili" description="Bu ma’lumotlar yo‘l xaritasi, kunlik reja va AI tavsiyalarida ishlatiladi.">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <Select label="Daraja" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} options={[{ value: 'beginner', label: 'Boshlang‘ich' }, { value: 'intermediate', label: 'O‘rta' }, { value: 'advanced', label: 'Yuqori' }]} />
          <Input label="Kunlik vaqt (daqiqa)" type="number" min={10} max={240} value={form.dailyMinutes} onChange={(e) => setForm({ ...form, dailyMinutes: e.target.value })} />
          <Input label="Haftasiga kun" type="number" min={1} max={7} value={form.studyDaysPerWeek} onChange={(e) => setForm({ ...form, studyDaysPerWeek: e.target.value })} />
        </div>
        <ChipGroup label="Qiziqishlar" options={INTERESTS} value={form.interests} onChange={(v) => setForm({ ...form, interests: v })} />
        <ChipGroup label="Sevimli fanlar" options={SUBJECTS} value={form.favoriteSubjects} onChange={(v) => setForm({ ...form, favoriteSubjects: v })} max={4} />
        <Textarea label="Asosiy maqsad" rows={2} maxLength={300} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
        <Button onClick={save} loading={saving}>Saqlash</Button>
      </div>
    </Card>
  );
}

function PasswordCard() {
  const toast = useToast();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [saving, setSaving] = useState(false);
  const save = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8 || !/[A-Za-z]/.test(form.newPassword) || !/\d/.test(form.newPassword)) return toast.error('Yangi parol kamida 8 belgi, bitta harf va bitta raqamdan iborat bo‘lsin');
    setSaving(true);
    try {
      await api.post('/auth/change-password', form);
      setForm({ currentPassword: '', newPassword: '' });
      toast.success('Parol o‘zgartirildi. Boshqa qurilmalardagi sessiyalar yopildi.');
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
    return undefined;
  };
  return (
    <Card title="Parol">
      <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
        <Input label="Joriy parol" type="password" autoComplete="current-password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
        <Input label="Yangi parol" type="password" autoComplete="new-password" hint="Kamida 8 belgi, harf va raqam" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
        <div className="sm:col-span-2"><Button type="submit" variant="secondary" loading={saving} disabled={!form.currentPassword || !form.newPassword}>Parolni o‘zgartirish</Button></div>
      </form>
    </Card>
  );
}

function NotificationsCard() {
  const { user, setSession } = useAuth();
  const toast = useToast();
  const prefs = user.notificationPrefs || {};
  const update = async (key, value) => {
    try {
      setSession(await api.patch('/users/me', { notificationPrefs: { [key]: value } }));
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <Card title="Bildirishnomalar" description="Bildirishnomalar ilova ichida ko‘rsatiladi.">
      <div className="space-y-4">
        <Toggle label="O‘qish eslatmalari" checked={prefs.reminders !== false} onChange={(v) => update('reminders', v)} />
        <Toggle label="Ariza muddatlari" checked={prefs.deadlines !== false} onChange={(v) => update('deadlines', v)} />
        <Toggle label="Yutuqlar" checked={prefs.achievements !== false} onChange={(v) => update('achievements', v)} />
        <Toggle label="Guruh va topshiriqlar" checked={prefs.groupUpdates !== false} onChange={(v) => update('groupUpdates', v)} />
        <div className="flex items-start justify-between gap-4 opacity-70">
          <div><p className="text-sm font-medium text-ink">Email va SMS</p><p className="text-[13px] text-muted">Server tomonida email/SMS xizmati sozlanmagan — hozircha mavjud emas.</p></div>
          <Badge tone="outline">Sozlanmagan</Badge>
        </div>
      </div>
    </Card>
  );
}

function FamilyCard() {
  const toast = useToast();
  const { data, reload } = useApi('/parents/links');
  const respond = async (id, accept) => {
    try {
      await api.post(`/parents/links/${id}/respond`, { accept });
      toast.success(accept ? 'Bog‘lanish tasdiqlandi' : 'So‘rov rad etildi');
      reload();
    } catch (err) {
      toast.error(err);
    }
  };
  const revoke = async (id) => {
    try {
      await api.delete(`/parents/links/${id}`);
      toast.success('Bog‘lanish bekor qilindi');
      reload();
    } catch (err) {
      toast.error(err);
    }
  };
  const links = data?.links || [];
  return (
    <Card title="Ota-ona bog‘lanishi" description="Tasdiqlangan ota-ona o‘quv progressingiz, test xulosalari va muddatlarni ko‘radi. AI suhbatlari va shaxsiy eslatmalar ko‘rsatilmaydi.">
      <div id="family" className="scroll-mt-24">
        {!links.length ? (
          <p className="text-sm text-muted">Bog‘lanish so‘rovlari yo‘q. Ota-onangiz o‘z hisobidan email manzilingiz orqali so‘rov yuborishi mumkin.</p>
        ) : (
          <ul className="divide-y divide-line">
            {links.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{l.parent?.name} <span className="font-normal text-muted">({l.relation})</span></p>
                  <p className="text-xs text-muted">{l.parent?.email} · {formatDate(l.createdAt)}</p>
                </div>
                {l.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => respond(l.id, true)}>Tasdiqlash</Button>
                    <Button size="sm" variant="secondary" onClick={() => respond(l.id, false)}>Rad etish</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge tone="success">Faol</Badge>
                    <Button size="sm" variant="ghost" onClick={() => revoke(l.id)}>Bekor qilish</Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function DataCard() {
  const toast = useToast();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [busy, setBusy] = useState(false);

  const exportData = async () => {
    try {
      const data = await api.get('/users/me/export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'devforge-malumotlarim.json';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Ma’lumotlar yuklab olindi');
    } catch (err) {
      toast.error(err);
    }
  };
  const clearAi = async () => {
    try {
      const d = await api.delete('/ai/conversations');
      toast.success(`${d.deleted} ta AI suhbat o‘chirildi`);
    } catch (err) {
      toast.error(err);
    }
  };
  const deleteAccount = async () => {
    setBusy(true);
    try {
      await api.delete('/users/me', form);
      setSession(null);
      toast.success('Hisobingiz va ma’lumotlaringiz o‘chirildi');
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title="Ma’lumotlar va maxfiylik">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-sm font-medium text-ink">Ma’lumotlarimni yuklab olish</p><p className="text-[13px] text-muted">Profil, natijalar, progress va suhbatlar JSON faylda.</p></div>
          <Button variant="secondary" size="sm" icon={Download} onClick={exportData}>Yuklab olish</Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-sm font-medium text-ink">AI suhbatlarini o‘chirish</p><p className="text-[13px] text-muted">AI ustoz va maslahatchi bilan barcha yozishmalar.</p></div>
          <Button variant="secondary" size="sm" onClick={clearAi}>O‘chirish</Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <div><p className="text-sm font-medium text-danger">Hisobni o‘chirish</p><p className="text-[13px] text-muted">Hisob va unga bog‘liq barcha ma’lumotlar butunlay o‘chiriladi.</p></div>
          <Button variant="danger" size="sm" icon={Trash2} onClick={() => setOpen(true)}>Hisobni o‘chirish</Button>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title="Hisobni butunlay o‘chirish" description="Bu amalni qaytarib bo‘lmaydi. Profil, natijalar, yo‘l xaritalari, progress, suhbatlar va bog‘lanishlar o‘chiriladi." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Bekor qilish</Button><Button variant="danger" loading={busy} disabled={form.confirm !== 'O‘CHIRISH' || !form.password} onClick={deleteAccount}>Butunlay o‘chirish</Button></>}>
        <div className="space-y-4">
          <Input label="Parolingiz" type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Input label="Tasdiqlash uchun O‘CHIRISH deb yozing" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value.replace(/'/g, '‘') })} />
        </div>
      </Dialog>
    </Card>
  );
}

export default function Settings() {
  useDocumentTitle('Sozlamalar');
  const { user } = useAuth();
  useEffect(() => {
    if (window.location.hash) setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 200);
  }, []);
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Sozlamalar" />
      <ProfileCard />
      {user.role === 'student' && <LearningCard />}
      <PasswordCard />
      <NotificationsCard />
      {user.role === 'student' && <FamilyCard />}
      <DataCard />
    </div>
  );
}
