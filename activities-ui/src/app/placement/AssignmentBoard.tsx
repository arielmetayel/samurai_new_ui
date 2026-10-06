"use client";

import { Filter, Share2 } from "react-feather";
import { Button, Checkbox } from "@/design-system";
import { BoardDayKey, DayBoard, ViewMode } from "./types";
import PeriodColumn from "./PeriodColumn";
import styles from "./placement.module.css";

type AssignmentBoardProps = {
  day: DayBoard;
  selectedDay: BoardDayKey;
  hideAssigned: boolean;
  viewMode: ViewMode;
  hoveredEmployeeId: string | null;
  openTaskId: string | null;
  onSelectDay: (day: BoardDayKey) => void;
  onHideAssignedChange: (value: boolean) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onTogglePopover: (taskId: string) => void;
  onAssign: (taskId: string, employeeId: string) => void;
  onUnassign: (taskId: string, employeeId: string) => void;
};

export default function AssignmentBoard({
  day,
  selectedDay,
  hideAssigned,
  viewMode,
  hoveredEmployeeId,
  openTaskId,
  onSelectDay,
  onHideAssignedChange,
  onViewModeChange,
  onTogglePopover,
  onAssign,
  onUnassign,
}: AssignmentBoardProps) {
  const tasks = hideAssigned
    ? day.tasks.filter((t) => t.assignedIds.length < t.required)
    : day.tasks;

  return (
    <section className={styles.board}>
      <div className={styles.toolbar}>
        <label
          className={styles.hideAssigned}
          onClick={() => onHideAssignedChange(!hideAssigned)}
        >
          <Checkbox size="sm" checked={hideAssigned} />
          הסתר משוייכים במלואם
        </label>
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
          </div>
          <div className={styles.daySubtitle}>
            <span>{day.label.split(",")[0]}</span>
            {", "}
            <span dir="ltr">{day.label.split(",")[1]?.trim()}</span>
          </div>
        </div>
        <div className={styles.toolbarEnd}>
          <div className={styles.segmented} role="group" aria-label="מצב תצוגה">
            <button
              type="button"
              data-active={viewMode === "full"}
              onClick={() => onViewModeChange("full")}
            >
              מלא
            </button>
            <button
              type="button"
              data-active={viewMode === "mini"}
              onClick={() => onViewModeChange("mini")}
            >
              מיני
            </button>
          </div>
          <Button
            type="button"
            variant="tertiary"
            icon={Filter}
            iconSize={18}
            aria-label="סינון פעילויות"
          />
        </div>
      </div>

      <div className={styles.columns}>
        <PeriodColumn
          tasks={tasks}
          viewMode={viewMode}
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
