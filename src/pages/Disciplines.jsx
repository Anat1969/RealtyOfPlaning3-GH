import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import InsightImage from '../components/InsightImage';
import { ACCENT } from '../lib/accent';
import { DISCIPLINES } from '../constants/data';
import { DISCIPLINE_PROMPTS } from '../constants/insightPrompts';

export default function Disciplines() {
  return (
    <div>
      <ScreenHeader
        eyebrow="חשיפה — שלוש הדיסציפלינות"
        title="כיצד כל [italic]שפה[/] פועלת"
        subtitle="כל דיסציפלינה פועלת בצורה שונה — מייצרת סוג אחר של ידע, מגלה סוג אחר של אמת."
        progress={25}
      />
      <PageGuide
        what="עבור על כל דיסציפלינה ובדוק: איפה היא נוכחת בעבודה שלך עכשיו? איפה היא חסרה?"
        why="זיהוי שלושת הדיסציפלינות בפרויקט קונקרטי הוא הצעד הראשון לעבודה מכוונת — לא ניתן לנהל מה שלא רואים."
      />

      <SectionLabel>שלוש השפות לעומק</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DISCIPLINES.map((d) => {
          const { c, bg } = ACCENT[d.id];
          return (
            <article key={d.id} className="elevate bg-card border border-border rounded-lg overflow-hidden">
              {/* vivid top accent bar */}
              <div style={{ height: 4, background: c }} />

              {/* Visual insight — prompt + drag/paste/upload image frame */}
              <div style={{ padding: '16px 16px 0' }}>
                <InsightImage
                  id={`disc-${d.id}`}
                  prompt={DISCIPLINE_PROMPTS[d.id]}
                  color={c}
                  bg={bg}
                  ratio="16 / 10"
                  label="המחשת השפה"
                />
              </div>

              {/* Card header — clear hierarchy */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="rounded-full flex-shrink-0" style={{ width: 10, height: 10, background: c }} />
                  <h3 className="font-playfair leading-tight" style={{ fontSize: 23, color: 'var(--paper)' }}>{d.name}</h3>
                  <span aria-hidden="true" className="font-mono" style={{ marginInlineStart: 'auto', fontSize: 28, color: c, opacity: 0.22, lineHeight: 1 }}>
                    {d.icon}
                  </span>
                </div>
                <span
                  className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] rounded-full px-2.5 py-1 mb-3"
                  style={{ background: bg, color: c }}
                >
                  {d.truth}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{d.tagline}</p>
              </div>

              {/* Roles */}
              <div>
                {d.roles.map((role, i) => (
                  <div
                    key={i}
                    className="p-4"
                    style={{ borderBottom: i < d.roles.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: c }} />
                      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: c }}>{role.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{role.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
