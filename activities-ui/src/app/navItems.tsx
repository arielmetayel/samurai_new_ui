"use client";

import type { Icon } from "react-feather";
import { useI18n } from "@/i18n";
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
import type { MessageKey } from "@/i18n/messages";

export type NavItem = {
  id: string;
  labelKey: MessageKey;
  href?: string;
  icon: Icon;
};

export const navItems: NavItem[] = [
  { id: "home", labelKey: "nav.home", href: "/", icon: Home },
  { id: "activities", labelKey: "nav.activities", href: "/activities", icon: Calendar },
  { id: "projects", labelKey: "nav.projects", href: "/projects", icon: Folder },
  { id: "users", labelKey: "nav.users", href: "/users", icon: Users },
  { id: "dataAnalysis", labelKey: "nav.dataAnalysis", href: "/data-analysis", icon: BarChart2 },
  { id: "files", labelKey: "nav.files", icon: File },
  { id: "apps", labelKey: "nav.apps", icon: Grid },
  { id: "placement", labelKey: "nav.placement", href: "/placement", icon: UserCheck },
  { id: "blueprint", labelKey: "nav.blueprint", icon: Layers },
  { id: "skills", labelKey: "nav.skills", icon: Award },
  { id: "automations", labelKey: "nav.automations", href: "/automations", icon: Zap },
];

export function NavLabel({ item }: { item: NavItem }) {
  const { t } = useI18n();
  const Icon = item.icon;
  return (
    <>
      <Icon size={18} strokeWidth={2} />
      {t(item.labelKey)}
    </>
  );
}
