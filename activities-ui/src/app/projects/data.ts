export type ThumbTone = "rose" | "sand" | "sage" | "sky" | "lilac";
export type ActivityIcon = "truck" | "link" | "tool" | "briefcase";
export type ContractStatus = "Signed Contract" | "No Contract" | null;
export type FieldTone = "ok" | "pending" | "missing" | "neutral";
export type WorkflowStatus = "In Progress" | "To Review" | "Confirmed" | "Done";

export type Contact = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

export type ProjectFile = {
  id: string;
  name: string;
  kind: "pdf" | "image" | "sheet";
  size: string;
  date: string;
};

export type PreviewQuestion = {
  id: string;
  title: string;
  answer: string;
};

export type ProjectActivity = {
  id: string;
  number: string;
  icon: ActivityIcon;
  dateLabel: string;
  title: string;
  type: string;
  status: WorkflowStatus;
  statusTone: "progress" | "review" | "confirmed" | "done";
  note?: string;
  assignee?: string;
  previewQuestions?: PreviewQuestion[];
};

export function activityPreviewQuestions(activity: ProjectActivity): PreviewQuestion[] {
  if (activity.previewQuestions?.length) return activity.previewQuestions;
  if (activity.type === "Site Visit") {
    return [
      { id: `${activity.id}-purpose`, title: "Visit purpose", answer: "Progress check" },
      { id: `${activity.id}-findings`, title: "Findings", answer: activity.note ?? "Formwork ready, access road muddy." },
    ];
  }
  if (activity.type === "Wall maintenance" || activity.type === "Maintenance") {
    return [
      {
        id: `${activity.id}-what`,
        title: "What needs fixing?",
        answer: activity.note && activity.note !== "NO" ? activity.note : "Wall maintenance",
      },
      { id: `${activity.id}-done`, title: "Fix completed?", answer: activity.note === "NO" ? "No" : "Yes" },
    ];
  }
  if (activity.type === "Full wall approval") {
    return [
      { id: `${activity.id}-item`, title: "Work item", answer: activity.note ?? "Formwork wall" },
      { id: `${activity.id}-ok`, title: "Approved?", answer: activity.status === "Confirmed" ? "Yes" : "Pending" },
    ];
  }
  return [
    { id: `${activity.id}-type`, title: "Activity type", answer: activity.type },
    { id: `${activity.id}-note`, title: "Note", answer: activity.note ?? "—" },
  ];
}

export type Project = {
  id: string;
  projectNumber: string;
  name: string;
  address: string | null;
  city: string | null;
  startDate: string | null;
  contractStatus: ContractStatus;
  buildingsCount: number;
  assignees: string[];
  thumbTone: ThumbTone;
  projectStatus: string;
  projectStatusTone: FieldTone;
  elements: string[];
  mixes: string[];
  methods: string[];
  customers: string[];
  operator: string | null;
  developer: string | null;
  tags: string[];
  team: string[];
  contacts: Contact[];
  files: ProjectFile[];
  authorizations: string[];
  quoteFixes: string[];
  materials: string[];
  activities: ProjectActivity[];
};

export const ELEMENT_OPTIONS = [
  "Diaphragm wall",
  "Raft foundation",
  "Stiff ceiling wall",
  "Pile cap",
  "Retaining wall",
  "Core walls",
  "Piles",
  "Beams",
  "Slabs",
  "Columns",
  "Stairs",
  "Soil nails",
];

export const MIX_OPTIONS = [
  "C20",
  "C25",
  "C30",
  "C35",
  "C40",
  "C45",
  "C50",
  "Watertight C35",
  "Shotcrete mix",
];

export const METHOD_OPTIONS = [
  "Cast in situ",
  "Precast",
  "Shotcrete",
  "Formwork",
  "Top-down",
  "Bottom-up",
];

export const CUSTOMER_OPTIONS = [
  "Ichilov Hospital",
  "B.S.T Group",
  "Tel Aviv Municipality",
  "Yuvalim",
  "Dania Sibus",
  "Ariel Gabay",
];

export const AUTHORIZATION_OPTIONS = [
  "Concrete works",
  "Night shifts",
  "Crane operation",
  "Road closure",
  "Excavation",
  "Welding",
  "Pumping",
];

export const QUOTE_FIX_OPTIONS = [
  "Wall patching — pending",
  "Formwork extras — approved",
  "Waterproofing — pending",
  "Rebar extras — approved",
  "Surface finish — pending",
];

export const MATERIAL_OPTIONS = [
  "Rebar 12mm",
  "Rebar 16mm",
  "C40 mix",
  "C30 mix",
  "Waterstop",
  "Formwork panels",
  "Spacers",
];

