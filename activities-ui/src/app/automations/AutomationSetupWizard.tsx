"use client";

import React, { useMemo, useRef, useState } from "react";
import { Plus, X } from "react-feather";
import { Button } from "@/design-system/buttons/Button";
import { SYSTEM_USERS } from "../projects/data";
import {
  ACTIONS,
  ACTIVITY_TYPES,
  ACTIVITY_USERS,
  CONDITION_FIELDS,
  JOB_TOKENS,
  OPERATORS,
  PROJECT_USERS,
  RECEIVER_ROLES,
  RECEIVER_TYPES,
  ReceiverType,
  STATUSES,
  TOPICS,
  TopicId,
  actionLabel,
  eventLabel,
  eventsForTopic,
  receiverQuestionOptions,
  topicLabel,
  TYPE_OPERATORS,
} from "./data";
import styles from "./AutomationSetupWizard.module.css";

export type AutomationDraftResult = {
  name: string;
  topic: string;
  event: string;
  action: string;
  condition?: string;
  emailTo?: string;
  emailSubject?: string;
};

type AutomationSetupWizardProps = {
  onClose: () => void;
  onCreate: (automation: AutomationDraftResult) => void;
};

type AnswerMode = "value" | "issue" | "any";
type ConditionKind = (typeof CONDITION_FIELDS)[number]["id"];

type ExtraCondition = {
  id: string;
  kind: ConditionKind;
  join: "and" | "or";
  activityTypeId: string;
  activityTypeIds: string[];
  questionId: string;
  operator: string;
  answer: string;
  answerMode: AnswerMode;
  status: string;
};

type Receiver = {
  id: string;
  type: ReceiverType;
  value: string;
};

function tokenText(token: string) {
  return `{{${token}}}`;
}

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function isMultiTypeOperator(operator: string) {
  return operator === "in" || operator === "not-in";
}

function selectedTypeIds(typeId: string, typeIds: string[], operator: string) {
  if (isMultiTypeOperator(operator)) return typeIds;
  return typeId ? [typeId] : [];
}

function describeTypeFilter(operator: string, typeId: string, typeIds: string[]) {
  const names = selectedTypeIds(typeId, typeIds, operator)
    .map((id) => ACTIVITY_TYPES.find((item) => item.id === id)?.name)
    .filter(Boolean);
  if (!names.length) return "";
  const list = names.join(", ");
  if (operator === "not-equals") return `Type is not ${list}`;
  if (operator === "in") return `Type is in ${list}`;
  if (operator === "not-in") return `Type is not in ${list}`;
  return `Type is ${list}`;
}

function emptyCondition(kind: ConditionKind): ExtraCondition {
  return {
    id: newId("cond"),
    kind,
    join: "and",
    activityTypeId: "",
    activityTypeIds: [],
    questionId: "",
    operator: "equals",
    answer: "",
    answerMode: "value",
    status: "",
  };
}

function emptyReceiver(type: ReceiverType = "users"): Receiver {
  return { id: newId("to"), type, value: type === "targetUser" ? "Target user" : "" };
}

function receiverNeedsValue(type: ReceiverType) {
  return type !== "targetUser";
}

