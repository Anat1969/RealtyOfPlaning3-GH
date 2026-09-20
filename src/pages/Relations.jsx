import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import { RELATIONS } from '../constants/data';

export default function Relations() {
  return (
    <div>
      <ScreenHeader
        eyebrow="הבנה — מפת יחסים"
        title="כיצד הקריטריונים [italic]מדברים[/] זה עם זה"
        subtitle="לא כל הקריטריונים שווים — חלקם מחזקים, חלקם יוצרים מתח. שניהם נחוצים."
        progress={64}
      />
      <PageGuide
        what="בחן כל זוג קריטריונים: האם הם מחזקים זה את זה בפרויקט שלך, או יוצרים מתח?"
        why="הבנת היחסים בין קריטריונים חושפת מתח פורה בלתי נראה — זה המקום שממנו יצמח הקונספט."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reinforce */}
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">קשרי חיזוק</p>
          <div className="space-y-3">
            {RELATIONS.reinforce.map((r, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(29,158,117,0.15)', color: '#1D9E75' }}
                >
                  {r.a} + {r.b}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tension */}
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">קשרי מתח</p>
          <div className="space-y-3">
            {RELATIONS.tension.map((r, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(216,90,48,0.15)', color: '#D85A30' }}
                >
                  {r.a} ↔ {r.b}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {/* Note */}
        <div className="border border-border rounded-lg p-5 bg-muted/30">
          <p className="text-muted-foreground text-sm leading-relaxed">
            קשר מתח בין קריטריונים הוא לא כישלון — הוא מחולל. המתח הוא מה שמאלץ פתרון שלא היה אפשרי בלעדיו.
          </p>
        </div>
      </div>
    </div>
  );
}