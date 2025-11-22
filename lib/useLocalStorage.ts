'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const readStorageValue = <T,>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return initialValue;
  }
};

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const initialRef = useRef(initialValue);
  useEffect(() => {
    initialRef.current = initialValue;
  }, [initialValue]);

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    setStoredValue(readStorageValue(key, initialRef.current));
  }, [key]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;
      setStoredValue(readStorageValue(key, initialRef.current));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue(prev => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

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
