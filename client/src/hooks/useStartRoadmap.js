import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { useCelebrate } from '../context/CelebrationContext.jsx';

export function useStartRoadmap() {
  const [pending, setPending] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const celebrate = useCelebrate();

  const start = async (careerSlug) => {
    setPending(careerSlug);
    try {
      const data = await api.post('/roadmaps', { careerSlug });
      if (data.existed) toast.info('Bu kasb uchun yo‘l xaritangiz allaqachon bor — u faol qilindi');
      else toast.success('Yo‘l xaritasi yaratildi');
      celebrate(data.newAchievements);
      navigate(`/app/roadmaps/${data.roadmap.id}`);
    } catch (err) {
      toast.error(err);
    } finally {
      setPending(null);
    }
  };
  return { start, pending };
}
