import { createContext, useContext, useState, useCallback } from 'react';

// Transient UI "atmosphere" — which discipline colour the screen is currently
// tinted toward. Intentionally NOT persisted (unlike the project); it reflects
// where attention is right now.
const AmbientContext = createContext(null);

export function AmbientProvider({ children }) {
  const [ambient, setAmbientState] = useState('neutral'); // 'neutral' | 'text' | 'number' | 'visual'
  const setAmbient = useCallback((v) => setAmbientState(v || 'neutral'), []);
  return (
    <AmbientContext.Provider value={{ ambient, setAmbient }}>
      {children}
    </AmbientContext.Provider>
  );
}

export function useAmbient() {
  const ctx = useContext(AmbientContext);
  if (!ctx) throw new Error('useAmbient must be used within an AmbientProvider');
  return ctx;
}
