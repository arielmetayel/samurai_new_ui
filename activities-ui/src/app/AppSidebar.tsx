"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, Plus } from "react-feather";
import { Button } from "@/design-system";
import { useI18n } from "@/i18n";
import { navItems } from "./navItems";
import styles from "./chrome.module.css";

const STORAGE_KEY = "samurai-sidebar-collapsed";

function isActive(href: string | undefined, pathname: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function applyCollapsed(collapsed: boolean) {
  document.documentElement.dataset.sidebar = collapsed ? "collapsed" : "expanded";
}

export default function AppSidebar({
  onCreateNew,
}: {
  onCreateNew?: () => void;
}) {
  const pathname = usePathname();
  const { t, locale, setLocale } = useI18n();
  const [collapsed, setCollapsed] = useState(false);
  const isRtl = locale === "he";
  const CollapseIcon =
    collapsed === isRtl ? ChevronsLeft : ChevronsRight;

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) === "1";
    setCollapsed(stored);
    applyCollapsed(stored);
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      applyCollapsed(next);
      return next;
    });
  }

  return (
    <aside className={styles.sidebar} data-collapsed={collapsed}>
      <div className={styles.userBlock}>
        <div className={styles.avatar}>UF</div>
        {!collapsed ? (
          <div className={styles.userMeta}>
            <div className={styles.userName}>{t("chrome.userName")}</div>
            <button
              type="button"
              className={styles.langToggle}
              onClick={() => setLocale(locale === "he" ? "en" : "he")}
            >
              {locale === "he" ? t("chrome.switchToEn") : t("chrome.switchToHe")}
            </button>
          </div>
        ) : null}
      </div>
      <nav className={styles.menu}>
        {navItems.map((item) => {
          const label = t(item.labelKey);
          const className = isActive(item.href, pathname)
            ? styles.menuItemActive
            : styles.menuItem;
          const content = (
            <>
              <item.icon size={18} strokeWidth={2} />
              {!collapsed ? <span>{label}</span> : null}
            </>
          );
          return item.href ? (
            <Link
              key={item.id}
              href={item.href}
              className={className}
              title={label}
              aria-label={label}
            >
              {content}
            </Link>
          ) : (
            <div key={item.id} className={className} title={label}>
              {content}
            </div>
          );
        })}
      </nav>
      <div className={styles.sidebarFooter}>
        {onCreateNew ? (
          <div className={styles.createWrap}>
            {collapsed ? (
              <Button
                variant="primary"
                size="md"
                className={styles.createBtn}
                icon={Plus}
                aria-label={t("chrome.createNew")}
                onClick={onCreateNew}
              />
            ) : (
              <Button
                variant="primary"
                size="md"
                className={styles.createBtn}
                onClick={onCreateNew}
              >
                + {t("chrome.createNew")}
              </Button>
            )}
          </div>
        ) : null}
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-label={
            collapsed ? t("chrome.expandSidebar") : t("chrome.collapseSidebar")
          }
          title={
            collapsed ? t("chrome.expandSidebar") : t("chrome.collapseSidebar")
          }
        >
          <CollapseIcon size={16} strokeWidth={2} />
          {!collapsed ? (
            <span>{t("chrome.collapseSidebar")}</span>
          ) : null}
        </button>
      </div>
    </aside>
  );
}
