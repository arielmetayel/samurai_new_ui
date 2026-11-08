"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "react-feather";
import { Button, Drawer, StatusChip, filterStatusColor } from "@/design-system";
import { useI18n } from "@/i18n";
import { PlacementActivityType, Task } from "./types";
import styles from "./FilterPlacementPopup.module.css";

export type PlacementFilters = {
  statuses: string[];
  activityTypes: PlacementActivityType[];
};

export const EMPTY_PLACEMENT_FILTERS: PlacementFilters = {
  statuses: [],
  activityTypes: [],
};

export const PLACEMENT_STATUS_OPTIONS = [
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
] as const;

export const PLACEMENT_TYPE_OPTIONS: PlacementActivityType[] = [
  "Maintenance",
  "Installation",
  "Site Visit",
  "Office Hours",
  "Concrete Delivery",
];

export function clonePlacementFilters(value: PlacementFilters): PlacementFilters {
  return {
    statuses: [...value.statuses],
    activityTypes: [...value.activityTypes],
  };
}

export function countPlacementFilters(filters: PlacementFilters): number {
  return filters.statuses.length + filters.activityTypes.length;
}

export function taskMatchesPlacementFilters(task: Task, filters: PlacementFilters): boolean {
  if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) return false;
  if (filters.activityTypes.length > 0 && !filters.activityTypes.includes(task.activityType)) {
    return false;
  }
  return true;
}

function toggleList<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

type FilterPlacementPopupProps = {
  isOpen: boolean;
  value: PlacementFilters;
  matchCount: (filters: PlacementFilters) => number;
  onClose: () => void;
  onApply: (filters: PlacementFilters) => void;
};

export default function FilterPlacementPopup({
  isOpen,
  value,
  matchCount,
  onClose,
  onApply,
}: FilterPlacementPopupProps) {
  const { t, localize } = useI18n();
  const [draft, setDraft] = useState<PlacementFilters>(EMPTY_PLACEMENT_FILTERS);

  useEffect(() => {
    if (!isOpen) return;
    setDraft(clonePlacementFilters(value));
  }, [isOpen, value]);

  const selectedCount = countPlacementFilters(draft);
  const results = matchCount(draft);
  const summary = useMemo(
    () => [
      ...draft.statuses.map((status) => ({ key: `status:${status}`, label: localize(status) })),
      ...draft.activityTypes.map((type) => ({ key: `type:${type}`, label: localize(type) })),
    ],
    [draft, localize]
  );

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
      title={t("filter.title")}
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
                onClick={() =>
                  setDraft((current) =>
                    chip.key.startsWith("status:")
                      ? {
                          ...current,
                          statuses: current.statuses.filter(
                            (item) => item !== chip.key.slice("status:".length)
                          ),
                        }
                      : {
                          ...current,
                          activityTypes: current.activityTypes.filter(
                            (item) => item !== chip.key.slice("type:".length)
                          ),
                        }
                  )
                }
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
          </div>
        ) : null
      }
      footer={
        <div className={styles.footerActions}>
          <Button
            type="button"
            variant="tertiary"
            disabled={selectedCount === 0}
            onClick={() => setDraft(clonePlacementFilters(EMPTY_PLACEMENT_FILTERS))}
          >
            {t("common.clear")}
          </Button>
          <Button type="button" variant="primary" shape="action" onClick={() => onApply(draft)}>
            {results === 1 ? t("filter.showOne") : t("filter.showMany", { count: results })}
          </Button>
        </div>
      }
    >
      <section className={styles.group}>
        <div className={styles.groupHead}>
          <h3 className={styles.groupTitle}>{t("filter.activityStatus")}</h3>
          {draft.statuses.length > 0 ? (
            <span className={styles.sectionCount}>{draft.statuses.length}</span>
          ) : null}
        </div>
        <p className={styles.groupHint}>{t("filter.statusHint")}</p>
        <div className={styles.chipRow}>
          {PLACEMENT_STATUS_OPTIONS.map((status) => (
            <StatusChip
              key={status}
              color={filterStatusColor(status)}
              selected={draft.statuses.includes(status)}
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  statuses: toggleList(current.statuses, status),
                }))
              }
            >
              {localize(status)}
            </StatusChip>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <div className={styles.groupHead}>
          <h3 className={styles.groupTitle}>{t("filter.activityType")}</h3>
          {draft.activityTypes.length > 0 ? (
            <span className={styles.sectionCount}>{draft.activityTypes.length}</span>
          ) : null}
        </div>
        <p className={styles.groupHint}>{t("filter.statusHint")}</p>
        <div className={styles.chipRow}>
          {PLACEMENT_TYPE_OPTIONS.map((type) => (
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
      </section>
    </Drawer>
  );
}