const ichilovActivities: ProjectActivity[] = [
  {
    id: "a1",
    number: "18009228",
    icon: "truck",
    dateLabel: "08/10/26  01:00",
    title: "B.S.T - Ichilov North",
    type: "Full wall approval",
    status: "Confirmed",
    statusTone: "confirmed",
    note: "Formwork wall",
  },
  {
    id: "a2",
    number: "18009227",
    icon: "tool",
    dateLabel: "07/10/26  14:00",
    title: "B.S.T - Ichilov North",
    type: "Wall maintenance",
    status: "To Review",
    statusTone: "review",
    note: "NO",
    assignee: "MK",
  },
  {
    id: "a3",
    number: "18009214",
    icon: "truck",
    dateLabel: "05/10/26  14:30",
    title: "B.S.T - Ichilov North",
    type: "Full wall approval",
    status: "Confirmed",
    statusTone: "confirmed",
    note: "Formwork wall",
    assignee: "DL",
  },
  {
    id: "a4",
    number: "18009050",
    icon: "tool",
    dateLabel: "05/10/26  07:00",
    title: "B.S.T - Ichilov North",
    type: "Wall maintenance",
    status: "In Progress",
    statusTone: "progress",
    assignee: "RS",
  },
  {
    id: "a5",
    number: "18008912",
    icon: "link",
    dateLabel: "02/10/26  09:30",
    title: "B.S.T - Ichilov North",
    type: "Site Visit",
    status: "Done",
    statusTone: "done",
    assignee: "MK",
  },
];

const emptyExtras = {
  city: null as string | null,
  startDate: null as string | null,
  elements: [] as string[],
  mixes: [] as string[],
  methods: [] as string[],
  customers: [] as string[],
  contacts: [] as Contact[],
  files: [] as ProjectFile[],
  authorizations: [] as string[],
  quoteFixes: [] as string[],
  materials: [] as string[],
};

