"use client";

import { WEEKDAYS, isEmployeeAvailable } from "./data";
import { DayKey, Employee, EmployeeType } from "./types";
import styles from "./placement.module.css";

type EmployeeRowProps = {
  employee: Employee;
  weekday: DayKey;
  taskCount: number;
  onHover: (id: string | null) => void;
};

export default function EmployeeRow({
  employee,
  weekday,
  taskCount,
  onHover,
}: EmployeeRowProps) {
  return (
    <button
      type="button"
      className={styles.employeeRow}
      onMouseEnter={() => onHover(employee.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(employee.id)}
      onBlur={() => onHover(null)}
    >
      <div className={styles.empAvatar} style={{ background: employee.color }}>
        {employee.initials}
      </div>
      <div className={styles.empMain}>
        <div className={styles.empTop}>
          <span className={styles.empName}>{employee.name}</span>
          <span
            className={`${styles.typeTag} ${
              employee.type === "hourly" ? styles.typeHourly : styles.typeGlobal
            }`}
          >
            {employee.type === "hourly" ? "שעתי" : "גלובלי"}
          </span>
        </div>
        <div className={styles.days}>
          {WEEKDAYS.map((day) => {
            const available = isEmployeeAvailable(employee, day.key);
            const selected = day.key === weekday;
            return (
              <span
                key={day.key}
                title={available ? "זמין" : "לא זמין"}
                className={`${styles.dayBox} ${dayClass(employee.type, available)} ${
                  selected ? styles.daySelected : ""
                }`}
              >
                {day.letter}
              </span>
            );
          })}
        </div>
      </div>
      <div className={styles.empLoad}>
        <div className={styles.empLoadNumber}>{taskCount}</div>
        <div className={styles.empLoadCaption}>משימות</div>
      </div>
    </button>
  );
}

function dayClass(type: EmployeeType, available: boolean) {
  if (!available) return styles.dayUnavailable;
  return type === "hourly" ? styles.dayAvailableHourly : styles.dayAvailableGlobal;
}