function formatReceiver(receiver: Receiver) {
  if (receiver.type === "targetUser") return "Target user";
  if (receiver.type === "question") {
    return receiverQuestionOptions().find((item) => item.id === receiver.value)?.label ?? receiver.value;
  }
  return receiver.value.trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function describeCondition(condition: ExtraCondition, fallbackTypeId: string) {
  if (condition.kind === "activityType") {
    return describeTypeFilter(condition.operator, condition.activityTypeId, condition.activityTypeIds);
  }
  if (condition.kind === "status") {
    return condition.status ? `Status is ${condition.status}` : "";
  }
  const type = ACTIVITY_TYPES.find((item) => item.id === (condition.activityTypeId || fallbackTypeId));
  const question = type?.questions.find((item) => item.id === condition.questionId);
  if (!question) return "";
  if (condition.answerMode === "any") return `${question.title} is any answer`;
  if (condition.answerMode === "issue") return `${question.title} is marked as issue`;
  if (condition.operator === "is-answered") return `${question.title} is answered`;
  if (condition.answer) {
    const operator = OPERATORS.find((item) => item.id === condition.operator)?.label ?? condition.operator;
    return `${question.title} ${operator} ${condition.answer}`;
  }
  return question.title;
}

export default function AutomationSetupWizard({ onClose, onCreate }: AutomationSetupWizardProps) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [activityTypeId, setActivityTypeId] = useState("");
  const [activityTypeIds, setActivityTypeIds] = useState<string[]>([]);
  const [typeOperator, setTypeOperator] = useState("equals");
  const [questionId, setQuestionId] = useState("");
  const [operator, setOperator] = useState("equals");
  const [answer, setAnswer] = useState("");
  const [answerMode, setAnswerMode] = useState<AnswerMode>("value");
  const [status, setStatus] = useState("");
  const [extraConditions, setExtraConditions] = useState<ExtraCondition[]>([]);
  const [actionId, setActionId] = useState<string | null>(null);
  const [receivers, setReceivers] = useState<Receiver[]>([emptyReceiver()]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attempted, setAttempted] = useState(false);
  const insertTarget = useRef<"subject" | "body">("body");

  const events = topic ? eventsForTopic(topic) : [];
  const topicsLocked = Boolean(eventId);
  const activityType = ACTIVITY_TYPES.find((item) => item.id === activityTypeId) ?? null;
  const question = activityType?.questions.find((item) => item.id === questionId) ?? null;
  const needsActivityType = eventId === "question-answered" || eventId === "job-created" || eventId === "job-completed" || eventId === "status-changed" || eventId === "user-assigned";
  const needsQuestion = eventId === "question-answered";
  const needsStatus = eventId === "status-changed" || eventId === "status-x-days";
  const needsEmail = actionId === "send-email";
  const needsMessage = actionId === "send-sms" || actionId === "send-push";
  const needsReceiver = needsEmail || needsMessage;
  const questionTokens = (activityType?.questions ?? []).map((item) => `question:${item.title}`);

  const conditionSummary = useMemo(() => {
    if (!eventId) return "";
    const base: string[] = [];
    const typeText = describeTypeFilter(typeOperator, activityTypeId, activityTypeIds);
    if (typeText) base.push(typeText);
    if (needsStatus && status) base.push(`Status is ${status}`);
    if (needsQuestion && question) {
      if (answerMode === "any") base.push(`${question.title} is any answer`);
      else if (answerMode === "issue") base.push(`${question.title} is marked as issue`);
      else if (operator === "is-answered") base.push(`${question.title} is answered`);
      else if (answer) base.push(`${question.title} ${OPERATORS.find((item) => item.id === operator)?.label ?? operator} ${answer}`);
      else base.push(question.title);
    }
    let summary = base.join(" AND ");
    extraConditions.forEach((condition) => {
      const text = describeCondition(condition, activityTypeId);
      if (!text) return;
      summary = summary ? `${summary} ${condition.join.toUpperCase()} ${text}` : text;
    });
    return summary;
  }, [activityTypeId, activityTypeIds, answer, answerMode, eventId, extraConditions, needsQuestion, needsStatus, operator, question, status, typeOperator]);

  const suggestedName = useMemo(() => {
    if (!eventId || !actionId) return "";
    if (eventId === "question-answered" && question) {
      const outcome =
        answerMode === "any"
          ? "is answered"
          : answerMode === "issue"
            ? "is marked as issue"
            : answer
              ? `${OPERATORS.find((item) => item.id === operator)?.label ?? operator} ${answer}`
              : "is answered";
      return `${actionLabel(actionId)} when ${question.title} ${outcome}`;
    }
    return `${actionLabel(actionId)} on ${eventLabel(eventId)}`;
  }, [actionId, answer, answerMode, eventId, operator, question]);

  const resolvedName = name.trim() || suggestedName;
  const filledReceivers = receivers.filter((item) =>
    item.type === "targetUser" ? true : Boolean(item.value.trim())
  );
  const invalidCustom = filledReceivers.some(
    (item) => item.type === "custom" && needsEmail && !isValidEmail(item.value)
  );

  const missing: string[] = [];
  if (!topic) missing.push("topic");
  if (!eventId) missing.push("event");
  if (needsActivityType && selectedTypeIds(activityTypeId, activityTypeIds, typeOperator).length === 0) {
    missing.push("activity type");
  }
  if (needsQuestion && !questionId) missing.push("question");
  if (needsQuestion && answerMode === "value" && operator !== "is-answered" && !answer.trim()) missing.push("answer");
  if (needsStatus && !status) missing.push("status");
  if (!actionId) missing.push("action");
  if (needsReceiver && filledReceivers.length === 0) missing.push("receiver");
  if (needsReceiver && invalidCustom) missing.push("a valid custom email");
  if (needsEmail && !subject.trim()) missing.push("subject");
  const canCreate = missing.length === 0 && Boolean(resolvedName);

  function selectTopic(next: TopicId) {
    if (topicsLocked && next !== topic) return;
    setTopic(next);
    setEventId(null);
    setActivityTypeId("");
    setActivityTypeIds([]);
    setTypeOperator("equals");
    setQuestionId("");
    setAnswer("");
    setAnswerMode("value");
    setStatus("");
    setExtraConditions([]);
  }

  function selectEvent(next: string) {
    if (eventId === next) {
      setEventId(null);
      setActivityTypeId("");
      setActivityTypeIds([]);
      setTypeOperator("equals");
      setQuestionId("");
      setAnswer("");
      setAnswerMode("value");
      setStatus("");
      setExtraConditions([]);
      return;
    }
    setEventId(next);
    setActivityTypeId("");
    setActivityTypeIds([]);
    setTypeOperator("equals");
    setQuestionId("");
    setAnswer("");
    setAnswerMode("value");
    setStatus("");
    setExtraConditions([]);
  }

  function selectActivityType(next: string) {
    setActivityTypeId(next);
    setActivityTypeIds(next ? [next] : []);
    setQuestionId("");
    setAnswer("");
    setAnswerMode("value");
  }

  function selectTypeOperator(next: string) {
    setTypeOperator(next);
    if (isMultiTypeOperator(next)) {
      setActivityTypeIds((current) => (current.length ? current : activityTypeId ? [activityTypeId] : []));
    }
  }

  function toggleActivityType(id: string) {
    setActivityTypeIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      setActivityTypeId(next[0] ?? "");
      setQuestionId("");
      setAnswer("");
      return next;
    });
  }

  function selectQuestion(next: string) {
    setQuestionId(next);
    setAnswer("");
  }

  function addCondition() {
    const kind = needsQuestion ? "question" : needsStatus ? "status" : "activityType";
    setExtraConditions((current) => [...current, emptyCondition(kind)]);
  }

  function updateCondition(id: string, patch: Partial<ExtraCondition>) {
    setExtraConditions((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }

  function changeConditionKind(id: string, kind: ConditionKind) {
    setExtraConditions((current) =>
      current.map((item) =>
        item.id === id
          ? { ...emptyCondition(kind), id: item.id, join: item.join }
          : item
      )
    );
  }

  function insertToken(token: string) {
    const value = tokenText(token);
    if (insertTarget.current === "subject") {
      setSubject((current) => `${current}${value}`);
      return;
    }
    setBody((current) => `${current}${value}`);
  }

  function submit() {
    if (!canCreate || !topic || !eventId || !actionId) {
      setAttempted(true);
      return;
    }
    onCreate({
      name: resolvedName,
      topic: topicLabel(topic),
      event: eventLabel(eventId),
      action: `Action ${actionLabel(actionId).toLowerCase()}`,
      condition: conditionSummary || undefined,
      emailTo: needsReceiver ? filledReceivers.map(formatReceiver).join(", ") : undefined,
      emailSubject: needsEmail ? subject.trim() : undefined,
    });
  }

  const showIf = Boolean(eventId);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="automation-setup-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Automation setup</p>
            <h2 id="automation-setup-title" className={styles.title}>
              New automation
            </h2>
          </div>
          <button type="button" className={styles.iconBtn} aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        <div className={styles.recipe}>
          <span data-on={Boolean(eventId)}>When {eventId ? eventLabel(eventId) : "…"}</span>
          <span data-on={Boolean(conditionSummary)}>If {conditionSummary || "…"}</span>
          <span data-on={Boolean(actionId)}>Then {actionId ? actionLabel(actionId) : "…"}</span>
        </div>

        <div className={styles.body}>
          <label className={styles.field}>
            <span>Name</span>
            <input
              value={name}
              placeholder={suggestedName || "Give this automation a name"}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h3>When</h3>
              <p>
                {topicsLocked
                  ? "Topic is locked after an event is chosen. Click the event again to change topic."
                  : "Choose the topic, then the event that should start this automation."}
              </p>
            </div>
            <div className={styles.chipRow}>
              {TOPICS.map((item) => {
                const locked = topicsLocked && topic !== item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.chip}
                    data-on={topic === item.id}
                    data-locked={locked}
                    disabled={locked}
                    onClick={() => selectTopic(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {topic ? (
              <div className={styles.choiceList}>
                {events.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.choice}
                    data-on={eventId === item.id}
                    onClick={() => selectEvent(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles.hint}>Select a topic to see its events.</p>
            )}
          </section>

          {showIf ? (
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h3>If</h3>
                <p>
                  {needsQuestion
                    ? "Limit this to an activity type and a specific answer."
                    : "Add the conditions that must be true."}
                </p>
              </div>

              {needsActivityType || needsQuestion || needsStatus ? (
                <div className={styles.conditionBlock}>
                  {needsActivityType ? (
                    <ActivityTypeConditionFields
                      operator={typeOperator}
                      typeId={activityTypeId}
                      typeIds={activityTypeIds}
                      onOperator={selectTypeOperator}
                      onTypeId={selectActivityType}
                      onToggleType={toggleActivityType}
                    />
                  ) : null}

                  {needsStatus ? (
                    <label className={styles.field}>
                      <span>Status</span>
                      <select value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option value="">Select status</option>
                        {STATUSES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}

                  {needsQuestion ? (
                    <QuestionConditionFields
                      activityTypeId={activityTypeId}
                      questionId={questionId}
                      operator={operator}
                      answer={answer}
                      answerMode={answerMode}
                      onQuestion={selectQuestion}
                      onOperator={setOperator}
                      onAnswer={setAnswer}
                      onAnswerMode={setAnswerMode}
                    />
                  ) : null}
                </div>
              ) : (
                <p className={styles.hint}>No default condition for this event. Add one if you need it.</p>
              )}

              {extraConditions.map((condition) => (
                <div key={condition.id}>
                  <div className={styles.joinRow} role="group" aria-label="Combine with previous condition">
                    <button
                      type="button"
                      className={styles.joinBtn}
                      data-on={condition.join === "and"}
                      onClick={() => updateCondition(condition.id, { join: "and" })}
                    >
                      AND
                    </button>
                    <button
                      type="button"
                      className={styles.joinBtn}
                      data-on={condition.join === "or"}
                      onClick={() => updateCondition(condition.id, { join: "or" })}
                    >
                      OR
                    </button>
                  </div>
                  <div className={styles.conditionBlock}>
                    <div className={styles.conditionHead}>
                      <label className={styles.field}>
                        <span>Condition</span>
                        <select
                          value={condition.kind}
                          onChange={(event) => changeConditionKind(condition.id, event.target.value as ConditionKind)}
                        >
                          {CONDITION_FIELDS.map((field) => (
                            <option key={field.id} value={field.id}>
                              {field.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        aria-label="Remove condition"
                        onClick={() => setExtraConditions((current) => current.filter((item) => item.id !== condition.id))}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {condition.kind === "activityType" ? (
                      <ActivityTypeConditionFields
                        operator={condition.operator}
                        typeId={condition.activityTypeId}
                        typeIds={condition.activityTypeIds}
                        onOperator={(value) =>
                          updateCondition(condition.id, {
                            operator: value,
                            activityTypeIds: isMultiTypeOperator(value)
                              ? condition.activityTypeIds.length
                                ? condition.activityTypeIds
                                : condition.activityTypeId
                                  ? [condition.activityTypeId]
                                  : []
                              : [],
                            activityTypeId: isMultiTypeOperator(value)
                              ? condition.activityTypeId
                              : condition.activityTypeId || condition.activityTypeIds[0] || "",
                          })
                        }
                        onTypeId={(value) =>
                          updateCondition(condition.id, { activityTypeId: value, activityTypeIds: value ? [value] : [] })
                        }
                        onToggleType={(id) => {
                          const current = condition.activityTypeIds;
                          const next = current.includes(id)
                            ? current.filter((item) => item !== id)
                            : [...current, id];
                          updateCondition(condition.id, {
                            activityTypeIds: next,
                            activityTypeId: next[0] ?? "",
                          });
                        }}
                      />
                    ) : null}

                    {condition.kind === "status" ? (
                      <label className={styles.field}>
                        <span>Status</span>
                        <select
                          value={condition.status}
                          onChange={(event) => updateCondition(condition.id, { status: event.target.value })}
                        >
                          <option value="">Select status</option>
                          {STATUSES.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}

                    {condition.kind === "question" ? (
                      <>
                        {!activityTypeId ? (
                          <label className={styles.field}>
                            <span>Activity type</span>
                            <select
                              value={condition.activityTypeId}
                              onChange={(event) =>
                                updateCondition(condition.id, {
                                  activityTypeId: event.target.value,
                                  questionId: "",
                                  answer: "",
                                })
                              }
                            >
                              <option value="">Select activity type</option>
                              {ACTIVITY_TYPES.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        ) : null}
                        <QuestionConditionFields
                          activityTypeId={condition.activityTypeId || activityTypeId}
                          questionId={condition.questionId}
                          operator={condition.operator}
                          answer={condition.answer}
                          answerMode={condition.answerMode}
                          onQuestion={(value) => updateCondition(condition.id, { questionId: value, answer: "" })}
                          onOperator={(value) => updateCondition(condition.id, { operator: value })}
                          onAnswer={(value) => updateCondition(condition.id, { answer: value })}
                          onAnswerMode={(value) => updateCondition(condition.id, { answerMode: value })}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              ))}

              <button type="button" className={styles.addReceiver} onClick={addCondition}>
                <Plus size={14} />
                Add condition
              </button>
            </section>
          ) : null}

          {eventId ? (
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h3>Then</h3>
                <p>Choose what should happen. Email setup stays on this screen.</p>
              </div>
              <div className={styles.choiceList}>
                {ACTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.choice}
                    data-on={actionId === item.id}
                    onClick={() => setActionId(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {needsReceiver ? (
                <div className={styles.emailBox}>
                  <div className={styles.receivers}>
                    {receivers.map((receiver, index) => (
                      <div key={receiver.id} className={styles.receiverRow}>
                        <label className={styles.field}>
                          <span>{index === 0 ? "Send to" : "Also send to"}</span>
                          <select
                            value={receiver.type}
                            onChange={(event) => {
                              const next = event.target.value as ReceiverType;
                              setReceivers((current) =>
                                current.map((item) =>
                                  item.id === receiver.id
                                    ? {
                                        ...item,
                                        type: next,
                                        value: next === "targetUser" ? "Target user" : "",
                                      }
                                    : item
                                )
                              );
                            }}
                          >
                            {RECEIVER_TYPES.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <ReceiverValueField
                          receiver={receiver}
                          isEmail={needsEmail}
                          onChange={(value) =>
                            setReceivers((current) =>
                              current.map((item) => (item.id === receiver.id ? { ...item, value } : item))
                            )
                          }
                        />
                        {receivers.length > 1 ? (
                          <button
                            type="button"
                            className={styles.iconBtn}
                            aria-label="Remove receiver"
                            onClick={() => setReceivers((current) => current.filter((item) => item.id !== receiver.id))}
                          >
                            <X size={16} />
                          </button>
                        ) : null}
                      </div>
                    ))}
                    <button
                      type="button"
                      className={styles.addReceiver}
                      onClick={() => setReceivers((current) => [...current, emptyReceiver()])}
                    >
                      <Plus size={14} />
                      Add receiver
                    </button>
                  </div>

                  {needsEmail ? (
                    <>
                      <label className={styles.field}>
                        <span>Subject</span>
                        <input
                          value={subject}
                          placeholder="Email subject"
                          onFocus={() => {
                            insertTarget.current = "subject";
                          }}
                          onChange={(event) => setSubject(event.target.value)}
                        />
                      </label>
                      <label className={styles.field}>
                        <span>Message</span>
                        <textarea
                          value={body}
                          rows={5}
                          placeholder="Write the email. Click a token to insert it."
                          onFocus={() => {
                            insertTarget.current = "body";
                          }}
                          onChange={(event) => setBody(event.target.value)}
                        />
                      </label>
                      <div className={styles.tokens}>
                        <p>Insert token</p>
                        <div className={styles.tokenRow}>
                          {[...JOB_TOKENS, ...questionTokens].map((token) => (
                            <button key={token} type="button" className={styles.token} onClick={() => insertToken(token)}>
                              {tokenText(token)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : null}
            </section>
          ) : null}

          {attempted && !canCreate ? (
            <p className={styles.error}>Finish {missing.join(", ")} before creating this automation.</p>
          ) : null}
        </div>

        <footer className={styles.footer}>
          <Button type="button" variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" shape="action" onClick={submit}>
            Create automation
          </Button>
        </footer>
      </div>
    </div>
  );
}

function ReceiverValueField({
  receiver,
  isEmail,
  onChange,
}: {
  receiver: Receiver;
  isEmail: boolean;
  onChange: (value: string) => void;
}) {
  if (receiver.type === "targetUser") {
    return <p className={styles.targetHint}>The user who triggered this event.</p>;
  }

  if (receiver.type === "custom") {
    return (
      <label className={styles.field}>
        <span>{isEmail ? "Email" : "Address"}</span>
        <input
          type={isEmail ? "email" : "text"}
          value={receiver.value}
          placeholder={isEmail ? "name@company.com" : "Phone or address"}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  const options =
    receiver.type === "users"
      ? SYSTEM_USERS
      : receiver.type === "roles"
        ? RECEIVER_ROLES
        : receiver.type === "activityUsers"
          ? ACTIVITY_USERS
          : receiver.type === "projectUsers"
            ? PROJECT_USERS
            : receiver.type === "question"
              ? receiverQuestionOptions().map((item) => item.label)
              : [];
  const optionValues =
    receiver.type === "question" ? receiverQuestionOptions().map((item) => item.id) : options;

  if (!receiverNeedsValue(receiver.type) || options.length === 0) return null;

  return (
    <label className={styles.field}>
      <span>
        {receiver.type === "users"
          ? "User"
          : receiver.type === "roles"
            ? "Role"
            : receiver.type === "activityUsers"
              ? "Activity user"
              : receiver.type === "projectUsers"
                ? "Project user"
                : "Question"}
      </span>
      <select value={receiver.value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select</option>
        {options.map((label, index) => (
          <option key={optionValues[index]} value={optionValues[index]}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

type ActivityTypeConditionFieldsProps = {
  operator: string;
  typeId: string;
  typeIds: string[];
  onOperator: (value: string) => void;
  onTypeId: (value: string) => void;
  onToggleType: (id: string) => void;
};

function ActivityTypeConditionFields({
  operator,
  typeId,
  typeIds,
  onOperator,
  onTypeId,
  onToggleType,
}: ActivityTypeConditionFieldsProps) {
  const multi = isMultiTypeOperator(operator);

  return (
    <div className={styles.typeConditionGrid}>
      <label className={styles.field}>
        <span>Operator</span>
        <select value={operator} onChange={(event) => onOperator(event.target.value)}>
          {TYPE_OPERATORS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      {multi ? (
        <div className={styles.field}>
          <span>Activity type</span>
          <div className={styles.typePicks}>
            {ACTIVITY_TYPES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.typePick}
                data-on={typeIds.includes(item.id)}
                onClick={() => onToggleType(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <label className={styles.field}>
          <span>Activity type</span>
          <select value={typeId} onChange={(event) => onTypeId(event.target.value)}>
            <option value="">Select activity type</option>
            {ACTIVITY_TYPES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

type QuestionConditionFieldsProps = {
  activityTypeId: string;
  questionId: string;
  operator: string;
  answer: string;
  answerMode: AnswerMode;
  onQuestion: (value: string) => void;
  onOperator: (value: string) => void;
  onAnswer: (value: string) => void;
  onAnswerMode: (value: AnswerMode) => void;
};

function QuestionConditionFields({
  activityTypeId,
  questionId,
  operator,
  answer,
  answerMode,
  onQuestion,
  onOperator,
  onAnswer,
  onAnswerMode,
}: QuestionConditionFieldsProps) {
  const activityType = ACTIVITY_TYPES.find((item) => item.id === activityTypeId) ?? null;
  const question = activityType?.questions.find((item) => item.id === questionId) ?? null;

  return (
    <div className={styles.conditionGrid}>
      <label className={styles.field}>
        <span>Question</span>
        <select value={questionId} disabled={!activityType} onChange={(event) => onQuestion(event.target.value)}>
          <option value="">{activityType ? "Select question" : "Choose an activity type first"}</option>
          {activityType?.questions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>Operator</span>
        <select value={operator} disabled={answerMode !== "value"} onChange={(event) => onOperator(event.target.value)}>
          {OPERATORS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span>Answer</span>
        {question?.options ? (
          <select
            value={answer}
            disabled={answerMode !== "value" || operator === "is-answered"}
            onChange={(event) => onAnswer(event.target.value)}
          >
            <option value="">Select answer</option>
            {question.options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <input
            value={answer}
            disabled={answerMode !== "value" || operator === "is-answered"}
            placeholder="Specific answer"
            onChange={(event) => onAnswer(event.target.value)}
          />
        )}
      </label>
      <div className={styles.modeRow}>
        <button
          type="button"
          className={styles.mode}
          data-on={answerMode === "issue"}
          onClick={() => onAnswerMode(answerMode === "issue" ? "value" : "issue")}
        >
          Issue
        </button>
        <button
          type="button"
          className={styles.mode}
          data-on={answerMode === "any"}
          onClick={() => onAnswerMode(answerMode === "any" ? "value" : "any")}
        >
          Any
        </button>
      </div>
    </div>
  );
}
