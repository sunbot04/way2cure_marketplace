import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

// Buttons (guidelines p.7): min height 48px, 8px radius, 18px bold.
// primary = deep green · urgent = booking / urgent action (terracotta-deep) · outline = secondary.
// Use ONE primary button per section.
export type ButtonVariant = 'primary' | 'urgent' | 'outline' | 'light' | 'outline-light';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'border-green bg-green text-white hover:border-green-dark hover:bg-green-dark',
  urgent: 'border-terracotta-deep bg-terracotta-deep text-white hover:border-[#9c3a21] hover:bg-[#9c3a21]',
  outline: 'border-green bg-white text-green hover:bg-sage-tint',
  light: 'border-white bg-white text-green hover:bg-cream',
  'outline-light': 'border-white/80 bg-transparent text-white hover:bg-white/10',
};

export const buttonClass = (variant: ButtonVariant = 'primary', opts: { block?: boolean; compact?: boolean } = {}) =>
  [
    'inline-flex min-h-tap items-center justify-center gap-2 rounded-btn border-2 text-center font-bold leading-tight no-underline transition-colors',
    opts.compact ? 'px-4 py-2 text-base' : 'px-6 py-2.5 text-body',
    'disabled:cursor-not-allowed disabled:border-mint disabled:bg-mint disabled:text-grey',
    opts.block ? 'w-full' : '',
    VARIANTS[variant],
  ].join(' ');

interface Common {
  variant?: ButtonVariant;
  block?: boolean;
  /** 16px text for tight spots (still 48px tall). */
  compact?: boolean;
  className?: string;
  children: ReactNode;
}

type Props =
  | (Common & { to: string; href?: never } & { onClick?: () => void })
  | (Common & { href: string; to?: never; external?: boolean })
  | (Common & { to?: never; href?: never } & ButtonHTMLAttributes<HTMLButtonElement>);

export default function Button(props: Props) {
  const { variant = 'primary', block, compact, className = '', children } = props;
  const cls = `${buttonClass(variant, { block, compact })} ${className}`;
  if ('to' in props && props.to) {
    return <Link to={props.to} className={cls} onClick={props.onClick}>{children}</Link>;
  }
  if ('href' in props && props.href) {
    const ext = 'external' in props && props.external;
    return (
      <a href={props.href} className={cls} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  const { variant: _v, block: _b, compact: _c, className: _cn, children: _ch, ...rest } = props as Common &
    ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...rest} className={cls}>
      {children}
    </button>
  );
}
