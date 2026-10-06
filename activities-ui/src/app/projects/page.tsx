"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { Button, Checkbox } from "@/design-system";
import { MoreVertical, Filter, FileText, Search } from "react-feather";
import CreateNewPopup from "../activities/CreateNewPopup";

interface Project {
  id: string;
  projectNumber: string;
  name: string;
  address: string | null;
  contractStatus: "Signed Contract" | "No Contract" | null;
  buildingsCount: number;
  assignees: string[];
  thumbTone: "rose" | "sand" | "sage" | "sky" | "lilac";
}

const mockProjects: Project[] = [
  {
    id: "1",
    projectNumber: "216790",
    name: "B.S.T - Ichilov North",
    address: null,
    contractStatus: null,
    buildingsCount: 0,
    assignees: ["MK"],
    thumbTone: "rose",
  },
  {
    id: "2",
    projectNumber: "216789",
    name: "Yuvalim Ganim - Jerusalem",
    address: null,
    contractStatus: null,
    buildingsCount: 0,
    assignees: ["DL"],
    thumbTone: "sand",
  },
  {
    id: "3",
    projectNumber: "216788",
    name: "HaGiborim - Bat Yam",
    address: null,
    contractStatus: null,
    buildingsCount: 0,
    assignees: ["RS"],
    thumbTone: "sage",
  },
  {
    id: "4",
    projectNumber: "216787",
    name: "Dania Sibus - Plot 112 Ramat Efal",
    address: "Shacham 13, Ramat Gan, Israel",
    contractStatus: null,
    buildingsCount: 0,
    assignees: ["AV", "TK"],
    thumbTone: "sky",
  },
  {
    id: "5",
    projectNumber: "216786",
    name: "Ariel Gabay - Dubnov 3 Tel Aviv",
    address: null,
    contractStatus: "Signed Contract",
    buildingsCount: 0,
    assignees: ["MK"],
    thumbTone: "lilac",
  },
  {
    id: "6",
    projectNumber: "216785",
    name: "Dania Sibus - HaDam Bank",
    address: null,
    contractStatus: "No Contract",
    buildingsCount: 0,
    assignees: ["DL"],
    thumbTone: "rose",
  },
  {
    id: "7",
    projectNumber: "216783",
    name: "Dania Sibus - Givat Shmuel 1006-1007",
    address: "Heyn 57, Petah Tikva, Israel",
    contractStatus: "No Contract",
    buildingsCount: 0,
    assignees: ["RS"],
    thumbTone: "sand",
  },
];

const TOTAL_PROJECTS = 348;

const menuItems: { label: string; href?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Projects", href: "/projects" },
  { label: "Users", href: "/users" },
  { label: "Data Analysis", href: "/data-analysis" },
  { label: "Files" },
  { label: "Apps" },
  { label: "Placement", href: "/placement" },
  { label: "Blueprint" },
  { label: "Skills" },
  { label: "Automations" },
];

function displayValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "0";
  return String(value);
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("2");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return mockProjects.filter((p) =>
      [p.name, p.address ?? "", p.contractStatus ?? "", p.projectNumber].some((v) =>
        v.toLowerCase().includes(lower)
      )
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
          <h1 className={styles.topHeaderTitle}>Projects</h1>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
          <div className={styles.userName}>User Full Name</div>
        </div>
        <nav className={styles.menu}>
          {menuItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Projects" ? styles.menuItemActive : styles.menuItem}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className={styles.menuItem}>
                {item.label}
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
          <h1 className={styles.pageTitle}>Projects</h1>
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
          <div className={styles.headerActions}>
            <Button variant="tertiary" icon={Filter} iconSize={22}>
              Filter
            </Button>
            <Button variant="tertiary" icon={FileText} iconSize={22}>
              Create Report
            </Button>
          </div>
        </div>

        <div className={styles.counterRow}>
          {filtered.length} | {TOTAL_PROJECTS}
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.colCheckbox}></div>
            <div className={styles.colThumb}></div>
            <div className={styles.colName}>Project Name</div>
            <div className={styles.fieldsGroup}>
              <div className={styles.colField}>Address</div>
              <div className={styles.colField}>Contract / Quote Status</div>
              <div className={styles.colField}>Buildings in Project</div>
            </div>
            <div className={styles.colAssignees}>Assignee</div>
            <div className={styles.colMenu}></div>
          </div>

          {filtered.map((p) => {
            const selected = selectedId === p.id;
            return (
              <div
                key={p.id}
                className={`${styles.rowWrapper} ${selected ? styles.rowSelected : ""}`}
                data-status={p.contractStatus ?? "None"}
                onClick={() => toggleSelected(p.id)}
              >
                <div
                  className={styles.colCheckbox}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    size="md"
                    checked={selected}
                    onChange={() => toggleSelected(p.id)}
                  />
                </div>
                <div className={styles.columnBlock}>
                  <div className={styles.row}>
                    <div className={styles.colThumb}>
                      <div
                        className={styles.thumb}
                        data-tone={p.thumbTone}
                        aria-hidden
                      >
                        <span className={styles.thumbId}>#{p.projectNumber}</span>
                      </div>
                    </div>
                    <div className={styles.colName}>
                      <div className={styles.projectName}>{p.name}</div>
                    </div>
                    <div className={styles.fieldsGroup}>
                      <div className={styles.colField}>
                        <div className={styles.fieldLabel}>Address</div>
                        <div className={styles.fieldValue}>{displayValue(p.address)}</div>
                      </div>
                      <div className={styles.colField}>
                        <div className={styles.fieldLabel}>Contract / Quote Status</div>
                        <div
                          className={styles.fieldValue}
                          data-status={p.contractStatus ?? "None"}
                        >
                          {displayValue(p.contractStatus)}
                        </div>
                      </div>
                      <div className={styles.colField}>
                        <div className={styles.fieldLabel}>Buildings in Project</div>
                        <div className={styles.fieldValue}>{p.buildingsCount}</div>
                      </div>
                    </div>
                    <div className={styles.colAssignees}>
                      {p.assignees.map((s) => (
                        <span key={s} className={styles.badge}>
                          {s}
                        </span>
                      ))}
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
