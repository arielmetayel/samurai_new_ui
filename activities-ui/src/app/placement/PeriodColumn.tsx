"use client";

import { Cloud, Moon, Sun } from "react-feather";
import { LAST_WEEK_COLUMNS } from "./data";
import { Period, Task } from "./types";
import TaskCard from "./TaskCard";
import styles from "./placement.module.css";

const PERIODS: {
  key: Period;
  label: string;
  range: string;
  icon: "sun" | "cloud" | "moon";
}[] = [
  { key: "morning", label: "בוקר", range: "06:00–12:00", icon: "sun" },
  { key: "afternoon", label: "צהריים", range: "12:00–17:00", icon: "cloud" },
  { key: "evening", label: "ערב", range: "17:00–22:00", icon: "moon" },
];

type PeriodColumnProps = {
  layout?: "period" | "weekday";
  tasks: Task[];
  hoveredEmployeeId: string | null;
  openTaskId: string | null;
  onTogglePopover: (taskId: string) => void;
  onAssign: (taskId: string, employeeId: string) => void;
  onUnassign: (taskId: string, employeeId: string) => void;
};

export default function PeriodColumn(props: PeriodColumnProps) {
  const columns =
    props.layout === "weekday"
      ? LAST_WEEK_COLUMNS.map((col) => ({
          key: col.key,
          label: col.label,
          range: col.date,
          letter: col.letter,
          icon: undefined as "sun" | "cloud" | "moon" | undefined,
          tasks: props.tasks.filter((t) => t.weekday === col.key),
        }))
      : PERIODS.map((period) => ({
          key: period.key,
          label: period.label,
          range: period.range,
          letter: undefined as string | undefined,
          icon: period.icon,
          tasks: props.tasks.filter((t) => t.period === period.key),
        }));

  return (
    <>
      {columns.map((column) => (
        <section key={column.key} className={styles.period}>
          <div className={styles.periodHeader}>
            {column.letter ? (
              <span className={styles.periodLetter}>{column.letter}</span>
            ) : (
              <span className={styles.periodIcon}>
                {column.icon === "sun" && <Sun size={18} />}
                {column.icon === "cloud" && (
                  <span className={styles.cloudSun}>
                    <Sun size={11} />
                    <Cloud size={16} />
                  </span>
                )}
                {column.icon === "moon" && <Moon size={18} />}
              </span>
            )}
            <span className={styles.periodLabel}>{column.label}</span>
            <span className={styles.periodRange} dir="ltr">
              {column.range}
            </span>
            <span className={styles.periodCount}>{column.tasks.length}</span>
          </div>
          <div className={styles.taskList}>
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                hoveredEmployeeId={props.hoveredEmployeeId}
                isPopoverOpen={props.openTaskId === task.id}
                onTogglePopover={() => props.onTogglePopover(task.id)}
                onAssign={(employeeId) => props.onAssign(task.id, employeeId)}
                onUnassign={(employeeId) =>
                  props.onUnassign(task.id, employeeId)
                }
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
