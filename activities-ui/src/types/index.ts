export type QuestionType =
  | "text"
  | "date"
  | "datetime"
  | "time"
  | "yesno"
  | "select"
  | "multiselect"
  | "projectList"
  | "systemList"
  | "image"
  | "range"
  | "message"
  | "projectValue"
  | "summary";

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  answer: string | string[];
  required?: boolean;
  options?: string[];
  placeholder?: string;
  source?: string;
  multiple?: boolean;
  message?: string;
  imageCaption?: string;
  rangeMin?: number;
  rangeMax?: number;
  summaryQuestionIds?: string[];
  showInList?: boolean;
};

export type QuestionSection = {
  id: string;
  title: string;
  questions: Question[];
};

export type ActivityStatus =
  | "In Progress"
  | "Tested"
  | "To Review"
  | "Confirmed"
  | "Done";

export type Activity = {
  id: string;
  icon: string;
  dateTime: string;
  activityType: string;
  projectName: string;
  status: ActivityStatus;
  assignees: string[];
  sections: QuestionSection[];
  questions: Question[];
};

export type SortColumn = "dateTime" | "projectName" | "status" | "assignees";

export type SortDirection = "asc" | "desc";

export function isAnswerableQuestion(question: Question) {
  return (
    question.type !== "message" &&
    question.type !== "image" &&
    question.type !== "projectValue" &&
    question.type !== "summary"
  );
}

export function listPreviewQuestions(activity: Pick<Activity, "questions">) {
  return activity.questions.filter((question) => question.showInList);
}

export function questionAnswerText(question: Question) {
  if (question.type === "range" && Array.isArray(question.answer) && question.answer.length >= 2) {
    return `${question.answer[0]} – ${question.answer[1]}`;
  }
  if (Array.isArray(question.answer)) {
    return question.answer.length ? question.answer.join(", ") : "—";
  }
  return question.answer || "—";
}
