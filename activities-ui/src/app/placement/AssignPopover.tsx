"use client";

import { employees } from "./data";
import { Employee } from "./types";
import styles from "./placement.module.css";

type AssignPopoverProps = {
  candidates: Employee[];
  onAssign: (employeeId: string) => void;
};

export default function AssignPopover({ candidates, onAssign }: AssignPopoverProps) {
  return (
    <div className={styles.popover} role="dialog" aria-label="עובדים זמינים">
      <div className={styles.popoverTitle}>עובדים זמינים</div>
      {candidates.length === 0 ? (
        <div className={styles.popoverEmpty}>אין עובדים זמינים תואמים</div>
      ) : (
        candidates.map((employee) => (
          <button
            key={employee.id}
            type="button"
            className={styles.popoverItem}
            onClick={() => onAssign(employee.id)}
          >
            <span className={styles.empAvatar} style={{ background: employee.color, width: 28, height: 28, fontSize: 11 }}>
              {employee.initials}
            </span>
            <span className={styles.empName}>{employee.name}</span>
            <span
              className={`${styles.typeTag} ${
                employee.type === "hourly" ? styles.typeHourly : styles.typeGlobal
              }`}
            >
              {employee.type === "hourly" ? "שעתי" : "גלובלי"}
            </span>
          </button>
        ))
      )}
    </div>
  );
}

export function getEmployee(id: string) {
  return employees.find((e) => e.id === id);
}
