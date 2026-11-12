import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { DEMO_CODE, DEMO_USER, isDemoPhone } from '../data/demoAccount';

// Sign in with a phone number + OTP (guidelines p.10: guest checkout with phone OTP, no passwords).
// TODO: API: send and verify the OTP on the server and keep a session. Until then:
//  · the accounts are the demo account (data/demoAccount.ts) plus any made with Sign up in this
//    browser, so Log in only works for a number that has an account;
//  · the one-time code is always 123456 (DEMO_CODE);
//  · the signed-in family member is kept in this browser only.

export interface User { name: string; phone: string; since: string }

interface AuthValue {
  user: User | null;
  /** True while the demo account is signed in. */
  isDemo: boolean;
  /** The account with this mobile number, if there is one. */
  findAccount: (phone: string) => User | null;
  /** Is this the right one-time code? */
  checkCode: (code: string) => boolean;
  /** Sign in to an existing account (null if there is no account with this number). */
  signIn: (phone: string) => User | null;
  /** Create an account and sign in. */
  signUp: (phone: string, name: string) => User;
  /** Sign in to the demo account in one step. */
  signInDemo: () => User;
  signOut: () => void;
}

const USER_KEY = 'w2c-user';
const ACCOUNTS_KEY = 'w2c-accounts';
const Ctx = createContext<AuthValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: the session lasts for this visit only */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load<User | null>(USER_KEY, null));
  // Accounts made with Sign up in this browser. Someone already signed in from before this list
  // existed keeps their account.
  const [accounts, setAccounts] = useState<User[]>(() => {
    const list = load<User[]>(ACCOUNTS_KEY, []);
    const current = load<User | null>(USER_KEY, null);
    return current && !isDemoPhone(current.phone) && !list.some((a) => a.phone === current.phone) ? [...list, current] : list;
  });
  useEffect(() => { save(USER_KEY, user); }, [user]);
  useEffect(() => { save(ACCOUNTS_KEY, accounts); }, [accounts]);

  const findAccount = (phone: string) => (isDemoPhone(phone) ? DEMO_USER : accounts.find((a) => a.phone === phone) ?? null);

  const value: AuthValue = {
    user,
    isDemo: isDemoPhone(user?.phone),
    findAccount,
    checkCode: (code) => code === DEMO_CODE,
    signIn: (phone) => {
      const account = findAccount(phone);
      if (account) setUser(account);
      return account;
    },
    signUp: (phone, name) => {
      const account: User = { phone, name: name.trim(), since: new Date().toISOString() };
      setAccounts((list) => [...list.filter((a) => a.phone !== phone), account]);
      setUser(account);
      return account;
    },
    signInDemo: () => {
      setUser(DEMO_USER);
      return DEMO_USER;
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
