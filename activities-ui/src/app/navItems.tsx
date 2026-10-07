import type { Icon } from "react-feather";
import {
  Award,
  BarChart2,
  Calendar,
  File,
  Folder,
  Grid,
  Home,
  Layers,
  UserCheck,
  Users,
  Zap,
} from "react-feather";

export type NavItem = {
  label: string;
  href?: string;
  icon: Icon;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Activities", href: "/activities", icon: Calendar },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Users", href: "/users", icon: Users },
  { label: "Data Analysis", href: "/data-analysis", icon: BarChart2 },
  { label: "Files", icon: File },
  { label: "Apps", icon: Grid },
  { label: "Placement", href: "/placement", icon: UserCheck },
  { label: "Blueprint", icon: Layers },
  { label: "Skills", icon: Award },
  { label: "Automations", href: "/automations", icon: Zap },
];

export function NavLabel({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <>
      <Icon size={18} strokeWidth={2} />
      {item.label}
    </>
  );
}
