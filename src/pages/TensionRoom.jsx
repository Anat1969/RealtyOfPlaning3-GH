import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import { ACCENT } from '../lib/accent';
import { getTension, FEEL_LABELS } from '../constants/tensionLogic';
import { useProject } from '../context/ProjectContext';

const FEELINGS = Object.entries(FEEL_LABELS).map(([key, label]) => ({ key, label }));

/* One field wrapper — highlights its truth-colour on focus */
function Field({ color, focused, label, hint, children }) {
  return (
    <div
      className="bg-card rounded-lg p-5"
      style={{
        border: `1px solid ${focused ? color : 'var(--border)'}`,
        borderRight: `3px solid ${color}`,
        transition: 'border-color 0.2s ease',
      }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: color }} />
        <label className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color }}>{label}</label>
      </div>
      {children}
      {hint && <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>{hint}</p>}
    </div>
  );
}

export default function TensionRoom() {
  const navigate = useNavigate();
  const { project, update } = useProject();
  const { intention: word, width, feel } = project;
  const [focused, setFocused] = useState(null);

  const result = getTension({ word, width, feel });

  // Replay the shake only when we ENTER a tension state (not on every keystroke/drag).
  const prevState = useRef(result.state);
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (result.state === 'tension' && prevState.current !== 'tension') {
      setPulse(p => p + 1);
    }
    prevState.current = result.state;
  }, [result.state]);

  const isTension = result.state === 'tension';
  const rc = isTension ? ACCENT.between.c : ACCENT.number.c; // coral / teal
  const rbg = isTension ? ACCENT.between.bg : ACCENT.number.bg;

  const purple = ACCENT.text.c;
  const teal = ACCENT.number.c;
  const amber = ACCENT.visual.c;

  return (
    <div style={{ maxWidth: 640, marginInline: 'auto' }}>
      <ScreenHeader
        eyebrow="חוויה — חדר המתח"
        title="הרגע ש[italic]שתי כוונות[/] מתנגשות"
        subtitle="במקום לקרוא על המתח בין טקסט, מספר וויזואליזציה — צרי אותו כאן, וראי בזמן אמת מתי נולד ידע חדש."
        progress={25}
      />
      <PageGuide
        what="נסחי כוונה במילה אחת, כווני את רוחב החלל, ובחרי אווירה — ושימי לב לאזור התוצאה שמגיב בזמן אמת."
        why="הרעיון המרכזי של המודל הוא שהידע נולד במתח בין השפות. כאן חווים את זה ישירות, לא רק קוראים עליו."
      />

      <SectionLabel>שלוש השפות — בזמן אמת</SectionLabel>

      <div className="space-y-4">
        {/* טקסט — סגול */}
        <Field color={purple} focused={focused === 'word'} label="טקסט — נסחי כוונה במילה אחת">
          <input
            type="text"
            value={word}
            onChange={(e) => update({ intention: e.target.value })}
            onFocus={() => setFocused('word')}
            onBlur={() => setFocused(null)}
            placeholder="אינטימי"
            className="w-full rounded px-3 py-2.5 text-base focus:outline-none"
            style={{
              background: 'var(--surface)',
              border: `1px solid ${focused === 'word' ? purple : 'var(--border2)'}`,
              color: 'var(--paper)',
              fontFamily: 'var(--font-playfair)',
              transition: 'border-color 0.2s ease',
            }}
          />
        </Field>

        {/* מספר — ירוק */}
        <Field color={teal} focused={focused === 'width'} label="מספר — כמה מטרים רוחב החלל?">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={2}
              max={20}
              value={width}
              onChange={(e) => update({ width: +e.target.value })}
              onFocus={() => setFocused('width')}
              onBlur={() => setFocused(null)}
              aria-label="רוחב החלל במטרים"
              className="flex-1"
              style={{ accentColor: teal }}
            />
            <span className="font-mono text-lg" style={{ color: teal, minWidth: 64, textAlign: 'left' }}>
              {width}מ'
            </span>
          </div>
        </Field>

        {/* ויזואליזציה — כתום */}
        <Field color={amber} focused={focused === 'feel'} label="ויזואליזציה — איזו אווירה?">
          <div className="flex gap-2.5">
            {FEELINGS.map((f) => {
              const active = feel === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => update({ feel: f.key })}
                  onFocus={() => setFocused('feel')}
                  onBlur={() => setFocused(null)}
                  aria-pressed={active}
                  className="flex-1 rounded-lg py-2.5 text-sm transition-colors"
                  style={{
                    background: active ? amber : 'transparent',
                    color: active ? 'var(--bg)' : 'var(--text2)',
                    border: `1px solid ${active ? amber : 'var(--border2)'}`,
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      {/* Live result */}
      <SectionLabel>מה קורה בין השפות</SectionLabel>
      <div
        key={pulse}
        className={isTension ? 'animate-tension' : 'animate-fade-up'}
        style={{
          background: rbg,
          border: `1px solid ${rc}`,
          borderRight: `4px solid ${rc}`,
          borderRadius: 12,
          padding: '24px 24px',
        }}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="rounded-full flex-shrink-0" style={{ width: 10, height: 10, background: rc }} />
          <h3 className="font-playfair leading-tight" style={{ fontSize: 22, color: 'var(--paper)' }}>{result.title}</h3>
        </div>
        <p className="leading-relaxed" style={{ fontSize: 15, color: 'var(--text)' }}>{result.message}</p>

        {result.questions.length > 0 && (
          <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${rc}44` }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: rc }}>
              שאלות פתיחה לפתרון המתח
            </p>
            <div className="space-y-2.5">
              {result.questions.map((q, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="font-mono text-xs flex-shrink-0 mt-0.5" style={{ color: rc }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate('/tools')}
        className="mt-8 text-primary-foreground px-6 py-3 rounded-lg font-heebo text-sm font-medium transition-opacity hover:opacity-90"
        style={{ background: 'var(--amber)' }}
      >
        המשך לכלים ←
      </button>
    </div>
  );
}
