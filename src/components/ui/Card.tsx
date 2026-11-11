import type { CSSProperties, ElementType, ReactNode } from 'react';

// Cards (guidelines p.7): white, 12px radius, soft shadow, 4-5px colour edge showing the category.
interface Props {
  as?: ElementType;
  /** CSS colour for the category edge, e.g. "var(--sage)". Omit for no edge. */
  edge?: string;
  edgeSide?: 'left' | 'top';
  padded?: boolean;
  className?: string;
  children: ReactNode;
  [rest: string]: unknown;
}

export default function Card({ as: Tag = 'div', edge, edgeSide = 'left', padded = true, className = '', children, ...rest }: Props) {
  const style: CSSProperties | undefined = edge
    ? edgeSide === 'left'
      ? { borderLeft: `5px solid ${edge}` }
      : { borderTop: `5px solid ${edge}` }
    : undefined;
  return (
    <Tag className={`rounded-card bg-white shadow-card ${padded ? 'p-6' : ''} ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
