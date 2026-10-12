import { Activity, Question, QuestionSection } from "@/types";

type QuestionDraft = Partial<Question> & Pick<Question, "title" | "type">;

function q(prefix: string, id: string, draft: QuestionDraft): Question {
  return {
    id: `${prefix}-${id}`,
    title: draft.title,
    type: draft.type,
    answer: draft.answer ?? "",
    required: draft.required,
    options: draft.options,
    multiple: draft.multiple,
    placeholder: draft.placeholder,
    source: draft.source,
    message: draft.message,
    imageCaption: draft.imageCaption,
    rangeMin: draft.rangeMin,
    rangeMax: draft.rangeMax,
    summaryQuestionIds: draft.summaryQuestionIds?.map((item) =>
      item.includes("-") ? item : `${prefix}-${item}`
    ),
    showInList: draft.showInList,
  };
}

function supportCaseSections(prefix: string): QuestionSection[] {
  return [
    {
      id: `${prefix}-s1`,
      title: "Case details",
      questions: [
        q(prefix, "what", {
          title: "What happened?",
          type: "text",
          required: true,
          answer: "Supplier delay on the morning pour. Need a revised window and extra pump.",
          placeholder: "Write the answer",
          showInList: true,
        }),
        q(prefix, "reported", {
          title: "Reported on",
          type: "date",
          required: true,
          answer: "2026-10-08",
        }),
        q(prefix, "arrival", {
          title: "Site arrival",
          type: "datetime",
          answer: "2026-10-08T09:00",
        }),
        q(prefix, "callback", {
          title: "Callback time",
          type: "time",
          answer: "11:30",
        }),
        q(prefix, "done", {
          title: "Was the work completed?",
          type: "yesno",
          required: true,
          answer: "No",
          showInList: true,
        }),
      ],
    },
    {
      id: `${prefix}-s2`,
      title: "Lists",
      questions: [
        q(prefix, "priority", {
          title: "Priority",
          type: "select",
          required: true,
          options: ["Low", "Medium", "High", "Critical"],
          answer: "High",
          showInList: true,
        }),
        q(prefix, "areas", {
          title: "Affected areas",
          type: "multiselect",
          options: ["Formwork", "Pour", "Access road", "Pump line"],
          answer: ["Pour", "Pump line"],
        }),
        q(prefix, "elements", {
          title: "Project elements",
          type: "projectList",
          source: "elements",
          multiple: true,
          answer: ["Slabs", "Columns"],
        }),
        q(prefix, "inspector", {
          title: "Assigned inspector",
          type: "systemList",
          source: "users",
          answer: "Gavriel Hadad",
        }),
        q(prefix, "related", {
          title: "Related project",
          type: "systemList",
          source: "projects",
          answer: "B.S.T - Ichilov North",
        }),
        q(prefix, "mix", {
          title: "Concrete mix",
          type: "systemList",
          source: "mixes",
          answer: "C40",
        }),
      ],
    },
    {
      id: `${prefix}-s3`,
      title: "Site information",
      questions: [
        q(prefix, "notice", {
          title: "Safety notice",
          type: "message",
          message: "Helmet, vest and safety shoes are required before entering the pour area.",
        }),
        q(prefix, "photo", {
          title: "Access route",
          type: "image",
          imageCaption: "Use the north ramp only. Do not block the pump line.",
        }),
        q(prefix, "operator", {
          title: "Project operator",
          type: "projectValue",
          source: "operator",
        }),
        q(prefix, "qty", {
          title: "Pour quantity (m³)",
          type: "range",
          rangeMin: 0,
          rangeMax: 80,
          answer: ["12", "18"],
        }),
      ],
    },
    {
      id: `${prefix}-s4`,
      title: "Close-out",
      questions: [
        q(prefix, "report", {
          title: "Activity report",
          type: "summary",
          summaryQuestionIds: ["what", "priority", "done", "elements", "qty"],
          answer: "",
        }),
      ],
    },
  ];
}

function meetingSections(prefix: string): QuestionSection[] {
  return [
    {
      id: `${prefix}-s1`,
      title: "Meeting info",
      questions: [
        q(prefix, "topic", {
          title: "Meeting topic",
          type: "text",
          required: true,
          answer: "Weekly coordination — pour window",
          showInList: true,
        }),
        q(prefix, "when", { title: "Meeting date", type: "date", answer: "2026-10-07" }),
        q(prefix, "start", { title: "Start time", type: "time", answer: "10:00" }),
        q(prefix, "who", {
          title: "Attendees",
          type: "systemList",
          source: "users",
          multiple: true,
          answer: ["Gavriel Hadad", "Noa Bar"],
        }),
      ],
    },
    {
      id: `${prefix}-s2`,
      title: "Discussion",
      questions: [
        q(prefix, "notes", {
          title: "Meeting notes",
          type: "text",
          required: true,
          answer: "Discussion about project timeline and deliverables",
          showInList: true,
        }),
        q(prefix, "decision", {
          title: "Decision",
          type: "select",
          options: ["Approved", "Pending", "Rejected"],
          answer: "Pending",
          showInList: true,
        }),
        q(prefix, "follow", {
          title: "Needs a follow-up meeting?",
          type: "yesno",
          answer: "Yes",
        }),
        q(prefix, "operator", {
          title: "Project operator",
          type: "projectValue",
          source: "operator",
        }),
      ],
    },
    {
      id: `${prefix}-s3`,
      title: "Close-out",
      questions: [
        q(prefix, "report", {
          title: "Meeting report",
          type: "summary",
          summaryQuestionIds: ["topic", "notes", "decision", "follow"],
        }),
      ],
    },
  ];
}

