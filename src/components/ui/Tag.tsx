import type { ReactNode } from 'react';
import Icon from '../Icon';

// Tags & badges (guidelines p.7). Each kind keeps 4.5:1 contrast with its text colour and always
// carries a word, never colour alone (p.12).
export type TagKind = 'rx' | 'pharmacist' | 'seller' | 'subscribe' | 'rent' | 'launch' | 'status';

const KINDS: Record<TagKind, string> = {
  rx: 'bg-terracotta-deep text-white', // white on crimson 5.9:1
  pharmacist: 'bg-green text-white', // 9.6:1
  seller: 'bg-sage-tint text-green ring-1 ring-inset ring-sage',
  subscribe: 'bg-mustard text-green', // charcoal on yellow 8.2:1
  rent: 'bg-mint text-green',
  launch: 'bg-mustard text-green',
  status: 'bg-sage-tint text-green',
};

const ICONS: Partial<Record<TagKind, string>> = { rx: 'rx', pharmacist: 'verified', seller: 'verified' };

export default function Tag({ kind, children }: { kind: TagKind; children: ReactNode }) {
  const icon = ICONS[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-small font-bold ${KINDS[kind]}`}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}
