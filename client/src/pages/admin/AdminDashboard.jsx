import { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BarChart3, BookOpen, Briefcase, ClipboardCheck, HelpCircle, Landmark, ScrollText, Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import Tabs from '../../components/ui/Tabs.jsx';
import { Skeleton } from '../../components/ui/Feedback.jsx';
import { useDocumentTitle } from '../../hooks/useApi.js';
import AdminStats from './AdminStats.jsx';

const AdminUsers = lazy(() => import('./AdminUsers.jsx'));
const AdminCareers = lazy(() => import('./AdminCareers.jsx'));
const AdminQuestions = lazy(() => import('./AdminQuestions.jsx'));
const AdminLessons = lazy(() => import('./AdminLessons.jsx'));
const AdminUniversities = lazy(() => import('./AdminUniversities.jsx'));
const AdminContentCheck = lazy(() => import('./AdminContentCheck.jsx'));
const AdminAudit = lazy(() => import('./AdminAudit.jsx'));

const TABS = [
  { value: 'stats', label: 'Statistika', icon: BarChart3, el: AdminStats },
  { value: 'users', label: 'Foydalanuvchilar', icon: Users, el: AdminUsers },
  { value: 'careers', label: 'Kasblar', icon: Briefcase, el: AdminCareers },
  { value: 'questions', label: 'Test savollari', icon: HelpCircle, el: AdminQuestions },
  { value: 'lessons', label: 'Darslar', icon: BookOpen, el: AdminLessons },
  { value: 'universities', label: 'Universitetlar', icon: Landmark, el: AdminUniversities },
  { value: 'content', label: 'Kontent tekshiruvi', icon: ClipboardCheck, el: AdminContentCheck },
  { value: 'audit', label: 'Audit jurnali', icon: ScrollText, el: AdminAudit }
];

export default function AdminDashboard() {
  useDocumentTitle('Administrator paneli');
  const [params, setParams] = useSearchParams();
  const tab = TABS.find((t) => t.value === params.get('tab')) || TABS[0];
  const Section = tab.el;

  return (
    <div>
      <PageHeader title="Administrator paneli" description="Foydalanuvchilar, kontent va platforma holatini boshqarish. Har bir muhim amal audit jurnaliga yoziladi." />
      <Tabs className="mb-6" value={tab.value} onChange={(v) => setParams(v === 'stats' ? {} : { tab: v }, { replace: true })} tabs={TABS} />
      <Suspense fallback={<Skeleton className="h-64" />}>
        <Section />
      </Suspense>
    </div>
  );
}
