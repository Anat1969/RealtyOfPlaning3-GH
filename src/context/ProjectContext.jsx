import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CALIBRATION } from '../lib/calibration';

const STORAGE_KEY = 'rop-project';

// The single source of truth for the user's ongoing project.
export const DEFAULT_PROJECT = {
  name: '',
  intention: '',
  width: 8,
  feel: 'neutral',
  calibration: { ...DEFAULT_CALIBRATION },
  notes: '',
};

function loadProject() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROJECT, calibration: { ...DEFAULT_CALIBRATION } };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROJECT,
      ...parsed,
      calibration: { ...DEFAULT_CALIBRATION, ...(parsed.calibration || {}) },
    };
  } catch {
    return { ...DEFAULT_PROJECT, calibration: { ...DEFAULT_CALIBRATION } };
  }
}

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(loadProject);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(project)); } catch { /* storage unavailable */ }
  }, [project]);

  const update = (partial) => setProject((p) => ({ ...p, ...partial }));

  const reset = () => {
    const fresh = { ...DEFAULT_PROJECT, calibration: { ...DEFAULT_CALIBRATION } };
    setProject(fresh);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); } catch { /* ignore */ }
  };

  return (
    <ProjectContext.Provider value={{ project, update, reset }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within a ProjectProvider');
  return ctx;
}
