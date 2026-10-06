export type DayKey = "sun" | "mon" | "tue" | "wed" | "thu";
export type EmployeeType = "hourly" | "global";
export type Period = "morning" | "afternoon" | "evening";
export type TaskIcon = "mixer" | "wrench" | "person" | "briefcase";
export type BoardDayKey = "today" | "tomorrow";
export type FilterType = "all" | "hourly" | "global";
export type ViewMode = "full" | "mini";

export type Employee = {
  id: string;
  name: string;
  initials: string;
  color: string;
  type: EmployeeType;
  availableDays: DayKey[];
};

export type Task = {
  id: string;
  icon: TaskIcon;
  title: string;
  time: string;
  period: Period;
  required: number;
  assignedIds: string[];
  compatibleIds: string[];
};

export type DayBoard = {
  key: BoardDayKey;
  weekday: DayKey;
  label: string;
  tasks: Task[];
};
