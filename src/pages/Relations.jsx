import ScreenHeader from '../components/ScreenHeader';
import PageGuide from '../components/PageGuide';
import SectionLabel from '../components/SectionLabel';
import { RELATIONS } from '../constants/data';

function RelationList({ title, items, color, bg, symbol }) {
  return (
    <div className="elevate bg-card border border-border rounded-lg overflow-hidden">
      <div style={{ height: 4, background: color }} />
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="rounded-full flex-shrink-0" style={{ width: 9, height: 9, background: color }} />
          <h3 className="font-playfair" style={{ fontSize: 19, color: 'var(--paper)' }}>{title}</h3>
        </div>
        <div className="space-y-4">
          {items.map((r, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span
                className="font-mono text-[10px] rounded-full px-2.5 py-1 flex-shrink-0 mt-0.5 whitespace-nowrap"
                style={{ background: bg, color }}
              >
                {r.a} {symbol} {r.b}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

      <SectionLabel>קשרים בין הקריטריונים</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <RelationList title="קשרי חיזוק" items={RELATIONS.reinforce} color="var(--teal)" bg="var(--teal-bg)" symbol="+" />
        <RelationList title="קשרי מתח" items={RELATIONS.tension} color="var(--coral)" bg="var(--coral-bg)" symbol="↔" />
      </div>

      <blockquote
        className="rounded-lg p-6 mt-6"
        style={{ background: 'var(--coral-bg)', borderRight: '4px solid var(--coral)' }}
      >
        <p className="leading-relaxed" style={{ fontSize: 15, color: 'var(--text)', maxWidth: 640 }}>
          קשר מתח בין קריטריונים הוא לא כישלון — הוא <strong className="font-medium" style={{ color: 'var(--coral)' }}>מחולל</strong>.
          המתח הוא מה שמאלץ פתרון שלא היה אפשרי בלעדיו.
        </p>
      </blockquote>
    </div>
  );
}
