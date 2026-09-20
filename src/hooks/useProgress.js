import { useProject } from '../context/ProjectContext';
import { isCalibrationChanged } from '../lib/calibration';
import { DEFAULT_PROJECT } from '../context/ProjectContext';

// Real progress: how many of the project's meaningful fields the user has filled.
// Four equal parts: intention, width+feel, calibration (changed from default), notes.
export function useProgress() {
  const { project } = useProject();
  const checks = [
    !!(project.intention && project.intention.trim()),
    (project.feel && project.feel !== DEFAULT_PROJECT.feel) || (project.width !== DEFAULT_PROJECT.width),
    isCalibrationChanged(project.calibration),
    !!(project.notes && project.notes.trim()),
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}
