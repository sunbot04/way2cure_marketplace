import { useEffect, useState } from 'react';

// A list saved in this browser. Stands in for the account API until the backend exists.
// Storage can be blocked (private mode etc.), so every access is guarded.
export default function useStoredList(key) {
  const [list, setList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? [];
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

  const add = (item) => setList((l) => [...l, { ...item, id: Date.now().toString(36) }]);
  const remove = (id) => setList((l) => l.filter((x) => x.id !== id));

  return { list, add, remove };
}
