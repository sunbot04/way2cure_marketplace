import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { isDemoPhone } from '../data/demoAccount';

// State saved in this browser for the signed-in account: orders, reminders read, family members,
// addresses. Each account has its own copy (key "<base>:<phone>"); signed out, the guest copy
// ("<base>") is used. Switching account loads that account's copy. The demo account starts from
// its sample data the first time.
// TODO: API: replace with the account endpoints once the backend exists.

export const accountKey = (base: string, phone?: string | null) => (phone ? `${base}:${phone}` : base);

function load<T>(key: string, fallback: () => T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    /* storage blocked or unreadable: start from the fallback */
  }
  return fallback();
}

export default function useAccountStore<T>(base: string, empty: T, demoSeed?: () => T) {
  const { user } = useAuth();
  const key = accountKey(base, user?.phone);
  const initial = () => load(key, () => (demoSeed && isDemoPhone(user?.phone) ? demoSeed() : empty));

  const [state, setState] = useState<{ key: string; value: T }>(() => ({ key, value: initial() }));

  // Signed in, out or as someone else: switch to that account's copy straight away (during render,
  // so the old account's data is never shown or saved under the new key).
  let current = state;
  if (state.key !== key) {
    current = { key, value: initial() };
    setState(current);
  }

  useEffect(() => {
    try { localStorage.setItem(state.key, JSON.stringify(state.value)); } catch { /* storage blocked */ }
  }, [state]);

  const set = useCallback((next: T | ((prev: T) => T)) => {
    setState((s) => ({ key: s.key, value: typeof next === 'function' ? (next as (prev: T) => T)(s.value) : next }));
  }, []);

  return [current.value, set] as const;
}