export const mockProjects: Project[] = [
  {
    id: "1",
    projectNumber: "216790",
    name: "B.S.T - Ichilov North",
    address: "Weizmann 6, Tel Aviv",
    city: "Tel Aviv",
    startDate: "12/03/25",
    contractStatus: "Signed Contract",
    buildingsCount: 1,
    assignees: ["MK"],
    thumbTone: "rose",
    projectStatus: "In Progress",
    projectStatusTone: "ok",
    elements: [
      "Diaphragm wall",
      "Raft foundation",
      "Stiff ceiling wall",
      "Pile cap",
      "Retaining wall",
      "Core walls",
    ],
    mixes: ["C30", "C40", "C50", "Watertight C35"],
    methods: ["Cast in situ", "Precast", "Shotcrete", "Formwork"],
    customers: ["Ichilov Hospital", "B.S.T Group", "Tel Aviv Municipality"],
    operator: "Ariel Dubnov",
    developer: "B.S.T Group",
    tags: ["Full diaphragm wall", "Stiff ceiling wall", "Raft foundation"],
    team: ["MK", "DL", "RS"],
    contacts: [
      { name: "Ariel Dubnov", role: "Project operator", phone: "052-1112233", email: "ariel@bst.co.il" },
      { name: "Maya Cohen", role: "Site manager", phone: "054-9988776", email: "maya@bst.co.il" },
      { name: "Dan Levi", role: "Client contact", phone: "03-6401234", email: "dan@ichilov.cl" },
    ],
    files: [
      { id: "f1", name: "BP-plans-rev3.pdf", kind: "pdf", size: "4.2 MB", date: "01/10/26" },
      { id: "f2", name: "Quote-fixes.xlsx", kind: "sheet", size: "180 KB", date: "28/09/26" },
      { id: "f3", name: "North-elevation.jpg", kind: "image", size: "2.1 MB", date: "22/09/26" },
      { id: "f4", name: "Authorization-letter.pdf", kind: "pdf", size: "320 KB", date: "18/09/26" },
    ],
    authorizations: ["Concrete works", "Night shifts", "Crane operation"],
    quoteFixes: ["Wall patching — pending", "Formwork extras — approved"],
    materials: ["Rebar 12mm", "C40 mix", "Waterstop"],
    activities: ichilovActivities,
  },
  {
    id: "2",
    projectNumber: "216789",
    name: "Yuvalim Ganim - Jerusalem",
    address: null,
    contractStatus: null,
    buildingsCount: 0,
    assignees: ["DL"],
    thumbTone: "sand",
    projectStatus: "Draft",
    projectStatusTone: "pending",
    operator: null,
    developer: "Yuvalim",
    tags: ["Site visit"],
    team: ["DL"],
    ...emptyExtras,
    activities: [
      {
        id: "y1",
        number: "18008810",
        icon: "link",
        dateLabel: "21/03/25  12:00",
        title: "Yuvalim Ganim",
        type: "Site Visit",
        status: "Confirmed",
        statusTone: "confirmed",
        assignee: "DL",
      },
    ],
  },
  {
    id: "3",
    projectNumber: "216788",
    name: "HaGiborim - Bat Yam",
    address: null,
    contractStatus: null,
    buildingsCount: 0,
    assignees: ["RS"],
    thumbTone: "sage",
    projectStatus: "Open",
    projectStatusTone: "pending",
    operator: "RS",
    developer: null,
    tags: ["Maintenance"],
    team: ["RS"],
    ...emptyExtras,
    activities: [
      {
        id: "h1",
        number: "18008701",
        icon: "tool",
        dateLabel: "21/03/25  12:00",
        title: "HaGiborim - Bat Yam",
        type: "Maintenance",
        status: "In Progress",
        statusTone: "progress",
        assignee: "RS",
      },
    ],
  },
  {
    id: "4",
    projectNumber: "216787",
    name: "Dania Sibus - Plot 112 Ramat Efal",
    address: "Shacham 13, Ramat Gan, Israel",
    contractStatus: null,
    buildingsCount: 0,
    assignees: ["AV", "TK"],
    thumbTone: "sky",
    projectStatus: "In Progress",
    projectStatusTone: "ok",
    operator: "AV",
    developer: "Dania Sibus",
    tags: ["Installation"],
    team: ["AV", "TK"],
    ...emptyExtras,
    city: "Ramat Gan",
    startDate: "04/02/25",
    activities: [
      {
        id: "d1",
        number: "18008640",
        icon: "truck",
        dateLabel: "21/03/25  12:00",
        title: "Dania Sibus - Plot 112",
        type: "Installation",
        status: "Confirmed",
        statusTone: "confirmed",
        assignee: "AV",
      },
    ],
  },
  {
    id: "5",
    projectNumber: "216786",
    name: "Ariel Gabay - Dubnov 3 Tel Aviv",
    address: "Dubnov 3, Tel Aviv",
    contractStatus: "Signed Contract",
    buildingsCount: 1,
    assignees: ["MK"],
    thumbTone: "lilac",
    projectStatus: "Confirmed",
    projectStatusTone: "ok",
    operator: "MK",
    developer: "Ariel Gabay",
    tags: ["Office Hours"],
    team: ["MK"],
    ...emptyExtras,
    city: "Tel Aviv",
    activities: [
      {
        id: "g1",
        number: "18008512",
        icon: "briefcase",
        dateLabel: "21/03/25  16:00",
        title: "Ariel Gabay - Dubnov 3",
        type: "Office Hours",
        status: "In Progress",
        statusTone: "progress",
        assignee: "MK",
      },
    ],
  },
  {
    id: "6",
    projectNumber: "216785",
    name: "Dania Sibus - HaDam Bank",
    address: null,
    contractStatus: "No Contract",
    buildingsCount: 0,
    assignees: ["DL"],
    thumbTone: "rose",
    projectStatus: "On Hold",
    projectStatusTone: "missing",
    operator: null,
    developer: "HaDam Bank",
    tags: ["Contract check"],
    team: ["DL"],
    ...emptyExtras,
    activities: [
      {
        id: "b1",
        number: "18008400",
        icon: "briefcase",
        dateLabel: "21/03/25  12:00",
        title: "HaDam Bank",
        type: "Contract Check",
        status: "To Review",
        statusTone: "review",
        assignee: "DL",
      },
    ],
  },
  {
    id: "7",
    projectNumber: "216783",
    name: "Dania Sibus - Givat Shmuel 1006-1007",
    address: "Heyn 57, Petah Tikva, Israel",
    contractStatus: "No Contract",
    buildingsCount: 0,
    assignees: ["RS"],
    thumbTone: "sand",
    projectStatus: "Quote",
    projectStatusTone: "pending",
    operator: "RS",
    developer: "Dania Sibus",
    tags: ["Quote"],
    team: ["RS"],
    ...emptyExtras,
    activities: [],
  },
];

export const TOTAL_PROJECTS = 348;

export function getProject(id: string) {
  return mockProjects.find((project) => project.id === id);
}

