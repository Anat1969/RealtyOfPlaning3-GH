// ── Tension Room heuristics ──────────────────────────────────────────────
// This is a DECLARED heuristic, not real data or a physics model. It maps a
// written intention (word), a measured width (metres) and a felt atmosphere
// (feel) onto "harmony" or "productive tension" — to let the user EXPERIENCE
// the model's core idea (knowledge born where the three languages disagree).
//
// Rules (first match wins):
//   1. intimate-type word  + width > 10m   → tension (small intention, big space)
//   2. open-type word      + width < 6m    → tension (open intention, tight space)
//   3. warm-type word      + feel "cool"   → tension (word vs atmosphere)
//   4. open-type word      + feel "warm"   → tension (word vs atmosphere)
//   otherwise                              → harmony
// Keyword lists are substrings so inflected Hebrew forms still match.

export const FEEL_LABELS = { warm: 'חמים', cool: 'קריר', neutral: 'ניטרלי' };

const INTIMATE = ['אינטימי', 'חמים', 'קרוב', 'מוגן', 'פרטי', 'שקט', 'נעים', 'חמימות', 'אינטימיות', 'כינוס', 'מקלט', 'מחסה'];
const OPEN = ['פתוח', 'רחב', 'ציבורי', 'אוורירי', 'מרווח', 'פתיחות', 'חשוף', 'מונומנטלי', 'עצום'];

const hasAny = (word, list) => list.some(k => word.includes(k));

export function getTension({ word = '', width = 8, feel = 'neutral' }) {
  const w = (word || '').trim();
  const isIntimate = hasAny(w, INTIMATE);
  const isOpen = hasAny(w, OPEN);

  // Initial / not-enough-input state → calm harmony prompt.
  if (!w) {
    return {
      state: 'harmony',
      title: 'שלוש השפות עדיין מקשיבות',
      message: 'נסחי כוונה במילה אחת, כווני את רוחב החלל, ובחרי אווירה — ואבדוק בזמן אמת אם שלוש השפות מסכימות או מתנגשות.',
      questions: [],
    };
  }

  // Rule 1 — intimate intention vs a large space
  if (isIntimate && width > 10) {
    return {
      state: 'tension',
      title: 'מתח פורה — לא כישלון',
      message: `כוונה "${w}" אינטימית מול חלל של ${width}מ' — כאן, בפער בין המילה למספר, נולד הפתרון.`,
      questions: [
        'מה יכול להפוך חלל רחב לאינטימי בלי לצמצם אותו פיזית?',
        'האם האינטימיות יכולה לחיות בפינה אחת בתוך המרחב הגדול?',
        'איזה אלמנט (תקרה, אור, חומר) יוצר קרבה גם במרחק?',
      ],
    };
  }

  // Rule 2 — open/public intention vs a tight space
  if (isOpen && width < 6) {
    return {
      state: 'tension',
      title: 'מתח פורה — לא כישלון',
      message: `כוונה "${w}" פתוחה מול חלל צר של ${width}מ' — הצמצום הזה הוא ההזדמנות, לא המכשול.`,
      questions: [
        'איך יוצרים תחושת פתיחות בלי רוחב — לגובה? לאור? לרצף?',
        'מה הפתח הבודד שיכול לפרוץ את הצרות?',
        'האם הצמצום יכול להפוך למעבר שמכין את הפתיחות הבאה?',
      ],
    };
  }

  // Rule 3 — warm/intimate word vs a cool atmosphere
  if (isIntimate && feel === 'cool') {
    return {
      state: 'tension',
      title: 'מתח פורה — לא כישלון',
      message: `המילה "${w}" מבקשת חום, אבל בחרת אווירה קרירה — הסתירה בין הטקסט לוויזואליזציה היא המנוע.`,
      questions: [
        'האם הקרירות יכולה להיות רקע שמבליט נקודת חום אחת?',
        'איזה חומר אחד ישבור את הקרירות בדיוק במקום הנכון?',
        'מה קורה אם החום מגיע מהאור ולא מהחומר?',
      ],
    };
  }

  // Rule 4 — open word vs a warm atmosphere
  if (isOpen && feel === 'warm') {
    return {
      state: 'tension',
      title: 'מתח פורה — לא כישלון',
      message: `המילה "${w}" מבקשת מרחב פתוח, אבל האווירה שבחרת חמה ואינטימית — כאן נוצר המתח הפורה.`,
      questions: [
        'האם החום יכול "לרכך" מרחב פתוח בלי לסגור אותו?',
        'איפה הפתיחות נשארת, ואיפה החום מתערב?',
        'מה מגדיר את הגבול בין הפתוח לחמים?',
      ],
    };
  }

  // Otherwise — the three languages agree.
  return {
    state: 'harmony',
    title: 'שלוש השפות מסכימות',
    message: `הכוונה "${w}", רוחב של ${width}מ' והאווירה שבחרת מתיישבות זו עם זו. זו נקודת פתיחה יציבה — אבל זכרי: המתח הוא שמוליד קונספט.`,
    questions: [],
  };
}
