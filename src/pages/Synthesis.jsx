import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
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

      {/* Synthesis Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {SYNTHESIS_TYPES.map((t) => (
          <div key={t.num} className="bg-card border border-border rounded-lg p-5">
            <p className="font-mono text-[11px] text-muted-foreground mb-2">{t.num}</p>
            <h3 className="font-playfair text-base text-foreground mb-2">{t.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Three Conditions Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">שלושה תנאים לסינתזה</p>
        <div className="space-y-5">
          {SYNTHESIS_CONDITIONS.map((c) => (
            <div key={c.num} className="flex gap-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-mono font-medium mt-0.5"
                style={{ background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}55` }}
              >
                {c.num}
              </div>
              <div>
                <p className="text-foreground text-sm font-medium mb-1">{c.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}