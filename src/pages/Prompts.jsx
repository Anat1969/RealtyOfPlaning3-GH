import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import { ACCENT } from '../lib/accent';
import { PROMPTS } from '../constants/prompts';

const TAB_KEYS = ['sketch', 'technical', 'render'];
const TAB_LABELS = { sketch: 'סקיצה', technical: 'שרטוט טכני', render: 'רנדר' };

// Map each prompt to the model's colour language (6 prompts ↔ 6 criteria)
const PROMPT_SRC = { 1: 'text', 2: 'number', 3: 'visual', 4: 'between', 5: 'between', 6: 'between' };

export default function Prompts() {
  const [open, setOpen] = useState([]);
  const [tabs, setTabs] = useState({});
  const [copied, setCopied] = useState(null);

  const toggle = (id) => setOpen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const setTab = (id, tab) => setTabs(prev => ({ ...prev, [id]: tab }));

  const handleCopy = (text, id) => {
    const done = () => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  };

  const fallbackCopy = (text, done) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div>
      <ScreenHeader
        eyebrow="שימוש — פרומפטים להמחשה"
        title="שמונה עשר [italic]פרומפטים[/] להמחשה"
        subtitle="שלושה סוגים לכל קריטריון: סקיצה לגילוי, שרטוט לבדיקה, רנדר לאמת."
        progress={100}
      />
      <PageGuide
        what="בחר קריטריון, בחר סוג (סקיצה / שרטוט / רנדר), העתק את הפרומפט, ודא שהוא מתאים לפרויקט שלך לפני השימוש."
        why="פרומפט כללי נותן תוצאה כללית. ההתאמה לפרויקט הספציפי — שינוי חומר, מידה, אווירה — היא מה שהופך את הכלי לאדריכלי."
      />

      <SectionLabel>שמונה עשר פרומפטים</SectionLabel>
      <div className="space-y-4">
        {PROMPTS.map((prompt) => {
          const isOpen = open.includes(prompt.id);
          const activeTab = tabs[prompt.id] || 'sketch';
          const activeType = prompt.types[activeTab] || prompt.types.sketch || Object.values(prompt.types)[0];
          const acc = ACCENT[PROMPT_SRC[prompt.id]] || { c: prompt.accentColor, bg: prompt.accentBg };

          return (
            <div key={prompt.id} className="elevate bg-card border border-border rounded-lg overflow-hidden">
              <div style={{ height: 4, background: acc.c }} />
              <button
                className="w-full flex items-center gap-4 p-5 text-right hover:bg-muted/20 transition-colors"
                onClick={() => toggle(prompt.id)}
                aria-expanded={isOpen}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-medium flex-shrink-0"
                  style={{ background: acc.bg, color: acc.c, border: `1px solid ${acc.c}66` }}
                >
                  {prompt.id}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-playfair" style={{ fontSize: 18, color: 'var(--paper)' }}>{prompt.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text2)' }}>{prompt.sub}</p>
                </div>
                <svg className={`chev flex-shrink-0${isOpen ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={acc.c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div className="accordion-content px-5 pb-6 pt-1 border-t border-border">
                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-5 pr-3"
                    style={{ borderRight: `3px solid ${acc.c}`, color: 'var(--text)' }}
                  >
                    {prompt.desc}
                  </p>

                  {/* Tabs */}
                  <div className="flex gap-1 mb-4" role="tablist">
                    {TAB_KEYS.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setTab(prompt.id, tab)}
                        role="tab"
                        aria-selected={activeTab === tab}
                        className="px-3 py-1.5 text-xs font-mono rounded transition-colors"
                        style={
                          activeTab === tab
                            ? { borderBottom: `2px solid ${acc.c}`, color: acc.c, background: acc.bg }
                            : { color: 'var(--text2)', background: 'transparent', borderBottom: '2px solid transparent' }
                        }
                      >
                        {TAB_LABELS[tab]}
                      </button>
                    ))}
                  </div>

                  {/* Type label */}
                  <p className="font-mono text-[11px] text-muted-foreground/60 mb-2">{activeType.label}</p>

                  {/* Prompt text */}
                  <div className="bg-muted/30 border border-border rounded-lg p-4 mb-3 relative">
                    <pre
                      className="font-mono text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap"
                      dir="ltr"
                    >
                      {activeType.text}
                    </pre>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(activeType.text, `${prompt.id}-${activeTab}`)}
                    className="font-mono text-xs px-3 py-1.5 rounded border border-border hover:border-primary transition-colors"
                    style={copied === `${prompt.id}-${activeTab}` ? { color: '#1D9E75', borderColor: '#1D9E75' } : {}}
                  >
                    {copied === `${prompt.id}-${activeTab}` ? 'הועתק ✓' : 'העתקה'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}