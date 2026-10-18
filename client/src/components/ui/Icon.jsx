import {
  Award, BadgeCheck, BarChart3, BookOpen, BookOpenCheck, Briefcase, Building2, CalendarCheck, Code2, Cog, Compass, Cpu, Crown, Dna, Flame,
  FlaskConical, GraduationCap, Languages, Layers, Map, Megaphone, MonitorSmartphone, Mountain, PenTool, Rocket, Scale, Server, ShieldCheck,
  Sigma, Stethoscope, Target, TrendingUp
} from 'lucide-react';

const ICONS = {
  Award, BadgeCheck, BarChart3, BookOpen, BookOpenCheck, Briefcase, Building2, CalendarCheck, Code2, Cog, Compass, Cpu, Crown, Dna, Flame,
  FlaskConical, GraduationCap, Languages, Layers, Map, Megaphone, MonitorSmartphone, Mountain, PenTool, Rocket, Scale, Server, ShieldCheck,
  Sigma, Stethoscope, Target, TrendingUp
};

export default function Icon({ name, className = 'h-5 w-5', fallback = Briefcase }) {
  const Cmp = ICONS[name] || fallback;
  return <Cmp className={className} aria-hidden />;
}
