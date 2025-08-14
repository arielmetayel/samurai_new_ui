export type Question = {
  id: string;
  title: string;
  answer: string;
};

export type ActivityStatus =
  | 'In Progress'
  | 'Tested'
  | 'To Review'
  | 'Confirmed'
  | 'Done';

export type Activity = {
  id: string;
  icon: string; // emoji or URL
  dateTime: string; // ISO string
  activityType: string; // e.g. Support Case, Meeting Summary
  projectName: string;
  status: ActivityStatus;
  assignees: string[]; // user initials or ids
  questions: Question[];
};

export type SortColumn = 'dateTime' | 'projectName' | 'status' | 'assignees';

export type SortDirection = 'asc' | 'desc';

