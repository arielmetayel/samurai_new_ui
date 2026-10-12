"use client";

import React from "react";
import { Activity, Question, isAnswerableQuestion, questionAnswerText } from "@/types";
import {
  Project,
  displayValue,
  getProjectFieldValue,
  getProjectListValues,
  getSystemListValues,
} from "../projects/data";
import { Mail, PenTool } from "react-feather";
import styles from "./ActivityDetailSidePanel.module.css";

export type AnswerValue = string | string[];

export function asList(value: AnswerValue) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function asText(value: AnswerValue) {
  return Array.isArray(value) ? value.join(", ") : value;
}

export function isQuestionFilled(question: Question, value: AnswerValue) {
  if (!isAnswerableQuestion(question)) return true;
  if (question.type === "range") {
    const list = asList(value);
    return Boolean(list[0] && list[1]);
  }
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value && String(value).trim());
}

function formatAnswer(question: Question, value: AnswerValue, project: Project) {
  if (question.type === "projectValue") return getProjectFieldValue(project, question.source);
  if (question.type === "range") {
    const list = asList(value);
    if (list.length >= 2) return `${list[0]} – ${list[1]}`;
    return "—";
  }
  if (question.type === "date" && asText(value)) {
    const [year, month, day] = asText(value).split("-");
    return day && month && year ? `${day}/${month}/${year.slice(2)}` : asText(value);
  }
  if (question.type === "datetime" && asText(value)) {
    const [date, time] = asText(value).split("T");
    const [year, month, day] = (date ?? "").split("-");
    return day ? `${day}/${month}/${year.slice(2)}, ${time || ""}` : asText(value);
  }
  const text = asText(value);
  return text || "—";
}

function optionsFor(question: Question, project: Project) {
  if (question.type === "projectList") return getProjectListValues(project, question.source);
  if (question.type === "systemList") return getSystemListValues(project, question.source);
  return question.options ?? [];
}

