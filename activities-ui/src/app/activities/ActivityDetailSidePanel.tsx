"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Activity } from "@/types";
import { displayValue, getProjectForActivity } from "../projects/data";
import {
  Briefcase,
  Calendar,
  Check,
  FileText,
  Paperclip,
  Phone,
  Tool,
  Truck,
  Users,
  X,
  Link as LinkIcon,
} from "react-feather";
import ActivityActionsMenu from "./ActivityActionsMenu";
import ActivityAnswerWizard from "./ActivityAnswerWizard";
import { ActivityQuestions, type AnswerValue } from "./ActivityQuestions";
import styles from "./ActivityDetailSidePanel.module.css";

type TabId = "qa" | "project" | "files";

interface ActivityDetailSidePanelProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

function ActivityGlyph({ icon, size = 18 }: { icon: string; size?: number }) {
  const props = { size, strokeWidth: 2 };
  if (icon === "truck") return <Truck {...props} />;
  if (icon === "link") return <LinkIcon {...props} />;
  if (icon === "tool") return <Tool {...props} />;
  return <Briefcase {...props} />;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(date.getUTCFullYear()).slice(2);
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yy}, ${hh}:${min}`;
}

function statusClass(status: string) {
  const key = status.replace(/\s+/g, "");
  return `status${key}`;
}

export default function ActivityDetailSidePanel({
  activity,
  isOpen,
  onClose,
}: ActivityDetailSidePanelProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("qa");
  const [editing, setEditing] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const bodyRef = useRef<HTMLDivElement>(null);

  const project = useMemo(
    () => (activity ? getProjectForActivity(activity.projectName) : null),
    [activity]
  );

  useEffect(() => {
    setTab("qa");
    setEditing(false);
    setAnswering(false);
    setIsMenuOpen(false);
    if (!activity) return;
    const next: Record<string, AnswerValue> = {};
    for (const question of activity.questions) {
      next[question.id] = question.answer;
    }
    setAnswers(next);
  }, [activity]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [tab, editing, activity?.id]);

  if (!activity || !isOpen || !project) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside className={styles.panel} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className={styles.toolbar}>
          <button type="button" className={styles.iconButton} aria-label="Close activity" onClick={onClose}>
            <X size={18} />
          </button>
          <ActivityActionsMenu
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            iconSize={18}
            buttonClassName={styles.iconButton}
          />
        </div>

        <div className={styles.hero}>
          <div className={styles.typeChip}>
            <span className={styles.typeIcon}>
              <ActivityGlyph icon={activity.icon} size={14} />
            </span>
            {activity.activityType}
          </div>
          <h2 className={styles.title}>{activity.projectName}</h2>
          <div className={styles.heroTop}>
            <span className={`${styles.statusChip} ${styles[statusClass(activity.status) as keyof typeof styles] ?? ""}`}>
              {activity.status}
            </span>
            <span className={styles.jobId}>#{activity.id.padStart(6, "0")}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaChip}>
              <Calendar size={14} />
              {formatDate(activity.dateTime)}
            </span>
            <span className={styles.metaChip}>
              <Users size={14} />
              {activity.assignees.length} {activity.assignees.length === 1 ? "assignee" : "assignees"}
            </span>
            <div className={styles.assignees}>
              {activity.assignees.map((assignee) => (
                <span key={assignee} className={styles.avatar}>
                  {assignee}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.tabs} role="tablist">
          {(
            [
              ["qa", "Q&A"],
              ["project", "Project details"],
              ["files", "Files"],
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
              onEditingChange={setEditing}
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
                  ["Address", project.address],
                  ["City", project.city],
                  ["Project status", project.projectStatus],
                  ["Quote status", project.contractStatus],
                  ["Buildings", project.buildingsCount || "—"],
                  ["Start date", project.startDate],
                  ["Operator", project.operator],
                  ["Developer", project.developer],
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
                  Open project
                </Link>
              ) : null}
            </div>
          ) : null}

          {tab === "files" ? (
            <div className={styles.emptyFiles}>
              <span className={styles.emptyIcon}>
                <Paperclip size={20} />
              </span>
              <p>No files attached yet</p>
              <span>Files added to this activity will show up here.</span>
            </div>
          ) : null}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.secondaryButton}>
            Approve
          </button>
          <button type="button" className={styles.primaryButton} onClick={() => setAnswering(true)}>
            <Check size={16} />
            Answer all
          </button>
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
    </div>
  );
}
