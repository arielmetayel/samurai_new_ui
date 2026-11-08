"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Activity } from "@/types";
import { displayValue, getProjectForActivity } from "../projects/data";
import {
  Briefcase,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Paperclip,
  Phone,
  Plus,
  Tool,
  Truck,
  X,
  Link as LinkIcon,
} from "react-feather";
import { Button, Overlay, StatusChip, filterStatusColor } from "@/design-system";
import { useI18n } from "@/i18n";
import ActivityActionsMenu from "./ActivityActionsMenu";
import ActivityAnswerWizard from "./ActivityAnswerWizard";
import { ActivityQuestions, type AnswerValue } from "./ActivityQuestions";
import { STATUS_OPTIONS, USER_OPTIONS } from "./FilterActivitiesPopup";
import styles from "./ActivityDetailSidePanel.module.css";

type TabId = "qa" | "project" | "files";

interface ActivityDetailSidePanelProps {
  activity: Activity | null;
  activities?: Activity[];
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (activity: Activity) => void;
}

function ActivityGlyph({ icon, size = 18 }: { icon: string; size?: number }) {
  const props = { size, strokeWidth: 2 };
  if (icon === "truck") return <Truck {...props} />;
  if (icon === "link") return <LinkIcon {...props} />;
  if (icon === "tool") return <Tool {...props} />;
  return <Briefcase {...props} />;
}

function formatDateParts(iso: string) {
  const date = new Date(iso);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(2);
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return { day: `${dd}/${mm}/${yy}`, time: `${hh}:${min}` };
}

