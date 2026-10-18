"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/design-system";
import { useI18n } from "@/i18n";
import { navItems } from "./navItems";
import styles from "./chrome.module.css";

type AppShellProps = {
  title: string;
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
  headerExtra?: React.ReactNode;
  onCreateNew?: () => void;
  contentClassName?: string;
  children: React.ReactNode;
};

function isActive(href: string | undefined, pathname: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppShell({
  title,
  showBack = true,
  backHref = "/",
  backLabel,
  onBack,
  headerExtra,
  onCreateNew,
  contentClassName,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const { t, locale, setLocale } = useI18n();
  const resolvedBack = backLabel ?? t("chrome.backHome");

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderContent}>
          {showBack ? (
            onBack ? (
              <button type="button" className={styles.backLink} onClick={onBack}>
                {resolvedBack}
              </button>
            ) : (
              <Link href={backHref} className={styles.backLink}>
                {resolvedBack}
              </Link>
            )
          ) : null}
          <h1 className={styles.topHeaderTitle}>{title}</h1>
          {headerExtra ? <div className={styles.headerExtra}>{headerExtra}</div> : null}
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
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
        </div>
        <nav className={styles.menu}>
          {navItems.map((item) => {
            const label = t(item.labelKey);
            return item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className={isActive(item.href, pathname) ? styles.menuItemActive : styles.menuItem}
              >
                <item.icon size={18} strokeWidth={2} />
                {label}
              </Link>
            ) : (
              <div key={item.id} className={styles.menuItem}>
                <item.icon size={18} strokeWidth={2} />
                {label}
              </div>
            );
          })}
        </nav>
        {onCreateNew ? (
          <div className={styles.createWrap}>
            <Button variant="primary" size="md" className={styles.createBtn} onClick={onCreateNew}>
              + {t("chrome.createNew")}
            </Button>
          </div>
        ) : null}
      </aside>

      <main className={[styles.main, contentClassName].filter(Boolean).join(" ")}>{children}</main>
    </div>
  );
}
