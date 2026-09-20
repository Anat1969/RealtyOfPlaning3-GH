import { useState, useEffect, useRef } from 'react';

const DISCIPLINES = [
  { icon: 'א', color: '#7F77DD', bg: 'rgba(127,119,221,0.12)', name: 'טקסט', desc: 'מייצר כוונה לפני שיש חלל. כל מילה שבוחרת מגדירה מה יתאפשר לתכנן.' },
  { icon: '1', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)', name: 'מספר', desc: 'מכריע חוויה בלי אפשרות פרשנות. 2.4 מטר הוא 2.4 מטר — הגוף לא ניתן לשכנוע.' },
  { icon: '◎', color: '#EF9F27', bg: 'rgba(239,159,39,0.12)', name: 'ויזואליזציה', desc: 'פועלת מתחת לסף המודעות. הסקיצה מגלה לפני שהראש מנסח.' },
];

const POINTS = [
  { num: 1, color: '#7F77DD', title: 'כשהטקסט סותר את המספר', desc: 'זה לא כישלון. זה המידע הכי חשוב בפרויקט.' },
  { num: 2, color: '#1D9E75', title: 'כשהסקיצה מגלה מה שלא תכננת', desc: 'זה לא שגיאה. זה רגע שצריך לתעד.' },
  { num: 3, color: '#EF9F27', title: 'כשהשלוש מסכימות לראשונה', desc: 'זה הקונספט. הכלי עוזר לזהות ולנסח אותו.' },
];

const AI_TAGS = ['ניסוח 5 אפשרויות מכל מילה', 'מיפוי טווח המספרים לכל חוויה', 'זיהוי הסתירה בין שתי כוונות', 'הצעת 3 פתרונות למתח', '18 פרומפטים להמחשה', 'בדיקת עקביות מול הקריטריונים'];
const ARCH_TAGS = ['מה הניסוח הנכון לפרויקט הזה', 'כיוון בתוך הטווח', 'מה לשמור מהסתירה', 'מתי הגיע רגע הסינתזה', 'מה הקונספט', 'שיקול הדעת'];

function Tag({ children, style }) {
  return (
    <span style={{
      display: 'inline-block',
      background: 'rgba(200,191,168,0.08)',
      border: '1px solid rgba(200,191,168,0.12)',
      borderRadius: 20,
      padding: '4px 12px',
      fontSize: 12,
      color: '#8a8070',
      margin: '4px 4px 0 0',
      ...style,
    }}>
      {children}
    </span>
  );
}

