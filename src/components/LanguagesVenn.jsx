import { useState } from 'react';

const LANGS = [
  {
    id: 'text', name: 'טקסט', truth: 'אמת מנוסחת', color: 'var(--purple)', bg: 'var(--purple-bg)',
    desc: 'מילים שמנסחות כוונה — עוד לפני שקיים חלל.',
    cx: 220, cy: 120, lx: 220, ly: 78,
  },
  {
    id: 'number', name: 'מספר', truth: 'אמת מדודה', color: 'var(--teal)', bg: 'var(--teal-bg)',
    desc: 'מידות שמכריעות חוויה — בלי מקום לפרשנות.',
    cx: 150, cy: 236, lx: 108, ly: 262,
  },
  {
    id: 'visual', name: 'ויזואליזציה', truth: 'אמת מורגשת', color: 'var(--amber)', bg: 'var(--amber-bg)',
    desc: 'תמונות שחושפות את מה שהגוף כבר יודע.',
    cx: 290, cy: 236, lx: 332, ly: 262,
  },
];

const R = 92;

export default function LanguagesVenn() {
  const [active, setActive] = useState(null);
  const current = LANGS.find(l => l.id === active);

  return (
    <div className="bg-card border border-border rounded-lg elevate p-6 md:p-8">
      <svg
        viewBox="0 0 440 380"
        width="100%"
        style={{ maxWidth: 460, margin: '0 auto', display: 'block', overflow: 'visible' }}
        role="img"
        aria-label="דיאגרמת שלוש השפות והסינתזה ביניהן"
      >
        {/* Circles */}
        {LANGS.map((l) => {
          const isDim = active && active !== l.id;
          return (
            <g
              key={l.id}
              className="venn-lang"
              tabIndex={0}
              role="button"
              aria-label={`${l.name} — ${l.truth}`}
              onMouseEnter={() => setActive(l.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(l.id)}
              onBlur={() => setActive(null)}
              style={{ opacity: isDim ? 0.45 : 1 }}
            >
              <circle
                cx={l.cx}
                cy={l.cy}
                r={R}
                fill={l.color}
                fillOpacity={active === l.id ? 0.42 : 0.24}
                stroke={l.color}
                strokeWidth={active === l.id ? 2.5 : 1.5}
              />
            </g>
          );
        })}

        {/* Synthesis core (triple overlap) */}
        <g style={{ pointerEvents: 'none' }}>
          <circle className="venn-glow" cx={220} cy={196} r={20} fill="var(--coral)" fillOpacity={0.9} />
          <text x={220} y={201} textAnchor="middle" style={{ fill: 'var(--bg)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500 }}>✦</text>
        </g>

        {/* Labels */}
        {LANGS.map((l) => (
          <g key={`lbl-${l.id}`} style={{ pointerEvents: 'none' }}>
            <text x={l.lx} y={l.ly} textAnchor="middle" style={{ fill: 'var(--paper)', fontFamily: 'var(--font-playfair)', fontSize: 18 }}>
              {l.name}
            </text>
            <text x={l.lx} y={l.ly + 16} textAnchor="middle" style={{ fill: l.color, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em' }}>
              {l.truth}
            </text>
          </g>
        ))}

        {/* Synthesis label */}
        <text x={220} y={244} textAnchor="middle" style={{ fill: 'var(--coral)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em' }}>
          סינתזה
        </text>
      </svg>

      {/* Live caption — the experiential payoff */}
      <div
        className="mt-6 rounded-lg px-5 py-4 text-center"
        style={{
          minHeight: 92,
          background: current ? current.bg : 'var(--surface2)',
          border: `1px solid ${current ? current.color : 'var(--border)'}`,
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        {current ? (
          <>
            <p className="font-playfair mb-1" style={{ fontSize: 20, color: current.color }}>{current.name}</p>
            <p className="text-sm" style={{ color: 'var(--text)' }}>{current.desc}</p>
          </>
        ) : (
          <>
            <p className="font-playfair mb-1" style={{ fontSize: 20, color: 'var(--coral)' }}>
              במקום שבו שלושתן נפגשות — נולד הרעיון
            </p>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>
              העבירי את הסמן על כל שפה כדי לראות מה היא מביאה. הסינתזה חיה במרכז.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
