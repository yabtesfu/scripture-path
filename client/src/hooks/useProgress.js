import { useState, useCallback } from 'react';
import { SERMON_ON_THE_MOUNT } from '../data/readings.js';

const STORAGE_KEY = 'sp_progress_v1';

function seed() {
  // Seed 17 days of genuine-looking history so the dashboard starts populated
  const completions = {};
  const now = Date.now();
  for (let i = 1; i <= 17; i++) {
    const msAgo = (17 - i + 1) * 86400000;
    completions[i] = new Date(now - msAgo).toISOString();
  }
  const startDate = new Date(now - 17 * 86400000).toISOString();
  return { activePlanId: 2, completions, startDate };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const initial = seed();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function persist(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function calcStreak(completions) {
  const dateset = new Set(
    Object.values(completions).map(iso => iso.split('T')[0])
  );
  if (!dateset.size) return 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // streak only counts if we did something today or yesterday
  if (!dateset.has(today) && !dateset.has(yesterday)) return 0;

  let streak = 0;
  let cursor = dateset.has(today) ? new Date() : new Date(Date.now() - 86400000);

  for (let i = 0; i < 400; i++) {
    const key = cursor.toISOString().split('T')[0];
    if (dateset.has(key)) {
      streak++;
      cursor = new Date(cursor.getTime() - 86400000);
    } else {
      break;
    }
  }
  return streak;
}

function calcWeeklyPattern(completions) {
  const dateset = new Set(
    Object.values(completions).map(iso => iso.split('T')[0])
  );
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(Date.now() - (13 - i) * 86400000);
    return dateset.has(d.toISOString().split('T')[0]);
  });
}

export function useProgress() {
  const [state, setState] = useState(loadState);

  const readings = SERMON_ON_THE_MOUNT;
  const completedCount = Object.keys(state.completions).length;
  const totalReadings = readings.length;
  const progress = Math.round((completedCount / totalReadings) * 100);
  const streak = calcStreak(state.completions);
  const weeklyPattern = calcWeeklyPattern(state.completions);

  // First reading whose id is not yet in completions
  const currentReading =
    readings.find(r => !state.completions[r.id]) ?? readings[readings.length - 1];

  // Reading after the current one
  const nextReading =
    readings.find(r => r.id > currentReading.id && !state.completions[r.id]) ?? null;

  const isCurrentDone = !!state.completions[currentReading.id];
  const currentDay = completedCount + 1;

  const markComplete = useCallback(readingId => {
    setState(prev => {
      if (prev.completions[readingId]) return prev; // already done
      const next = {
        ...prev,
        completions: { ...prev.completions, [readingId]: new Date().toISOString() },
      };
      persist(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = seed();
    persist(fresh);
    setState(fresh);
  }, []);

  return {
    completions: state.completions,
    completedCount,
    totalReadings,
    progress,
    streak,
    weeklyPattern,
    currentReading,
    nextReading,
    isCurrentDone,
    currentDay,
    markComplete,
    resetProgress,
  };
}
