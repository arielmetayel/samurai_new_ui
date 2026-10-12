export type Automation = {
  id: string;
  name: string;
  topic: string;
  event: string;
  action: string;
  active: boolean;
  condition?: string;
  emailTo?: string;
  emailSubject?: string;
};

export type TopicId = "jobs" | "projects" | "time" | "webhooks" | "connectedData";

export type CatalogQuestion = {
  id: string;
  title: string;
  type: "text" | "yesno" | "select";
  options?: string[];
};

export type ActivityTypeOption = {
  id: string;
  name: string;
  questions: CatalogQuestion[];
};

export const TOPICS: { id: TopicId; label: string }[] = [
  { id: "jobs", label: "Jobs" },
  { id: "projects", label: "Projects" },
  { id: "time", label: "Time based" },
  { id: "webhooks", label: "Webhooks" },
  { id: "connectedData", label: "Connected data" },
];

export const EVENTS: { id: string; topic: TopicId; label: string }[] = [
  { id: "job-created", topic: "jobs", label: "Job created" },
  { id: "job-completed", topic: "jobs", label: "Job completed" },
  { id: "user-assigned", topic: "jobs", label: "User assigned" },
  { id: "question-answered", topic: "jobs", label: "Question answered" },
  { id: "approval-required", topic: "jobs", label: "Approval required" },
  { id: "status-changed", topic: "jobs", label: "Status changed" },
  { id: "user-removed", topic: "jobs", label: "User removed" },
  { id: "user-confirmed", topic: "jobs", label: "User confirmed" },
  { id: "attendance-confirmed", topic: "jobs", label: "Attendance confirmed" },
  { id: "project-created", topic: "projects", label: "Project created" },
  { id: "project-updated", topic: "projects", label: "Project updated" },
  { id: "once-week", topic: "time", label: "Once a week" },
  { id: "once-month", topic: "time", label: "Once a month" },
  { id: "status-x-days", topic: "time", label: "Status for X days" },
  { id: "incoming-webhook", topic: "webhooks", label: "Incoming webhook" },
  { id: "record-updated", topic: "connectedData", label: "Record updated" },
];

export const ACTIONS: { id: string; label: string }[] = [
  { id: "send-email", label: "Send email" },
  { id: "send-sms", label: "Send SMS" },
  { id: "send-push", label: "Send push notification" },
  { id: "create-job", label: "Create job" },
  { id: "change-status", label: "Change job status" },
  { id: "assign-user", label: "Assign user" },
  { id: "create-user", label: "Create user" },
  { id: "send-webhook", label: "Send webhook" },
  { id: "send-connected-data", label: "Send connected data" },
];

export const OPERATORS = [
  { id: "equals", label: "equals" },
  { id: "not-equals", label: "does not equal" },
  { id: "contains", label: "contains" },
  { id: "is-answered", label: "is answered" },
];

export const TYPE_OPERATORS = [
  { id: "equals", label: "Equals" },
  { id: "not-equals", label: "Not equals" },
  { id: "in", label: "In" },
  { id: "not-in", label: "Not in" },
] as const;

export const RECEIVER_TYPES = [
  { id: "users", label: "Users" },
  { id: "roles", label: "Roles" },
  { id: "activityUsers", label: "Activity users" },
  { id: "projectUsers", label: "Project users" },
  { id: "custom", label: "Custom" },
  { id: "targetUser", label: "Target user" },
  { id: "question", label: "Question" },
] as const;

export type ReceiverType = (typeof RECEIVER_TYPES)[number]["id"];

export const RECEIVER_ROLES = ["Admin", "Manager", "Inspector", "Field worker"];

export const ACTIVITY_USERS = ["Assigned users", "Activity creator", "Last updater"];

export const PROJECT_USERS = ["Project operator", "Project developer", "All project users"];

export function receiverQuestionOptions() {
  return ACTIVITY_TYPES.flatMap((type) =>
    type.questions.map((question) => ({
      id: `${type.id}:${question.id}`,
      label: `${type.name}: ${question.title}`,
    }))
  );
}

export const CONDITION_FIELDS = [
  { id: "activityType", label: "Activity type" },
  { id: "status", label: "Status" },
  { id: "question", label: "Question" },
] as const;

export const JOB_TOKENS = [
  "job_id",
  "job_link",
  "pdf_attachment",
  "job_start_date",
  "project_id",
  "project_name",
  "type_name",
  "job_type",
  "users",
  "user_id",
  "user_name",
  "user_email",
];

