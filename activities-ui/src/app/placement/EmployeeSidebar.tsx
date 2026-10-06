"use client";

import { Search } from "react-feather";
import { Button } from "@/design-system";
import { employees as allEmployees } from "./data";
import { DayKey, FilterType } from "./types";
import EmployeeRow from "./EmployeeRow";
import styles from "./placement.module.css";

type EmployeeSidebarProps = {
  weekday: DayKey;
  search: string;
  filterType: FilterType;
  sortByLoad: boolean;
  taskCounts: Record<string, number>;
  onSearchChange: (value: string) => void;
  onFilterTypeChange: (value: FilterType) => void;
  onToggleSort: () => void;
  onHoverEmployee: (id: string | null) => void;
};

export default function EmployeeSidebar({
  weekday,
  search,
  filterType,
  sortByLoad,
  taskCounts,
  onSearchChange,
  onFilterTypeChange,
  onToggleSort,
  onHoverEmployee,
}: EmployeeSidebarProps) {
  const filtered = allEmployees
    .filter((e) => e.name.includes(search.trim()))
    .filter((e) => (filterType === "all" ? true : e.type === filterType))
    .slice()
    .sort((a, b) => (sortByLoad ? (taskCounts[a.id] ?? 0) - (taskCounts[b.id] ?? 0) : 0));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.searchWrap}>
          <Search size={16} />
          <input
            className={styles.searchInput}
            placeholder="חיפוש עובד..."
            aria-label="חיפוש עובד"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className={styles.chips}>
          <button
            type="button"
            className={`${styles.chip} ${styles.chipAll}`}
            data-active={filterType === "all"}
            onClick={() => onFilterTypeChange("all")}
          >
            הכל
          </button>
          <button
            type="button"
            className={`${styles.chip} ${styles.chipHourly}`}
            data-active={filterType === "hourly"}
            onClick={() => onFilterTypeChange("hourly")}
          >
            שעתיים
          </button>
          <button
            type="button"
            className={`${styles.chip} ${styles.chipGlobal}`}
            data-active={filterType === "global"}
            onClick={() => onFilterTypeChange("global")}
          >
            גלובליים
          </button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles.sortBtn}
          onClick={onToggleSort}
        >
          {sortByLoad ? "ממוין לפי עומס ▾" : "מיין לפי עומס"}
        </Button>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: "#f59e0b" }} />
            שעתי
          </span>
          <span className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: "#0082C8" }} />
            גלובלי
          </span>
          <span className={styles.legendItem}>
            <span className={styles.swatchRing} />
            זמין למשימה
          </span>
        </div>
      </div>
      <div className={styles.employeeList}>
        {filtered.map((employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            weekday={weekday}
            taskCount={taskCounts[employee.id] ?? 0}
            onHover={onHoverEmployee}
          />
        ))}
      </div>
    </aside>
  );
}
