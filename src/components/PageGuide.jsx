export default function PageGuide({ what, why }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        display: 'flex',
        gap: 0,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1.5px dashed var(--border2)',
        background: 'transparent',
        opacity: 0.85,
      }}>
        {/* Label strip */}
        <div style={{
          width: 32,
          background: 'var(--surface2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text3)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}>הדרכה</span>
        </div>

        {/* What */}
        <div style={{ flex: 1, padding: '14px 18px', borderRight: '1px dashed var(--border2)' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text3)',
            marginBottom: 5,
          }}>מה עושים</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>{what}</p>
        </div>

        {/* Why */}
        <div style={{ flex: 1, padding: '14px 18px' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text3)',
            marginBottom: 5,
          }}>למה זה חשוב</p>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>{why}</p>
        </div>
      </div>

      {/* Visual separator */}
      <div style={{
        height: 1,
        background: 'linear-gradient(to left, transparent, var(--border2), transparent)',
        marginTop: 28,
      }} />
    </div>
  );
}