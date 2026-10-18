import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import Shell from './layouts/Shell.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { PageSkeleton } from './components/ui/Feedback.jsx';

const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Onboarding = lazy(() => import('./pages/Onboarding.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const Careers = lazy(() => import('./pages/Careers.jsx'));
const CareerDetail = lazy(() => import('./pages/CareerDetail.jsx'));
const CareerCompare = lazy(() => import('./pages/CareerCompare.jsx'));
const Universities = lazy(() => import('./pages/Universities.jsx'));
const UniversityDetail = lazy(() => import('./pages/UniversityDetail.jsx'));
const UniversityCompare = lazy(() => import('./pages/UniversityCompare.jsx'));
const UniversityMap = lazy(() => import('./pages/UniversityMap.jsx'));

const Dashboard = lazy(() => import('./pages/student/Dashboard.jsx'));
const Assessment = lazy(() => import('./pages/student/Assessment.jsx'));
const Results = lazy(() => import('./pages/student/Results.jsx'));
const Roadmaps = lazy(() => import('./pages/student/Roadmaps.jsx'));
const RoadmapView = lazy(() => import('./pages/student/RoadmapView.jsx'));
const Library = lazy(() => import('./pages/student/Library.jsx'));
const Lesson = lazy(() => import('./pages/student/Lesson.jsx'));
const Advisor = lazy(() => import('./pages/student/Advisor.jsx'));
const Favorites = lazy(() => import('./pages/student/Favorites.jsx'));
const Reminders = lazy(() => import('./pages/student/Reminders.jsx'));
const Groups = lazy(() => import('./pages/student/Groups.jsx'));
const AssignmentView = lazy(() => import('./pages/student/AssignmentView.jsx'));
const Achievements = lazy(() => import('./pages/student/Achievements.jsx'));
const Notifications = lazy(() => import('./pages/Notifications.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

const TeacherDashboard = lazy(() => import('./pages/teacher/TeacherDashboard.jsx'));
const TeacherGroup = lazy(() => import('./pages/teacher/TeacherGroup.jsx'));
const TeacherAssignment = lazy(() => import('./pages/teacher/TeacherAssignment.jsx'));
const TeacherStudent = lazy(() => import('./pages/teacher/TeacherStudent.jsx'));
const ParentDashboard = lazy(() => import('./pages/parent/ParentDashboard.jsx'));
const ParentStudent = lazy(() => import('./pages/parent/ParentStudent.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));

const ALL = ['student', 'teacher', 'parent', 'admin'];
const guard = (el, roles, opts) => <ProtectedRoute roles={roles} {...opts}>{el}</ProtectedRoute>;

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="mx-auto max-w-content p-6"><PageSkeleton /></div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>

          <Route path="onboarding" element={guard(<Onboarding />, ['student', 'teacher', 'parent'], { allowIncompleteOnboarding: true })} />

          <Route element={<Shell />}>
            <Route path="careers" element={<Careers />} />
            <Route path="careers/compare" element={<CareerCompare />} />
            <Route path="careers/:slug" element={<CareerDetail />} />
            <Route path="universities" element={<Universities />} />
            <Route path="universities/compare" element={<UniversityCompare />} />
            <Route path="universities/:slug" element={<UniversityDetail />} />
            <Route path="map" element={<UniversityMap />} />
          </Route>

          <Route element={guard(<AppLayout />, ALL)}>
            <Route path="app" element={guard(<Dashboard />, ['student'])} />
            <Route path="app/assessment" element={guard(<Assessment />, ['student'])} />
            <Route path="app/results" element={guard(<Results />, ['student'])} />
            <Route path="app/roadmaps" element={guard(<Roadmaps />, ['student'])} />
            <Route path="app/roadmaps/:id" element={guard(<RoadmapView />, ['student'])} />
            <Route path="app/lessons" element={<Library />} />
            <Route path="app/lessons/:slug" element={<Lesson />} />
            <Route path="app/advisor" element={guard(<Advisor />, ['student'])} />
            <Route path="app/favorites" element={guard(<Favorites />, ['student'])} />
            <Route path="app/reminders" element={guard(<Reminders />, ['student'])} />
            <Route path="app/groups" element={guard(<Groups />, ['student'])} />
            <Route path="app/assignments/:id" element={guard(<AssignmentView />, ['student'])} />
            <Route path="app/achievements" element={guard(<Achievements />, ['student'])} />
            <Route path="app/notifications" element={<Notifications />} />
            <Route path="app/settings" element={<Settings />} />

            <Route path="teacher" element={guard(<TeacherDashboard />, ['teacher', 'admin'])} />
            <Route path="teacher/groups/:id" element={guard(<TeacherGroup />, ['teacher', 'admin'])} />
            <Route path="teacher/groups/:id/students/:studentId" element={guard(<TeacherStudent />, ['teacher', 'admin'])} />
            <Route path="teacher/assignments/:id" element={guard(<TeacherAssignment />, ['teacher', 'admin'])} />

            <Route path="parent" element={guard(<ParentDashboard />, ['parent'])} />
            <Route path="parent/students/:id" element={guard(<ParentStudent />, ['parent'])} />

            <Route path="admin" element={guard(<AdminDashboard />, ['admin'])} />
          </Route>

          <Route path="home" element={<Navigate to="/" replace />} />
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
