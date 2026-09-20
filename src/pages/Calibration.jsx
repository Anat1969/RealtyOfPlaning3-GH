import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import { CAL_PROFILES } from '../constants/data';

const SLIDERS = [
  { key: 'c1', label: 'כוונה מנוסחת' },
  { key: 'c2', label: 'מגבלה מדויקת' },
  { key: 'c3', label: 'אמת חושית' },
  { key: 'c4', label: 'מתח פורה' },
  { key: 'c5', label: 'נוכחות בו-זמנית' },
  { key: 'c6', label: 'רגע הסינתזה' },
];

const DEFAULT_VALUES = { c1: 70, c2: 80, c3: 75, c4: 85, c5: 90, c6: 70 };

export default function Calibration() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const avg = Math.round(Object.values(values).reduce((a, b) => a + b, 0) / 6);
  const profile = CAL_PROFILES.find(p => avg >= p.minAvg && avg <= p.maxAvg) || CAL_PROFILES[CAL_PROFILES.length - 1];

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

      <div className="bg-card border border-border rounded-lg p-6 mb-6 space-y-5">
        {SLIDERS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" style={{ minWidth: 150 }}>{label}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={values[key]}
              onChange={e => setValues(prev => ({ ...prev, [key]: +e.target.value }))}
              className="flex-1 accent-primary h-1"
            />
            <span className="font-mono text-sm text-primary w-8 text-left">{values[key]}</span>
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">פרופיל פרויקט — ממוצע {avg}</p>
        <h3 className="font-playfair text-xl text-foreground mb-2">{profile.name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{profile.desc}</p>
      </div>

      <div className="border border-border rounded-lg p-5 bg-muted/30">
        <p className="text-muted-foreground text-sm leading-relaxed">
          הוריאציות המוגדרות: בית, מקדש, נזירות, שוק, סטודיו — כל אחת מייצגת הגדרת קריטריונים שונה שמייצרת פרופיל מרחבי שונה.
        </p>
      </div>
    </div>
  );
}