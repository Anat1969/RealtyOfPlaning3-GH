import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { idbEntries } from '../lib/imageStore';

const SECTIONS = [
  {
    label: 'חשיפה',
    items: [
      { num: '01', label: 'מבוא למודל', path: '/' },
      { num: '02', label: 'חדר המתח', path: '/tension-room' },
      { num: '03', label: 'שלוש הדיסציפלינות', path: '/disciplines' },
      { num: '04', label: 'רגע הסינתזה', path: '/synthesis' },
    ],
  },
  {
    label: 'הבנה',
    items: [
      { num: '05', label: 'ששת הקריטריונים', path: '/criteria' },
      { num: '06', label: 'מפת יחסים', path: '/relations' },
      { num: '07', label: 'כיול וריאציות', path: '/calibration' },
    ],
  },
  {
    label: 'שימוש',
    items: [
      { num: '08', label: 'שישת הכלים', path: '/tools' },
      { num: '09', label: 'פרומפטים', path: '/prompts' },
    ],
  },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const [backupState, setBackupState] = useState('idle'); // idle | working | empty
  const backupImages = async () => {
    setBackupState('working');
    try {
      const entries = await idbEntries();
      if (!entries.length) { setBackupState('empty'); setTimeout(() => setBackupState('idle'), 2200); return; }
      for (const [imgId, blob] of entries) {
        const href = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = href; a.download = `${imgId}.webp`;
        document.body.appendChild(a); a.click(); a.remove();
        await new Promise(r => setTimeout(r, 400));
        URL.revokeObjectURL(href);
      }
    } catch { /* ignore */ }
    setBackupState('idle');
  };

  return (
    <aside
      id="app-sidebar"
      className={`app-sidebar${open ? ' open' : ''}`}
      aria-label="ניווט ראשי"
      style={{
        width: 240,
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        background: 'var(--surface)',
        borderLeft: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 65,
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <div style={{ padding: '28px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 14, color: 'var(--paper)', marginBottom: 4 }}>
          שלוש אמיתות במתח
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)' }}>
          כלי עבודה לאדריכל
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {SECTIONS.map((section) => (
          <div key={section.label} style={{ marginBottom: 4 }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text3)',
              padding: '10px 20px 4px',
            }}>
              {section.label}
            </p>
            {section.items.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 20px',
                    fontSize: 13,
                    color: isActive ? 'var(--paper)' : 'var(--text2)',
                    background: isActive ? 'var(--surface2)' : 'transparent',
                    borderLeft: `2px solid ${isActive ? 'var(--amber)' : 'transparent'}`,
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: 'none',
                    transition: 'color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--surface2)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: isActive ? 'var(--amber)' : 'var(--text3)',
                    flexShrink: 0,
                    transition: 'background 0.15s',
                  }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', flexShrink: 0 }}>{item.num}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em' }}>WORKFLOW v1.0</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          type="button"
          onClick={backupImages}
          aria-label="גיבוי כל התמונות שהעליתי"
          title={backupState === 'empty' ? 'אין תמונות לגיבוי' : 'גיבוי כל התמונות'}
          style={{
            background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 6,
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: backupState === 'empty' ? 'var(--text3)' : 'var(--paper)',
          }}
        >
          {backupState === 'working' ? (
            <span className="w-3.5 h-3.5 rounded-full animate-spin" style={{ border: '2px solid var(--surface3)', borderTopColor: 'var(--amber)' }} />
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'מעבר למוד יום' : 'מעבר למוד לילה'}
          title={theme === 'dark' ? 'מוד יום' : 'מוד לילה'}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: 6,
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--paper)',
          }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        </div>
      </div>
    </aside>
  );
}
