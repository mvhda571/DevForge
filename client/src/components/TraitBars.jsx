export default function TraitBars({ traits, labels, userScores }) {
  const entries = Object.entries(traits || {}).filter(([, w]) => w > 0).sort((a, b) => b[1] - a[1]);
  return (
    <ul className="space-y-3">
      {entries.map(([key, weight]) => (
        <li key={key}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="text-ink">{labels?.[key] || key}</span>
            <span className="text-xs text-muted">{userScores ? `Siz: ${Math.round((userScores[key] || 0) * 100)}%` : `${weight === 3 ? 'Juda muhim' : weight === 2 ? 'Muhim' : 'Foydali'}`}</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-sunken">
            <div className="absolute inset-y-0 left-0 rounded-full bg-primary/25" style={{ width: `${(weight / 3) * 100}%` }} />
            {userScores && <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${(userScores[key] || 0) * 100}%` }} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
