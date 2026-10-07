export type Automation = {
  id: string;
  name: string;
  topic: string;
  event: string;
  action: string;
  active: boolean;
};

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
