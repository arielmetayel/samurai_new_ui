"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, X } from "react-feather";
import { Button, Drawer, StatusChip, TextInput, filterStatusColor } from "@/design-system";
import { localize, t, useI18n } from "@/i18n";
import styles from "./FilterActivitiesPopup.module.css";

export type ActivityFilters = {
  myActivities: boolean;
  myProjects: boolean;
  projects: string[];
  users: string[];
  date: string | null;
  customFrom: string;
  customTo: string;
  statuses: string[];
  activityTypes: string[];
};

export const EMPTY_FILTERS: ActivityFilters = {
  myActivities: false,
  myProjects: false,
  projects: [],
  users: [],
  date: null,
  customFrom: "",
  customTo: "",
  statuses: [],
  activityTypes: [],
};

const DATE_PRESETS = [
  "Today",
  "Tomorrow",
  "This week",
  "Last week",
  "This month",
  "Last month",
  "Next month",
  "Custom",
];

export const STATUS_OPTIONS = [
  "In Progress",
  "Tested",
  "To Review",
  "Confirmed",
  "Done",
  "Open",
  "Reported",
  "Assigned",
  "Complete Report",
  "Instructra Care",
  "Rejected",
];

export const PROJECT_OPTIONS = [
  "FoodChain Suppliers",
  "Event Masters",
  "Legal Pro Consulting",
  "Ichilov North",
  "Yuvalim Ganim",
  "HaGiborim",
  "Dania Sibus",
];

export const USER_OPTIONS = ["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST"];

const ACTIVITY_TYPE_OPTIONS = [
  "Support Case",
  "Meeting Summary",
  "Phase Execution",
  "Fixes",
  "Site Visit",
];

export function cloneFilters(value: ActivityFilters): ActivityFilters {
  return {
    ...value,
    projects: [...value.projects],
    users: [...value.users],
    statuses: [...value.statuses],
    activityTypes: [...value.activityTypes],
  };
}

export function countFilters(filters: ActivityFilters): number {
  return (
    Number(filters.myActivities) +
    Number(filters.myProjects) +
    filters.projects.length +
    filters.users.length +
    Number(Boolean(filters.date)) +
    filters.statuses.length +
    filters.activityTypes.length
  );
}

export function countAdvancedFilters(filters: ActivityFilters): number {
  return Number(Boolean(filters.date)) + filters.statuses.length + filters.activityTypes.length;
}

export function clearAdvancedFilters(filters: ActivityFilters): ActivityFilters {
  return {
    ...filters,
    date: null,
    customFrom: "",
    customTo: "",
    statuses: [],
    activityTypes: [],
  };
}

export function advancedChipLabels(filters: ActivityFilters): { key: string; label: string }[] {
  return filterChipLabels(filters).filter(
    (chip) => chip.key === "date" || chip.key.startsWith("status:") || chip.key.startsWith("type:")
  );
}

export function filterChipLabels(filters: ActivityFilters): { key: string; label: string }[] {
  const chips: { key: string; label: string }[] = [];
  if (filters.myActivities) chips.push({ key: "myActivities", label: t("filter.myActivities") });
  if (filters.myProjects) chips.push({ key: "myProjects", label: t("filter.myProjects") });
  if (filters.date === "Custom" && (filters.customFrom || filters.customTo)) {
    chips.push({
      key: "date",
      label: t("filter.dates", { from: filters.customFrom || "…", to: filters.customTo || "…" }),
    });
  } else if (filters.date) {
    chips.push({ key: "date", label: localize(filters.date) });
  }
  filters.statuses.forEach((status) => chips.push({ key: `status:${status}`, label: localize(status) }));
  filters.projects.forEach((project) => chips.push({ key: `project:${project}`, label: project }));
  filters.users.forEach((user) => chips.push({ key: `user:${user}`, label: t("filter.user", { name: user }) }));
  filters.activityTypes.forEach((type) => chips.push({ key: `type:${type}`, label: localize(type) }));
  return chips;
}

