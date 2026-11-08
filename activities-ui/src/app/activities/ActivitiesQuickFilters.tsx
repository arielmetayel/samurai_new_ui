"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-feather";
import { Checkbox, TextInput } from "@/design-system";
import { useI18n } from "@/i18n";
import {
  ActivityFilters,
  PROJECT_OPTIONS,
  USER_OPTIONS,
} from "./FilterActivitiesPopup";
import styles from "./ActivitiesQuickFilters.module.css";

/** Prototype session: current user is a project manager so "my projects" is shown. */
const CURRENT_USER_IS_PROJECT_MANAGER = true;

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function MultiPicker({
  label,
  options,
  selected,
  onChange,
  placeholder,
  emptyLabel,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
  emptyLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const visible = options.filter((option) =>
    option.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className={styles.picker} ref={ref}>
      <button
        type="button"
        className={`${styles.pickerButton} ${selected.length ? styles.pickerButtonOn : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>
          {label}
          {selected.length ? ` (${selected.length})` : ""}
        </span>
        <ChevronDown size={16} />
      </button>
      {open ? (
        <div className={styles.menu}>
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className={styles.menuSearch}
          />
          <div className={styles.optionList}>
            {visible.length === 0 ? (
              <div className={styles.empty}>{emptyLabel}</div>
            ) : (
              visible.map((option) => {
                const checked = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    className={styles.option}
                    data-checked={checked}
                    onClick={() => onChange(toggle(selected, option))}
                  >
                    <Checkbox size="sm" checked={checked} />
                    {option}
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ActivitiesQuickFilters({
  filters,
  onChange,
}: {
  filters: ActivityFilters;
  onChange: (next: ActivityFilters) => void;
}) {
  const { t } = useI18n();

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.check}
        data-on={filters.myActivities}
        onClick={() => onChange({ ...filters, myActivities: !filters.myActivities })}
      >
        <Checkbox size="sm" checked={filters.myActivities} />
        {t("filter.myActivities")}
      </button>
      {CURRENT_USER_IS_PROJECT_MANAGER ? (
        <button
          type="button"
          className={styles.check}
          data-on={filters.myProjects}
          onClick={() => onChange({ ...filters, myProjects: !filters.myProjects })}
        >
          <Checkbox size="sm" checked={filters.myProjects} />
          {t("filter.myProjects")}
        </button>
      ) : null}
      <MultiPicker
        label={t("filter.projects")}
        options={PROJECT_OPTIONS}
        selected={filters.projects}
        onChange={(projects) => onChange({ ...filters, projects })}
        placeholder={t("filter.searchProjects")}
        emptyLabel={t("filter.noProjects")}
      />
      <MultiPicker
        label={t("nav.users")}
        options={USER_OPTIONS}
        selected={filters.users}
        onChange={(users) => onChange({ ...filters, users })}
        placeholder={t("filter.searchPeople")}
        emptyLabel={t("filter.noPeople")}
      />
    </div>
  );
}
