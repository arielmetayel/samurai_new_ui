"use client";

import { Filter, Share2 } from "react-feather";
import { Button, Checkbox } from "@/design-system";
import { BoardDayKey, DayBoard } from "./types";
import PeriodColumn from "./PeriodColumn";
import {
  countPlacementFilters,
  PlacementFilters,
  taskMatchesPlacementFilters,
} from "./FilterPlacementPopup";
import styles from "./placement.module.css";

type AssignmentBoardProps = {
  day: DayBoard;
  selectedDay: BoardDayKey;
  hideAssigned: boolean;
  hoveredEmployeeId: string | null;
  openTaskId: string | null;
  onSelectDay: (day: BoardDayKey) => void;
  onHideAssignedChange: (value: boolean) => void;
  onTogglePopover: (taskId: string) => void;
  onAssign: (taskId: string, employeeId: string) => void;
  onUnassign: (taskId: string, employeeId: string) => void;
  filters: PlacementFilters;
  onOpenFilters: () => void;
};

export default function AssignmentBoard({
  day,
  selectedDay,
  hideAssigned,
  hoveredEmployeeId,
  openTaskId,
  onSelectDay,
  onHideAssignedChange,
  onTogglePopover,
  onAssign,
  onUnassign,
  filters,
  onOpenFilters,
}: AssignmentBoardProps) {
  const activeFilterCount = countPlacementFilters(filters);
  const tasks = day.tasks.filter((task) => {
    if (hideAssigned && task.assignedIds.length >= task.required) return false;
    return taskMatchesPlacementFilters(task, filters);
  });

  return (
    <section className={styles.board}>
      <div className={styles.toolbar}>
        <div className={styles.dayTabs}>
          <div className={styles.segmented} role="group" aria-label="בחירת יום">
            <button
              type="button"
              data-active={selectedDay === "today"}
              onClick={() => onSelectDay("today")}
            >
              היום
            </button>
            <button
              type="button"
              data-active={selectedDay === "tomorrow"}
              onClick={() => onSelectDay("tomorrow")}
            >
              מחר
            </button>
            <button
              type="button"
              data-active={selectedDay === "lastWeek"}
              onClick={() => onSelectDay("lastWeek")}
            >
              השבוע שהיה
            </button>
          </div>
          <div className={styles.daySubtitle}>
            {day.label.includes(",") ? (
              <>
                <span>{day.label.split(",")[0]}</span>
                {", "}
                <span dir="ltr">{day.label.split(",")[1]?.trim()}</span>
              </>
            ) : (
              <span dir="ltr">{day.label}</span>
            )}
          </div>
        </div>
        <label
          className={styles.hideAssigned}
          onClick={() => onHideAssignedChange(!hideAssigned)}
        >
          <Checkbox size="sm" checked={hideAssigned} />
          הסתר משוייכים במלואם
        </label>
        <div className={styles.toolbarEnd}>
          <div className={styles.filterBtnWrap}>
            <Button
              type="button"
              variant="tertiary"
              icon={Filter}
              iconSize={18}
              aria-label="סינון פעילויות"
              onClick={onOpenFilters}
            />
            {activeFilterCount > 0 ? (
              <span className={styles.filterBadge}>{activeFilterCount}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={`${styles.columns} ${
          selectedDay === "lastWeek" ? styles.columnsWeek : ""
        }`}
      >
        <PeriodColumn
          layout={selectedDay === "lastWeek" ? "weekday" : "period"}
          tasks={tasks}
          hoveredEmployeeId={hoveredEmployeeId}
          openTaskId={openTaskId}
          onTogglePopover={onTogglePopover}
          onAssign={onAssign}
          onUnassign={onUnassign}
        />
      </div>

      <footer className={styles.footer}>
        <Button
          type="button"
          variant="tertiary"
          icon={Share2}
          onClick={() => {
            /* TODO: wire to share logic when available */
          }}
        >
          שיתוף
        </Button>
        <Button
          type="button"
          variant="tertiary"
          className={styles.dangerBtn}
          onClick={() => {
            /* TODO: wire to clear assignments when available */
          }}
        >
          מחיקת שיבוצים
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className={styles.saveAllBtn}
          onClick={() => {
            /* TODO: wire to save logic when available */
          }}
        >
          שמור הכל
        </Button>
      </footer>
    </section>
  );
}