function executionSections(prefix: string): QuestionSection[] {
  return [
    {
      id: `${prefix}-s1`,
      title: "Phase setup",
      questions: [
        q(prefix, "phase", {
          title: "Phase name",
          type: "text",
          required: true,
          answer: "Phase 2 — structure",
          showInList: true,
        }),
        q(prefix, "window", {
          title: "Work window",
          type: "datetime",
          answer: "2026-09-30T11:00",
        }),
        q(prefix, "method", {
          title: "Work method",
          type: "projectList",
          source: "methods",
          answer: "Cast in situ",
        }),
        q(prefix, "qty", {
          title: "Planned quantity",
          type: "range",
          rangeMin: 0,
          rangeMax: 120,
          answer: ["36", "42"],
        }),
      ],
    },
    {
      id: `${prefix}-s2`,
      title: "Execution",
      questions: [
        q(prefix, "done", { title: "Phase completed?", type: "yesno", answer: "Yes", showInList: true }),
        q(prefix, "elements", {
          title: "Elements in this phase",
          type: "projectList",
          source: "elements",
          multiple: true,
          answer: ["Core walls", "Slabs"],
        }),
        q(prefix, "notice", {
          title: "Hold point",
          type: "message",
          message: "Do not proceed to the next lift before the engineer signs the report.",
        }),
      ],
    },
    {
      id: `${prefix}-s3`,
      title: "Close-out",
      questions: [
        q(prefix, "report", {
          title: "Phase report",
          type: "summary",
          summaryQuestionIds: ["phase", "method", "done", "qty"],
          answer: "Signed",
        }),
      ],
    },
  ];
}

function fixesSections(prefix: string): QuestionSection[] {
  return [
    {
      id: `${prefix}-s1`,
      title: "Issue",
      questions: [
        q(prefix, "what", {
          title: "What needs fixing?",
          type: "text",
          required: true,
          answer: "Crack at the north wall joint after the last pour.",
          showInList: true,
        }),
        q(prefix, "when", { title: "Found on", type: "date", answer: "2026-10-18" }),
        q(prefix, "severity", {
          title: "Severity",
          type: "select",
          options: ["Low", "Medium", "High"],
          answer: "Medium",
        }),
      ],
    },
    {
      id: `${prefix}-s2`,
      title: "Work done",
      questions: [
        q(prefix, "done", { title: "Fix completed?", type: "yesno", required: true, answer: "Yes", showInList: true }),
        q(prefix, "materials", {
          title: "Fix materials",
          type: "systemList",
          source: "materials",
          multiple: true,
          answer: ["Rebar 12mm", "C40 mix"],
        }),
        q(prefix, "photo", {
          title: "Repair detail",
          type: "image",
          imageCaption: "Joint after patching. Keep moist for 48 hours.",
        }),
      ],
    },
    {
      id: `${prefix}-s3`,
      title: "Close-out",
      questions: [
        q(prefix, "report", {
          title: "Fix report",
          type: "summary",
          summaryQuestionIds: ["what", "severity", "done"],
          answer: "Signed",
        }),
      ],
    },
  ];
}

function siteVisitSections(prefix: string): QuestionSection[] {
  return [
    {
      id: `${prefix}-s1`,
      title: "Visit details",
      questions: [
        q(prefix, "purpose", {
          title: "Visit purpose",
          type: "text",
          required: true,
          answer: "Progress check",
          showInList: true,
        }),
        q(prefix, "when", {
          title: "Visit time",
          type: "datetime",
          answer: "2026-10-08T14:30",
        }),
        q(prefix, "who", {
          title: "Met with",
          type: "systemList",
          source: "users",
          answer: "Maya Cohen",
        }),
      ],
    },
    {
      id: `${prefix}-s2`,
      title: "Observations",
      questions: [
        q(prefix, "safe", {
          title: "Site is safe to enter?",
          type: "yesno",
          required: true,
          answer: "Yes",
        }),
        q(prefix, "findings", {
          title: "Findings",
          type: "text",
          answer: "Formwork ready, access road muddy.",
          showInList: true,
        }),
        q(prefix, "risks", {
          title: "Open risks",
          type: "multiselect",
          options: ["Weather", "Access", "Materials", "Manpower"],
          answer: ["Access"],
        }),
        q(prefix, "status", {
          title: "Project status",
          type: "projectValue",
          source: "projectStatus",
        }),
      ],
    },
    {
      id: `${prefix}-s3`,
      title: "Close-out",
      questions: [
        q(prefix, "report", {
          title: "Visit report",
          type: "summary",
          summaryQuestionIds: ["purpose", "safe", "findings", "risks"],
        }),
      ],
    },
  ];
}

