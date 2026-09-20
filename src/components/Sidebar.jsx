import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SECTIONS = [
  {
    label: 'חשיפה',
    items: [
      { num: '01', label: 'מבוא למודל', path: '/' },
      { num: '02', label: 'שלוש הדיסציפלינות', path: '/disciplines' },
      { num: '03', label: 'רגע הסינתזה', path: '/synthesis' },
    ],
  },
  {
    label: 'הבנה',
    items: [
      { num: '04', label: 'ששת הקריטריונים', path: '/criteria' },
      { num: '05', label: 'מפת יחסים', path: '/relations' },
      { num: '06', label: 'כיול וריאציות', path: '/calibration' },
    ],
  },
  {
    label: 'שימוש',
    items: [
      { num: '07', label: 'שישת הכלים', path: '/tools' },
      { num: '08', label: 'פרומפטים', path: '/prompts' },
    ],
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <aside
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
        zIndex: 50,
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 20px',
                    fontSize: 13,
                    color: isActive ? 'var(--paper)' : 'var(--text2)',
                    background: isActive ? 'var(--surface2)' : 'transparent',
                    borderLeft: `2px solid ${isActive ? 'var(--amber)' : 'transparent'}`,
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
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
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'מוד יום' : 'מוד לילה'}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: 6,
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </aside>
  );
}