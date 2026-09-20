// Durable image storage in IndexedDB (hundreds of MB), replacing the ~5MB
// localStorage limit that caused "quota exceeded". Images are stored as
// square, compressed WebP Blobs. Legacy localStorage images are migrated in.

const DB_NAME = 'insight-db';
const STORE = 'images';
const LEGACY_IMG = (id) => `insight-img:${id}`;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbGet(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const r = db.transaction(STORE, 'readonly').objectStore(STORE).get(id);
    r.onsuccess = () => resolve(r.result || null);
    r.onerror = () => reject(r.error);
  });
}

export async function idbSet(id, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, 'readwrite');
    t.objectStore(STORE).put(blob, id);
    t.oncomplete = () => resolve(true);
    t.onerror = () => reject(t.error);
  });
}

export async function idbDel(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, 'readwrite');
    t.objectStore(STORE).delete(id);
    t.oncomplete = () => resolve(true);
    t.onerror = () => reject(t.error);
  });
}

export async function idbEntries() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const store = db.transaction(STORE, 'readonly').objectStore(STORE);
    const keysReq = store.getAllKeys();
    const valsReq = store.getAll();
    let keys, vals;
    keysReq.onsuccess = () => { keys = keysReq.result; if (vals) resolve(keys.map((k, i) => [k, vals[i]])); };
    valsReq.onsuccess = () => { vals = valsReq.result; if (keys) resolve(keys.map((k, i) => [k, vals[i]])); };
    keysReq.onerror = () => reject(keysReq.error);
    valsReq.onerror = () => reject(valsReq.error);
  });
}

// Load any image source (File / Blob / data-URL string) into an <img>.
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const isBlob = typeof src !== 'string';
    const url = isBlob ? URL.createObjectURL(src) : src;
    const im = new Image();
    im.onload = () => { if (isBlob) URL.revokeObjectURL(url); resolve(im); };
    im.onerror = (e) => { if (isBlob) URL.revokeObjectURL(url); reject(e); };
    im.src = url;
  });
}

// Center-crop to a square and export a compressed WebP Blob (JPEG fallback).
export async function toSquareWebp(src, size = 900, quality = 0.82) {
  const im = await loadImage(src);
  const side = Math.min(im.naturalWidth, im.naturalHeight);
  const sx = (im.naturalWidth - side) / 2;
  const sy = (im.naturalHeight - side) / 2;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(im, sx, sy, side, side, 0, 0, size, size);
  const blob = await new Promise((res) => canvas.toBlob((b) => res(b), 'image/webp', quality));
  if (blob && blob.type === 'image/webp') return blob;
  // WebP not supported by this browser's canvas — fall back to JPEG.
  return new Promise((res) => canvas.toBlob((b) => res(b), 'image/jpeg', quality));
}

// Migrate EVERY legacy localStorage image into IndexedDB at app start, so images
// are preserved and freed from the small localStorage quota even before their card
// is opened. Safe to call on every load.
export async function migrateAllLegacy() {
  let keys = [];
  try { keys = Object.keys(localStorage).filter(k => k.startsWith('insight-img:')); } catch { return; }
  for (const k of keys) {
    const id = k.slice('insight-img:'.length);
    try { await migrateLegacy(id); } catch { /* ignore */ }
  }
}

// Migrate a legacy localStorage data-URL image (from the old version) into
// IndexedDB, then free the localStorage entry. Returns the migrated Blob, if any.
export async function migrateLegacy(id) {
  let legacy = null;
  try { legacy = localStorage.getItem(LEGACY_IMG(id)); } catch { /* ignore */ }
  if (!legacy) return null;
  try {
    const existing = await idbGet(id);
    if (!existing) {
      const blob = await toSquareWebp(legacy);
      await idbSet(id, blob);
      try { localStorage.removeItem(LEGACY_IMG(id)); } catch { /* ignore */ }
      return blob;
    }
    // Already stored durably — drop the bulky legacy copy to free space.
    try { localStorage.removeItem(LEGACY_IMG(id)); } catch { /* ignore */ }
    return existing;
  } catch {
    return null;
  }
}
