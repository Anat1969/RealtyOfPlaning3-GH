/* Labelled gradient divider that opens a content zone —
   keeps the CONTENT visually distinct from the tool/guidance layer. */
export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="font-mono text-[11px] uppercase tracking-[0.14em] whitespace-nowrap"
        style={{ color: 'var(--text2)' }}
      >
        {children}
      </span>
      <span className="flex-1 rule-gradient" style={{ opacity: 0.45 }} />
    </div>
  );
}