function ChoiceList({
  options,
  value,
  multiple,
  onChange,
}: {
  options: string[];
  value: AnswerValue;
  multiple?: boolean;
  onChange: (value: AnswerValue) => void;
}) {
  const list = asList(value);
  const text = asText(value);

  if (multiple) {
    return (
      <div className={styles.chipRow}>
        {options.map((option) => {
          const selected = list.includes(option);
          return (
            <button
              key={option}
              type="button"
              className={selected ? styles.chipActive : styles.chip}
              onClick={() => onChange(selected ? list.filter((item) => item !== option) : [...list, option])}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <select className={styles.qaField} value={text} onChange={(event) => onChange(event.target.value)}>
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function AnswerEditor({
  question,
  value,
  project,
  onChange,
}: {
  question: Question;
  value: AnswerValue;
  project: Project;
  onChange: (value: AnswerValue) => void;
}) {
  const text = asText(value);
  const list = asList(value);

  if (question.type === "text") {
    return (
      <textarea
        className={styles.qaInput}
        value={text}
        placeholder={question.placeholder ?? "Write the answer"}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (question.type === "date" || question.type === "time" || question.type === "datetime") {
    const inputType = question.type === "datetime" ? "datetime-local" : question.type;
    return (
      <input className={styles.qaField} type={inputType} value={text} onChange={(event) => onChange(event.target.value)} />
    );
  }

  if (question.type === "yesno") {
    return (
      <div className={styles.choiceRow}>
        {["Yes", "No"].map((option) => (
          <button
            key={option}
            type="button"
            className={text === option ? styles.choiceActive : styles.choice}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "select") {
    return <ChoiceList options={question.options ?? []} value={value} onChange={onChange} />;
  }

  if (question.type === "multiselect") {
    return <ChoiceList options={question.options ?? []} value={value} multiple onChange={onChange} />;
  }

  if (question.type === "projectList" || question.type === "systemList") {
    return (
      <ChoiceList
        options={optionsFor(question, project)}
        value={value}
        multiple={question.multiple}
        onChange={onChange}
      />
    );
  }

  if (question.type === "range") {
    return (
      <div className={styles.rangeRow}>
        <input
          className={styles.qaField}
          type="number"
          min={question.rangeMin}
          max={question.rangeMax}
          value={list[0] ?? ""}
          onChange={(event) => onChange([event.target.value, list[1] ?? ""])}
        />
        <span>to</span>
        <input
          className={styles.qaField}
          type="number"
          min={question.rangeMin}
          max={question.rangeMax}
          value={list[1] ?? ""}
          onChange={(event) => onChange([list[0] ?? "", event.target.value])}
        />
      </div>
    );
  }

  return (
    <input
      className={styles.qaField}
      value={text}
      placeholder={question.placeholder ?? "Write the answer"}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function DisplayBlock({ question, project }: { question: Question; project: Project }) {
  if (question.type === "message") {
    return (
      <div className={styles.infoCard}>
        <small>Message</small>
        <strong>{question.title}</strong>
        <p>{question.message}</p>
      </div>
    );
  }

  if (question.type === "image") {
    return (
      <div className={styles.imageCard}>
        <div className={styles.imageFrame} aria-hidden="true" />
        <strong>{question.title}</strong>
        <p>{question.imageCaption}</p>
      </div>
    );
  }

  return (
    <div className={styles.answerCard}>
      <small>{question.title}</small>
      <strong>{getProjectFieldValue(project, question.source)}</strong>
    </div>
  );
}

export function ReportCard({
  activity,
  question,
  questions,
  answers,
  project,
  onSign,
}: {
  activity: Activity;
  question: Question;
  questions: Question[];
  answers: Record<string, AnswerValue>;
  project: Project;
  onSign: () => void;
}) {
  const items = (question.summaryQuestionIds ?? [])
    .map((id) => questions.find((item) => item.id === id))
    .filter((item): item is Question => Boolean(item && isAnswerableQuestion(item)));
  const signed = asText(answers[question.id] ?? question.answer) === "Signed";

  function sendEmail() {
    const lines = [
      `${activity.activityType} — ${activity.projectName}`,
      `#${activity.id.padStart(6, "0")}`,
      "",
      ...items.map((item) => `${item.title}: ${formatAnswer(item, answers[item.id] ?? item.answer, project)}`),
      "",
      signed ? "Signed" : "Not signed",
    ];
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `${activity.activityType} report — ${activity.projectName}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <div className={styles.reportCard}>
      <div className={styles.reportHead}>
        <small>Report</small>
        <strong>{question.title}</strong>
      </div>
      <div className={styles.reportBody}>
        {items.map((item) => (
          <div key={item.id} className={styles.reportRow}>
            <span>{item.title}</span>
            <strong>{formatAnswer(item, answers[item.id] ?? item.answer, project)}</strong>
          </div>
        ))}
      </div>
      <div className={styles.reportActions}>
        <button type="button" className={signed ? styles.signatureDone : styles.signature} onClick={onSign}>
          <PenTool size={16} />
          {signed ? <em>Signed</em> : "Add signature"}
        </button>
        <button type="button" className={styles.reportSend} onClick={sendEmail}>
          <Mail size={16} />
          Send by email
        </button>
      </div>
    </div>
  );
}

export function ActivityQuestions({
  activity,
  project,
  answers,
  editing,
  onAnswersChange,
  onEditingChange,
}: {
  activity: Activity;
  project: Project;
  answers: Record<string, AnswerValue>;
  editing: boolean;
  onAnswersChange: (answers: Record<string, AnswerValue>) => void;
  onEditingChange: (editing: boolean) => void;
}) {
  const sections = activity.sections.length
    ? activity.sections
    : [{ id: "default", title: "Questions", questions: activity.questions }];
  const allQuestions = sections.flatMap((section) => section.questions);
  const reports = allQuestions.filter((question) => question.type === "summary");

  function setAnswer(id: string, value: AnswerValue) {
    onAnswersChange({ ...answers, [id]: value });
  }

  return (
    <div className={styles.qaList}>
      <div className={styles.modeSwitch} role="tablist" aria-label="Answers mode">
        <button
          type="button"
          className={!editing ? styles.modeActive : styles.modeButton}
          onClick={() => onEditingChange(false)}
        >
          View answers
        </button>
        <button
          type="button"
          className={editing ? styles.modeActive : styles.modeButton}
          onClick={() => onEditingChange(true)}
        >
          Edit answers
        </button>
      </div>

      {sections.map((section) => {
        const visible = section.questions.filter((question) => question.type !== "summary");
        if (!visible.length) return null;
        return (
          <section key={section.id} className={styles.qaSection}>
            <div className={styles.sectionHead}>
              <span>{section.title}</span>
            </div>
            {visible.map((question) => {
              if (!isAnswerableQuestion(question)) {
                return <DisplayBlock key={question.id} question={question} project={project} />;
              }

              const value = answers[question.id] ?? question.answer;
              if (!editing) {
                return (
                  <div key={question.id} className={styles.answerCard}>
                    <small>{question.title}</small>
                    <strong>{formatAnswer(question, value, project)}</strong>
                  </div>
                );
              }

              return (
                <div key={question.id} className={styles.qaCard}>
                  <span className={styles.qaLabel}>
                    <span className={styles.qaTitle}>{question.title}</span>
                    {question.required ? <span className={styles.required}>Required</span> : null}
                  </span>
                  <AnswerEditor
                    question={question}
                    value={value}
                    project={project}
                    onChange={(next) => setAnswer(question.id, next)}
                  />
                </div>
              );
            })}
          </section>
        );
      })}

      {reports.map((question) => (
        <ReportCard
          key={question.id}
          activity={activity}
          question={question}
          questions={allQuestions}
          answers={answers}
          project={project}
          onSign={() =>
            setAnswer(question.id, asText(answers[question.id] ?? question.answer) === "Signed" ? "" : "Signed")
          }
        />
      ))}
    </div>
  );
}

export function unansweredCount(activity: Activity, answers: Record<string, AnswerValue>) {
  return activity.questions.filter((question) => {
    if (!isAnswerableQuestion(question)) return false;
    const value = answers[question.id] ?? question.answer;
    if (question.type === "range") {
      const list = asList(value);
      return !list[0] || !list[1];
    }
    return questionAnswerText({ ...question, answer: value }) === "—";
  }).length;
}

