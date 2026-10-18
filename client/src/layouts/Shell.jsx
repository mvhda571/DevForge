import { useAuth } from '../context/AuthContext.jsx';
import AppLayout from './AppLayout.jsx';
import PublicLayout from './PublicLayout.jsx';
import { Spinner } from '../components/ui/Feedback.jsx';

export default function Shell() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner className="min-h-screen" />;
  return user ? <AppLayout /> : <PublicLayout contained />;
}
