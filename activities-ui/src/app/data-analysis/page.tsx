"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { MoreVertical, Search } from "react-feather";
import CreateNewPopup from "../activities/CreateNewPopup";
import { NavLabel, navItems } from "../navItems";

type ReportVisibility = "Public" | "Shared" | "Private";

interface Report {
  id: string;
  title: string;
  dateTime: string;
  ownerInitials: string;
  visibility: ReportVisibility;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Open supplies - current + previous month",
    dateTime: "2026-10-05T11:19:00Z",
    ownerInitials: "CB",
    visibility: "Public",
  },
  {
    id: "2",
    title: "Castings, treatments, supplies - tomorrow",
    dateTime: "2022-05-20T18:47:00Z",
    ownerInitials: "CB",
    visibility: "Shared",
  },
  {
    id: "3",
    title: "Field inspections - projects in progress",
    dateTime: "2026-09-28T16:51:00Z",
    ownerInitials: "CB",
    visibility: "Private",
  },
  {
    id: "4",
    title: "Activity summary for 2025",
    dateTime: "2025-06-29T16:20:00Z",
    ownerInitials: "CB",
    visibility: "Shared",
  },
  {
    id: "5",
    title: "Projects without contract",
    dateTime: "2025-12-02T14:23:00Z",
    ownerInitials: "CB",
    visibility: "Shared",
  },
  {
    id: "6",
    title: "Inspector work hours - hourly (2026)",
    dateTime: "2026-06-10T13:02:00Z",
    ownerInitials: "CB",
    visibility: "Shared",
  },
  {
    id: "7",
    title: "Report Mon Sep 07 2026",
    dateTime: "2026-09-07T14:00:00Z",
    ownerInitials: "CB",
    visibility: "Private",
  },
];

const TOTAL_REPORTS = 158;

function formatDate(iso: string) {
  const date = new Date(iso);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(2);
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${min}, ${dd}/${mm}/${yy}`;
}

export default function DataAnalysisPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("5");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return mockReports.filter((r) =>
      [r.title, r.visibility, r.ownerInitials].some((v) => v.toLowerCase().includes(lower))
    );
  }, [search]);

  function toggleSelected(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderContent}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          <h1 className={styles.topHeaderTitle}>Data Analysis</h1>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
          <div className={styles.userName}>User Full Name</div>
        </div>
        <nav className={styles.menu}>
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Data Analysis" ? styles.menuItemActive : styles.menuItem}
              >
                <NavLabel item={item} />
              </Link>
            ) : (
              <div key={item.label} className={styles.menuItem}>
                <NavLabel item={item} />
              </div>
            )
          )}
        </nav>
        <div className={styles.createWrap}>
          <Button
            variant="primary"
            size="md"
            className={styles.createBtn}
            onClick={() => setIsCreatePopupOpen(true)}
          >
            + Create New
          </Button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Data Analysis</h1>
        </div>
        <div className={styles.searchRow}>
          <div className={styles.mainSearchWrapper}>
            <Search size={18} className={styles.mainSearchIcon} />
            <input
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.counterRow}>
          {filtered.length} | {TOTAL_REPORTS}
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.colTitle}>Report</div>
            <div className={styles.colDate}>Date & Time</div>
            <div className={styles.colOwner}>Owner</div>
            <div className={styles.colVisibility}>Visibility</div>
            <div className={styles.colMenu}></div>
          </div>

          {filtered.map((r) => {
            const selected = selectedId === r.id;
            return (
              <div
                key={r.id}
                className={`${styles.rowWrapper} ${selected ? styles.rowSelected : ""}`}
                data-visibility={r.visibility}
                onClick={() => toggleSelected(r.id)}
              >
                <div className={styles.columnBlock}>
                  <div className={styles.row}>
                    <div className={styles.colTitle}>{r.title}</div>
                    <div className={styles.colDate}>{formatDate(r.dateTime)}</div>
                    <div className={styles.colOwner}>
                      <span className={styles.ownerBadge}>{r.ownerInitials}</span>
                    </div>
                    <div className={styles.colVisibility}>
                      <span
                        className={styles.visibilityBadge}
                        data-visibility={r.visibility}
                      >
                        {r.visibility}
                      </span>
                    </div>
                    <div
                      className={styles.colMenu}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.ellipsisMenu}>
                        <MoreVertical size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />
    </div>
  );
}
