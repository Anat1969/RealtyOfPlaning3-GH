import { getTension } from './tensionLogic';
import { getProfile } from '../lib/calibration';
import { ACCENT } from '../lib/accent';

// Fixed tail appended to every prompt.
const TAIL = ', Documentary realism, Professional architecture photography, 16:9 aspect ratio, No text, No words, No writing, No frame divisions, no watermark';

// ── Declared heuristics (translations, not facts) — input → architectural material ──

// Intention (free Hebrew word) → a spatial move, by keyword.
const INTENTION_MOVE = [
  { keys: ['אינטימי', 'חמים', 'קרוב', 'פרטי', 'מוגן'], move: 'a filtering screen and a deep sheltering threshold' },
  { keys: ['פתוח', 'רחב', 'ציבורי', 'חשוף', 'שקוף'], move: 'a continuous open frontage to the surroundings' },
  { keys: ['מקודש', 'רוחני', 'שקט', 'מרומם'], move: 'a single overhead light source and vertical stillness' },
];
const DEFAULT_MOVE = 'a defining spatial gesture shaped by the guiding word';

// Feel → material + light.
const FEEL_MAP = {
  warm: { material: 'warm hand-troweled lime plaster', light: 'diffused golden-hour light' },
  cool: { material: 'exposed board-formed concrete', light: 'even northern daylight' },
  neutral: { material: 'pale limestone', light: 'soft indirect light' },
};
// Feel may be stored as an English key ('warm'/'cool'/'neutral') or a Hebrew label.
const HE_TO_FEEL = { 'חמים': 'warm', 'קריר': 'cool', 'ניטרלי': 'neutral' };
const normFeel = (f) => (FEEL_MAP[f] ? f : (HE_TO_FEEL[f] || 'neutral'));

// Width (metres) → felt proportion.
function proportion(width) {
  if (width <= 5) return 'intimate compression, a low sheltering proportion';
  if (width <= 12) return 'a balanced, human-scaled proportion';
  return 'an expansive release toward the horizon';
}

// Calibration profile name → atmosphere (keys match CAL_PROFILES names in data.js).
const PROFILE_ATMOSPHERE = {
  'נזירות': 'austere minimal emptiness, only the essential',
  'הבית': 'warm domestic everyday intimacy',
  'האיזון — הסטודיו': 'balanced working clarity, equal presence of all languages',
  'המקדש': 'elevated spiritual intensity, a non-repeatable experience',
  'השוק': 'layered multi-sensory abundance, all senses active at once',
};
const DEFAULT_ATMOSPHERE = 'balanced working clarity, equal presence of all languages';

const DEFAULT_LOCATION = 'in an Israeli coastal Mediterranean setting';

const findMove = (intention) => {
  const hit = INTENTION_MOVE.find((m) => m.keys.some((k) => intention.includes(k)));
  return hit ? hit.move : DEFAULT_MOVE;
};

const STAGES = [
  { stage: 'text', color: ACCENT.text.c, titleHe: 'הכוונה', distillHe: 'המרחב כאווירה — עוד לפני שהוא קיים.' },
  { stage: 'number', color: ACCENT.number.c, titleHe: 'המידה', distillHe: 'אותו חלל מקבל פרופורציה מדויקת מהמספר.' },
  { stage: 'visual', color: ACCENT.visual.c, titleHe: 'החוויה', distillHe: 'האמת החושית — חומר, אור ומגע.' },
  { stage: 'tension', color: ACCENT.between.c, titleHe: 'המתח', distillHe: 'הסתירה הפורה הופכת לחלל פיזי.' },
  { stage: 'synthesis', color: ACCENT.between.c, titleHe: 'הסינתזה', distillHe: 'מהלך אחד שמחזיק את שתי הכוונות יחד.' },
  { stage: 'built', color: ACCENT.visual.c, titleHe: 'המרחב הבנוי', distillHe: 'החלל הגמור, מיושב וחי — סוף הקשת.' },
];

// Build the six prompts from whatever the app has collected.
export function getVisualPrompts(project = {}) {
  const rawIntention = (project.intention || '').trim();
  const isDefault = !rawIntention;
  const intention = rawIntention || 'סף שמכין';
  const width = Number(project.width) || 8;
  const feel = normFeel(project.feel);
  const location = (project.location && project.location.trim()) || DEFAULT_LOCATION;

  const { material, light } = FEEL_MAP[feel];
  const move = findMove(intention);
  const prop = proportion(width);

  const { profile } = getProfile(project.calibration || {});
  const profileAtmosphere = PROFILE_ATMOSPHERE[profile?.name] || DEFAULT_ATMOSPHERE;

  const tension = getTension({ word: intention, width, feel });
  const tensionPhrase = tension.state === 'tension'
    ? `a "${intention}" intent set against a ${width}-meter span — the two held at once`
    : `the "${intention}" intent and its dimension in quiet agreement`;

  const bodies = [
    // 1 — text
    `The atmosphere of a threshold embodying the intention "${intention}", before architecture fully exists — ${move}, ${material}, ${light}, pre-formal anticipatory stillness, ${location}`,
    // 2 — number
    `The same space given precise proportion — ${prop} shaped from a ${width}-meter dimension, ${material}, hard defining light revealing exact depth, the body reading the measure`,
    // 3 — visual
    `The tactile truth of the same space — ${material} inviting touch, ${light} filtered through a screen casting soft shadows, sensory intimacy sensed before understood, ${location}`,
    // 4 — tension
    `The productive contradiction made physical — ${tensionPhrase}, ${material}, ${location}, fertile unresolved tension`,
    // 5 — synthesis
    `The resolving concept — one spatial move holding both intentions without surrendering either, ${move} at full clarity, ${profileAtmosphere}, ${material}, calm architectural clarity`,
    // 6 — built
    `The finished, inhabited living space — the same architecture now lived in, everyday life present, ${profileAtmosphere}, ${light}, ${material}, ${location}, the built payoff of the whole process`,
  ];

  const prompts = STAGES.map((s, i) => ({
    ...s,
    prompt: bodies[i] + TAIL,
  }));

  return { prompts, isDefault };
}
