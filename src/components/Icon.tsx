// Rounded line icons, 2px stroke (brand guideline). Explicit imports keep the bundle small.
import {
  Pill, HeartPulse, HandHeart, Accessibility, Apple, ShieldCheck, RefreshCw, Store,
  Stethoscope, UserRound, BedDouble, Cross, Baby, Activity, Wind, Brain, Heart, Package,
  Sun, Sunrise, Sunset, Moon, Phone, ShoppingCart, Search, Home, FileText,
  Check, ArrowRight, Clock, Truck, Lock, Calendar, MapPin, Menu, X, Plus, Minus, Bell,
  BadgeCheck, Users, Headphones, Smartphone, ScanLine, Sparkles, UserCheck, Trash2, Pencil,
  Info, AlertTriangle, ChevronRight, ChevronDown, Globe, Watch, Mail, ExternalLink, QrCode, Puzzle, SlidersHorizontal, Upload,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  pill: Pill, heartPulse: HeartPulse, handHeart: HandHeart, mobility: Accessibility, apple: Apple,
  shield: ShieldCheck, refresh: RefreshCw, store: Store, stethoscope: Stethoscope, userDoctor: UserRound,
  bed: BedDouble, bandage: Cross, baby: Baby, activity: Activity, wind: Wind, brain: Brain, ribbon: Heart,
  package: Package, sun: Sun, sunrise: Sunrise, sunset: Sunset, moon: Moon, phone: Phone,
  cart: ShoppingCart, search: Search, home: Home, rx: FileText, check: Check,
  arrow: ArrowRight, clock: Clock, truck: Truck, lock: Lock, calendar: Calendar, pin: MapPin, menu: Menu,
  close: X, plus: Plus, minus: Minus, bell: Bell, verified: BadgeCheck, users: Users, support: Headphones,
  phoneApp: Smartphone, scan: ScanLine, sparkles: Sparkles, userCheck: UserCheck, trash: Trash2,
  edit: Pencil, info: Info, warning: AlertTriangle, chevron: ChevronRight, globe: Globe, watch: Watch,
  heart: Heart, mail: Mail, user: UserRound, chevronDown: ChevronDown, external: ExternalLink, qr: QrCode, memory: Puzzle, filter: SlidersHorizontal, upload: Upload,
};

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  /** Give a label only when the icon carries meaning on its own; otherwise it is hidden from screen readers. */
  label?: string;
  /** Fill the shape with the text colour (e.g. a saved heart). */
  filled?: boolean;
}

// WhatsApp's own logo (lucide has no brand logos), so "WhatsApp" is recognisable at a glance.
// Filled, in the current text colour. Path: Simple Icons (CC0).
const WHATSAPP = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

export default function Icon({ name, size = 24, className, label, filled = false }: IconProps) {
  if (name === 'whatsapp') {
    // The logo fills its whole 24px box; the wider viewBox gives it the same optical size as the line icons.
    return (
      <svg viewBox="-2 -2 28 28" width={`${size / 16}rem`} height={`${size / 16}rem`} fill="currentColor" className={className}
        aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} focusable="false">
        <path d={WHATSAPP} />
      </svg>
    );
  }
  const C = map[name] || Info;
  // Arrows nudge 3px right when their link, button or card (.group) is hovered.
  const nudge = name === 'arrow' ? 'shrink-0 transition-transform duration-micro group-hover:translate-x-[3px]' : '';
  return (
    <C
      size={`${size / 16}rem`}
      strokeWidth={2}
      fill={filled ? 'currentColor' : 'none'}
      className={[nudge, className].filter(Boolean).join(' ') || undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
    />
  );
}
