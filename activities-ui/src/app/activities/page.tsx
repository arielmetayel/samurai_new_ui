"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { Activity, listPreviewQuestions, questionAnswerText } from "@/types";
import { getActivityById, mockActivities } from "./data";
import { Button, Checkbox } from "@/design-system";
import { useI18n } from "@/i18n";
import AppShell from "../AppShell";
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

function ActivityGlyph({ icon, size = 18 }: { icon: string; size?: number }) {
  const props = { size, strokeWidth: 2 };
  if (icon === "truck") return <Truck {...props} />;
  if (icon === "link") return <LinkIcon {...props} />;
  if (icon === "tool") return <Tool {...props} />;
  return <Briefcase {...props} />;
}

function formatDateParts(iso: string) {
  const date = new Date(iso);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(2);
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return { day: `${dd}/${mm}/${yy}`, time: `${hh}:${min}` };
}

type SavedFilterTab = {
  id: string;
  name: string;
  filters: ActivityFilters;
};

export default function ActivitiesPage() {
  return (
    <Suspense fallback={null}>
      <ActivitiesPageContent />
    </Suspense>
  );
}

function ActivitiesPageContent() {
  const { t, localize } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const openId = searchParams.get("id");

  useEffect(() => {
    if (!openId) return;
    const activity = getActivityById(openId);
    if (!activity) return;
    setSelectedActivity(activity);
    setIsSidePanelOpen(true);
  }, [openId]);

  const appliedCount = countFilters(appliedFilters);
  const appliedChips = filterChipLabels(appliedFilters);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return mockActivities
      .filter((a) =>
        [a.projectName, a.activityType, localize(a.activityType), a.status, localize(a.status)].some((v) =>
          v.toLowerCase().includes(lower)
        )
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
    router.replace(`/activities?id=${activity.id}`, { scroll: false });
  }

  function handleCloseSidePanel() {
    setIsSidePanelOpen(false);
    setSelectedActivity(null);
    if (openId) {
      router.replace("/activities", { scroll: false });
    }
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
    <AppShell title={t("activities.title")} onCreateNew={() => setIsCreatePopupOpen(true)}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>{t("activities.title")}</h1>
        </div>
        <div className={styles.searchRow}>
          <div className={styles.mainSearchWrapper}>
            <Search size={18} className={styles.mainSearchIcon} />
            <input
              placeholder={t("common.search")}
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
                {t("common.filter")}
              </Button>
              {appliedCount > 0 ? <span className={styles.filterCount}>{appliedCount}</span> : null}
            </div>
            <Button variant="tertiary" icon={BarChart2} iconSize={22}>
              {t("common.createReport")}
            </Button>
          </div>
        </div>

        {savedTabs.length > 0 ? (
          <div className={styles.filterTabs} role="tablist" aria-label={t("activities.savedFilters")}>
            <button
              type="button"
              role="tab"
              aria-selected={activeTabId === "all"}
              className={`${styles.filterTab} ${activeTabId === "all" ? styles.filterTabActive : ""}`}
              onClick={() => selectSavedTab("all")}
            >
              {t("common.all")}
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
              {t("common.clearAll")}
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
            <div className={styles.colDate}>{t("table.dateTime")}</div>
            <div className={styles.colActivityType}>{t("table.projectName")}</div>
            <div className={styles.colStatus}>{t("table.status")}</div>
            <div className={styles.colAssignees}>{t("table.assignee")}</div>
            <div className={styles.colActions}></div>
            <div className={styles.colMenu}></div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.emptyFilters}>
              <p>{t("activities.empty")}</p>
              <Button variant="secondary" size="md" onClick={() => applyFilters(EMPTY_FILTERS, "all")}>
                {t("common.clearFilters")}
              </Button>
            </div>
          ) : null}
          {filtered.map((a) => {
            const expanded = !!expandedRowIds[a.id];
            const previewQuestions = listPreviewQuestions(a);
            const dateParts = formatDateParts(a.dateTime);
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
                    <div className={styles.colDate}>
                      <span className={styles.dateDay}>{dateParts.day}</span>
                      <span className={styles.dateTime}>{dateParts.time}</span>
                    </div>
                    <div className={styles.colActivityType}>
                      <div className={styles.activityType}>{localize(a.activityType)}</div>
                      <div className={styles.projectName}>{a.projectName}</div>
                    </div>
                    <div className={styles.colStatus} data-status={a.status}>
                      {localize(a.status)}
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
                        {previewQuestions.length > 0 && (
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
                  {previewQuestions.length > 0 && (
                    <>
                      <div className={`${styles.accordion} ${expanded ? styles.accordionOpen : ""}`}>
                        <div className={styles.questionsGrid}>
                          {previewQuestions.map((q) => (
                            <div key={q.id} className={styles.questionItem}>
                              <div className={styles.questionTitle}>{localize(q.title)}</div>
                              <div className={styles.questionAnswer}>{localize(questionAnswerText(q))}</div>
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
                          {expanded ? t("common.showLess") : t("common.showMore")}
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
    </AppShell>
  );
}

