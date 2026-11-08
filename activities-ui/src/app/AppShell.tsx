"use client";

import React from "react";
import AppSidebar from "./AppSidebar";
import styles from "./chrome.module.css";

type AppShellProps = {
  onCreateNew?: () => void;
  contentClassName?: string;
  children: React.ReactNode;
};

export default function AppShell({
  onCreateNew,
  contentClassName,
  children,
}: AppShellProps) {
  return (
    <div className={styles.pageWrapper}>
      <AppSidebar onCreateNew={onCreateNew} />
      <main className={[styles.main, contentClassName].filter(Boolean).join(" ")}>{children}</main>
    </div>
  );
}
