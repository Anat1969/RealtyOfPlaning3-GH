import { useEffect } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import { ACCENT } from '../lib/accent';
import { DEFAULT_CALIBRATION, getProfile } from '../lib/calibration';
import { useProject } from '../context/ProjectContext';
import { useAmbient } from '../context/AmbientContext';

const SLIDERS = [
  { key: 'c1', label: 'כוונה מנוסחת', src: 'text' },
  { key: 'c2', label: 'מגבלה מדויקת', src: 'number' },
  { key: 'c3', label: 'אמת חושית', src: 'visual' },
  { key: 'c4', label: 'מתח פורה', src: 'between' },
  { key: 'c5', label: 'נוכחות בו-זמנית', src: 'between' },
  { key: 'c6', label: 'רגע הסינתזה', src: 'between' },
];

export default function Calibration() {
  const { project, update } = useProject();
  const { setAmbient } = useAmbient();
  // All colours present at once — neutral atmosphere
  useEffect(() => { setAmbient('neutral'); return () => setAmbient('neutral'); }, [setAmbient]);
  const values = project.calibration || DEFAULT_CALIBRATION;

  const setValue = (key, v) => update({ calibration: { ...values, [key]: v } });
  const { avg, profile } = getProfile(values);

  return (
    <div>
      <ScreenHeader
        eyebrow="הבנה — כיול וריאציות"
        title="כיול [italic]הקריטריונים[/] לאופי הפרויקט"
        subtitle="כל קריטריון הוא מכוון בטווח 0–100%. הממוצע מגדיר את פרופיל הפרויקט."
        progress={76}
      />
      <PageGuide
        what="גרור כל סליידר לפי עוצמת הקריטריון בפרויקט שלך — לא מה שנכון באופן כללי, אלא מה שמתאים לפרויקט הספציפי."
        why="הכיול מגדיר את פרופיל הפרויקט. הממוצע חושף אם הפרויקט נוטה לנזירות, לשוק, לבית — ועוזר לקבל החלטות עקביות."
      />

      <SectionLabel>לוח הכיול</SectionLabel>
      <div className="bg-card border border-border rounded-lg elevate p-6 md:p-8 mb-6 space-y-6">
        {SLIDERS.map(({ key, label, src }) => {
          const { c } = ACCENT[src];
          return (
            <div key={key} className="flex items-center gap-4">
              <span className="text-sm" style={{ minWidth: 150, color: 'var(--text)' }}>{label}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={values[key]}
                onChange={e => setValue(key, +e.target.value)}
                aria-label={label}
                className="flex-1"
                style={{ accentColor: c }}
              />
              <span className="font-mono text-sm w-9 text-left" style={{ color: c }}>{values[key]}</span>
            </div>
          );
        })}
      </div>

      {/* Result — vivid profile card with a gradient gauge */}
      <SectionLabel>פרופיל הפרויקט</SectionLabel>
      <div className="bg-card border border-border rounded-lg elevate overflow-hidden mb-6">
        <div style={{ height: 4, background: 'linear-gradient(90deg, var(--purple), var(--teal), var(--amber), var(--coral))' }} />
        <div className="p-6 md:p-8">
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--text3)' }}>ממוצע</span>
            <span className="font-playfair" style={{ fontSize: 40, color: 'var(--paper)', lineHeight: 1 }}>{avg}</span>
          </div>

          {/* gauge */}
          <div className="relative mb-6" style={{ height: 8, borderRadius: 4, background: 'var(--surface3)' }}>
            <div className="rule-gradient" style={{ position: 'absolute', inset: 0, opacity: 0.9 }} />
            <div
              style={{
                position: 'absolute', top: -4, insetInlineStart: `calc(${avg}% - 8px)`,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--paper)', border: '3px solid var(--bg)',
                boxShadow: '0 1px 6px rgba(0,0,0,0.25)', transition: 'inset-inline-start 0.3s ease',
              }}
            />
          </div>

          <h3 className="font-playfair mb-2" style={{ fontSize: 24, color: 'var(--paper)' }}>{profile.name}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', maxWidth: 620 }}>{profile.desc}</p>
        </div>
      </div>

      <div className="border-r-2 pr-4 py-1" style={{ borderColor: 'var(--amber)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', maxWidth: 620 }}>
          הוריאציות המוגדרות — נזירות, הבית, הסטודיו, המקדש, השוק — כל אחת מייצגת הגדרת קריטריונים שונה
          שמייצרת פרופיל מרחבי שונה.
        </p>
      </div>
    </div>
  );
}
