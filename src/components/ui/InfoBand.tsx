import type { ReactNode } from 'react';
import Icon from '../Icon';

// Info band (guidelines p.7): mint panel for one key message, e.g.
// "A registered pharmacist verifies every prescription order."
export default function InfoBand({ icon = 'info', children, className = '' }: { icon?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-start gap-3 rounded-card bg-mint px-5 py-4 font-semibold text-green ${className}`}>
      <Icon name={icon} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
