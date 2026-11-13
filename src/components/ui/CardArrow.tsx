import Icon from '../Icon';

// The "go" mark on a card that is one big link (category cards, contact options, shortcut rows): a
// round button in a light crimson tint that fills crimson, with a white arrow that nudges right,
// when the card is hovered or focused. The whole card is the tap target; this shows where it leads.
export default function CardArrow({ size = 'md', className = '' }: { size?: 'sm' | 'md'; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-terracotta-deep/10 text-terracotta-deep transition-colors duration-micro ease-soft group-hover:bg-terracotta-deep group-hover:text-white group-focus-visible:bg-terracotta-deep group-focus-visible:text-white ${
        size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
      } ${className}`}
    >
      <Icon name="arrow" size={size === 'sm' ? 18 : 20} />
    </span>
  );
}