export default function LandingScreen({ onEnter }) {
  const [hiding, setHiding] = useState(false);
  const [visible, setVisible] = useState([false, false, false, false]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const enter = () => {
    setHiding(true);
    setTimeout(onEnter, 650);
  };

  useEffect(() => {
    // Animate hero immediately
    setTimeout(() => setVisible(v => { const n=[...v]; n[0]=true; return n; }), 100);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const idx = parseInt(e.target.dataset.idx);
        if (e.isIntersecting) setVisible(v => { const n=[...v]; n[idx]=true; return n; });
      });
    }, { threshold: 0.15 });

    refs.slice(1).forEach((r, i) => {
      if (r.current) { r.current.dataset.idx = i + 1; obs.observe(r.current); }
    });
    return () => obs.disconnect();
  }, []);

  const fadeStyle = (idx, delay = 0) => ({
    opacity: visible[idx] ? 1 : 0,
    transform: visible[idx] ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  });

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0f0e0c',
      zIndex: 1000,
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto',
      opacity: hiding ? 0 : 1,
      transform: hiding ? 'translateY(-20px)' : 'translateY(0)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      pointerEvents: hiding ? 'none' : 'auto',
      direction: 'rtl',
    }}>

      {/* Zone 1: Hero */}
      <section ref={refs[0]} style={{ maxWidth: 800, margin: '0 auto', padding: '80px 48px 72px', width: '100%' }}>
        <p style={{ ...fadeStyle(0, 0), fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a5448', marginBottom: 28 }}>
          WORKFLOW אדריכלי — בינה מלאכותית כשותף חשיבה
        </p>
        <h1 style={{ ...fadeStyle(0, 0.1), fontFamily: 'var(--font-playfair)', fontSize: 'clamp(42px,7vw,72px)', color: '#e8dfc8', lineHeight: 1.15, marginBottom: 28 }}>
          עבודת האדריכל<br />
          כבר מכילה<br />
          את <em style={{ fontStyle: 'italic', color: '#EF9F27' }}>כל הידע</em>
        </h1>
        <p style={{ ...fadeStyle(0, 0.2), fontSize: 16, color: '#8a8070', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, marginBottom: 40 }}>
          שלוש דיסציפלינות — טקסט, מספר, ויזואליזציה — פועלות
          בכל תכנון. הכלי הזה עוזר לך לראות מה קורה ביניהן,
          לזהות את הרגע שבו נולד ידע חדש, ולעבוד ממנו מכוון.
        </p>
        <button
          onClick={enter}
          style={{
            ...fadeStyle(0, 0.3),
            background: '#EF9F27', color: '#0f0e0c',
            border: 'none', borderRadius: 8,
            padding: '14px 32px', fontSize: 15, fontFamily: 'var(--font-heebo)',
            fontWeight: 500, cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.target.style.opacity = 0.85}
          onMouseLeave={e => e.target.style.opacity = 1}
        >
          כניסה לכלי ←
        </button>
      </section>

      {/* Zone 2: Disciplines */}
      <section ref={refs[1]} style={{ maxWidth: 800, margin: '0 auto', padding: '0 48px 64px', width: '100%' }}>
        <p style={{ ...fadeStyle(1, 0), fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a5448', marginBottom: 20 }}>
          מה כבר קיים בעבודה שלך
        </p>
        <div className="landing-disciplines">
          {DISCIPLINES.map((d, i) => (
            <div key={d.name} style={{
              ...fadeStyle(1, i * 0.1),
              background: '#1e1d1a', border: '1px solid rgba(200,191,168,0.08)',
              borderRadius: 14, padding: '20px 18px',
              borderRight: `3px solid ${d.color}`,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: d.color, display: 'block', marginBottom: 10 }}>{d.icon}</span>
              <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 16, color: '#e8dfc8', marginBottom: 8 }}>{d.name}</p>
              <p style={{ fontSize: 12, color: '#8a8070', lineHeight: 1.65 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zone 3: Core idea */}
      <section ref={refs[2]} style={{ maxWidth: 800, margin: '0 auto', padding: '0 48px 64px', width: '100%' }}>
        <div className="landing-core">
          <blockquote style={{ ...fadeStyle(2, 0), margin: 0 }}>
            <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 28, color: '#e8dfc8', lineHeight: 1.4 }}>
              הידע לא נולד<br />
              בתוך כל דיסציפלינה —<br />
              אלא ב<em style={{ fontStyle: 'italic', color: '#EF9F27' }}>נקודת החיכוך</em><br />
              ביניהן.
            </p>
          </blockquote>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
            {POINTS.map((p, i) => (
              <div key={p.num} style={{ ...fadeStyle(2, i * 0.1 + 0.1), display: 'flex', gap: 14 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${p.color}20`, border: `1px solid ${p.color}55`,
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: p.color,
                }}>
                  {p.num}
                </div>
                <div>
                  <p style={{ fontSize: 13, color: '#c8bfa8', fontWeight: 500, marginBottom: 3 }}>{p.title}</p>
                  <p style={{ fontSize: 12, color: '#8a8070', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone 4: Division of labor */}
      <section ref={refs[3]} style={{ background: '#1a1917', borderTop: '1px solid rgba(200,191,168,0.08)', padding: '48px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 48px' }}>
          <p style={{ ...fadeStyle(3, 0), fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5a5448', textAlign: 'center', marginBottom: 32 }}>
            מה הבינה המלאכותית עושה — ומה נשאר לך
          </p>
          <div className="landing-labor" style={{ ...fadeStyle(3, 0.1) }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#1D9E75', marginBottom: 14 }}>הבינה מלאכותית מבצעת</p>
              <div>{AI_TAGS.map(t => <Tag key={t}>{t}</Tag>)}</div>
            </div>
            <div className="landing-labor-divider" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
              <div style={{ width: 1, flex: 1, background: 'rgba(200,191,168,0.1)', minHeight: 120 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#5a5448', writingMode: 'vertical-rl', padding: '12px 0', letterSpacing: '0.1em' }}>חלוקת עבודה</p>
              <div style={{ width: 1, flex: 1, background: 'rgba(200,191,168,0.1)', minHeight: 120 }} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#EF9F27', marginBottom: 14 }}>האדריכל מחליטה</p>
              <div>{ARCH_TAGS.map(t => <Tag key={t}>{t}</Tag>)}</div>
            </div>
          </div>

          {/* CTA repeat */}
          <div style={{ ...fadeStyle(3, 0.2), textAlign: 'center', marginTop: 48 }}>
            <button
              onClick={enter}
              style={{
                background: '#EF9F27', color: '#0f0e0c',
                border: 'none', borderRadius: 8,
                padding: '14px 32px', fontSize: 15, fontFamily: 'var(--font-heebo)',
                fontWeight: 500, cursor: 'pointer',
              }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
            >
              כניסה לכלי ←
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}