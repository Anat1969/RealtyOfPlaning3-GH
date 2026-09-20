import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingScreen from '../components/LandingScreen';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import LanguagesVenn from '../components/LanguagesVenn';
import SectionLabel from '../components/SectionLabel';
import { ACCENT } from '../lib/accent';
import { DISCIPLINES } from '../constants/data';

/* Theme-aware colours (richer in light mode than the dark-tuned hex in data.js) */
const VAR = { text: ACCENT.text.c, number: ACCENT.number.c, visual: ACCENT.visual.c };
const VARBG = { text: ACCENT.text.bg, number: ACCENT.number.bg, visual: ACCENT.visual.bg };

/* ── Living micro-visuals: each card *shows* what its language does ── */

function CyclingWord({ color }) {
  const words = ['מעבר', 'סף', 'מחסה', 'מפגש'];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % words.length), 1900);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 20, color }}>
      {words[i]}<span className="caret" />
    </span>
  );
}

function DimensionMark({ color }) {
  return (
    <svg viewBox="0 0 220 34" width="100%" style={{ maxWidth: 220 }} aria-hidden="true">
      <text x="110" y="10" textAnchor="middle" style={{ fill: color, fontFamily: 'var(--font-mono)', fontSize: 11 }}>2.40 מ׳</text>
      <g className="dim-grow">
        <line x1="12" y1="24" x2="208" y2="24" stroke={color} strokeWidth="1.5" />
        <line x1="12" y1="17" x2="12" y2="31" stroke={color} strokeWidth="1.5" />
        <line x1="208" y1="17" x2="208" y2="31" stroke={color} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function SketchMark({ color }) {
  return (
    <svg viewBox="0 0 220 34" width="100%" style={{ maxWidth: 220 }} aria-hidden="true">
      <path className="sketch-path" d="M10 24 C 44 4, 74 30, 104 16 S 168 30, 210 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MicroVisual({ id, color }) {
  if (id === 'text') {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>מילה אחת ←</span>
        <CyclingWord color={color} />
      </div>
    );
  }
  if (id === 'number') return <DimensionMark color={color} />;
  return <SketchMark color={color} />;
}

function LanguageCard({ d }) {
  const color = VAR[d.id];
  const bg = VARBG[d.id];
  return (
    <article className="elevate bg-card border border-border rounded-lg overflow-hidden">
      {/* vivid top accent bar */}
      <div style={{ height: 4, background: color }} />
      <div className="p-6">
        {/* Level 1 — title: bullet + size */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="rounded-full flex-shrink-0" style={{ width: 10, height: 10, background: color }} />
          <h3 className="font-playfair leading-tight" style={{ fontSize: 23, color: 'var(--paper)' }}>{d.name}</h3>
        </div>

        {/* Level 2 — meaning (vivid chip) */}
        <span
          className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] rounded-full px-2.5 py-1 mb-3"
          style={{ background: bg, color }}
        >
          {d.truth}
        </span>

        {/* Level 3 — body */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{d.tagline}</p>

        {/* Experiential micro-visual */}
        <div className="mt-4 pt-4" style={{ borderTop: '1px dashed var(--border2)' }}>
          <MicroVisual id={d.id} color={color} />
        </div>
      </div>
    </article>
  );
}

export default function Introduction() {
  const navigate = useNavigate();
  const [showLanding, setShowLanding] = useState(() => !sessionStorage.getItem('entered'));

  const handleEnter = () => {
    sessionStorage.setItem('entered', '1');
    setShowLanding(false);
  };

  if (showLanding) return <LandingScreen onEnter={handleEnter} />;

  return (
    <div>
      {/* ===== Tool layer: header + guidance ===== */}
      <ScreenHeader
        eyebrow="מודל הצלחה — מבוא"
        title="עבודת האדריכל כ[italic amber]מקור[/]"
        subtitle="שלוש שפות פועלות בכל תכנון — טקסט, מספר, וויזואליזציה. המודל לא מלמד איך לעבוד, הוא מגלה מה כבר קורה — והופך אותו לכלי."
        progress={12}
      />
      <PageGuide
        what="קרא את שלוש השפות שבהן אתה כבר עובד, וזהה כל אחת מהן בפרויקט הנוכחי שלך."
        why="לפני שמשתמשים בכלים, צריך להכיר את המסגרת — מה כל שפה עושה, מה היא לא עושה, ואיפה נולד הידע החדש."
      />

      {/* ===== Content layer ===== */}
      <SectionLabel>התוכן — נקודת הפתיחה</SectionLabel>

      <p className="leading-snug mb-5" style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(24px, 4vw, 34px)', color: 'var(--paper)', maxWidth: 720 }}>
        כל אדריכלית מדברת <span style={{ color: 'var(--purple)' }}>שלוש שפות</span> בו-זמנית —
        גם כשהיא לא שמה לב.
      </p>
      <p className="leading-loose mb-12" style={{ fontSize: 17, color: 'var(--text)', maxWidth: 640 }}>
        מילים מנסחות כוונה. מספרים מכריעים חוויה. תמונות חושפות את מה שהגוף כבר יודע.
        המודל הזה לא מוסיף שיטה — הוא נותן שם למה שכבר קורה, והופך אינטואיציה חמקמקה
        לכלי שאפשר לכוון, לתעד, ולחזור אליו.
      </p>

      {/* Three languages */}
      <SectionLabel>שלוש השפות שאת כבר מדברת</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {DISCIPLINES.map((d) => (
          <LanguageCard key={d.id} d={d} />
        ))}
      </div>

      {/* Where the idea is born — interactive Venn */}
      <SectionLabel>איפה נולד הרעיון</SectionLabel>
      <p className="leading-relaxed mb-6" style={{ fontSize: 17, color: 'var(--text)', maxWidth: 640 }}>
        לא בתוך שפה אחת — אלא במקום שבו שלושתן נפגשות. המתח ביניהן הוא המנוע, לא התקלה.
        נסי בעצמך:
      </p>
      <div className="mb-14">
        <LanguagesVenn />
      </div>

      {/* Principle — vivid pull-quote */}
      <SectionLabel>העיקרון</SectionLabel>
      <blockquote
        className="rounded-lg p-6 md:p-8 mb-10"
        style={{ background: 'var(--coral-bg)', borderRight: '4px solid var(--coral)' }}
      >
        <p className="font-playfair leading-snug mb-3" style={{ fontSize: 'clamp(22px, 3.4vw, 30px)', color: 'var(--paper)' }}>
          כשהמספר סותר את המילה — <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>זה לא כישלון</em>. זו נקודת ההתחלה.
        </p>
        <p className="leading-relaxed" style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 620 }}>
          הכלים שבאפליקציה לא מייצרים תשובות — הם מייצרים חומר גלם לחשיבה. הם עוזרים לזהות
          את הרגע שבו שלוש השפות מתנגשות, כי שם — ורק שם — נולד הקונספט.
        </p>
      </blockquote>

      <button
        onClick={() => navigate('/disciplines')}
        className="text-primary-foreground px-6 py-3 rounded-lg font-heebo text-sm font-medium transition-opacity hover:opacity-90"
        style={{ background: 'var(--amber)' }}
      >
        המשך לשלוש הדיסציפלינות ←
      </button>
    </div>
  );
}
