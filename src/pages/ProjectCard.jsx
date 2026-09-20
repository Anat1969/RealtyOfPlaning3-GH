import ScreenHeader from '../components/ScreenHeader';
import SectionLabel from '../components/SectionLabel';
import { ACCENT } from '../lib/accent';
import { getProfile } from '../lib/calibration';
import { getTension, FEEL_LABELS } from '../constants/tensionLogic';
import { useProject } from '../context/ProjectContext';

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
    </div>
  );
}
