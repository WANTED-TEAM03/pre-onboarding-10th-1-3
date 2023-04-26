import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T>(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(initialValue));
    } catch (error) {
      currentValue = initialValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
