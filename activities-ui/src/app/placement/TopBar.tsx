"use client";

import Link from "next/link";
import styles from "./placement.module.css";

export default function TopBar() {
  return (
    <header className={styles.topHeader}>
      <div className={styles.topHeaderContent}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.topHeaderTitle}>Placement</h1>
      </div>
    </header>
  );
}