export const ACTIVITY_TYPES: ActivityTypeOption[] = [
  {
    id: "support-case",
    name: "Support Case",
    questions: [
      { id: "done", title: "Was the work completed?", type: "yesno", options: ["Yes", "No"] },
      { id: "priority", title: "Priority", type: "select", options: ["Low", "Medium", "High", "Critical"] },
      { id: "what", title: "What happened?", type: "text" },
    ],
  },
  {
    id: "site-visit",
    name: "Site Visit",
    questions: [
      { id: "safe", title: "Site is safe to enter?", type: "yesno", options: ["Yes", "No"] },
      { id: "access", title: "Access status", type: "select", options: ["Open", "Limited", "Blocked"] },
      { id: "location", title: "Location", type: "text" },
    ],
  },
  {
    id: "meeting",
    name: "Meeting Summary",
    questions: [
      { id: "decision", title: "Decision", type: "select", options: ["Approved", "Pending", "Rejected"] },
      { id: "follow", title: "Needs a follow-up meeting?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "fixes",
    name: "Fixes",
    questions: [
      { id: "fixed", title: "Issue resolved?", type: "yesno", options: ["Yes", "No"] },
      { id: "severity", title: "Severity", type: "select", options: ["Low", "Medium", "High"] },
    ],
  },
  {
    id: "supplies",
    name: "Supplies",
    questions: [
      { id: "item", title: "Item needed", type: "select", options: ["Pump", "Mesh", "Safety kit", "Other"] },
      { id: "urgent", title: "Urgent?", type: "yesno", options: ["Yes", "No"] },
      { id: "qty", title: "Quantity note", type: "text" },
    ],
  },
  {
    id: "installation",
    name: "Installation",
    questions: [
      { id: "installed", title: "Installation completed?", type: "yesno", options: ["Yes", "No"] },
      { id: "result", title: "Result", type: "select", options: ["Passed", "Failed", "Needs rework"] },
    ],
  },
];

export const STATUSES = ["In Progress", "To Review", "Confirmed", "Done", "Tested"];

export function eventsForTopic(topic: TopicId) {
  return EVENTS.filter((event) => event.topic === topic);
}

export function topicLabel(id: TopicId) {
  return TOPICS.find((topic) => topic.id === id)?.label ?? id;
}

export function eventLabel(id: string) {
  return EVENTS.find((event) => event.id === id)?.label ?? id;
}

export function actionLabel(id: string) {
  return ACTIONS.find((action) => action.id === id)?.label ?? id;
}

export const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Send tomorrow's activity list report — daily reminder",
    topic: "Time based",
    event: "Once a week",
    action: "Action send report",
    active: false,
  },
  {
    id: "2",
    name: "Send tomorrow's unapproved activities report — daily reminder",
    topic: "Time based",
    event: "Once a week",
    action: "Action send report",
    active: true,
  },
  {
    id: "3",
    name: "Send report — email only — daily reminder of tomorrow's activities (excluding supplies)",
    topic: "Time based",
    event: "Once a week",
    action: "Action send report",
    active: true,
  },
  {
    id: "4",
    name: "Monthly work hours reports — global",
    topic: "Activities",
    event: "Event question answered",
    action: "Action create job",
    active: true,
  },
  {
    id: "5",
    name: "Approval reminder — one hour after activities are in Waiting status",
    topic: "Time based",
    event: "Status X days",
    action: "Action send sms",
    active: false,
  },
  {
    id: "6",
    name: "Reminder to complete report — activities in Received status for 48 hours",
    topic: "Time based",
    event: "Status X days",
    action: "Action send sms",
    active: false,
  },
  {
    id: "7",
    name: "Weekly schedule template",
    topic: "Time based",
    event: "Once a week",
    action: "Action create job",
    active: true,
  },
  {
    id: "8",
    name: "Monthly dates template",
    topic: "Time based",
    event: "Once a month",
    action: "Action create job",
    active: false,
  },
  {
    id: "9",
    name: "A message to unapproved job after assigning",
    topic: "Time based",
    event: "Status X days",
    action: "Action send email",
    active: false,
  },
  {
    id: "10",
    name: "Global work briefing",
    topic: "Skill expired",
    event: "Skill expired",
    action: "Action send email",
    active: false,
  },
  {
    id: "11",
    name: "New project created — send email to a new company",
    topic: "Projects",
    event: "Event project created",
    action: "Action send email",
    active: true,
  },
  {
    id: "12",
    name: "Activity completed — create follow-up job",
    topic: "Activities",
    event: "Event job completed",
    action: "Action create job",
    active: true,
  },
];
