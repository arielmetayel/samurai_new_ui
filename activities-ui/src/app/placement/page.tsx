"use client";

import { useEffect, useMemo, useState } from "react";
import CreateNewPopup from "../activities/CreateNewPopup";
import { createInitialDays, employees } from "./data";
import { BoardDayKey, DayBoard, FilterType } from "./types";
import TopBar from "./TopBar";
import EmployeeSidebar from "./EmployeeSidebar";
import AssignmentBoard from "./AssignmentBoard";
import FilterPlacementPopup, {
  EMPTY_PLACEMENT_FILTERS,
  PlacementFilters,
  taskMatchesPlacementFilters,
} from "./FilterPlacementPopup";
import styles from "./placement.module.css";
import AppSidebar from "../AppSidebar";

export default function PlacementPage() {
  const [selectedDay, setSelectedDay] = useState<BoardDayKey>("today");
  const [hoveredEmployeeId, setHoveredEmployeeId] = useState<string | null>(null);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortByLoad, setSortByLoad] = useState(false);
  const [hideAssigned, setHideAssigned] = useState(false);
  const [filters, setFilters] = useState<PlacementFilters>(EMPTY_PLACEMENT_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [days, setDays] = useState<DayBoard[]>(() => createInitialDays());
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const currentDay = days.find((d) => d.key === selectedDay) ?? days[0];

  const taskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const emp of employees) counts[emp.id] = 0;
    for (const task of currentDay.tasks) {
      for (const id of task.assignedIds) {
        counts[id] = (counts[id] ?? 0) + 1;
      }
    }
    return counts;
  }, [currentDay]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenTaskId(null);
    }
    function onMouseDown(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("[data-assign-trigger]") || target.closest('[role="dialog"]')) {
        return;
      }
      setOpenTaskId(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  function selectDay(day: BoardDayKey) {
    setSelectedDay(day);
    setOpenTaskId(null);
  }

  function updateTask(
    taskId: string,
    updater: (assignedIds: string[]) => string[]
  ) {
    setDays((prev) =>
      prev.map((day) =>
        day.key !== selectedDay
          ? day
          : {
              ...day,
              tasks: day.tasks.map((task) =>
                task.id !== taskId
                  ? task
                  : { ...task, assignedIds: updater(task.assignedIds) }
              ),
            }
      )
    );
  }

  function handleAssign(taskId: string, employeeId: string) {
    updateTask(taskId, (ids) =>
      ids.includes(employeeId) ? ids : [...ids, employeeId]
    );
    setOpenTaskId(null);
  }

  function handleUnassign(taskId: string, employeeId: string) {
    updateTask(taskId, (ids) => ids.filter((id) => id !== employeeId));
  }

  return (
    <div className={styles.pageWrapper}>
      <TopBar />

      <AppSidebar onCreateNew={() => setIsCreatePopupOpen(true)} />

      <main className={styles.main}>
        <div className={styles.boardShell} dir="rtl" lang="he">
          <div className={styles.body}>
            <EmployeeSidebar
              weekday={currentDay.weekday}
              search={search}
              filterType={filterType}
              sortByLoad={sortByLoad}
              taskCounts={taskCounts}
              onSearchChange={setSearch}
              onFilterTypeChange={setFilterType}
              onToggleSort={() => setSortByLoad((v) => !v)}
              onHoverEmployee={setHoveredEmployeeId}
            />
            <AssignmentBoard
              day={currentDay}
              selectedDay={selectedDay}
              hideAssigned={hideAssigned}
              hoveredEmployeeId={hoveredEmployeeId}
              openTaskId={openTaskId}
              onSelectDay={selectDay}
              onHideAssignedChange={setHideAssigned}
              onTogglePopover={(taskId) =>
                setOpenTaskId((prev) => (prev === taskId ? null : taskId))
              }
              onAssign={handleAssign}
              onUnassign={handleUnassign}
              filters={filters}
              onOpenFilters={() => {
                setOpenTaskId(null);
                setIsFilterOpen(true);
              }}
            />
          </div>
        </div>
      </main>

      <FilterPlacementPopup
        isOpen={isFilterOpen}
        value={filters}
        matchCount={(draft) =>
          currentDay.tasks.filter((task) => {
            if (hideAssigned && task.assignedIds.length >= task.required) return false;
            return taskMatchesPlacementFilters(task, draft);
          }).length
        }
        onClose={() => setIsFilterOpen(false)}
        onApply={(next) => {
          setFilters(next);
          setIsFilterOpen(false);
        }}
      />
      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />
    </div>
  );
}
