import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import { CRITERIA } from '../constants/data';

export default function Criteria() {
  const [expanded, setExpanded] = useState([]);

  const toggle = (id) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div>
      <ScreenHeader
        eyebrow="הבנה — ששת הקריטריונים"
        title="[italic]שישה[/] קריטריונים מזוקקים"
        subtitle="שלושה מהדיסציפלינות עצמן, שלושה מהמרחב שביניהן. לחצו להרחבה."
        progress={52}
      />
      <PageGuide
        what="לחץ על כל קריטריון כדי לפתוח אותו. קרא את ההגדרה, המקור, והביטוי המרחבי."
        why="שישת הקריטריונים הם שפת המדידה של המודל. בלי להכיר אותם, לא ניתן להשתמש בכלי הכיול בדף הבא."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CRITERIA.map((c) => {
          const isOpen = expanded.includes(c.id);
          return (
            <div
              key={c.id}
              className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => toggle(c.id)}
            >
              <div className="p-5" style={{ borderRight: `3px solid ${c.sourceColor}` }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-mono text-[11px] text-muted-foreground mb-1">0{c.id}</p>
                    <h3 className="font-playfair text-base text-foreground mb-2">{c.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{c.def}</p>
                  </div>
                  <span className="text-muted-foreground text-lg mt-1">{isOpen ? '−' : '+'}</span>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">מקור</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.origin}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">ביטוי מרחבי</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.spatial}</p>
                    </div>
                    <span
                      className="inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded mt-1"
                      style={{ color: c.sourceColor, background: c.sourceBg }}
                    >
                      {c.sourceLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}