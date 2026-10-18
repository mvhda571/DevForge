import { useEffect, useState } from 'react';
import { Sparkles, FlaskConical } from 'lucide-react';
import { api } from '../lib/api.js';
import Badge from './ui/Badge.jsx';
import Tooltip from './ui/Tooltip.jsx';

let cached = null;

export function useAiStatus() {
  const [status, setStatus] = useState(cached);
  useEffect(() => {
    if (cached) return;
    api.get('/ai/status').then((s) => {
      cached = s;
      setStatus(s);
    }).catch(() => setStatus({ mode: 'demo' }));
  }, []);
  return status;
}

export default function AiModeBadge({ demo }) {
  const status = useAiStatus();
  const isDemo = demo ?? status?.mode !== 'live';
  if (!status && demo === undefined) return null;
  return isDemo ? (
    <Tooltip content="AI provayder sozlanmagan. Javoblar dars materiallari asosida tayyorlangan demo javoblardir.">
      <Badge tone="warning" icon={FlaskConical}>Demo rejim</Badge>
    </Tooltip>
  ) : (
    <Badge tone="success" icon={Sparkles}>AI faol</Badge>
  );
}
