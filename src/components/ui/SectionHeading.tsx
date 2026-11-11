import type { ReactNode } from 'react';

// Section heading: H2 with an optional one-line lead and an optional link on the right.
// Left-aligned (p.6). Deliberately no label or badge above the heading.
interface Props {
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
}

export default function SectionHeading({ title, lead, action, id, className = '' }: Props) {
  return (
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 ${className}`}>
      <div>
        <h2 id={id} className="mb-2">{title}</h2>
        {lead && <p className="m-0 text-lead text-grey">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
