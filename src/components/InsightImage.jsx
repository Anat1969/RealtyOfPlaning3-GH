import { useRef, useState } from 'react';

const IMG_KEY = (id) => `insight-img:${id}`;
const FIT_KEY = (id) => `insight-fit:${id}`;

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => {
  try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); return true; }
  catch { return false; }
};

// Downscale to keep localStorage small and layout fast, without distorting proportions.
function downscale(file, maxDim = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = im;
      if (Math.max(width, height) > maxDim) {
        const s = maxDim / Math.max(width, height);
        width = Math.round(width * s);
        height = Math.round(height * s);
      }
      const c = document.createElement('canvas');
      c.width = width; c.height = height;
      c.getContext('2d').drawImage(im, 0, 0, width, height);
      try { resolve(c.toDataURL('image/jpeg', quality)); } catch (e) { reject(e); }
    };
    im.onerror = reject;
    im.src = url;
  });
}

const ctrlStyle = {
  width: 30, height: 30, borderRadius: 7, border: 'none', cursor: 'pointer',
  background: 'rgba(15,14,12,0.62)', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
};

function Icon({ path, filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {path}
    </svg>
  );
}

export default function InsightImage({ id, prompt, color = 'var(--amber)', bg = 'var(--amber-bg)', ratio = '16 / 10', label = 'המחשת התובנה' }) {
  const [img, setImg] = useState(() => read(IMG_KEY(id)));
  const [fit, setFit] = useState(() => read(FIT_KEY(id)) || 'cover');
  const [drag, setDrag] = useState(false);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState(null);
  const fileRef = useRef(null);

  const setImage = (dataUrl) => {
    setImg(dataUrl);
    const ok = write(IMG_KEY(id), dataUrl);
    if (!ok && dataUrl) setErr('התמונה נשמרה לשיחה זו בלבד (חריגה מנפח האחסון המקומי)');
    else setErr(null);
  };
  const toggleFit = (e) => { e.stopPropagation(); const next = fit === 'cover' ? 'contain' : 'cover'; setFit(next); write(FIT_KEY(id), next); };

  const handleFile = async (file) => {
    if (!file || !file.type?.startsWith('image/')) return;
    setErr(null);
    try { setImage(await downscale(file)); }
    catch { setErr('לא ניתן לטעון את התמונה'); }
  };

  const onDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDrag(false); const f = e.dataTransfer?.files?.[0]; if (f) handleFile(f); };
  const onPaste = (e) => {
    const item = [...(e.clipboardData?.items || [])].find(i => i.type.startsWith('image/'));
    if (item) { e.preventDefault(); handleFile(item.getAsFile()); }
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
      } catch { /* clipboard unavailable */ }
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(prompt).then(done).catch(fallback);
    else fallback();
  };

  const stop = (e) => e.stopPropagation();

  return (
    // Stop clicks/keys from bubbling to a parent accordion toggle
    <div onClick={stop} onKeyDown={stop}>
      <div
        tabIndex={0}
        role="button"
        aria-label={img ? 'תמונת המחשה — גרירה או הדבקה כדי להחליף' : 'העלאת תמונת המחשה — גרירה, הדבקה או לחיצה'}
        onClick={() => { if (!img) fileRef.current?.click(); }}
        onKeyDown={(e) => { if (!img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fileRef.current?.click(); } }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDrag(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDrag(false); }}
        onDrop={onDrop}
        onPaste={onPaste}
        style={{
          position: 'relative',
          aspectRatio: ratio,
          borderRadius: 10,
          overflow: 'hidden',
          cursor: img ? 'default' : 'pointer',
          border: `1.5px ${img ? 'solid' : 'dashed'} ${drag ? color : 'var(--border2)'}`,
          background: img ? 'var(--surface2)' : (drag ? bg : 'var(--surface)'),
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      >
        {img ? (
          <>
            <img
              src={img}
              alt="תמונת המחשה לתובנה של הכרטיסייה"
              style={{ width: '100%', height: '100%', objectFit: fit, background: 'var(--surface2)', display: 'block' }}
            />
            <div style={{ position: 'absolute', top: 8, insetInlineStart: 8, display: 'flex', gap: 6 }}>
              <button type="button" onClick={copyPrompt} title="העתקת הפרומפט" aria-label="העתקת הפרומפט" style={ctrlStyle}>
                {copied
                  ? <Icon path={<polyline points="20 6 9 17 4 12" />} />
                  : <Icon path={<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>} />}
              </button>
              <button type="button" onClick={toggleFit} title={fit === 'cover' ? 'הצגת התמונה המלאה' : 'מילוי המסגרת'} aria-label="מעבר בין מילוי להצגה מלאה" style={ctrlStyle}>
                <Icon path={<><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>} />
              </button>
              <button type="button" onClick={(e) => { stop(e); fileRef.current?.click(); }} title="החלפת התמונה" aria-label="החלפת התמונה" style={ctrlStyle}>
                <Icon path={<><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>} />
              </button>
              <button type="button" onClick={(e) => { stop(e); setImage(null); }} title="הסרת התמונה" aria-label="הסרת התמונה" style={ctrlStyle}>
                <Icon path={<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, textAlign: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p style={{ fontSize: 12.5, color: 'var(--text)' }}>גררי · הדביקי · או לחצי להעלאה</p>
            <p style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{label}</p>
          </div>
        )}
      </div>

      {/* Prompt copy button — always available */}
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
          {copied
            ? <Icon path={<polyline points="20 6 9 17 4 12" />} />
            : <Icon path={<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>} />}
          {copied ? 'הפרומפט הועתק' : 'העתקת פרומפט להמחשה'}
        </button>
      </div>

      {err && <p style={{ marginTop: 6, fontSize: 10, color: 'var(--coral)' }}>{err}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />
    </div>
  );
}
