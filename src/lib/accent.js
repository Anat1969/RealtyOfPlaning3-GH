// Theme-aware accent colours (richer in light mode than the dark-tuned hex in data.js).
// Keyed by discipline / criterion source so every page speaks the same colour language.
export const ACCENT = {
  text:    { c: 'var(--purple)', bg: 'var(--purple-bg)' },
  number:  { c: 'var(--teal)',   bg: 'var(--teal-bg)' },
  visual:  { c: 'var(--amber)',  bg: 'var(--amber-bg)' },
  between: { c: 'var(--coral)',  bg: 'var(--coral-bg)' },
};

// For lists that only have a position (1-based), map to the model's colour order.
export const ORDER = ['text', 'number', 'visual'];

export const accentByIndex = (i) => ACCENT[ORDER[i % 3]];
