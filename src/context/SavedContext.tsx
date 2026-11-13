import { createContext, useContext, type ReactNode } from 'react';
import useAccountStore from '../hooks/useAccountStore';
import { useAuth } from './AuthContext';

// Products saved with the heart on a product card. Saving needs an account: signed out, there is
// no saved list and the hearts, the "Saved" filter and "Save for later" are hidden (`enabled`).
// Kept per account in this browser, like orders. The shop page can show just the saved ones.
// TODO: API: GET/PUT /account/saved once accounts live on the server.

interface SavedValue {
  /** True when someone is signed in, so saving is available. */
  enabled: boolean;
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}

const Ctx = createContext<SavedValue | null>(null);
const NONE: string[] = [];

export function SavedProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [stored, setIds] = useAccountStore<string[]>('w2c-saved', NONE);
  const enabled = !!user;
  const ids = enabled ? stored : NONE;
  const value: SavedValue = {
    enabled,
    ids,
    has: (id) => ids.includes(id),
    toggle: (id) => {
      if (!enabled) return;
      setIds((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
    },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSaved(): SavedValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSaved must be used inside <SavedProvider>');
  return ctx;
}
