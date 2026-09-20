import { CAL_PROFILES } from '../constants/data';

// Shared calibration logic — used by both the Calibration page and the Project Card
// so the profile is computed in exactly one place.
export const CALIBRATION_KEYS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
export const DEFAULT_CALIBRATION = { c1: 70, c2: 80, c3: 75, c4: 85, c5: 90, c6: 70 };

export function computeAvg(cal = {}) {
  const vals = CALIBRATION_KEYS.map((k) => Number(cal[k] ?? DEFAULT_CALIBRATION[k]));
  return Math.round(vals.reduce((a, b) => a + b, 0) / CALIBRATION_KEYS.length);
}

export function getProfile(cal = {}) {
  const avg = computeAvg(cal);
  const profile = CAL_PROFILES.find((p) => avg >= p.minAvg && avg <= p.maxAvg)
    || CAL_PROFILES[CAL_PROFILES.length - 1];
  return { avg, profile };
}

export function isCalibrationChanged(cal = {}) {
  return CALIBRATION_KEYS.some((k) => Number(cal[k]) !== DEFAULT_CALIBRATION[k]);
}