export default function ActivityDetailSidePanel({
  activity,
  activities = [],
  isOpen,
  onClose,
  onSelect,
}: ActivityDetailSidePanelProps) {
  const { t, localize, dir } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("qa");
  const [editing, setEditing] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [assignees, setAssignees] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const addRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const project = useMemo(
    () => (activity ? getProjectForActivity(activity.projectName) : null),
    [activity]
  );

  useEffect(() => {
    setTab("qa");
    setEditing(false);
    setAnswering(false);
    setIsMenuOpen(false);
    setAddOpen(false);
    setStatusOpen(false);
    if (!activity) return;
    setAssignees([...activity.assignees]);
    setStatus(activity.status);
    const next: Record<string, AnswerValue> = {};
    for (const question of activity.questions) {
      next[question.id] = question.answer;
    }
    setAnswers(next);
  }, [activity]);

  useEffect(() => {
    if (!addOpen && !statusOpen) return;
    function onDoc(event: MouseEvent) {
      const target = event.target as Node;
      if (addOpen && !addRef.current?.contains(target)) setAddOpen(false);
      if (statusOpen && !statusRef.current?.contains(target)) setStatusOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [addOpen, statusOpen]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [tab, editing, activity?.id]);

  if (!activity || !project) return null;

  const dateParts = formatDateParts(activity.dateTime);
  const currentIndex = activities.findIndex((item) => item.id === activity.id);
  const prevActivity = currentIndex > 0 ? activities[currentIndex - 1] : null;
  const nextActivity = currentIndex >= 0 && currentIndex < activities.length - 1
    ? activities[currentIndex + 1]
    : null;
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <Overlay open={isOpen} onClose={onClose} placement="end">
      <aside className={styles.panel} role="dialog" aria-modal="true">
        <div className={styles.toolbar}>
          <button type="button" className={styles.iconButton} aria-label={t("panel.close")} onClick={onClose}>
            <X size={18} />
          </button>
          {onSelect ? (
            <div className={styles.navButtons}>
              <button
                type="button"
                className={styles.iconButton}
                aria-label={t("panel.prev")}
                disabled={!prevActivity}
                onClick={() => prevActivity && onSelect(prevActivity)}
              >
                <PrevIcon size={18} />
              </button>
              <button
                type="button"
                className={styles.iconButton}
                aria-label={t("panel.next")}
                disabled={!nextActivity}
                onClick={() => nextActivity && onSelect(nextActivity)}
              >
                <NextIcon size={18} />
              </button>
            </div>
          ) : null}
          <ActivityActionsMenu
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            iconSize={18}
            buttonClassName={styles.iconButton}
            onFiles={() => setTab("files")}
          />
        </div>

        <div className={styles.hero}>
          <div className={styles.heroTop}>
            <div className={styles.statusWrap} ref={statusRef}>
              <button
                type="button"
                className={styles.statusTrigger}
                aria-label={t("panel.changeStatus")}
                aria-haspopup="listbox"
                aria-expanded={statusOpen}
                onClick={() => setStatusOpen((open) => !open)}
              >
                <StatusChip color={filterStatusColor(status)}>
                  {localize(status)}
                </StatusChip>
                <ChevronDown size={16} className={statusOpen ? styles.statusChevronOpen : undefined} />
              </button>
              {statusOpen ? (
                <div className={styles.statusMenu} role="listbox" aria-label={t("panel.changeStatus")}>
                  {STATUS_OPTIONS.map((option) => (
                    <StatusChip
                      key={option}
                      className={styles.statusOption}
                      color={filterStatusColor(option)}
                      selected={option === status}
                      onClick={() => {
                        setStatus(option);
                        setStatusOpen(false);
                      }}
                    >
                      {localize(option)}
                    </StatusChip>
                  ))}
                </div>
              ) : null}
            </div>
            <span className={styles.jobId}>{localize(activity.activityType)}</span>
          </div>
          <div className={styles.titleRow}>
            <span className={styles.titleIcon}>
              <ActivityGlyph icon={activity.icon} size={22} />
            </span>
            <h2 className={styles.title}>{activity.projectName}</h2>
          </div>
          <p className={styles.dateLine} dir="ltr">
            {dateParts.day} · {dateParts.time}
          </p>
          <div className={styles.peopleRow}>
            <div className={styles.assignees}>
              {assignees.map((assignee) => (
                <span key={assignee} className={styles.avatar}>
                  {assignee}
                </span>
              ))}
            </div>
            <div className={styles.addWrap} ref={addRef}>
              <button
                type="button"
                className={styles.addAssignee}
                aria-label={t("panel.addAssignee")}
                aria-expanded={addOpen}
                onClick={() => setAddOpen((open) => !open)}
              >
                <Plus size={16} />
              </button>
              {addOpen ? (
                <div className={styles.addMenu} role="listbox">
                  {USER_OPTIONS.filter((user) => !assignees.includes(user)).length === 0 ? (
                    <div className={styles.addEmpty}>{t("panel.noAssignees")}</div>
                  ) : (
                    USER_OPTIONS.filter((user) => !assignees.includes(user)).map((user) => (
                      <button
                        key={user}
                        type="button"
                        className={styles.addOption}
                        onClick={() => {
                          setAssignees((current) => [...current, user]);
                          setAddOpen(false);
                        }}
                      >
                        <span className={styles.avatar}>{user}</span>
                        {user}
                      </button>
                    ))
                  )}
                </div>
              ) : null}
            </div>
            <span className={styles.assigneeCount}>{assignees.length}</span>
            <span className={styles.jobId}>#{activity.id.padStart(6, "0")}</span>
          </div>
        </div>

        <div className={styles.tabs} role="tablist">
          {(
            [
              ["qa", t("panel.qa")],
              ["project", t("panel.project")],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`${styles.tab} ${tab === id ? styles.tabActive : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.body} ref={bodyRef}>
          {tab === "qa" ? (
            <ActivityQuestions
              activity={activity}
              project={project}
              answers={answers}
              editing={editing}
              onAnswersChange={setAnswers}
            />
          ) : null}

          {tab === "project" ? (
            <div className={styles.projectList}>
              <div className={styles.projectHero}>
                <span className={styles.jobId}>#{project.projectNumber}</span>
                <strong>{project.name}</strong>
              </div>

              <div className={styles.projectFields}>
                {[
                  [t("table.address"), project.address],
                  [t("panel.city"), project.city],
                  [t("panel.projectStatus"), localize(project.projectStatus ?? "")],
                  [t("panel.quoteStatus"), localize(project.contractStatus ?? "")],
                  [t("panel.buildings"), project.buildingsCount || "—"],
                  [t("panel.startDate"), project.startDate],
                  [t("panel.operator"), project.operator],
                  [t("panel.developer"), project.developer],
                ].map(([label, value]) => (
                  <div key={String(label)} className={styles.projectField}>
                    <small>{label}</small>
                    <strong>{displayValue(value)}</strong>
                  </div>
                ))}
              </div>

              {project.elements.length ? (
                <div className={styles.projectBlock}>
                  <div className={styles.sectionHead}>
                    <span>Elements</span>
                  </div>
                  <div className={styles.chipRow}>
                    {project.elements.map((item) => (
                      <span key={item} className={styles.chip}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.contacts.length ? (
                <div className={styles.projectBlock}>
                  <div className={styles.sectionHead}>
                    <span>Contacts</span>
                    <small>{project.contacts.length}</small>
                  </div>
                  {project.contacts.map((contact) => (
                    <div key={`${contact.name}-${contact.role}`} className={styles.contactCard}>
                      <strong>{contact.name}</strong>
                      <span>{contact.role}</span>
                      <span>
                        <Phone size={12} /> {contact.phone}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}

              {project.files.length ? (
                <div className={styles.projectBlock}>
                  <div className={styles.sectionHead}>
                    <span>Project files</span>
                    <small>{project.files.length}</small>
                  </div>
                  {project.files.map((file) => (
                    <div key={file.id} className={styles.fileRow}>
                      <FileText size={16} />
                      <span>{file.name}</span>
                      <small>{file.size}</small>
                    </div>
                  ))}
                </div>
              ) : null}

              {project.id ? (
                <Link href={`/projects/${project.id}`} className={styles.projectLink}>
                  {t("panel.openProject")}
                </Link>
              ) : null}
            </div>
          ) : null}

          {tab === "files" ? (
            <div className={styles.filesPane}>
              <div className={styles.sectionHead}>
                <span>{t("panel.files")}</span>
              </div>
              <div className={styles.emptyFiles}>
                <span className={styles.emptyIcon}>
                  <Paperclip size={20} />
                </span>
                <p>{t("panel.emptyFilesTitle")}</p>
                <span>{t("panel.emptyFilesHint")}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.footer}>
          <Button
            type="button"
            variant="tertiary"
            className={styles.footerBtn}
            onClick={() => {
              setEditing((current) => !current);
              setTab("qa");
            }}
          >
            {editing ? t("panel.doneEditing") : t("panel.edit")}
          </Button>
          <Button
            type="button"
            variant="primary"
            shape="action"
            className={styles.footerBtn}
            icon={Check}
            onClick={() => setAnswering(true)}
          >
            {t("panel.answerAll")}
          </Button>
        </div>
      </aside>

      {answering ? (
        <ActivityAnswerWizard
          activity={activity}
          project={project}
          answers={answers}
          onClose={() => setAnswering(false)}
          onComplete={(next) => {
            setAnswers(next);
            setEditing(false);
            setTab("qa");
            setAnswering(false);
          }}
        />
      ) : null}
    </Overlay>
  );
}
