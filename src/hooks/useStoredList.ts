import { useEffect, useState } from 'react';

// A list saved in this browser. Stands in for the account API until the backend exists.
// TODO: API: replace with GET/POST/DELETE on the account endpoints.
// Storage can be blocked (private mode etc.), so every access is guarded.
export type Stored<T> = T & { id: string };

export default function useStoredList<T extends object>(key: string) {
  const [list, setList] = useState<Stored<T>[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]') as Stored<T>[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      /* storage unavailable: the list still works for this visit */
    }
  }, [key, list]);

  const add = (item: T) => setList((l) => [...l, { ...item, id: Date.now().toString(36) }]);
  const remove = (id: string) => setList((l) => l.filter((x) => x.id !== id));

  return { list, add, remove };
}
