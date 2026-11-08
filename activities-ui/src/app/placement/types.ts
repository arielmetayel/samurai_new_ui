export type DayKey = "sun" | "mon" | "tue" | "wed" | "thu";
export type EmployeeType = "hourly" | "global";
export type Period = "morning" | "afternoon" | "evening";
export type TaskIcon = "mixer" | "wrench" | "person" | "briefcase";
export type BoardDayKey = "today" | "tomorrow" | "lastWeek";
export type FilterType = "all" | "hourly" | "global";
export type PlacementActivityType =
  | "Maintenance"
  | "Installation"
  | "Site Visit"
  | "Office Hours"
  | "Concrete Delivery";

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
  weekday?: DayKey;
  activityType: PlacementActivityType;
  status: string;
  required: number;
  assignedIds: string[];
  compatibleIds: string[];
};

export type DayBoard = {
  key: BoardDayKey;
  weekday: DayKey | null;
  label: string;
  tasks: Task[];
};
