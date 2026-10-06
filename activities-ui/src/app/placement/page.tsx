"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/design-system";
import CreateNewPopup from "../activities/CreateNewPopup";
import { createInitialDays, employees } from "./data";
import { BoardDayKey, DayBoard, FilterType, ViewMode } from "./types";
import TopBar from "./TopBar";
import EmployeeSidebar from "./EmployeeSidebar";
import AssignmentBoard from "./AssignmentBoard";
import styles from "./placement.module.css";

const menuItems: { label: string; href?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Projects", href: "/projects" },
  { label: "Users", href: "/users" },
  { label: "Data Analysis", href: "/data-analysis" },
  { label: "Files" },
  { label: "Apps" },
  { label: "Placement", href: "/placement" },
  { label: "Blueprint" },
  { label: "Skills" },
  { label: "Automations" },
];

export default function PlacementPage() {
  const [selectedDay, setSelectedDay] = useState<BoardDayKey>("today");
  const [hoveredEmployeeId, setHoveredEmployeeId] = useState<string | null>(null);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortByLoad, setSortByLoad] = useState(false);
  const [hideAssigned, setHideAssigned] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("mini");
  const [search, setSearch] = useState("");
  const [days, setDays] = useState<DayBoard[]>(() => createInitialDays());
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const currentDay = days.find((d) => d.key === selectedDay) ?? days[0];

  const taskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const emp of employees) counts[emp.id] = 0;
    for (const day of days) {
      for (const task of day.tasks) {
        for (const id of task.assignedIds) {
          counts[id] = (counts[id] ?? 0) + 1;
        }
      }
    }
    return counts;
  }, [days]);

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

      <aside className={styles.appSidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
          <div className={styles.appUserName}>User Full Name</div>
        </div>
        <nav className={styles.menu}>
          {menuItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Placement" ? styles.menuItemActive : styles.menuItem}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className={styles.menuItem}>
                {item.label}
              </div>
            )
          )}
        </nav>
        <div className={styles.createWrap}>
          <Button
            variant="primary"
            size="md"
            className={styles.createBtn}
            onClick={() => setIsCreatePopupOpen(true)}
          >
            + Create New
          </Button>
        </div>
      </aside>

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
              viewMode={viewMode}
              hoveredEmployeeId={hoveredEmployeeId}
              openTaskId={openTaskId}
              onSelectDay={selectDay}
              onHideAssignedChange={setHideAssigned}
              onViewModeChange={setViewMode}
              onTogglePopover={(taskId) =>
                setOpenTaskId((prev) => (prev === taskId ? null : taskId))
              }
              onAssign={handleAssign}
              onUnassign={handleUnassign}
            />
          </div>
        </div>
      </main>

      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />
    </div>
  );
}
