import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.style.opacity = '0';
      mainRef.current.style.transform = 'translateY(16px)';
      requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          mainRef.current.style.opacity = '1';
          mainRef.current.style.transform = 'translateY(0)';
        }
      });
    }
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar />
      <main
        ref={mainRef}
        style={{
          marginRight: 240,
          padding: '52px 56px 80px',
        }}
        className="layout-main"
      >
        <Outlet />
      </main>

      <style>{`
        @media (max-width: 768px) {
          .layout-main {
            margin-right: 0 !important;
            padding: 24px 20px 60px !important;
          }
        }
      `}</style>
    </div>
  );
}