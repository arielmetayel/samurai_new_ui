"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Activity, QuestionSection, isAnswerableQuestion } from "@/types";
import { Project } from "../projects/data";
import { ArrowLeft, ArrowRight, Check, X } from "react-feather";
import { useI18n, localize } from "@/i18n";
import {
  AnswerEditor,
  AnswerValue,
  DisplayBlock,
  ReportCard,
  asText,
  isQuestionFilled,
} from "./ActivityQuestions";
import styles from "./ActivityDetailSidePanel.module.css";

type ActivityAnswerWizardProps = {
  activity: Activity;
  project: Project;
  answers: Record<string, AnswerValue>;
  onClose: () => void;
  onComplete: (answers: Record<string, AnswerValue>) => void;
};

function sectionPages(activity: Activity): QuestionSection[] {
  const sections = activity.sections.length
    ? activity.sections
    : [{ id: "default", title: localize("Questions"), questions: activity.questions }];
  return sections.filter((section) => section.questions.length);
}

function missingRequired(section: QuestionSection, answers: Record<string, AnswerValue>) {
  return section.questions.filter(
    (question) =>
      question.required &&
      isAnswerableQuestion(question) &&
      !isQuestionFilled(question, answers[question.id] ?? question.answer)
  );
}

export default function ActivityAnswerWizard({
  activity,
  project,
  answers,
  onClose,
  onComplete,
}: ActivityAnswerWizardProps) {
  const { t, localize } = useI18n();
  const pages = useMemo(() => sectionPages(activity), [activity]);
  const [page, setPage] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [draft, setDraft] = useState<Record<string, AnswerValue>>(answers);
  const section = pages[page];
  const total = pages.length;
  const missing = section ? missingRequired(section, draft) : [];
  const canContinue = missing.length === 0;
  const isLast = page === total - 1;
  const allQuestions = pages.flatMap((item) => item.questions);

  useEffect(() => {
    setAttempted(false);
  }, [page]);

  if (!section) return null;

  function setAnswer(id: string, value: AnswerValue) {
    setDraft((current) => ({ ...current, [id]: value }));
  }

  function goNext() {
    if (!canContinue) {
      setAttempted(true);
      return;
    }
    if (isLast) {
      onComplete(draft);
      return;
    }
    setPage((current) => current + 1);
  }

  return (
    <div className={styles.wizardOverlay} onClick={onClose}>
      <div
        className={styles.wizard}
        role="dialog"
        aria-modal="true"
        aria-labelledby="answer-all-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.wizardToolbar}>
          <button type="button" className={styles.iconButton} aria-label={t("wizard.close")} onClick={onClose}>
            <X size={18} />
          </button>
          <div className={styles.wizardHeading}>
            <strong id="answer-all-title">{t("panel.answerAll")}</strong>
            <span>
              {t("wizard.sectionOf", { n: page + 1, total })}
            </span>
          </div>
        </div>

        <div className={styles.wizardProgress} aria-hidden="true">
          {pages.map((item, index) => (
            <span
              key={item.id}
              className={index <= page ? styles.wizardDotActive : styles.wizardDot}
            />
          ))}
        </div>

        <div className={styles.wizardBody}>
          <div className={styles.wizardSectionHead}>
            <small>{t("wizard.sectionN", { n: page + 1 })}</small>
            <h3>{localize(section.title)}</h3>
          </div>

          {section.questions.map((question) => {
            if (question.type === "summary") {
              return (
                <ReportCard
                  key={question.id}
                  activity={activity}
                  question={question}
                  questions={allQuestions}
                  answers={draft}
                  project={project}
                  onSign={() =>
                    setAnswer(
                      question.id,
                      asText(draft[question.id] ?? question.answer) === "Signed" ? "" : "Signed"
                    )
                  }
                />
              );
            }

            if (!isAnswerableQuestion(question)) {
              return <DisplayBlock key={question.id} question={question} project={project} />;
            }

            const invalid = attempted && missing.some((item) => item.id === question.id);
            return (
              <div key={question.id} className={invalid ? `${styles.qaCard} ${styles.qaCardError}` : styles.qaCard}>
                <span className={styles.qaLabel}>
                  <span className={styles.qaTitle}>{localize(question.title)}</span>
                  {question.required ? <span className={styles.required}>{t("wizard.required")}</span> : null}
                </span>
                <AnswerEditor
                  question={question}
                  value={draft[question.id] ?? question.answer}
                  project={project}
                  onChange={(value) => setAnswer(question.id, value)}
                />
                {invalid ? <span className={styles.fieldError}>{t("wizard.requiredError")}</span> : null}
              </div>
            );
          })}
        </div>

        <div className={styles.wizardFooter}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => (page === 0 ? onClose() : setPage((current) => current - 1))}
          >
            <ArrowLeft size={16} />
            {page === 0 ? t("common.cancel") : t("common.back")}
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            aria-disabled={!canContinue}
            onClick={goNext}
          >
            {isLast ? <Check size={16} /> : null}
            {isLast ? t("common.submit") : t("common.next")}
            {!isLast ? <ArrowRight size={16} /> : null}
          </button>
        </div>
        {attempted && !canContinue ? (
          <p className={styles.wizardHint}>Answer required questions before leaving this section.</p>
        ) : null}
      </div>
    </div>
  );
}
