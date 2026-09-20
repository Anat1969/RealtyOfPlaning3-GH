import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useProgress } from '../hooks/useProgress';

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useProgress();

  // Page transition + close the mobile drawer on navigation
  useEffect(() => {
    setMenuOpen(false);
    const el = mainRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          mainRef.current.style.opacity = '1';
          mainRef.current.style.transform = 'translateY(0)';
        }
      });
    }
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <a href="#main-content" className="skip-link">דלג לתוכן</a>

      {/* Real, cumulative project progress — subtle amber bar at the top of the content */}
      <div className="progress-top no-print" role="progressbar" aria-label="התקדמות מילוי הפרויקט" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-top-fill" style={{ width: `${progress}%` }} />
      </div>


      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <div>
          <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 15, color: 'var(--paper)', lineHeight: 1.1 }}>
            שלוש אמיתות במתח
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>
            כלי עבודה לאדריכל
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
          aria-expanded={menuOpen}
          aria-controls="app-sidebar"
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: 8,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--paper)',
          }}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Backdrop (mobile, only when drawer open) */}
      <div
        className={`sidebar-backdrop${menuOpen ? ' show' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="main-content" ref={mainRef} className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
