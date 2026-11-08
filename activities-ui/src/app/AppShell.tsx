"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import AppSidebar from "./AppSidebar";
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
  const { t } = useI18n();
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

      <AppSidebar onCreateNew={onCreateNew} />

      <main className={[styles.main, contentClassName].filter(Boolean).join(" ")}>{children}</main>
    </div>
  );
}
