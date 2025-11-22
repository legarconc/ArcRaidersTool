'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    setIsHydrated(true);
  }, [key]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Export/Import functionality
export interface AppData {
  version: string;
  exportDate: string;
  workshopLevels: Record<string, number>;
  scrappyLevel: number;
  ownedBlueprints: string[];
  playerLevel: number;
}

export function exportData(data: AppData): string {
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): AppData | null {
  try {
    const data = JSON.parse(jsonString);
    if (data.version && data.workshopLevels && data.ownedBlueprints !== undefined) {
      return data as AppData;
    }
    return null;
  } catch {
    return null;
  }
}

export function downloadData(data: AppData, filename: string = 'arc-raiders-progress.json') {
  const blob = new Blob([exportData(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