function sectionsFor(activityType: string, prefix: string): QuestionSection[] {
  if (activityType === "Meeting Summary") return meetingSections(prefix);
  if (activityType === "Phase Execution") return executionSections(prefix);
  if (activityType === "Fixes") return fixesSections(prefix);
  if (activityType === "Site Visit") return siteVisitSections(prefix);
  return supportCaseSections(prefix);
}

function makeActivity(
  data: Omit<Activity, "questions" | "sections"> & { sections?: QuestionSection[] }
): Activity {
  const sections = data.sections ?? sectionsFor(data.activityType, `a${data.id}`);
  return {
    ...data,
    sections,
    questions: sections.flatMap((section) => section.questions),
  };
}

export const mockActivities: Activity[] = [
  makeActivity({
    id: "1",
    icon: "link",
    dateTime: "2026-10-08T09:00:00Z",
    activityType: "Support Case",
    projectName: "FoodChain Suppliers",
    status: "In Progress",
    assignees: ["AB", "CD", "EF"],
  }),
  makeActivity({
    id: "2",
    icon: "link",
    dateTime: "2026-10-09T12:00:00Z",
    activityType: "Support Case",
    projectName: "Event Masters",
    status: "Tested",
    assignees: ["GH"],
  }),
  makeActivity({
    id: "3",
    icon: "link",
    dateTime: "2026-10-07T10:00:00Z",
    activityType: "Meeting Summary",
    projectName: "FoodChain Suppliers",
    status: "To Review",
    assignees: ["IJ", "KL", "MN", "OP"],
  }),
  makeActivity({
    id: "4",
    icon: "truck",
    dateTime: "2026-09-30T11:00:00Z",
    activityType: "Phase Execution",
    projectName: "Legal Pro Consulting",
    status: "Confirmed",
    assignees: ["QR"],
  }),
  makeActivity({
    id: "5",
    icon: "tool",
    dateTime: "2026-10-20T14:00:00Z",
    activityType: "Fixes",
    projectName: "Event Masters",
    status: "Done",
    assignees: ["ST"],
  }),
];

const linkedActivities: Activity[] = [
  makeActivity({
    id: "6",
    icon: "link",
    dateTime: "2026-10-09T12:00:00Z",
    activityType: "Meeting Summary",
    projectName: "Event Masters",
    status: "To Review",
    assignees: ["GH"],
  }),
  makeActivity({
    id: "7",
    icon: "tool",
    dateTime: "2026-10-08T14:30:00Z",
    activityType: "Site Visit",
    projectName: "Ichilov North",
    status: "To Review",
    assignees: ["MK"],
  }),
  makeActivity({
    id: "8",
    icon: "link",
    dateTime: "2026-10-08T12:00:00Z",
    activityType: "Support Case",
    projectName: "Yuvalim Ganim",
    status: "Confirmed",
    assignees: ["DL", "RS"],
  }),
  makeActivity({
    id: "9",
    icon: "link",
    dateTime: "2026-10-08T12:00:00Z",
    activityType: "Maintenance",
    projectName: "HaGiborim",
    status: "In Progress",
    assignees: ["RS"],
  }),
  makeActivity({
    id: "10",
    icon: "truck",
    dateTime: "2026-10-08T12:00:00Z",
    activityType: "Installation",
    projectName: "Dania Sibus",
    status: "Confirmed",
    assignees: ["AV", "TK"],
  }),
  makeActivity({
    id: "11",
    icon: "briefcase",
    dateTime: "2026-10-08T16:00:00Z",
    activityType: "Office Hours",
    projectName: "Ariel Gabay",
    status: "In Progress",
    assignees: ["MK"],
  }),
  makeActivity({
    id: "12",
    icon: "briefcase",
    dateTime: "2026-10-07T12:00:00Z",
    activityType: "Contract Check",
    projectName: "HaDam Bank",
    status: "To Review",
    assignees: ["DL"],
  }),
  makeActivity({
    id: "13",
    icon: "truck",
    dateTime: "2026-10-09T08:30:00Z",
    activityType: "Site Visit",
    projectName: "Yuvalim Ganim",
    status: "Confirmed",
    assignees: ["DL"],
  }),
];

export function getActivityById(id: string): Activity | undefined {
  return [...mockActivities, ...linkedActivities].find((activity) => activity.id === id);
}

export function activityHref(id: string) {
  return `/activities?id=${id}`;
}
