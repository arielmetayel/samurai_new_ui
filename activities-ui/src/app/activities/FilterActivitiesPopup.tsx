"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Search, X } from "react-feather";
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

const STATUS_OPTIONS = [
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

const PROJECT_OPTIONS = [
  "FoodChain Suppliers",
  "Event Masters",
  "Legal Pro Consulting",
  "Ichilov North",
  "Yuvalim Ganim",
  "HaGiborim",
  "Dania Sibus",
];

const USER_OPTIONS = ["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST"];

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

export function filterChipLabels(filters: ActivityFilters): { key: string; label: string }[] {
  const chips: { key: string; label: string }[] = [];
  if (filters.myActivities) chips.push({ key: "myActivities", label: "My activities" });
  if (filters.myProjects) chips.push({ key: "myProjects", label: "My projects" });
  if (filters.date === "Custom" && (filters.customFrom || filters.customTo)) {
    chips.push({
      key: "date",
      label: `Dates ${filters.customFrom || "…"} – ${filters.customTo || "…"}`,
    });
  } else if (filters.date) {
    chips.push({ key: "date", label: filters.date });
  }
  filters.statuses.forEach((status) => chips.push({ key: `status:${status}`, label: status }));
  filters.projects.forEach((project) => chips.push({ key: `project:${project}`, label: project }));
  filters.users.forEach((user) => chips.push({ key: `user:${user}`, label: `User ${user}` }));
  filters.activityTypes.forEach((type) => chips.push({ key: `type:${type}`, label: type }));
  return chips;
}

export function suggestedTabName(filters: ActivityFilters): string {
  const labels = filterChipLabels(filters).map((chip) => chip.label);
  if (labels.length === 0) return "Saved filter";
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

function statusClass(status: string) {
  return `statusChip${status.replace(/\s+/g, "")}`;
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

function SearchableChecks({
  options,
  selected,
  query,
  onQuery,
  onToggle,
  placeholder,
  emptyLabel,
}: {
  options: string[];
  selected: string[];
  query: string;
  onQuery: (value: string) => void;
  onToggle: (value: string) => void;
  placeholder: string;
  emptyLabel: string;
}) {
  const visible = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className={styles.picker}>
      <div className={styles.pickerSearch}>
        <Search size={16} className={styles.pickerSearchIcon} />
        <input
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder={placeholder}
          className={styles.pickerInput}
        />
      </div>
      <div className={styles.optionList}>
        {visible.length === 0 ? (
          <div className={styles.optionEmpty}>{emptyLabel}</div>
        ) : (
          visible.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                className={styles.optionRow}
                data-checked={checked}
                onClick={() => onToggle(option)}
              >
                <span className={styles.optionCheck} data-checked={checked}>
                  {checked ? <Check size={12} /> : null}
                </span>
                {option}
              </button>
            );
          })
        )}
      </div>
    </div>
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
  const [draft, setDraft] = useState<ActivityFilters>(EMPTY_FILTERS);
  const [projectQuery, setProjectQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [savingTab, setSavingTab] = useState(false);
  const [tabName, setTabName] = useState("");
  const tabNameRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setDraft(cloneFilters(value));
    setProjectQuery("");
    setUserQuery("");
    setSavingTab(false);
    setTabName("");
  }, [isOpen, value]);

  useEffect(() => {
    if (!savingTab) return;
    tabNameRef.current?.focus();
    tabNameRef.current?.select();
  }, [savingTab]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const selectedCount = countFilters(draft);
  const results = matchCount(draft);
  const summary = useMemo(() => filterChipLabels(draft), [draft]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <h2 id="filter-title" className={styles.title}>
              Filters
            </h2>
            <p className={styles.subtitle}>
              {selectedCount === 0
                ? "Pick what to show in the list"
                : `${results} ${results === 1 ? "activity matches" : "activities match"}`}
            </p>
          </div>
          <button type="button" className={styles.closeButton} aria-label="Close filters" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {summary.length > 0 ? (
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
        ) : null}

        <div className={styles.body}>
          <FieldGroup title="Scope" count={Number(draft.myActivities) + Number(draft.myProjects)}>
            <div className={styles.quickFilters}>
              <button
                type="button"
                className={styles.quickCard}
                data-on={draft.myActivities}
                onClick={() => setDraft((current) => ({ ...current, myActivities: !current.myActivities }))}
              >
                <span className={styles.optionCheck} data-checked={draft.myActivities}>
                  {draft.myActivities ? <Check size={12} /> : null}
                </span>
                <span>
                  <strong>My activities</strong>
                  <small>Assigned to me</small>
                </span>
              </button>
              <button
                type="button"
                className={styles.quickCard}
                data-on={draft.myProjects}
                onClick={() => setDraft((current) => ({ ...current, myProjects: !current.myProjects }))}
              >
                <span className={styles.optionCheck} data-checked={draft.myProjects}>
                  {draft.myProjects ? <Check size={12} /> : null}
                </span>
                <span>
                  <strong>My projects</strong>
                  <small>Projects I follow</small>
                </span>
              </button>
            </div>
          </FieldGroup>

          <FieldGroup title="Projects" count={draft.projects.length} collapsible>
            <SearchableChecks
              options={PROJECT_OPTIONS}
              selected={draft.projects}
              query={projectQuery}
              onQuery={setProjectQuery}
              onToggle={(project) =>
                setDraft((current) => ({ ...current, projects: toggleList(current.projects, project) }))
              }
              placeholder="Search projects"
              emptyLabel="No projects match"
            />
          </FieldGroup>

          <FieldGroup title="People" count={draft.users.length} collapsible>
            <SearchableChecks
              options={USER_OPTIONS}
              selected={draft.users}
              query={userQuery}
              onQuery={setUserQuery}
              onToggle={(user) => setDraft((current) => ({ ...current, users: toggleList(current.users, user) }))}
              placeholder="Search people"
              emptyLabel="No people match"
            />
          </FieldGroup>

          <FieldGroup title="When" count={draft.date ? 1 : 0} hint="One time range">
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
                  {preset}
                </button>
              ))}
            </div>
            {draft.date === "Custom" ? (
              <div className={styles.customDates}>
                <label>
                  From
                  <input
                    type="date"
                    value={draft.customFrom}
                    onChange={(event) => setDraft((current) => ({ ...current, customFrom: event.target.value }))}
                  />
                </label>
                <label>
                  To
                  <input
                    type="date"
                    value={draft.customTo}
                    onChange={(event) => setDraft((current) => ({ ...current, customTo: event.target.value }))}
                  />
                </label>
              </div>
            ) : null}
          </FieldGroup>

          <FieldGroup title="Status" count={draft.statuses.length} hint="Select one or more">
            <div className={styles.chipRow}>
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`${styles.statusChip} ${styles[statusClass(status) as keyof typeof styles] ?? ""}`}
                  data-on={draft.statuses.includes(status)}
                  onClick={() =>
                    setDraft((current) => ({ ...current, statuses: toggleList(current.statuses, status) }))
                  }
                >
                  {status}
                </button>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Activity type" count={draft.activityTypes.length} collapsible>
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
                  {type}
                </button>
              ))}
            </div>
          </FieldGroup>
        </div>

        <div className={styles.footer}>
          {selectedCount > 0 ? (
            <div className={styles.saveTabRow}>
              {savingTab ? (
                <>
                  <input
                    ref={tabNameRef}
                    className={styles.tabNameInput}
                    value={tabName}
                    placeholder="Tab name"
                    onChange={(event) => setTabName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        onSaveTab(tabName.trim() || suggestedTabName(draft), draft);
                      }
                      if (event.key === "Escape") setSavingTab(false);
                    }}
                  />
                  <button
                    type="button"
                    className={styles.saveTabConfirm}
                    onClick={() => onSaveTab(tabName.trim() || suggestedTabName(draft), draft)}
                  >
                    Save tab
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className={styles.saveTabButton}
                  onClick={() => {
                    setTabName(suggestedTabName(draft));
                    setSavingTab(true);
                  }}
                >
                  Save as tab
                </button>
              )}
            </div>
          ) : null}
          <div className={styles.footerActions}>
            <button
              type="button"
              className={styles.clearButton}
              disabled={selectedCount === 0}
              onClick={() => {
                setDraft(cloneFilters(EMPTY_FILTERS));
                setSavingTab(false);
              }}
            >
              Clear
            </button>
            <button type="button" className={styles.applyButton} onClick={() => onApply(draft)}>
              Show {results} {results === 1 ? "activity" : "activities"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