const activityProjectFallbacks: Record<string, Partial<Project>> = {
  "FoodChain Suppliers": {
    projectNumber: "214882",
    address: "HaMasger 12, Tel Aviv",
    city: "Tel Aviv",
    startDate: "04/02/25",
    operator: "Noa Bar",
    developer: "FoodChain Ltd",
    team: ["AB", "CD", "EF"],
    customers: ["FoodChain Ltd"],
    elements: ["Slabs", "Columns", "Beams"],
    contacts: [
      { name: "Noa Bar", role: "Project operator", phone: "052-4419088", email: "noa@foodchain.co.il" },
      { name: "Eli Cohen", role: "Site manager", phone: "03-5612200", email: "eli@foodchain.co.il" },
    ],
    files: [
      { id: "fc1", name: "Supplier-brief.pdf", kind: "pdf", size: "860 KB", date: "02/10/26" },
      { id: "fc2", name: "Pour-plan.xlsx", kind: "sheet", size: "120 KB", date: "30/09/26" },
    ],
  },
  "Event Masters": {
    projectNumber: "215104",
    address: "Yigal Alon 94, Tel Aviv",
    city: "Tel Aviv",
    startDate: "18/01/25",
    operator: "Dana Levi",
    developer: "Event Masters",
    team: ["GH", "ST"],
    customers: ["Event Masters"],
    elements: ["Stairs", "Slabs"],
  },
  "Legal Pro Consulting": {
    projectNumber: "213990",
    address: "Rothschild 45, Tel Aviv",
    city: "Tel Aviv",
    startDate: "09/11/24",
    operator: "Yael Azulay",
    developer: "Legal Pro",
    team: ["QR"],
    customers: ["Legal Pro Consulting"],
    elements: ["Core walls", "Slabs"],
  },
};

export function getProjectForActivity(projectName: string) {
  const needle = projectName.trim().toLowerCase();
  const matched = mockProjects.find((project) => {
    const name = project.name.toLowerCase();
    const shortName = name.split(" - ")[0];
    return name.includes(needle) || needle.includes(shortName) || shortName.includes(needle);
  });
  if (matched) return matched;

  const extra = activityProjectFallbacks[projectName] ?? {};
  return {
    id: "",
    projectNumber: extra.projectNumber ?? "000000",
    name: projectName,
    address: extra.address ?? "Not specified",
    city: extra.city ?? "Tel Aviv",
    startDate: extra.startDate ?? "01/03/25",
    contractStatus: extra.contractStatus ?? "Signed Contract",
    buildingsCount: extra.buildingsCount ?? 1,
    assignees: extra.assignees ?? extra.team ?? [],
    thumbTone: extra.thumbTone ?? "sky",
    projectStatus: extra.projectStatus ?? "In Progress",
    projectStatusTone: extra.projectStatusTone ?? "ok",
    elements: extra.elements ?? ["Slabs", "Columns", "Beams"],
    mixes: extra.mixes ?? ["C30", "C40"],
    methods: extra.methods ?? ["Cast in situ"],
    customers: extra.customers ?? [projectName],
    operator: extra.operator ?? "Site operator",
    developer: extra.developer ?? projectName,
    tags: extra.tags ?? [],
    team: extra.team ?? [],
    contacts: extra.contacts ?? [
      { name: "Project contact", role: "Site manager", phone: "03-0000000", email: "ops@project.co.il" },
    ],
    files: extra.files ?? [
      { id: "pf1", name: "Project-brief.pdf", kind: "pdf", size: "1.1 MB", date: "01/10/26" },
    ],
    authorizations: extra.authorizations ?? ["Concrete works"],
    quoteFixes: extra.quoteFixes ?? [],
    materials: extra.materials ?? [],
    activities: extra.activities ?? [],
  } satisfies Project;
}

export function displayValue(value: string | number | null | undefined | string[]) {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return String(value);
}

export function getProjectListValues(project: Project, source?: string) {
  if (!source) return [];
  const value = project[source as keyof Project];
  return Array.isArray(value) ? value.map(String) : [];
}

export function getProjectFieldValue(project: Project, source?: string) {
  if (!source) return "—";
  return displayValue(project[source as keyof Project] as string | number | null | string[]);
}

export const SYSTEM_USERS = [
  "Gavriel Hadad",
  "Yair Yefet",
  "Adiel Susi Atia",
  "Ariel Nexc",
  "Elisaf Gito",
  "Yaakov Eisen",
  "Noa Bar",
  "Maya Cohen",
];

export function getSystemListValues(project: Project, source?: string) {
  if (source === "users") return SYSTEM_USERS;
  if (source === "projects") return mockProjects.map((item) => item.name);
  return getProjectListValues(project, source);
}

export function statusToneFor(status: WorkflowStatus) {
  if (status === "To Review") return "review" as const;
  if (status === "Confirmed") return "confirmed" as const;
  if (status === "Done") return "done" as const;
  return "progress" as const;
}
