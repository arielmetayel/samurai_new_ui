"use client";

import { Cloud, Moon, Sun } from "react-feather";
import { Period, Task, ViewMode } from "./types";
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
  tasks: Task[];
  viewMode: ViewMode;
  hoveredEmployeeId: string | null;
  openTaskId: string | null;
  onTogglePopover: (taskId: string) => void;
  onAssign: (taskId: string, employeeId: string) => void;
  onUnassign: (taskId: string, employeeId: string) => void;
};

export default function PeriodColumn(props: PeriodColumnProps) {
  return (
    <>
      {PERIODS.map((period) => {
        const tasks = props.tasks.filter((t) => t.period === period.key);
        return (
          <section key={period.key} className={styles.period}>
            <div className={styles.periodHeader}>
              <span className={styles.periodIcon}>
                {period.icon === "sun" && <Sun size={18} />}
                {period.icon === "cloud" && (
                  <span className={styles.cloudSun}>
                    <Sun size={11} />
                    <Cloud size={16} />
                  </span>
                )}
                {period.icon === "moon" && <Moon size={18} />}
              </span>
              <span className={styles.periodLabel}>{period.label}</span>
              <span className={styles.periodRange} dir="ltr">
                {period.range}
              </span>
              <span className={styles.periodCount}>{tasks.length}</span>
            </div>
            <div className={styles.taskList}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  viewMode={props.viewMode}
                  hoveredEmployeeId={props.hoveredEmployeeId}
                  isPopoverOpen={props.openTaskId === task.id}
                  onTogglePopover={() => props.onTogglePopover(task.id)}
                  onAssign={(employeeId) => props.onAssign(task.id, employeeId)}
                  onUnassign={(employeeId) => props.onUnassign(task.id, employeeId)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