export function suggestedTabName(filters: ActivityFilters): string {
  const labels = filterChipLabels(filters).map((chip) => chip.label);
  if (labels.length === 0) return t("filter.savedFilter");
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} · ${labels[1]}`;
  return `${labels[0]} +${labels.length - 1}`;
}

export function filtersEqual(a: ActivityFilters, b: ActivityFilters): boolean {
  const normalize = (value: ActivityFilters) =>
    JSON.stringify({
      ...value,
      projects: [...value.projects].sort(),
      users: [...value.users].sort(),
      statuses: [...value.statuses].sort(),
      activityTypes: [...value.activityTypes].sort(),
    });
  return normalize(a) === normalize(b);
}

export function removeFilterChip(filters: ActivityFilters, key: string): ActivityFilters {
  const next = cloneFilters(filters);
  if (key === "myActivities") next.myActivities = false;
  if (key === "myProjects") next.myProjects = false;
  if (key === "date") {
    next.date = null;
    next.customFrom = "";
    next.customTo = "";
  }
  if (key.startsWith("status:")) next.statuses = next.statuses.filter((item) => item !== key.slice(7));
  if (key.startsWith("project:")) next.projects = next.projects.filter((item) => item !== key.slice(8));
  if (key.startsWith("user:")) next.users = next.users.filter((item) => item !== key.slice(5));
  if (key.startsWith("type:")) next.activityTypes = next.activityTypes.filter((item) => item !== key.slice(5));
  return next;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function matchesDate(iso: string, filters: ActivityFilters): boolean {
  if (!filters.date) return true;
  const value = startOfDay(new Date(iso));
  const now = new Date();
  const today = startOfDay(now);
  const day = 24 * 60 * 60 * 1000;

  if (filters.date === "Today") return value === today;
  if (filters.date === "Tomorrow") return value === today + day;
  if (filters.date === "This week" || filters.date === "Last week") {
    const dow = now.getDay();
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    const thisMonday = today + mondayOffset * day;
    if (filters.date === "This week") return value >= thisMonday && value < thisMonday + 7 * day;
    return value >= thisMonday - 7 * day && value < thisMonday;
  }
  if (filters.date === "This month") {
    return new Date(iso).getMonth() === now.getMonth() && new Date(iso).getFullYear() === now.getFullYear();
  }
  if (filters.date === "Last month") {
    const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return new Date(iso).getMonth() === last.getMonth() && new Date(iso).getFullYear() === last.getFullYear();
  }
  if (filters.date === "Next month") {
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return new Date(iso).getMonth() === next.getMonth() && new Date(iso).getFullYear() === next.getFullYear();
  }
  if (filters.date === "Custom") {
    if (filters.customFrom && value < startOfDay(new Date(filters.customFrom))) return false;
    if (filters.customTo && value > startOfDay(new Date(filters.customTo))) return false;
    return true;
  }
  return true;
}

export function activityMatchesFilters(
  activity: { projectName: string; activityType: string; status: string; assignees: string[]; dateTime: string },
  filters: ActivityFilters
): boolean {
  if (filters.myActivities && !activity.assignees.includes("AB")) return false;
  if (filters.myProjects && activity.projectName !== "FoodChain Suppliers") return false;
  if (filters.projects.length > 0 && !filters.projects.includes(activity.projectName)) return false;
  if (filters.users.length > 0 && !filters.users.some((user) => activity.assignees.includes(user))) return false;
  if (filters.statuses.length > 0 && !filters.statuses.includes(activity.status)) return false;
  if (filters.activityTypes.length > 0 && !filters.activityTypes.includes(activity.activityType)) return false;
  return matchesDate(activity.dateTime, filters);
}

function toggleList(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function FieldGroup({
  title,
  count,
  hint,
  collapsible = false,
  children,
}: {
  title: string;
  count: number;
  hint?: string;
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(!collapsible);

  return (
    <section className={styles.group} data-collapsible={collapsible} data-open={open}>
      {collapsible ? (
        <button
          type="button"
          className={styles.groupToggle}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className={styles.groupTitle}>{title}</span>
          {count > 0 ? <span className={styles.sectionCount}>{count}</span> : null}
          <ChevronDown size={16} className={styles.groupChevron} />
        </button>
      ) : (
        <div className={styles.groupHead}>
          <h3 className={styles.groupTitle}>{title}</h3>
          {count > 0 ? <span className={styles.sectionCount}>{count}</span> : null}
        </div>
      )}
      {open ? (
        <>
          {hint ? <p className={styles.groupHint}>{hint}</p> : null}
          {children}
        </>
      ) : null}
    </section>
  );
}

interface FilterActivitiesPopupProps {
  isOpen: boolean;
  value: ActivityFilters;
  matchCount: (filters: ActivityFilters) => number;
  onClose: () => void;
  onApply: (filters: ActivityFilters) => void;
  onSaveTab: (name: string, filters: ActivityFilters) => void;
}

export default function FilterActivitiesPopup({
  isOpen,
  value,
  matchCount,
  onClose,
  onApply,
  onSaveTab,
}: FilterActivitiesPopupProps) {
  const { t, localize } = useI18n();
  const [draft, setDraft] = useState<ActivityFilters>(EMPTY_FILTERS);
  const [savingTab, setSavingTab] = useState(false);
  const [tabName, setTabName] = useState("");
  const tabNameRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setDraft(cloneFilters(value));
    setSavingTab(false);
    setTabName("");
  }, [isOpen, value]);

  useEffect(() => {
    if (!savingTab) return;
    tabNameRef.current?.focus();
    tabNameRef.current?.select();
  }, [savingTab]);

  const selectedCount = countFilters(draft);
  const advancedCount = countAdvancedFilters(draft);
  const results = matchCount(draft);
  const summary = useMemo(() => advancedChipLabels(draft), [draft]);
  const subtitle =
    selectedCount === 0
      ? t("filter.pick")
      : results === 1
        ? t("filter.matchOne")
        : t("filter.matchMany", { count: results });

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title={t("filter.advanced")}
      subtitle={subtitle}
      padded={false}
      bodyClassName={styles.body}
      banner={
        summary.length > 0 ? (
          <div className={styles.summary}>
            {summary.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className={styles.summaryChip}
                onClick={() => setDraft(removeFilterChip(draft, chip.key))}
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
          </div>
        ) : null
      }
      footer={
        <>
          {selectedCount > 0 ? (
            <div className={styles.saveTabRow}>
              {savingTab ? (
                <>
                  <TextInput
                    ref={tabNameRef}
                    className={styles.tabNameInput}
                    value={tabName}
                    placeholder={t("filter.tabName")}
                    onChange={(event) => setTabName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        onSaveTab(tabName.trim() || suggestedTabName(draft), draft);
                      }
                      if (event.key === "Escape") setSavingTab(false);
                    }}
                  />
                  <Button
                    type="button"
                    variant="primary"
                    shape="action"
                    onClick={() => onSaveTab(tabName.trim() || suggestedTabName(draft), draft)}
                  >
                    {t("filter.saveTab")}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => {
                    setTabName(suggestedTabName(draft));
                    setSavingTab(true);
                  }}
                >
                  {t("filter.saveAsTab")}
                </Button>
              )}
            </div>
          ) : null}
          <div className={styles.footerActions}>
            <Button
              type="button"
              variant="tertiary"
              disabled={advancedCount === 0}
              onClick={() => {
                setDraft(clearAdvancedFilters(draft));
                setSavingTab(false);
              }}
            >
              {t("common.clear")}
            </Button>
            <Button type="button" variant="primary" shape="action" onClick={() => onApply(draft)}>
              {results === 1 ? t("filter.showOne") : t("filter.showMany", { count: results })}
            </Button>
          </div>
        </>
      }
    >
          <FieldGroup title={t("filter.when")} count={draft.date ? 1 : 0} hint={t("filter.oneRange")}>
            <div className={styles.chipRow}>
              {DATE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={styles.dateChip}
                  data-on={draft.date === preset}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      date: current.date === preset ? null : preset,
                    }))
                  }
                >
                  {localize(preset)}
                </button>
              ))}
            </div>
            {draft.date === "Custom" ? (
              <div className={styles.customDates}>
                <label>
                  {t("common.from")}
                  <input
                    type="date"
                    value={draft.customFrom}
                    onChange={(event) => setDraft((current) => ({ ...current, customFrom: event.target.value }))}
                  />
                </label>
                <label>
                  {t("common.to")}
                  <input
                    type="date"
                    value={draft.customTo}
                    onChange={(event) => setDraft((current) => ({ ...current, customTo: event.target.value }))}
                  />
                </label>
              </div>
            ) : null}
          </FieldGroup>

          <FieldGroup title={t("table.status")} count={draft.statuses.length} hint={t("filter.statusHint")}>
            <div className={styles.chipRow}>
              {STATUS_OPTIONS.map((status) => (
                <StatusChip
                  key={status}
                  color={filterStatusColor(status)}
                  selected={draft.statuses.includes(status)}
                  onClick={() =>
                    setDraft((current) => ({ ...current, statuses: toggleList(current.statuses, status) }))
                  }
                >
                  {localize(status)}
                </StatusChip>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title={t("filter.activityType")} count={draft.activityTypes.length} collapsible>
            <div className={styles.chipRow}>
              {ACTIVITY_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={styles.optionChip}
                  data-on={draft.activityTypes.includes(type)}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      activityTypes: toggleList(current.activityTypes, type),
                    }))
                  }
                >
                  {localize(type)}
                </button>
              ))}
            </div>
          </FieldGroup>
    </Drawer>
  );
}
