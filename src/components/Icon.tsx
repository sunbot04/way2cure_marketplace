// Rounded line icons, 2px stroke (brand guideline). Explicit imports keep the bundle small.
import {
  Pill, HeartPulse, HandHeart, Accessibility, Apple, ShieldCheck, RefreshCw, Store,
  Stethoscope, UserRound, BedDouble, Cross, Baby, Activity, Wind, Brain, Heart, Package,
  Sun, Sunrise, Sunset, Moon, Phone, MessageCircle, ShoppingCart, Search, Home, FileText,
  Check, ArrowRight, Clock, Truck, Lock, Calendar, MapPin, Menu, X, Plus, Minus, Bell,
  BadgeCheck, Users, Headphones, Smartphone, ScanLine, Sparkles, UserCheck, Trash2, Pencil,
  Info, AlertTriangle, ChevronRight, ChevronDown, Globe, Watch, Mail, ExternalLink, QrCode, Puzzle,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  pill: Pill, heartPulse: HeartPulse, handHeart: HandHeart, mobility: Accessibility, apple: Apple,
  shield: ShieldCheck, refresh: RefreshCw, store: Store, stethoscope: Stethoscope, userDoctor: UserRound,
  bed: BedDouble, bandage: Cross, baby: Baby, activity: Activity, wind: Wind, brain: Brain, ribbon: Heart,
  package: Package, sun: Sun, sunrise: Sunrise, sunset: Sunset, moon: Moon, phone: Phone,
  whatsapp: MessageCircle, cart: ShoppingCart, search: Search, home: Home, rx: FileText, check: Check,
  arrow: ArrowRight, clock: Clock, truck: Truck, lock: Lock, calendar: Calendar, pin: MapPin, menu: Menu,
  close: X, plus: Plus, minus: Minus, bell: Bell, verified: BadgeCheck, users: Users, support: Headphones,
  phoneApp: Smartphone, scan: ScanLine, sparkles: Sparkles, userCheck: UserCheck, trash: Trash2,
  edit: Pencil, info: Info, warning: AlertTriangle, chevron: ChevronRight, globe: Globe, watch: Watch,
  mail: Mail, user: UserRound, chevronDown: ChevronDown, external: ExternalLink, qr: QrCode, memory: Puzzle,
};

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  /** Give a label only when the icon carries meaning on its own; otherwise it is hidden from screen readers. */
  label?: string;
}

export default function Icon({ name, size = 24, className, label }: IconProps) {
  const C = map[name] || Info;
  return (
    <C
      size={`${size / 16}rem`}
      strokeWidth={2}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
    />
  );
}
