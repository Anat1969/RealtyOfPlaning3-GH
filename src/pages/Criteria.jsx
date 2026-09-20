import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import InsightImage from '../components/InsightImage';
import { ACCENT } from '../lib/accent';
import { CRITERIA } from '../constants/data';
import { CRITERION_PROMPTS } from '../constants/insightPrompts';

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

      <SectionLabel>ששת הקריטריונים</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CRITERIA.map((crit) => {
          const isOpen = expanded.includes(crit.id);
          const { c, bg } = ACCENT[crit.source];
          return (
            <article
              key={crit.id}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              className="elevate bg-card border border-border rounded-lg overflow-hidden cursor-pointer"
              onClick={() => toggle(crit.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(crit.id); }
              }}
            >
              <div style={{ height: 4, background: c }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="rounded-full flex-shrink-0" style={{ width: 9, height: 9, background: c }} />
                      <h3 className="font-playfair leading-tight" style={{ fontSize: 19, color: 'var(--paper)' }}>{crit.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{crit.def}</p>
                  </div>
                  <svg className={`chev flex-shrink-0 mt-1${isOpen ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {isOpen && (
                  <div className="accordion-content mt-4 pt-4 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>מקור</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{crit.origin}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>ביטוי מרחבי</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{crit.spatial}</p>
                    </div>
                    <span
                      className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] rounded-full px-2.5 py-1 mt-1"
                      style={{ color: c, background: bg }}
                    >
                      {crit.sourceLabel}
                    </span>

                    {/* Visual insight — prompt + drag/paste/upload image frame */}
                    <div className="pt-2">
                      <InsightImage
                        id={`crit-${crit.id}`}
                        prompt={CRITERION_PROMPTS[crit.id]}
                        color={c}
                        bg={bg}
                        ratio="1 / 1"
                        label="המחשת הקריטריון"
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
