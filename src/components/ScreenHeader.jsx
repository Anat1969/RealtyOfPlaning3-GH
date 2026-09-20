export default function ScreenHeader({ eyebrow, title, subtitle, progress }) {
  const renderTitle = (t) => {
    if (!t) return null;
    const parts = t.split(/(\[italic(?: amber)?\].*?\[\/\])/g);
    return parts.map((part, i) => {
      const amberMatch = part.match(/\[italic amber\](.*?)\[\/\]/);
      const italicMatch = part.match(/\[italic\](.*?)\[\/\]/);
      if (amberMatch) return <em key={i} style={{ fontStyle: 'italic', color: 'var(--amber)' }}>{amberMatch[1]}</em>;
      if (italicMatch) return <em key={i} style={{ fontStyle: 'italic' }}>{italicMatch[1]}</em>;
      return part;
    });
  };

  return (
    <header style={{ marginBottom: 48 }}>
      {eyebrow && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
          {eyebrow}
        </p>
      )}
      <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(32px, 6vw, 62px)', fontWeight: 700, color: 'var(--paper)', lineHeight: 1.15, marginBottom: 14 }}>
        {renderTitle(title)}
      </h1>
      {subtitle && (
        <p className="breathing" style={{ fontSize: 'clamp(16px, 2.4vw, 20px)', color: 'var(--text2)', fontWeight: 300, maxWidth: 600 }}>
          {subtitle}
        </p>
      )}
      {progress !== undefined && (
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1, height: 2, background: 'var(--border)', borderRadius: 1, overflow: 'hidden' }}>
            <div
              className="progress-fill-gradient"
              style={{ width: `${progress}%`, height: '100%', borderRadius: 1, transition: 'width 0.4s ease' }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>{progress}%</span>
        </div>
      )}
    </header>
  );
}