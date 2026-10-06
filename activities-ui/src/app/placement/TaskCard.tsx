"use client";

import { Briefcase, Plus, Tool, Truck, User } from "react-feather";
import { employees } from "./data";
import { Task, TaskIcon, ViewMode } from "./types";
import AssignPopover from "./AssignPopover";
import styles from "./placement.module.css";

const ICON_COLORS: Record<TaskIcon, string> = {
  mixer: "#EA580C",
  wrench: "#2563EB",
  person: "#7C3AED",
  briefcase: "#475569",
};

type TaskCardProps = {
  task: Task;
  viewMode: ViewMode;
  hoveredEmployeeId: string | null;
  isPopoverOpen: boolean;
  onTogglePopover: () => void;
  onAssign: (employeeId: string) => void;
  onUnassign: (employeeId: string) => void;
};

export default function TaskCard({
  task,
  viewMode,
  hoveredEmployeeId,
  isPopoverOpen,
  onTogglePopover,
  onAssign,
  onUnassign,
}: TaskCardProps) {
  const fullyAssigned = task.assignedIds.length >= task.required;
  const compatible =
    hoveredEmployeeId !== null && task.compatibleIds.includes(hoveredEmployeeId);
  const dimmed = hoveredEmployeeId !== null && !compatible;
  const candidates = employees.filter(
    (e) => task.compatibleIds.includes(e.id) && !task.assignedIds.includes(e.id)
  );

  return (
    <article
      className={[
        styles.taskCard,
        viewMode === "mini" ? styles.taskMini : "",
        fullyAssigned ? styles.taskFullAssigned : "",
        dimmed ? styles.taskDimmed : "",
        compatible ? styles.taskHighlight : "",
      ].join(" ")}
    >
      <div className={styles.taskTop}>
        <TaskIconView icon={task.icon} />
        <div className={styles.taskTitle}>
          {task.title}
          {viewMode === "full" ? `  (${task.assignedIds.length}/${task.required})` : ""}
        </div>
      </div>
      <div className={styles.taskBottom}>
        <span className={styles.taskTime}>{task.time}</span>
        <div className={styles.assignees}>
          {task.assignedIds.map((id) => {
            const emp = employees.find((e) => e.id === id);
            if (!emp) return null;
            return (
              <button
                key={id}
                type="button"
                className={styles.assigneeBtn}
                style={{ background: emp.color }}
                aria-label={`הסר את ${emp.name}`}
                onClick={() => onUnassign(id)}
              >
                {emp.initials}
              </button>
            );
          })}
          <button
            type="button"
            className={styles.addBtn}
            aria-label="הוסף עובד למשימה"
            data-assign-trigger="true"
            onClick={onTogglePopover}
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
      {isPopoverOpen && (
        <AssignPopover candidates={candidates} onAssign={onAssign} />
      )}
    </article>
  );
}

function TaskIconView({ icon }: { icon: TaskIcon }) {
  const color = ICON_COLORS[icon];
  const props = { size: 18, color };
  if (icon === "mixer") return <Truck {...props} />;
  if (icon === "wrench") return <Tool {...props} />;
  if (icon === "person") return <User {...props} />;
  return <Briefcase {...props} />;
}
