// Rounded line icons, 2px stroke (brand guideline). Explicit imports keep the bundle small.
import {
  Pill, HeartPulse, HandHeart, Accessibility, Apple, ShieldCheck, RefreshCw, Store,
  Stethoscope, UserRound, BedDouble, Cross, Baby, Activity, Wind, Brain, Heart, Package,
  Sun, Sunrise, Sunset, Moon, Phone, MessageCircle, ShoppingCart, Search, Home, FileText,
  Check, ArrowRight, Clock, Truck, Lock, Calendar, MapPin, Menu, X, Plus, Minus, Bell,
  BadgeCheck, Users, Headphones, Smartphone, ScanLine, Sparkles, UserCheck, Trash2, Pencil,
  Info, AlertTriangle, ChevronRight, Globe, Watch, Mail,
} from 'lucide-react';

const map = {
  pill: Pill, heartPulse: HeartPulse, handHeart: HandHeart, mobility: Accessibility, apple: Apple,
  shield: ShieldCheck, refresh: RefreshCw, store: Store, stethoscope: Stethoscope, userDoctor: UserRound,
  bed: BedDouble, bandage: Cross, baby: Baby, activity: Activity, wind: Wind, brain: Brain, ribbon: Heart,
  package: Package, sun: Sun, sunrise: Sunrise, sunset: Sunset, moon: Moon, phone: Phone,
  whatsapp: MessageCircle, cart: ShoppingCart, search: Search, home: Home, rx: FileText, check: Check,
  arrow: ArrowRight, clock: Clock, truck: Truck, lock: Lock, calendar: Calendar, pin: MapPin, menu: Menu,
  close: X, plus: Plus, minus: Minus, bell: Bell, verified: BadgeCheck, users: Users, support: Headphones,
  phoneApp: Smartphone, scan: ScanLine, sparkles: Sparkles, userCheck: UserCheck, trash: Trash2,
  edit: Pencil, info: Info, warning: AlertTriangle, chevron: ChevronRight, globe: Globe, watch: Watch,
  mail: Mail, user: UserRound,
};

export default function Icon({ name, size = 24, className, label }) {
  const C = map[name] || Info;
  return (
    <C
      size={size}
      strokeWidth={2}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
    />
  );
}
