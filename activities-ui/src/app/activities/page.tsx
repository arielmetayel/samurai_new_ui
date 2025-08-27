"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { Activity, SortColumn, SortDirection } from "@/types";

const mockActivities: Activity[] = [
  {
    id: "1",
    icon: "🚚",
    dateTime: "2025-12-13T00:00:00Z",
    activityType: "Support Case",
    projectName: "FoodChain Suppliers",
    status: "In Progress",
    assignees: ["AB", "CD", "EF"],
    questions: [
      {
        id: "q1",
        title: "Question title",
        answer: "Answer - input content - Desktop",
      },
      {
        id: "q2",
        title: "Question title",
        answer: "Answer - input content - Desktop",
      },
      {
        id: "q3",
        title: "Question title",
        answer: "Answer - input content - Desktop",
      },
    ],
  },
  {
    id: "2",
    icon: "🚚",
    dateTime: "2025-12-13T00:00:00Z",
    activityType: "Support Case",
    projectName: "Event Masters",
    status: "Tested",
    assignees: ["GH"],
    questions: [
      { id: "q4", title: "Question title", answer: "Answer - input content - Desktop" },
      { id: "q5", title: "Question title", answer: "Answer - input content - Desktop" },
      { id: "q6", title: "Question title", answer: "Answer - input content - Desktop" },
    ],
  },
  {
    id: "3",
    icon: "🚚",
    dateTime: "2025-12-13T00:00:00Z",
    activityType: "Meeting Summary",
    projectName: "FoodChain Suppliers",
    status: "To Review",
    assignees: ["IJ", "KL", "MN", "OP"],
    questions: [],
  },
  {
    id: "4",
    icon: "📦",
    dateTime: "2025-12-13T00:00:00Z",
    activityType: "Phase Execution",
    projectName: "Legal Pro Consulting",
    status: "Confirmed",
    assignees: ["QR"],
    questions: [],
  },
  {
    id: "5",
    icon: "🛠️",
    dateTime: "2025-12-13T00:00:00Z",
    activityType: "Fixes",
    projectName: "Event Masters",
    status: "Done",
    assignees: ["ST"],
    questions: [],
  },
];

function formatDate(iso: string) {
  const date = new Date(iso);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(2);
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yy}, ${hh}:${min}`;
}

export default function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [expandedRowIds, setExpandedRowIds] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<SortColumn>("dateTime");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return mockActivities
      .filter((a) =>
        [a.projectName, a.activityType, a.status].some((v) => v.toLowerCase().includes(lower))
      )
      .sort((a, b) => {
        let compare = 0;
        if (sortBy === "dateTime") compare = a.dateTime.localeCompare(b.dateTime);
        if (sortBy === "projectName") compare = a.projectName.localeCompare(b.projectName);
        if (sortBy === "status") compare = a.status.localeCompare(b.status);
        if (sortBy === "assignees") compare = a.assignees.length - b.assignees.length;
        return sortDir === "asc" ? compare : -compare;
      });
  }, [search, sortBy, sortDir]);

  function toggleSort(column: SortColumn) {
    if (sortBy === column) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  }

  function toggleExpand(id: string) {
    setExpandedRowIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderContent}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          <h1 className={styles.topHeaderTitle}>Activities</h1>
        </div>
      </header>
      
      <aside className={styles.sidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
          <div className={styles.userName}>User Full Name</div>
        </div>
        <nav className={styles.menu}>
          {[
            "Home",
            "Activities",
            "Projects",
            "Users",
            "Data Analysis",
            "Files",
            "Apps",
            "Placement",
            "Blueprint",
            "Skills",
            "Automations",
          ].map((item) => (
            <div key={item} className={item === "Activities" ? styles.menuItemActive : styles.menuItem}>
              {item}
            </div>
          ))}
        </nav>
        <div className={styles.createWrap}>
          <button className={styles.createBtn}>+ Create New</button>
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Activities</h1>
          <div className={styles.headerActions}>
            <button className={styles.secondaryBtn}>
              <span className={styles.buttonIcon}>🔍</span>
              Filter
            </button>
            <button className={styles.secondaryBtn}>
              <span className={styles.buttonIcon}>📊</span>
              Create Report
            </button>
          </div>
        </div>
        <div className={styles.searchRow}>
          <input
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.colCheckbox}></div>
            <div className={styles.colIcon}></div>
            <button className={styles.colHeaderBtn} onClick={() => toggleSort("dateTime")}>
              Date & Time
              {sortBy === "dateTime" && <span className={styles.sortIcon}>{sortDir === "asc" ? "▲" : "▼"}</span>}
            </button>
            <div className={styles.colActivityType}>Project type</div>
            <button className={styles.colHeaderBtn} onClick={() => toggleSort("projectName")}>
              Project name
              {sortBy === "projectName" && (
                <span className={styles.sortIcon}>{sortDir === "asc" ? "▲" : "▼"}</span>
              )}
            </button>
            <button className={styles.colHeaderBtn} onClick={() => toggleSort("status")}>
              Status
              {sortBy === "status" && <span className={styles.sortIcon}>{sortDir === "asc" ? "▲" : "▼"}</span>}
            </button>
            <button className={styles.colHeaderBtn} onClick={() => toggleSort("assignees")}>
              Assignees
              {sortBy === "assignees" && (
                <span className={styles.sortIcon}>{sortDir === "asc" ? "▲" : "▼"}</span>
              )}
            </button>
            <div className={styles.colActions}></div>
          </div>

          {filtered.map((a) => {
            const expanded = !!expandedRowIds[a.id];
            return (
              <div key={a.id} className={styles.rowWrapper}>
                <div className={styles.row}>
                  <div className={styles.colCheckbox}>
                    <input type="checkbox" />
                  </div>
                  <div className={styles.colIcon}>{a.icon}</div>
                  <div className={styles.colDate}>{formatDate(a.dateTime)}</div>
                  <div className={styles.colActivityType}>{a.activityType}</div>
                  <div className={styles.colProject}>{a.projectName}</div>
                  <div className={styles.colStatus} data-status={a.status}>
                    {a.status}
                  </div>
                  <div className={styles.colAssignees}>
                    {a.assignees.map((s) => (
                      <span key={s} className={styles.badge}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className={styles.colActions}>
                    {a.questions.length > 0 && (
                      <button className={styles.linkBtn} onClick={() => toggleExpand(a.id)}>
                        {expanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </div>
                {a.questions.length > 0 && (
                  <div className={`${styles.accordion} ${expanded ? styles.accordionOpen : ""}`}>
                    <div className={styles.questionsGrid}>
                      {a.questions.map((q) => (
                        <div key={q.id} className={styles.questionItem}>
                          <div className={styles.questionTitle}>{q.title}</div>
                          <div className={styles.questionAnswer}>{q.answer}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

