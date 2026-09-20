import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingScreen from '../components/LandingScreen';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import { DISCIPLINES } from '../constants/data';

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
      <ScreenHeader
        eyebrow="מודל הצלחה — מבוא"
        title="עבודת האדריכל כ[italic amber]מקור[/]"
        subtitle="האדריכל עובדת תמיד בשלוש שפות במקביל — טקסט, מספר, וויזואליזציה. המודל לא מלמד איך לעבוד, הוא מגלה מה כבר קורה."
        progress={12}
      />
      <PageGuide
        what="קרא את שלוש הדיסציפלינות וזהה אותן בפרויקט שלך כרגע."
        why="לפני שמשתמשים בכלי, חשוב להכיר את המסגרת התיאורטית — מה כל דיסציפלינה עושה ומה היא לא עושה."
      />

      {/* Discipline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {DISCIPLINES.map((d) => (
          <div
            key={d.id}
            className="bg-card rounded-lg p-5 border border-border"
            style={{ borderRight: `3px solid ${d.accentColor}` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-2xl" style={{ color: d.accentColor }}>{d.icon}</span>
              <span className="font-playfair text-lg text-foreground">{d.name}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">{d.tagline}</p>
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded"
              style={{ color: d.accentColor, background: `${d.accentColor}22` }}
            >
              {d.truth}
            </span>
          </div>
        ))}
      </div>

      {/* Tension Diagram */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">דיאגרמת מתח</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { label: 'טקסט', color: '#7F77DD' },
            { label: 'מספר', color: '#1D9E75' },
            { label: 'ויזואל', color: '#EF9F27' },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-medium"
                style={{ background: `${node.color}22`, color: node.color, border: `1px solid ${node.color}55` }}
              >
                {node.label.slice(0, 1)}
              </div>
              <span className="text-muted-foreground text-xs font-mono">{node.label}</span>
              {i < 2 && <span className="text-muted-foreground/40 mx-1">→</span>}
            </div>
          ))}
          <span className="text-muted-foreground/40 mx-2">→</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-mono">מתח</span>
            <span className="text-muted-foreground/40 mx-1">→</span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-medium"
              style={{ background: 'rgba(216,90,48,0.15)', color: '#D85A30', border: '1px solid rgba(216,90,48,0.4)' }}
            >
              ✦
            </div>
            <span className="text-xs font-mono text-[#D85A30]">סינתזה</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-5 text-center">הידע נולד בנקודת החיכוך — לא בכל אחת מהשפות בנפרד.</p>
      </div>

      {/* Note Box */}
      <div className="border border-border rounded-lg p-5 bg-muted/30 mb-8">
        <p className="text-muted-foreground text-sm leading-relaxed">
          המודל לא מוסיף כלים חדשים לעבודת האדריכל — הוא מגלה שהכלים שכבר בשימוש הם שלוש שפות נפרדות שכשפועלות יחד, מייצרות ידע שאף אחת מהן לא יכולה להגיע אליו לבד.
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