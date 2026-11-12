import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// Sign in with a phone number + OTP (guidelines p.10: guest checkout with phone OTP, no passwords).
// TODO: API: send and verify the OTP on the server and keep a session. Until then the signed-in
// family member is kept in this browser only, and any 6-digit code is accepted (demo).

export interface User { name: string; phone: string; since: string }

interface AuthValue {
  user: User | null;
  signIn: (phone: string, name?: string) => User;
  signOut: () => void;
}

const KEY = 'w2c-user';
const Ctx = createContext<AuthValue | null>(null);

function read(): User | null {
  try { return JSON.parse(localStorage.getItem(KEY) ?? 'null') as User | null; } catch { return null; }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(read);
  useEffect(() => {
    try { user ? localStorage.setItem(KEY, JSON.stringify(user)) : localStorage.removeItem(KEY); } catch { /* storage blocked */ }
  }, [user]);

  const value: AuthValue = {
    user,
    signIn: (phone, name) => {
      const u: User = { phone, name: name?.trim() || user?.name || '', since: user?.since ?? new Date().toISOString() };
      setUser(u);
      return u;
    },
    signOut: () => setUser(null),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
