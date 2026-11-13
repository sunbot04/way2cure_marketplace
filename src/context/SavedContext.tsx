import { createContext, useContext, type ReactNode } from 'react';
import useAccountStore from '../hooks/useAccountStore';

// Products saved with the heart on a product card. Kept per account in this browser (the guest's own
// list when signed out), like orders. The shop page can show just the saved ones.
// TODO: API: GET/PUT /account/saved once accounts live on the server.

interface SavedValue {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}

const Ctx = createContext<SavedValue | null>(null);
const NONE: string[] = [];

export function SavedProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useAccountStore<string[]>('w2c-saved', NONE);
  const value: SavedValue = {
    ids,
    has: (id) => ids.includes(id),
    toggle: (id) => setIds((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSaved(): SavedValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSaved must be used inside <SavedProvider>');
  return ctx;
}
