import { Fragment } from 'react';

function inline(text, keyPrefix) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (tok.startsWith('**')) parts.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('`')) parts.push(<code key={key}>{tok.slice(1, -1)}</code>);
    else parts.push(<em key={key}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Markdown({ text = '', className = '' }) {
  const blocks = [];
  const lines = String(text).replace(/\r/g, '').split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
      i += 1;
      blocks.push({ type: 'code', content: code.join('\n') });
    } else if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, ''));
      blocks.push({ type: 'ul', items });
    } else if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ''));
      blocks.push({ type: 'ol', items });
    } else if (line.trim() === '') {
      i += 1;
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() !== '' && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i]) && !lines[i].trim().startsWith('```')) para.push(lines[i++]);
      blocks.push({ type: 'p', content: para.join('\n') });
    }
  }
  return (
    <div className={`prose-df ${className}`}>
      {blocks.map((b, bi) => {
        if (b.type === 'code') return <pre key={bi}><code>{b.content}</code></pre>;
        if (b.type === 'ul' || b.type === 'ol') {
          const Tag = b.type;
          return <Tag key={bi}>{b.items.map((it, ii) => <li key={ii}>{inline(it, `${bi}-${ii}`)}</li>)}</Tag>;
        }
        return (
          <p key={bi}>
            {b.content.split('\n').map((ln, li) => (
              <Fragment key={li}>{li > 0 && <br />}{inline(ln, `${bi}-${li}`)}</Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
