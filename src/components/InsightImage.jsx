import { useRef, useState, useEffect } from 'react';
import { idbGet, idbSet, idbDel, migrateLegacy, toSquareWebp } from '../lib/imageStore';

const FIT_KEY = (id) => `insight-fit:${id}`;
const readFit = (id) => { try { return localStorage.getItem(FIT_KEY(id)); } catch { return null; } };
const writeFit = (id, v) => { try { localStorage.setItem(FIT_KEY(id), v); } catch { /* ignore */ } };

const ctrlStyle = {
  width: 30, height: 30, borderRadius: 7, border: 'none', cursor: 'pointer',
  background: 'rgba(15,14,12,0.62)', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
};

function Icon({ path }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {path}
    </svg>
  );
}
const CopyIcon = <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>;
const CheckIcon = <polyline points="20 6 9 17 4 12" />;
const ExpandIcon = <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>;
const SwapIcon = <><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>;
const XIcon = <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>;

export default function InsightImage({ id, prompt, color = 'var(--amber)', bg = 'var(--amber-bg)', ratio = '1 / 1', label = 'המחשת התובנה', defaultSrc = null }) {
  const [url, setUrl] = useState(null);       // object URL for the stored blob
  const [ready, setReady] = useState(false);  // finished the initial async load
  const [drag, setDrag] = useState(false);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fit, setFit] = useState(() => readFit(id) || 'cover');
  const fileRef = useRef(null);
  const urlRef = useRef(null);

  const showBlob = (blob) => {
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
    if (blob) {
      const u = URL.createObjectURL(blob);
      urlRef.current = u;
      setUrl(u);
    } else {
      setUrl(null);
    }
  };

  // Initial load: migrate any legacy localStorage image, then read IndexedDB.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const migrated = await migrateLegacy(id);
        const blob = migrated || await idbGet(id);
        if (alive && blob) showBlob(blob);
      } catch { /* ignore */ }
      if (alive) setReady(true);
    })();
    return () => { alive = false; if (urlRef.current) URL.revokeObjectURL(urlRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const saveFile = async (file) => {
    if (!file || !file.type?.startsWith('image/')) return;
    setBusy(true);
    try {
      const blob = await toSquareWebp(file);
      await idbSet(id, blob);
      showBlob(blob);
    } catch { /* ignore */ }
    setBusy(false);
  };

  const remove = async (e) => { e?.stopPropagation(); try { await idbDel(id); } catch { /* ignore */ } showBlob(null); };
  const toggleFit = (e) => { e.stopPropagation(); const next = fit === 'cover' ? 'contain' : 'cover'; setFit(next); writeFit(id, next); };

  const onDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDrag(false); const f = e.dataTransfer?.files?.[0]; if (f) saveFile(f); };
  const onPaste = (e) => {
    const item = [...(e.clipboardData?.items || [])].find(i => i.type.startsWith('image/'));
    if (item) { e.preventDefault(); saveFile(item.getAsFile()); }
  };

  const copyPrompt = (e) => {
    e?.stopPropagation();
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = prompt; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta); done();
      } catch { /* ignore */ }
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(prompt).then(done).catch(fallback);
    else fallback();
  };

  const stop = (e) => e.stopPropagation();
  const shown = url || defaultSrc;

  return (
    <div onClick={stop} onKeyDown={stop}>
      <div
        tabIndex={0}
        role="button"
        aria-label={shown ? 'תמונת המחשה — גרירה או הדבקה כדי להחליף' : 'העלאת תמונת המחשה — גרירה, הדבקה או לחיצה'}
        onClick={() => { if (!shown) fileRef.current?.click(); }}
        onKeyDown={(e) => { if (!shown && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fileRef.current?.click(); } }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDrag(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDrag(false); }}
        onDrop={onDrop}
        onPaste={onPaste}
        style={{
          position: 'relative',
          aspectRatio: ratio,
          borderRadius: 10,
          overflow: 'hidden',
          cursor: shown ? 'default' : 'pointer',
          border: `1.5px ${shown ? 'solid' : 'dashed'} ${drag ? color : 'var(--border2)'}`,
          background: shown ? 'var(--surface2)' : (drag ? bg : 'var(--surface)'),
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        {shown ? (
          <>
            <img
              src={shown}
              alt="תמונת המחשה לתובנה של הכרטיסייה"
              style={{ width: '100%', height: '100%', objectFit: fit, background: 'var(--surface2)', display: 'block' }}
            />
            <div style={{ position: 'absolute', top: 8, insetInlineStart: 8, display: 'flex', gap: 6 }}>
              <button type="button" onClick={copyPrompt} title="העתקת הפרומפט" aria-label="העתקת הפרומפט" style={ctrlStyle}>
                <Icon path={copied ? CheckIcon : CopyIcon} />
              </button>
              <button type="button" onClick={toggleFit} title={fit === 'cover' ? 'הצגת התמונה המלאה' : 'מילוי המסגרת'} aria-label="מעבר בין מילוי להצגה מלאה" style={ctrlStyle}>
                <Icon path={ExpandIcon} />
              </button>
              <button type="button" onClick={(e) => { stop(e); fileRef.current?.click(); }} title="החלפת התמונה" aria-label="החלפת התמונה" style={ctrlStyle}>
                <Icon path={SwapIcon} />
              </button>
              <button type="button" onClick={remove} title="הסרת התמונה" aria-label="הסרת התמונה" style={ctrlStyle}>
                <Icon path={XIcon} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, textAlign: 'center' }}>
            {busy ? (
              <div className="w-6 h-6 rounded-full animate-spin" style={{ border: `2px solid var(--surface3)`, borderTopColor: color }} />
            ) : (
              <>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p style={{ fontSize: 12.5, color: 'var(--text)' }}>גררי · הדביקי · או לחצי להעלאה</p>
                <p style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{label}</p>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={copyPrompt}
          className="font-mono"
          style={{
            fontSize: 11, padding: '7px 12px', borderRadius: 7, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent',
            border: `1px solid ${copied ? color : 'var(--border2)'}`,
            color: copied ? color : 'var(--text2)', transition: 'color 0.2s, border-color 0.2s',
          }}
        >
          <Icon path={copied ? CheckIcon : CopyIcon} />
          {copied ? 'הפרומפט הועתק' : 'העתקת פרומפט להמחשה'}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) saveFile(f); e.target.value = ''; }}
      />
    </div>
  );
}
