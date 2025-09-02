"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { Activity, SortColumn, SortDirection } from "@/types";
import { Button, Checkbox } from "@/design-system";
import { colors } from "@/design-system/colors/tokens";
import { typography } from "@/design-system/typography/tokens";
import { ChevronDown, ChevronUp, MoreVertical, Filter, FileText } from "react-feather";
import CreateNewPopup from "./CreateNewPopup";

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
    questions: [
      { id: "q7", title: "Meeting notes", answer: "Discussion about project timeline and deliverables" },
      { id: "q8", title: "Action items", answer: "Follow up on budget approval and resource allocation" },
    ],
  },
  {
    id: "4",
    icon: "📦",
    dateTime: "2025-12-13T00:00:00Z",
    activityType: "Phase Execution",
    projectName: "Legal Pro Consulting",
    status: "Confirmed",
    assignees: ["QR"],
    questions: [
      { id: "q9", title: "Phase details", answer: "Phase 2 implementation plan and milestones" },
      { id: "q10", title: "Dependencies", answer: "External vendor coordination and legal review" },
    ],
  },
  {
    id: "5",
    icon: "🛠️",
    dateTime: "2025-12-13T00:00:00Z",
    activityType: "Fixes",
    projectName: "Event Masters",
    status: "Done",
    assignees: ["ST"],
    questions: [
      { id: "q11", title: "Bug fixes", answer: "Resolved authentication issues and UI responsiveness" },
      { id: "q12", title: "Testing", answer: "Unit tests passed and integration testing completed" },
    ],
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
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

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
          <h1 className={styles.pageTitle}>Activities</h1>
          <div className={styles.headerActions}>
            <Button variant="tertiary" icon={Filter} iconSize={22}>
              Filter
            </Button>
            <Button variant="tertiary" icon={FileText} iconSize={22}>
              Create Report
            </Button>
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
            <div className={styles.colDate}>Date & Time</div>
            <div className={styles.colActivityType}>Project Name</div>
            <div className={styles.colStatus}>Status</div>
            <div className={styles.colAssignees}>Assignee</div>
            <div className={styles.colActions}></div>
            <div className={styles.colMenu}></div>
          </div>

          {filtered.map((a) => {
            const expanded = !!expandedRowIds[a.id];
            return (
              <div key={a.id} className={styles.rowWrapper} data-status={a.status}>
                <div className={styles.colCheckbox}>
                  <Checkbox size="md" />
                </div>
                <div className={styles.columnBlock}>
                  <div className={styles.row}>
                    <div className={styles.colIcon}>
                      <div className={styles.iconWrapper}>
                        <div className={styles.icon}>{a.icon}</div>
                        <div className={styles.iconId}>12345678</div>
                      </div>
                    </div>
                    <div className={styles.colDate}>{formatDate(a.dateTime)}</div>
                    <div className={styles.colActivityType}>
                      <div className={styles.activityType}>{a.activityType}</div>
                      <div className={styles.projectName}>{a.projectName}</div>
                    </div>
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
                      <div className={styles.actionButtons}>
                        {a.questions.length > 0 && (
                          <Button 
                            variant="tertiary" 
                            size="sm"
                            icon={expanded ? ChevronUp : ChevronDown}
                            onClick={() => toggleExpand(a.id)} 
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles.colMenu}>
                      <div className={styles.ellipsisMenu} onClick={() => {}}>
                        <MoreVertical size={24} />
                      </div>
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

