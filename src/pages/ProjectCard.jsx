import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import SectionLabel from '../components/SectionLabel';
import { ACCENT } from '../lib/accent';
import { getProfile } from '../lib/calibration';
import { getTension, FEEL_LABELS } from '../constants/tensionLogic';
import { getVisualPrompts } from '../constants/visualPrompts';
import { useProject } from '../context/ProjectContext';
import { toast } from '@/components/ui/use-toast';

function SummaryBlock({ color, label, children }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevate">
      <div style={{ height: 4, background: color }} />
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: color }} />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color }}>{label}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ProjectCard() {
  const { project, update, reset } = useProject();

  const { avg, profile } = getProfile(project.calibration);
  const tension = getTension({ word: project.intention, width: project.width, feel: project.feel });

  const purple = ACCENT.text.c;
  const teal = ACCENT.number.c;
  const amber = ACCENT.visual.c;
  const coral = ACCENT.between.c;
  const tensionColor = tension.state === 'tension' ? coral : teal;

  const handleReset = () => {
    if (window.confirm('להתחיל פרויקט חדש? כל הנתונים הנוכחיים יימחקו לצמיתות.')) reset();
  };

  const [showVisuals, setShowVisuals] = useState(false);
  const { prompts: visualPrompts, isDefault: visualsAreDefault } = getVisualPrompts(project);

  const copyPrompt = (text) => {
    const done = () => toast({ title: 'הפרומפט הועתק' });
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  };
  const fallbackCopy = (text, done) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta); done();
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div style={{ maxWidth: 720, marginInline: 'auto' }}>
      <ScreenHeader
        eyebrow="סיכום — כרטיס הפרויקט"
        title="מה ה[italic]מסע[/] גילה"
        progress={100}
      />

      <div className="print-area">
        {/* Project name */}
        <div className="mb-6">
          <label htmlFor="proj-name" className="font-mono text-[11px] uppercase tracking-[0.12em] block mb-2" style={{ color: 'var(--text3)' }}>
            שם הפרויקט
          </label>
          <input
            id="proj-name"
            type="text"
            value={project.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="לדוגמה: בית בשכונה ותיקה"
            className="w-full rounded-lg px-4 py-3 focus:outline-none"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border2)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-playfair)',
              fontSize: 24,
            }}
          />
        </div>

        <SectionLabel>מה שנאסף במסע</SectionLabel>

        <div className="space-y-4">
          {/* Intention */}
          <SummaryBlock color={purple} label="הכוונה — טקסט">
            <p className="font-playfair leading-snug" style={{ fontSize: 22, color: 'var(--paper)' }}>
              {project.intention?.trim() || 'טרם הוגדרה כוונה'}
            </p>
            {!project.intention?.trim() && (
              <p className="text-sm mt-1" style={{ color: 'var(--text3)' }}>בקרי ב"חדר המתח" כדי לנסח כוונה.</p>
            )}
          </SummaryBlock>

          {/* Measure + feel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryBlock color={teal} label="המידה — מספר">
              <p className="font-mono" style={{ fontSize: 32, color: 'var(--paper)', lineHeight: 1 }}>{project.width}מ'</p>
              <p className="text-sm mt-1.5" style={{ color: 'var(--text2)' }}>רוחב החלל</p>
            </SummaryBlock>
            <SummaryBlock color={amber} label="התחושה — ויזואליזציה">
              <p className="font-playfair" style={{ fontSize: 24, color: 'var(--paper)' }}>{FEEL_LABELS[project.feel] || FEEL_LABELS.neutral}</p>
              <p className="text-sm mt-1.5" style={{ color: 'var(--text2)' }}>האווירה שנבחרה</p>
            </SummaryBlock>
          </div>

          {/* Calibration profile */}
          <SummaryBlock color={coral} label="פרופיל הכיול">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-playfair" style={{ fontSize: 26, color: 'var(--paper)' }}>{profile.name}</span>
              <span className="font-mono text-sm" style={{ color: 'var(--text3)' }}>ממוצע {avg}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{profile.desc}</p>
          </SummaryBlock>

          {/* Tension state */}
          <SummaryBlock color={tensionColor} label="מצב המתח">
            <p className="font-playfair mb-1.5" style={{ fontSize: 20, color: 'var(--paper)' }}>{tension.title}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{tension.message}</p>
          </SummaryBlock>

          {/* Notes */}
          <SummaryBlock color={purple} label="הערות">
            <textarea
              value={project.notes}
              onChange={(e) => update({ notes: e.target.value })}
              placeholder="תובנות, החלטות, שאלות פתוחות..."
              rows={4}
              className="w-full rounded-lg px-3 py-2.5 focus:outline-none resize-y"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border2)',
                color: 'var(--text)',
                fontFamily: 'var(--font-heebo)',
                fontSize: 15,
                lineHeight: 1.7,
              }}
            />
          </SummaryBlock>
        </div>
      </div>

      {/* Actions (not printed) */}
      <div className="no-print flex flex-wrap items-center gap-3 mt-8">
        <button
          onClick={() => window.print()}
          className="text-primary-foreground px-6 py-3 rounded-lg font-heebo text-sm font-medium transition-opacity hover:opacity-90 inline-flex items-center gap-2"
          style={{ background: 'var(--amber)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          ייצוא ל-PDF
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-lg font-heebo text-sm font-medium transition-colors"
          style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)' }}
        >
          התחל פרויקט חדש
        </button>
      </div>

      {/* Visual space prompts — auto-generated from the collected input (not printed) */}
      <div className="no-print mt-12">
        <SectionLabel>המחשת המרחב</SectionLabel>

        {!showVisuals ? (
          <div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)', maxWidth: 620 }}>
              שישה פרומפטים שמתרגמים את הפרויקט שלך — מהכוונה ועד המבנה הבנוי — לסדרת המחשות
              חזותיות של החלל שהתהליך ייצר.
            </p>
            <button
              onClick={() => setShowVisuals(true)}
              className="text-primary-foreground px-6 py-3 rounded-lg font-heebo text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: 'var(--amber)' }}
            >
              צור המחשה למרחב ←
            </button>
          </div>
        ) : (
          <div>
            {visualsAreDefault && (
              <div
                className="rounded-lg px-4 py-3 mb-5 flex items-center gap-2.5"
                style={{ background: 'var(--amber-bg)', border: '1px solid var(--amber)' }}
              >
                <span className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: 'var(--amber)' }} />
                <p className="text-sm" style={{ color: 'var(--text)' }}>
                  מבוסס על ברירת מחדל — מלאי את "חדר המתח" והכיול לתוצאה מדויקת לפרויקט שלך.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {visualPrompts.map((p, i) => (
                <article key={p.stage} className="elevate bg-card border border-border rounded-lg overflow-hidden">
                  <div style={{ height: 4, background: p.color }} />
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="rounded-full flex-shrink-0" style={{ width: 9, height: 9, background: p.color }} />
                      <span className="font-mono text-[10px]" style={{ color: 'var(--text3)' }}>{`0${i + 1}`}</span>
                      <h3 className="font-playfair" style={{ fontSize: 19, color: 'var(--paper)' }}>{p.titleHe}</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>{p.distillHe}</p>

                    <div
                      dir="ltr"
                      className="rounded-lg p-4 mb-3"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                    >
                      <pre className="font-mono whitespace-pre-wrap" style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text2)', margin: 0 }}>
                        {p.prompt}
                      </pre>
                    </div>

                    <button
                      onClick={() => copyPrompt(p.prompt)}
                      className="font-mono inline-flex items-center gap-2 rounded-lg px-4 py-2 transition-colors"
                      style={{ fontSize: 12, background: 'transparent', border: `1px solid ${p.color}`, color: p.color }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
                      </svg>
                      העתק
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
