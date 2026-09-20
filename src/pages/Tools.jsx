import { useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import { ACCENT } from '../lib/accent';
import { getTool1Output, LIMIT_MAP, getTool3Output, getTool4Output, getTool5Status, SYNTHESIS_QUESTIONS, SYNTHESIS_INSTRUCTION } from '../constants/toolsLogic';

const TOOL_DEFS = [
  { id: 1, title: 'כוונה מנוסחת', sub: 'ניסוח חד של הכוונה המרחבית', src: 'text' },
  { id: 2, title: 'מגבלה מדויקת', sub: 'טווחי מידות לפי אופי החלל', src: 'number' },
  { id: 3, title: 'אמת חושית', sub: 'תרגום חומר לחוויה גופנית', src: 'visual' },
  { id: 4, title: 'מתח פורה', sub: 'גילוי הסתירה הפורה בין שתי כוונות', src: 'between' },
  { id: 5, title: 'נוכחות בו-זמנית', sub: 'בדיקת נוכחות שלושת הדיסציפלינות', src: 'between' },
  { id: 6, title: 'רגע הסינתזה', sub: 'ארבע שאלות לזיהוי הרגע', src: 'between' },
];

const PRESENCE_COLORS = {
  neutral: 'border-border text-muted-foreground',
  warning: 'border-[#D85A30] text-[#D85A30]',
  caution: 'border-primary text-primary',
  success: 'border-[#1D9E75] text-[#1D9E75]',
};

export default function Tools() {
  const [open, setOpen] = useState([]);
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('intimate');
  const [t3, setT3] = useState('');
  const [t4a, setT4a] = useState('');
  const [t4b, setT4b] = useState('');
  const [t5, setT5] = useState({ text: false, number: false, visual: false });

  const toggle = (id) => setOpen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const t1Out = t1.trim() ? getTool1Output(t1) : [];
  const t2Data = LIMIT_MAP[t2];
  const t3Out = t3.trim() ? getTool3Output(t3) : null;
  const t4Out = t4a.trim() && t4b.trim() ? getTool4Output(t4a, t4b) : null;
  const t5Status = getTool5Status(t5.text, t5.number, t5.visual);

  return (
    <div>
      <ScreenHeader
        eyebrow="שימוש — שישת הכלים"
        title="הכלי [italic]עושה[/] את העבודה, האדריכל מחליטה"
        subtitle="כל כלי מייצר אפשרויות, בודק עקביות, ומצביע על פערים. הפלט הוא חומר גלם — לא תשובה."
        progress={88}
      />
      <PageGuide
        what="פתח כלי אחד בכל פעם, הכנס את הנתונים מהפרויקט שלך, וקרא את הפלט בקשב."
        why="הכלים לא מייצרים תשובות — הם מייצרים חומר גלם לחשיבה. הערך הוא בשאלות שהם מעלים, לא בתוצאות שהם מחזירים."
      />

      <SectionLabel>שישה כלים לעבודה</SectionLabel>
      <div className="space-y-4">
        {TOOL_DEFS.map((tool) => {
          const isOpen = open.includes(tool.id);
          const { c, bg } = ACCENT[tool.src];
          return (
            <div key={tool.id} className="elevate bg-card border border-border rounded-lg overflow-hidden">
              <div style={{ height: 4, background: c }} />
              <button
                className="w-full flex items-center gap-4 p-5 text-right hover:bg-muted/20 transition-colors"
                onClick={() => toggle(tool.id)}
                aria-expanded={isOpen}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-medium flex-shrink-0"
                  style={{ background: bg, color: c, border: `1px solid ${c}66` }}
                >
                  {tool.id}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-playfair" style={{ fontSize: 18, color: 'var(--paper)' }}>{tool.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text2)' }}>{tool.sub}</p>
                </div>
                <svg className={`chev flex-shrink-0${isOpen ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div className="accordion-content px-5 pb-6 pt-1 border-t border-border">
                  {/* Tool 1 */}
                  {tool.id === 1 && (
                    <div>
                      <input
                        type="text"
                        value={t1}
                        onChange={e => setT1(e.target.value)}
                        placeholder="הקלידי מילה או ביטוי..."
                        className="w-full bg-muted/30 border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary mb-4"
                      />
                      {t1Out.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0" style={{ background: 'rgba(127,119,221,0.15)', color: '#7F77DD' }}>{i + 1}</span>
                          <p className="text-sm text-muted-foreground">{s}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tool 2 */}
                  {tool.id === 2 && (
                    <div>
                      <select
                        value={t2}
                        onChange={e => setT2(e.target.value)}
                        className="w-full bg-muted/30 border border-border rounded px-3 py-2 text-sm text-foreground mb-5 focus:outline-none focus:border-primary"
                      >
                        {Object.entries(LIMIT_MAP).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </select>
                      {t2Data && (
                        <>
                          <div className="space-y-4 mb-4">
                            {t2Data.dims.map((d, i) => (
                              <div key={i}>
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>{d.label}</span>
                                  <span className="font-mono">{d.min} – {d.max}</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: '#1D9E75' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground border-r-2 border-primary/50 pr-3">{t2Data.note}</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Tool 3 */}
                  {tool.id === 3 && (
                    <div>
                      <input
                        type="text"
                        value={t3}
                        onChange={e => setT3(e.target.value)}
                        placeholder="הקלידי חומר (זכוכית, בטון, עץ...)..."
                        className="w-full bg-muted/30 border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary mb-4"
                      />
                      {t3Out && (
                        <div className="space-y-2">
                          {Object.entries(t3Out).map(([sense, val]) => (
                            <div key={sense} className="flex items-start gap-2">
                              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0" style={{ background: 'rgba(239,159,39,0.15)', color: '#EF9F27' }}>{sense}</span>
                              <p className="text-sm text-muted-foreground">{val}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tool 4 */}
                  {tool.id === 4 && (
                    <div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <input
                          type="text"
                          value={t4a}
                          onChange={e => setT4a(e.target.value)}
                          placeholder="כוונה ראשונה..."
                          className="bg-muted/30 border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                        />
                        <input
                          type="text"
                          value={t4b}
                          onChange={e => setT4b(e.target.value)}
                          placeholder="כוונה שנייה..."
                          className="bg-muted/30 border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                        />
                      </div>
                      {t4Out && (
                        <div>
                          <div className="border-r-2 border-[#D85A30] pr-3 mb-4">
                            <p className="text-sm text-muted-foreground">{t4Out.conflict}</p>
                          </div>
                          <div className="space-y-2">
                            {t4Out.resolutions.map((r, i) => (
                              <div key={i} className="border-r-2 border-[#1D9E75] pr-3">
                                <p className="text-sm text-muted-foreground">{r}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tool 5 */}
                  {tool.id === 5 && (
                    <div>
                      <div className="flex gap-6 mb-5">
                        {[
                          { key: 'text', label: 'טקסט', color: '#7F77DD' },
                          { key: 'number', label: 'מספר', color: '#1D9E75' },
                          { key: 'visual', label: 'ויזואליזציה', color: '#EF9F27' },
                        ].map(({ key, label, color }) => (
                          <label key={key} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={t5[key]}
                              onChange={e => setT5(prev => ({ ...prev, [key]: e.target.checked }))}
                              className="accent-primary w-4 h-4"
                            />
                            <span className="text-sm font-mono" style={{ color }}>{label}</span>
                          </label>
                        ))}
                      </div>
                      <div className={`border rounded-lg p-4 ${PRESENCE_COLORS[t5Status.color]}`}>
                        <p className="text-sm leading-relaxed">{t5Status.msg}</p>
                      </div>
                    </div>
                  )}

                  {/* Tool 6 */}
                  {tool.id === 6 && (
                    <div>
                      <div className="space-y-4 mb-5">
                        {SYNTHESIS_QUESTIONS.map((q, i) => (
                          <div key={i} className="border-r-2 border-border pr-4">
                            <p className="text-sm text-foreground mb-1">{q.q}</p>
                            <p className="text-xs text-muted-foreground">{q.hint}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{SYNTHESIS_INSTRUCTION}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}