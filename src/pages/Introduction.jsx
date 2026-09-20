import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingScreen from '../components/LandingScreen';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import { DISCIPLINES } from '../constants/data';

/* Small labelled divider that opens a content zone —
   keeps the CONTENT visually distinct from the guidance (the "tool"). */
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap">
        {children}
      </span>
      <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  );
}

/* Discipline card with a deliberate 3-level font hierarchy:
   1) name   — bullet + large Playfair (primary / most important)
   2) truth  — mono, coloured (the meaning / category)
   3) tagline — Heebo, muted (supporting body) */
function DisciplineCard({ d }) {
  return (
    <article
      className="card-hover relative bg-card border border-border rounded-lg p-6 pt-5 overflow-hidden"
      style={{ borderRight: `3px solid ${d.accentColor}` }}
    >
      {/* Decorative discipline glyph — faint, does not compete with the title */}
      <span
        aria-hidden="true"
        className="absolute top-3 left-4 font-mono select-none"
        style={{ fontSize: 40, lineHeight: 1, color: d.accentColor, opacity: 0.14 }}
      >
        {d.icon}
      </span>

      {/* Level 1 — title: bullet + size */}
      <div className="flex items-center gap-2.5 mb-2">
        <span
          className="rounded-full flex-shrink-0"
          style={{ width: 9, height: 9, background: d.accentColor }}
        />
        <h3 className="font-playfair text-foreground leading-tight" style={{ fontSize: 22 }}>
          {d.name}
        </h3>
      </div>

      {/* Level 2 — meaning */}
      <p
        className="font-mono text-[11px] uppercase tracking-[0.14em] mb-3"
        style={{ color: d.accentColor }}
      >
        {d.truth}
      </p>

      {/* Level 3 — body */}
      <p className="text-muted-foreground text-sm leading-relaxed">{d.tagline}</p>
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
        subtitle="האדריכל עובדת תמיד בשלוש שפות במקביל — טקסט, מספר, וויזואליזציה. המודל לא מלמד איך לעבוד, הוא מגלה מה כבר קורה."
        progress={12}
      />
      <PageGuide
        what="קרא את שלוש השפות שבהן אתה כבר עובד, וזהה כל אחת מהן בפרויקט הנוכחי שלך."
        why="לפני שמשתמשים בכלים, צריך להכיר את המסגרת — מה כל שפה עושה, מה היא לא עושה, ואיפה נולד הידע החדש."
      />

      {/* ===== Content layer ===== */}
      <SectionLabel>התוכן — נקודת הפתיחה</SectionLabel>

      {/* Lead paragraph */}
      <p className="text-foreground/90 leading-loose mb-4" style={{ fontSize: 18, fontWeight: 300, maxWidth: 640 }}>
        כל אדריכלית עובדת בו-זמנית בשלוש שפות: <strong className="font-medium text-foreground">מילים</strong> שמנסחות כוונה,
        {' '}<strong className="font-medium text-foreground">מספרים</strong> שמכריעים חוויה, ו<strong className="font-medium text-foreground">תמונות</strong> שחושפות את מה שהגוף כבר יודע.
      </p>
      <p className="text-muted-foreground leading-loose mb-10" style={{ maxWidth: 640 }}>
        לרוב זה קורה מבלי משים. המודל הזה לא מוסיף שיטה חדשה — הוא נותן שם לתהליך שכבר מתרחש בכל תכנון,
        וכך הופך אינטואיציה חמקמקה לכלי שאפשר לכוון, לתעד, ולחזור אליו.
      </p>

      {/* Three disciplines */}
      <SectionLabel>שלוש השפות</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {DISCIPLINES.map((d) => (
          <DisciplineCard key={d.id} d={d} />
        ))}
      </div>

      {/* Core idea */}
      <SectionLabel>הרעיון המרכזי</SectionLabel>
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="rounded-full flex-shrink-0" style={{ width: 9, height: 9, background: 'var(--coral)' }} />
          <h3 className="font-playfair text-foreground leading-tight" style={{ fontSize: 22 }}>
            הידע נולד ב<em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>נקודת החיכוך</em>
          </h3>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6" style={{ maxWidth: 620 }}>
          אף אחת משלוש השפות לא מייצרת אדריכלות לבדה. הרעיון האמיתי מופיע דווקא כשהן נפגשות —
          כשהמספר סותר את המילה, כשהסקיצה מגלה מה שלא נכתב. המתח הזה הוא לא תקלה שצריך ליישר; הוא המנוע.
        </p>

        {/* Tension → synthesis diagram */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-5">
          {[
            { label: 'טקסט', color: '#7F77DD' },
            { label: 'מספר', color: '#1D9E75' },
            { label: 'ויזואל', color: '#EF9F27' },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-medium"
                style={{ background: `${node.color}22`, color: node.color, border: `1px solid ${node.color}55` }}
              >
                {node.label.slice(0, 1)}
              </div>
              <span className="text-muted-foreground text-xs font-mono">{node.label}</span>
              {i < 2 && <span className="text-muted-foreground/40">+</span>}
            </div>
          ))}
          <span className="text-muted-foreground/40 mx-1">←</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: 'var(--coral)' }}>מתח</span>
            <span className="text-muted-foreground/40">←</span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-medium"
              style={{ background: 'rgba(216,90,48,0.15)', color: '#D85A30', border: '1px solid rgba(216,90,48,0.4)' }}
            >
              ✦
            </div>
            <span className="text-xs font-mono" style={{ color: 'var(--coral)' }}>סינתזה</span>
          </div>
        </div>
        <p className="text-muted-foreground/80 text-sm text-center">
          הידע נולד בנקודת החיכוך — לא בכל אחת מהשפות בנפרד.
        </p>
      </div>

      {/* Principle note (content) */}
      <div className="border-r-2 pr-4 py-1 mb-10" style={{ borderColor: 'var(--amber)' }}>
        <p className="text-muted-foreground leading-relaxed" style={{ maxWidth: 620 }}>
          המודל לא מוסיף כלים חדשים לעבודת האדריכל — הוא מגלה שהכלים שכבר בשימוש הם שלוש שפות נפרדות,
          ושכשהן פועלות יחד הן מייצרות ידע שאף אחת מהן לא יכולה להגיע אליו לבד.
        </p>
      </div>

      <button
        onClick={() => navigate('/disciplines')}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-heebo text-sm font-medium hover:opacity-90 transition-opacity"
      >
        המשך לשלוש הדיסציפלינות ←
      </button>
    </div>
  );
}
