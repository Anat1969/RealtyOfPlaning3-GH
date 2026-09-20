import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import { accentByIndex } from '../lib/accent';
import { SYNTHESIS_TYPES, SYNTHESIS_CONDITIONS } from '../constants/data';

export default function Synthesis() {
  return (
    <div>
      <ScreenHeader
        eyebrow="חשיפה — רגע הסינתזה"
        title="הרגע ש[italic]לא[/] ניתן לתכנן"
        subtitle="רגע הסינתזה הוא לא הרגע שבו הכל מסתדר — הוא הרגע שבו נוצר ידע שלא היה קיים לפני כן."
        progress={38}
      />
      <PageGuide
        what="קרא את שלושת סוגי הסינתזה ואת שלושת התנאים. שאל את עצמך: האם אי פעם חוויתי אחד מאלה?"
        why="רגע הסינתזה חולף מהר — מי שיודעת לזהות אותו מראש מצליחה לתעד אותו. מי שלא — מאבדת אותו."
      />

      <SectionLabel>שלושה סוגי סינתזה</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {SYNTHESIS_TYPES.map((t, i) => {
          const { c, bg } = accentByIndex(i);
          return (
            <article key={t.num} className="elevate bg-card border border-border rounded-lg overflow-hidden">
              <div style={{ height: 4, background: c }} />
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span
                    className="rounded-full flex items-center justify-center font-mono flex-shrink-0"
                    style={{ width: 26, height: 26, background: bg, color: c, fontSize: 11 }}
                  >
                    {t.num}
                  </span>
                  <h3 className="font-playfair leading-tight" style={{ fontSize: 21, color: 'var(--paper)' }}>{t.name}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{t.desc}</p>
              </div>
            </article>
          );
        })}
      </div>

      <SectionLabel>שלושה תנאים לסינתזה</SectionLabel>
      <div className="bg-card border border-border rounded-lg elevate p-6 md:p-8">
        <div className="space-y-6">
          {SYNTHESIS_CONDITIONS.map((cond) => (
            <div key={cond.num} className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs font-medium mt-0.5"
                style={{ background: `${cond.color}22`, color: cond.color, border: `1px solid ${cond.color}66` }}
              >
                {cond.num}
              </div>
              <div>
                <p className="font-playfair mb-1" style={{ fontSize: 17, color: 'var(--paper)' }}>{cond.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{cond.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
