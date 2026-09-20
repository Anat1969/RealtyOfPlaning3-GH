import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import { DISCIPLINES } from '../constants/data';

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DISCIPLINES.map((d) => (
          <div key={d.id} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Card Header */}
            <div
              className="flex items-center gap-4 p-6 border-b border-border"
              style={{ borderRight: `3px solid ${d.accentColor}` }}
            >
              <span className="text-3xl font-mono" style={{ color: d.accentColor }}>{d.icon}</span>
              <div>
                <h3 className="font-playfair text-xl text-foreground">{d.name}</h3>
                <p className="text-muted-foreground text-base">{d.tagline}</p>
              </div>
            </div>
            {/* Roles Grid */}
            <div className="grid grid-cols-1 gap-0">
              {d.roles.map((role, i) => (
                <div key={i} className="p-4 border-b border-l border-border last:border-b-0">
                  <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: d.accentColor }}>
                    {role.title}
                  </p>
                  <p className="text-muted-foreground text-base leading-relaxed">{role.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}