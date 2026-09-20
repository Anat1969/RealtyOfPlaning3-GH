import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import { PROMPTS } from '../constants/prompts';

const TAB_KEYS = ['sketch', 'technical', 'render'];
const TAB_LABELS = { sketch: 'סקיצה', technical: 'שרטוט טכני', render: 'רנדר' };

export default function Prompts() {
  const [open, setOpen] = useState([]);
  const [tabs, setTabs] = useState({});
  const [copied, setCopied] = useState(null);

  const toggle = (id) => setOpen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const setTab = (id, tab) => setTabs(prev => ({ ...prev, [id]: tab }));

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
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

      <div className="space-y-3">
        {PROMPTS.map((prompt) => {
          const isOpen = open.includes(prompt.id);
          const activeTab = tabs[prompt.id] || 'sketch';
          const activeType = prompt.types[activeTab];

          return (
            <div key={prompt.id} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center gap-4 p-5 text-right hover:bg-muted/20 transition-colors"
                onClick={() => toggle(prompt.id)}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-medium flex-shrink-0"
                  style={{ background: prompt.accentBg, color: prompt.accentColor, border: `1px solid ${prompt.accentColor}55` }}
                >
                  {prompt.id}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-playfair text-base text-foreground">{prompt.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{prompt.sub}</p>
                </div>
                <span className="text-muted-foreground">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-1 border-t border-border">
                  {/* Description */}
                  <p
                    className="text-sm text-muted-foreground leading-relaxed mb-5 pr-3"
                    style={{ borderRight: `3px solid ${prompt.accentColor}33` }}
                  >
                    {prompt.desc}
                  </p>

                  {/* Tabs */}
                  <div className="flex gap-1 mb-4">
                    {TAB_KEYS.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setTab(prompt.id, tab)}
                        className="px-3 py-1.5 text-xs font-mono rounded transition-colors"
                        style={
                          activeTab === tab
                            ? { borderBottom: `2px solid ${prompt.accentColor}`, color: prompt.accentColor, background: prompt.accentBg }
                            : { color: 'hsl(var(--muted-foreground))', background: 'transparent', borderBottom: '2px solid transparent' }
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