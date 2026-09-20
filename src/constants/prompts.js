export const PROMPTS = [
  {
    id: 1,
    title: 'כוונה מנוסחת',
    sub: 'המסגור — כיצד מילה אחת מגדירה שדה אפשרויות',
    desc: 'תיאור: מסגור — כיצד מילה אחת מגדירה שדה אפשרויות שלם. הניסוח הוא הארכיטקט הבלתי-נראה.',
    accentColor: '#7F77DD',
    accentBg: 'rgba(127,119,221,0.15)',
    types: {
      sketch: {
        label: 'סקיצת אדריכל — גרפיט על נייר',
        text: `Architectural concept sketch, graphite on aged cream paper, rough freehand lines. A narrow threshold — just one body's width — drawn with a single decisive stroke opening into an implied larger space beyond. Asymmetric composition: the entry mark sits at left third, negative space dominates right two-thirds. Raw, immediate, process-visible. No fill, no color. No text. No frame divisions.`
      },
      technical: {
        label: 'שרטוט טכני — תכנית וחתך',
        text: `Architectural technical drawing, black ink on white, precise vector-weight lines. Plan and section of a single threshold condition: a gap of exactly 900mm width in a 400mm thick wall, annotated with dimension lines and material callouts. The plan shows the compression of the gap versus the expansion of spaces on either side. Clean, minimal, engineering-precise. No text. No frame divisions.`
      },
      render: {
        label: 'רנדר ריאליסטי — אור אמיתי',
        text: `Architectural photography, interior, late afternoon natural light. A threshold condition: a deliberately narrow opening in a raw concrete wall, body-width, leading from a compressed dark antechamber into a bright courtyard beyond. The light pours through the gap as a single luminous column. Shot from slightly below eye-level, compression/expansion dynamic fully expressed. f/8, 24mm equivalent. No text. No frame divisions.`
      }
    }
  },
  {
    id: 2,
    title: 'מגבלה מדויקת',
    sub: 'הכרעה — כיצד ס״מ בודד משנה את כל מה שנחווה',
    desc: 'תיאור: הכרעה — כיצד ס״מ בודד משנה את כל מה שנחווה. המספר כגיבור שקט.',
    accentColor: '#1D9E75',
    accentBg: 'rgba(29,158,117,0.15)',
    types: {
      sketch: {
        label: 'סקיצת אדריכל — השוואת גבהים',
        text: `Architectural section sketch, graphite on tracing paper. Two identical rooms drawn side by side — same plan footprint, same window, same furniture silhouette. Left room: ceiling at 2.2m, human figure standing, head nearly touching ceiling. Right room: ceiling at 3.8m, same figure surrounded by air. Dimension lines annotated precisely. The difference in spatial feeling is palpable through line weight alone. No color. No text. No frame divisions.`
      },
      technical: {
        label: 'שרטוט טכני — שלושה חדרים',
        text: `Architectural comparative section drawing, black ink on white. Three identical rooms in row — same width 4m, same window opening 1.2m wide. Only ceiling heights differ: 2.1m / 2.7m / 4.2m. Human figure silhouette at same position in each. Dimension lines crisp and annotated. Grid background at 500mm intervals. No text. No frame divisions.`
      },
      render: {
        label: 'רנדר ריאליסטי — דיפטיך',
        text: `Architectural photography diptych, both images identical except ceiling height: left image 2.3m ceiling, right image 4.1m ceiling. Same room, same materials — raw plaster, oak floor, single north window. Same time of day, same light angle. A lone chair at center. Shot on medium format film, neutral color grading. No text. No frame divisions.`
      }
    }
  },
  {
    id: 3,
    title: 'אמת חושית',
    sub: 'גילוי — מה שמחוץ לשרטוט, מה שהגוף יודע',
    desc: 'תיאור: גילוי — מה שנמצא מחוץ לשרטוט. אמת שנחווית לפני שמבינים אותה.',
    accentColor: '#EF9F27',
    accentBg: 'rgba(239,159,39,0.15)',
    types: {
      sketch: {
        label: 'סקיצת אדריכל — תצפית',
        text: `Architectural interior sketch, graphite with selective charcoal shadows. A simple room — one table, one chair, one window. But the sketch captures what the plan never shows: a diagonal slash of harsh afternoon sunlight across the floor creating a visual barrier, a human figure leaning slightly away from a glass wall, acoustic ripples suggested by curved hatching near hard surfaces. Composition follows the golden ratio. Loose, observational, honest. No color. No text. No frame divisions.`
      },
      technical: {
        label: 'שרטוט טכני — עם הערות חושיות',
        text: `Architectural annotated section, black ink, clinical precision. A room section with standard architectural lines — but alongside the dimension callouts, secondary annotation layer documents sensory data: acoustic absorption rating per surface, solar angle at 14:00 winter solstice, thermal mass rating of each wall, air movement arrows from natural ventilation path. Two complete parallel documentation systems on one drawing. No text. No frame divisions.`
      },
      render: {
        label: 'רנדר ריאליסטי — אמת לא מחמיאה',
        text: `Architectural photography, interior, harsh midday summer light. A glass-walled meeting room that on plan looks ideal. But the photograph captures what the plan conceals: fierce glare washing out the garden view, a table surface bleached white by direct sun, a figure's hand raised instinctively to shield eyes. Beauty promised by the plan, discomfort delivered by reality. Shot on 35mm, unmanipulated. No text. No frame divisions.`
      }
    }
  },
  {
    id: 4,
    title: 'מתח פורה',
    sub: 'מתח — שני כוחות מנוגדים שמחזיקים חלל אחד',
    desc: 'תיאור: מתח — כיצד שני קצוות מנוגדים יוצרים חלל שאי אפשר לתאר בלעדי שניהם.',
    accentColor: '#D85A30',
    accentBg: 'rgba(216,90,48,0.15)',
    types: {
      sketch: {
        label: 'סקיצת אדריכל — חלל שסוע',
        text: `Architectural concept sketch, graphite, expressive line weight. A single interior space split diagonally by a tonal shift: left half drawn in dense, heavy strokes suggesting enclosure — low ceiling implied by compressed hatching. Right half drawn in sparse, light strokes suggesting openness. A human figure stands at the exact boundary, one shoulder in each condition. Rule of thirds: figure at center vertical axis. No color. No text. No frame divisions.`
      },
      technical: {
        label: 'שרטוט טכני — שני נפחים מנוגדים',
        text: `Architectural axonometric drawing, black ink, two spatial conditions meeting at a shared wall. Left volume: heavy masonry, small punched openings, low ceiling — 2.3m ceiling, 8% window-to-wall ratio, 400mm wall thickness. Right volume: structural glazing, full-height opening, double height — 5.8m ceiling, 80% glass, 12mm wall thickness. The two volumes share one datum line — the floor. No text. No frame divisions.`
      },
      render: {
        label: 'רנדר ריאליסטי — דמות בגבול',
        text: `Architectural photography, interior, dusk. A space that holds two contradictory qualities simultaneously: the near half is warm, cave-like, low ceiling in dark timber. The far half opens dramatically — full-height glass facing the darkening sky. A figure occupies the threshold between the two conditions, physically belonging to neither. The tension is the subject. The photograph does not resolve it. Shot at f/4, 28mm, available light only. No text. No frame divisions.`
      }
    }
  },
  {
    id: 5,
    title: 'נוכחות בו-זמנית',
    sub: 'שזירה — שלוש שכבות של ידע בו-זמנית',
    desc: 'תיאור: שזירה — כיצד שלוש שפות שונות של ידע מתקיימות יחד ומייצרות חלל שלם.',
    accentColor: '#1D9E75',
    accentBg: 'rgba(29,158,117,0.15)',
    types: {
      sketch: {
        label: 'סקיצת אדריכל — שלוש שכבות',
        text: `Architectural working drawing, graphite on tracing paper, three overlapping layers visible simultaneously. Bottom layer: freehand spatial sketch, loose and exploratory. Middle layer: precise dimension lines overlaid, the numbers anchoring the sketch. Top layer: tonal shading suggesting the felt quality of light and material. All three layers transparent, interpenetrating, none fully erasing the others. No color. No text. No frame divisions.`
      },
      technical: {
        label: 'שרטוט טכני — שלוש שכבות מוחלפות',
        text: `Architectural composite drawing, three drawing types superimposed on one sheet at identical scale. Layer one: site plan in light gray. Layer two: floor plan in medium black. Layer three: reflected ceiling plan in dashed lines. All three simultaneously visible, requiring the eye to select which layer to read. The simultaneity of information is the drawing's subject. No text. No frame divisions.`
      },
      render: {
        label: 'רנדר ריאליסטי — שולחן השרטוט',
        text: `Architectural photography, architect's studio interior. A drafting table surface is the entire composition: three concurrent activities visible simultaneously — handwritten concept notes in one corner, a technical drawing pinned flat, a physical model fragment resting across both. Natural north light rakes across the surface. The image asks: which of these is the real design? Shot close, 50mm equivalent, f/5.6, morning light. No text. No frame divisions.`
      }
    }
  },
  {
    id: 6,
    title: 'רגע הסינתזה',
    sub: 'התגלות — הרגע שצריך לתעד מיד',
    desc: 'תיאור: התגלות — הרגע הבלתי-ניתן-לתכנון שבו שלושה ערוצי אמת מייצרים ידע חדש.',
    accentColor: '#7F77DD',
    accentBg: 'rgba(127,119,221,0.15)',
    types: {
      sketch: {
        label: 'סקיצת אדריכל — הקו הבטוח',
        text: `Architectural sketch, graphite, captured mid-thought. A working drawing surface: overlapping sheets, a ruled section beside a freehand plan, a single dimension written boldly across both. The focus is a particular mark — a line drawn with sudden confidence, heavier than all surrounding lines, that resolves a spatial problem visible in the surrounding indecision. The decisive mark sits at the golden-ratio intersection. The surrounding chaos is essential context. No color. No text. No frame divisions.`
      },
      technical: {
        label: 'שרטוט טכני — לפני ואחרי',
        text: `Architectural drawing diptych, black ink on white. Left drawing: a floor plan with multiple crossed-out iterations visible — walls drawn, reconsidered, redrawn. Erasure marks visible. Multiple conflicting solutions overlapping. Right drawing: the same plan, same room dimensions, but a single decisive configuration — clean, confident, no revisions. The left drawing is the process; the right is the moment after synthesis. Same scale. No text. No frame divisions.`
      },
      render: {
        label: 'רנדר ריאליסטי — הידע שנולד',
        text: `Architectural photography, built interior, late afternoon. A space that could not have been described before it was discovered: a threshold that is simultaneously intimate and monumental, private and shared, compressed and releasing. The photograph documents the synthesis moment made physical. A single human figure at the space's critical point. The light is specific to this hour only. Shot on medium format, 65mm equivalent, f/11, golden hour. No text. No frame divisions.`
      }
    }
  }
];