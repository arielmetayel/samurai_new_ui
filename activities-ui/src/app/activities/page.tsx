"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { Activity } from "@/types";
import { Button, Checkbox } from "@/design-system";
import {
  BarChart2,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Filter,
  Link as LinkIcon,
  Search,
  Tool,
  Truck,
  X,
} from "react-feather";
import CreateNewPopup from "./CreateNewPopup";
import ActivityDetailSidePanel from "./ActivityDetailSidePanel";
import ActivityActionsMenu from "./ActivityActionsMenu";
import FilterActivitiesPopup, {
  ActivityFilters,
  EMPTY_FILTERS,
  activityMatchesFilters,
  cloneFilters,
  countFilters,
  filterChipLabels,
  filtersEqual,
  removeFilterChip,
} from "./FilterActivitiesPopup";
import { NavLabel, navItems } from "../navItems";

const mockActivities: Activity[] = [
  {
    id: "1",
    icon: "link",
    dateTime: "2026-10-08T09:00:00Z",
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
    icon: "link",
    dateTime: "2026-10-09T12:00:00Z",
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
    icon: "link",
    dateTime: "2026-10-07T10:00:00Z",
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
    icon: "truck",
    dateTime: "2026-09-30T11:00:00Z",
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
    icon: "tool",
    dateTime: "2026-10-20T14:00:00Z",
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

function ActivityGlyph({ icon, size = 18 }: { icon: string; size?: number }) {
  const props = { size, strokeWidth: 2 };
  if (icon === "truck") return <Truck {...props} />;
  if (icon === "link") return <LinkIcon {...props} />;
  if (icon === "tool") return <Tool {...props} />;
  return <Briefcase {...props} />;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(2);
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yy}, ${hh}:${min}`;
}

type SavedFilterTab = {
  id: string;
  name: string;
  filters: ActivityFilters;
};

export default function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [expandedRowIds, setExpandedRowIds] = useState<Record<string, boolean>>({});
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<ActivityFilters>(EMPTY_FILTERS);
  const [savedTabs, setSavedTabs] = useState<SavedFilterTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("all");

  const appliedCount = countFilters(appliedFilters);
  const appliedChips = filterChipLabels(appliedFilters);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return mockActivities
      .filter((a) =>
        [a.projectName, a.activityType, a.status].some((v) => v.toLowerCase().includes(lower))
      )
      .filter((a) => activityMatchesFilters(a, appliedFilters))
      .sort((a, b) => a.dateTime.localeCompare(b.dateTime));
  }, [search, appliedFilters]);

  function toggleExpand(id: string) {
    setExpandedRowIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleActivityClick(activity: Activity) {
    setSelectedActivity(activity);
    setIsSidePanelOpen(true);
  }

  function handleCloseSidePanel() {
    setIsSidePanelOpen(false);
    setSelectedActivity(null);
  }

  function uniqueTabName(name: string) {
    const used = new Set(savedTabs.map((tab) => tab.name.toLowerCase()));
    if (!used.has(name.toLowerCase())) return name;
    let index = 2;
    while (used.has(`${name} ${index}`.toLowerCase())) index += 1;
    return `${name} ${index}`;
  }

  function applyFilters(next: ActivityFilters, tabId = "all") {
    setAppliedFilters(next);
    setActiveTabId(tabId);
  }

  function saveFilterTab(name: string, filters: ActivityFilters) {
    const id = `tab-${Date.now()}`;
    const existing = savedTabs.find((tab) => filtersEqual(tab.filters, filters));
    if (existing) {
      applyFilters(cloneFilters(filters), existing.id);
      setIsFilterPopupOpen(false);
      return;
    }
    setSavedTabs((current) => [
      ...current,
      { id, name: uniqueTabName(name), filters: cloneFilters(filters) },
    ]);
    applyFilters(cloneFilters(filters), id);
    setIsFilterPopupOpen(false);
  }

  function selectSavedTab(tab: SavedFilterTab | "all") {
    if (tab === "all") {
      applyFilters(EMPTY_FILTERS, "all");
      return;
    }
    applyFilters(cloneFilters(tab.filters), tab.id);
  }

  function deleteSavedTab(id: string) {
    setSavedTabs((current) => current.filter((tab) => tab.id !== id));
    if (activeTabId === id) applyFilters(EMPTY_FILTERS, "all");
  }

  function patchAppliedFilters(next: ActivityFilters) {
    const matching = savedTabs.find((tab) => filtersEqual(tab.filters, next));
    applyFilters(next, matching?.id ?? (countFilters(next) === 0 ? "all" : "custom"));
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
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Activities" ? styles.menuItemActive : styles.menuItem}
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
          <h1 className={styles.pageTitle}>Activities</h1>
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
            <div className={styles.filterBtnWrap}>
              <Button
                variant={appliedCount > 0 ? "secondary" : "tertiary"}
                icon={Filter}
                iconSize={22}
                onClick={() => setIsFilterPopupOpen(true)}
              >
                Filter
              </Button>
              {appliedCount > 0 ? <span className={styles.filterCount}>{appliedCount}</span> : null}
            </div>
            <Button variant="tertiary" icon={BarChart2} iconSize={22}>
              Create Report
            </Button>
          </div>
        </div>

        {savedTabs.length > 0 ? (
          <div className={styles.filterTabs} role="tablist" aria-label="Saved filters">
            <button
              type="button"
              role="tab"
              aria-selected={activeTabId === "all"}
              className={`${styles.filterTab} ${activeTabId === "all" ? styles.filterTabActive : ""}`}
              onClick={() => selectSavedTab("all")}
            >
              All
            </button>
            {savedTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTabId === tab.id}
                className={`${styles.filterTab} ${activeTabId === tab.id ? styles.filterTabActive : ""}`}
                onClick={() => selectSavedTab(tab)}
              >
                {tab.name}
                <span
                  className={styles.filterTabClose}
                  aria-label={`Delete ${tab.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteSavedTab(tab.id);
                  }}
                >
                  <X size={12} />
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {appliedChips.length > 0 ? (
          <div className={styles.activeFilters}>
            {appliedChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className={styles.activeFilterChip}
                onClick={() => patchAppliedFilters(removeFilterChip(appliedFilters, chip.key))}
              >
                {chip.label}
                <span aria-hidden>×</span>
              </button>
            ))}
            <button
              type="button"
              className={styles.clearFilters}
              onClick={() => applyFilters(EMPTY_FILTERS, "all")}
            >
              Clear all
            </button>
            <span className={styles.filterResultCount}>
              {filtered.length} | {mockActivities.length}
            </span>
          </div>
        ) : null}

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

          {filtered.length === 0 ? (
            <div className={styles.emptyFilters}>
              <p>No activities match these filters.</p>
              <Button variant="secondary" size="md" onClick={() => applyFilters(EMPTY_FILTERS, "all")}>
                Clear filters
              </Button>
            </div>
          ) : null}
          {filtered.map((a) => {
            const expanded = !!expandedRowIds[a.id];
            return (
              <div key={a.id} className={styles.rowWrapper} data-status={a.status}>
                <div className={styles.colCheckbox}>
                  <Checkbox size="md" />
                </div>
                <div className={styles.columnBlock} onClick={() => handleActivityClick(a)}>
                  <div className={styles.row}>
                    <div className={styles.colIcon}>
                      <div className={styles.iconWrapper}>
                        <div className={styles.icon}>
                          <ActivityGlyph icon={a.icon} size={18} />
                        </div>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(a.id);
                            }} 
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles.colMenu}>
                      <ActivityActionsMenu
                        open={openMenuId === a.id}
                        onOpenChange={(open) => setOpenMenuId(open ? a.id : null)}
                        iconSize={24}
                      />
                    </div>
                  </div>
                  {a.questions.length > 0 && (
                    <>
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
                      <div className={styles.mobileAccordionToggleWrap}>
                        <button
                          type="button"
                          className={styles.mobileAccordionToggle}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(a.id);
                          }}
                        >
                          {expanded ? "Show less" : "Show more"}
                          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </>
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

      {isFilterPopupOpen ? (
        <FilterActivitiesPopup
          isOpen
          value={appliedFilters}
          matchCount={(filters) =>
            mockActivities.filter((activity) => activityMatchesFilters(activity, filters)).length
          }
          onClose={() => setIsFilterPopupOpen(false)}
          onApply={(next) => {
            const matching = savedTabs.find((tab) => filtersEqual(tab.filters, next));
            applyFilters(next, matching?.id ?? (countFilters(next) === 0 ? "all" : "custom"));
            setIsFilterPopupOpen(false);
          }}
          onSaveTab={saveFilterTab}
        />
      ) : null}
      
      <ActivityDetailSidePanel
        activity={selectedActivity}
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidePanel}
      />
    </div>
  );
}

