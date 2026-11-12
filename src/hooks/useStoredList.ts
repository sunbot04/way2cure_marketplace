import useAccountStore from './useAccountStore';
import { DEMO_LISTS } from '../data/demoAccount';

// A list saved in this browser for the signed-in account (family members, addresses). Stands in
// for the account API until the backend exists. The demo account starts with sample entries.
// TODO: API: replace with GET/POST/DELETE on the account endpoints.
export type Stored<T> = T & { id: string };

const EMPTY: never[] = [];

export default function useStoredList<T extends object>(key: string) {
  const [list, setList] = useAccountStore<Stored<T>[]>(key, EMPTY, DEMO_LISTS[key] as (() => Stored<T>[]) | undefined);

  const add = (item: T) => setList((l) => [...l, { ...item, id: Date.now().toString(36) }]);
  const remove = (id: string) => setList((l) => l.filter((x) => x.id !== id));

  return { list, add, remove };
}
