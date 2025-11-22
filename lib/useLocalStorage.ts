'use client';

import { useCallback, useSyncExternalStore } from 'react';

const storageSubscribers = new Map<string, Set<() => void>>();

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

const subscribeToLocalStorage = (key: string, onStoreChange: () => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let subscribers = storageSubscribers.get(key);
  if (!subscribers) {
    subscribers = new Set();
    storageSubscribers.set(key, subscribers);
  }

  subscribers.add(onStoreChange);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorage);

  return () => {
    subscribers?.delete(onStoreChange);
    if (subscribers && subscribers.size === 0) {
      storageSubscribers.delete(key);
    }
    window.removeEventListener('storage', handleStorage);
  };
};

const notifySubscribers = (key: string) => {
  const subscribers = storageSubscribers.get(key);
  subscribers?.forEach((subscriber) => subscriber());
};

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const getSnapshot = useCallback(() => readStorageValue(key, initialValue), [key, initialValue]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === 'undefined') {
        return () => {};
      }
      return subscribeToLocalStorage(key, onStoreChange);
    },
    [key]
  );

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, () => initialValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(getSnapshot()) : value;
        if (typeof window === 'undefined') {
          return;
        }
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        notifySubscribers(key);
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [getSnapshot, key]
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
