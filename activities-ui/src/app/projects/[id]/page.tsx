"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Checkbox } from "@/design-system";
import {
  Briefcase,
  Calendar,
  Download,
  FileText,
  Mail,
  MoreVertical,
  Plus,
  Search,
  Shield,
  Tool,
  Truck,
} from "react-feather";
import CreateNewPopup from "../../activities/CreateNewPopup";
import { NavLabel, navItems } from "../../navItems";
import {
  AUTHORIZATION_OPTIONS,
  CUSTOMER_OPTIONS,
  ELEMENT_OPTIONS,
  FieldTone,
  getProject,
  MATERIAL_OPTIONS,
  METHOD_OPTIONS,
  MIX_OPTIONS,
  Project,
  ProjectActivity,
  QUOTE_FIX_OPTIONS,
  WorkflowStatus,
} from "../data";
import chrome from "../styles.module.css";
import styles from "./page.module.css";
import {
  cloneProject,
  ContactsEditor,
  CONTRACT_OPTIONS,
  FilesEditor,
  HeroEditor,
  ListFieldEditor,
  PROJECT_STATUS_OPTIONS,
  projectStatusTone,
  TextFieldEditor,
} from "./ProjectEditors";

type TabKey = "overview" | "activities";

const WORKFLOW_STATUSES: WorkflowStatus[] = ["In Progress", "To Review", "Confirmed", "Done"];

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function ActivityGlyph({ icon, size = 18 }: { icon: string; size?: number }) {
  const props = { size, strokeWidth: 2 };
  if (icon === "truck") return <Truck {...props} />;
  if (icon === "link") return <FileText {...props} />;
  if (icon === "tool") return <Tool {...props} />;
  return <Briefcase {...props} />;
}

function exportWorkDiaries(projectName: string, activities: ProjectActivity[]) {
  const rows = activities
    .map(
      (activity) => `
        <tr>
          <td>${activity.dateLabel}</td>
          <td>#${activity.number}</td>
          <td>${activity.type}</td>
          <td>${activity.status}</td>
          <td>${activity.note ?? "—"}</td>
          <td>${activity.assignee ?? "—"}</td>
        </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>Work diaries — ${projectName}</title>
      <style>
        body { font-family: Rubik, Arial, sans-serif; padding: 32px; color: #2f3036; }
        h1 { font-size: 22px; margin: 0 0 8px; }
        p { color: #868fa0; margin: 0 0 24px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #e6e9ef; font-size: 13px; }
        th { color: #868fa0; font-weight: 600; }
      </style>
    </head>
    <body>
      <h1>Work diaries</h1>
      <p>${projectName} · ${activities.length} activities</p>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>ID</th><th>Type</th><th>Status</th><th>Note</th><th>Assignee</th>
          </tr>
        </thead>
        <tbody>${rows || `<tr><td colspan="6">No activities</td></tr>`}</tbody>
      </table>
    </body>
  </html>`;

  const popup = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
  if (!popup) return;
  popup.document.write(html);
  popup.document.close();
  popup.focus();
  popup.print();
}

function goToPreviousPage(router: ReturnType<typeof useRouter>, fallback = "/projects") {
  const referrer = document.referrer;
  let sameOriginReferrer = false;
  if (referrer) {
    try {
      sameOriginReferrer = new URL(referrer).origin === window.location.origin;
    } catch {
      sameOriginReferrer = false;
    }
  }

  // Empty referrer is normal for in-app Next.js navigations.
  if ((sameOriginReferrer || !referrer) && window.history.length > 1) {
    router.back();
    return;
  }

  router.push(fallback);
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const source = getProject(params.id);
  const [draft, setDraft] = useState<Project | null>(() => (source ? cloneProject(source) : null));
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("overview");
  const [search, setSearch] = useState("");
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState<WorkflowStatus[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const project = draft;

  useEffect(() => {
    setDraft(source ? cloneProject(source) : null);
    setEditingKey(null);
    setSelectedIds([]);
    setTypeFilters([]);
    setStatusFilters([]);
    setSearch("");
  }, [source?.id]);

  function patch(partial: Partial<Project>) {
    setDraft((current) => (current ? { ...current, ...partial } : current));
    setEditingKey(null);
  }

  const activityTypes = useMemo(() => {
    if (!project) return [];
    return Array.from(new Set(project.activities.map((activity) => activity.type)));
  }, [project]);

  const activityStatuses = useMemo(() => {
    if (!project) return [];
    return Array.from(new Set(project.activities.map((activity) => activity.status)));
  }, [project]);

  const filteredActivities = useMemo(() => {
    if (!project) return [];
    const lower = search.toLowerCase();
    return project.activities.filter((activity) => {
      const matchesSearch = [activity.number, activity.title, activity.type, activity.status, activity.note ?? ""].some(
        (value) => value.toLowerCase().includes(lower)
      );
      const matchesType = typeFilters.length === 0 || typeFilters.includes(activity.type);
      const matchesStatus = statusFilters.length === 0 || statusFilters.includes(activity.status);
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [project, search, typeFilters, statusFilters]);

  const selectedActivities = useMemo(() => {
    if (!project) return [];
    return project.activities.filter((activity) => selectedIds.includes(activity.id));
  }, [project, selectedIds]);

  const statusCounts = useMemo(() => {
    const counts: Record<WorkflowStatus, number> = {
      "In Progress": 0,
      "To Review": 0,
      Confirmed: 0,
      Done: 0,
    };
    project?.activities.forEach((activity) => {
      counts[activity.status] += 1;
    });
    return counts;
  }, [project]);

  const quoteTone: FieldTone =
    project?.contractStatus === "Signed Contract"
      ? "ok"
      : project?.contractStatus === "No Contract"
        ? "pending"
        : "missing";

  if (!project) {
    return (
      <div className={chrome.pageWrapper}>
        <header className={chrome.topHeader}>
          <div className={chrome.topHeaderContent}>
            <button type="button" className={chrome.backLink} onClick={() => goToPreviousPage(router)}>
              ← Back
            </button>
            <h1 className={chrome.topHeaderTitle}>Project</h1>
          </div>
        </header>
        <aside className={chrome.sidebar}>
          <div className={chrome.userBlock}>
            <div className={chrome.avatar}>UF</div>
            <div className={chrome.userName}>User Full Name</div>
          </div>
        </aside>
        <main className={chrome.main}>
          <p className={styles.missing}>This project was not found.</p>
          <button type="button" className={chrome.backLink} onClick={() => goToPreviousPage(router)}>
            ← Back
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className={chrome.pageWrapper}>
      <header className={chrome.topHeader}>
        <div className={chrome.topHeaderContent}>
          <button type="button" className={chrome.backLink} onClick={() => goToPreviousPage(router)}>
            ← Back
          </button>
          <h1 className={chrome.topHeaderTitle}>Project</h1>
        </div>
      </header>

      <aside className={chrome.sidebar}>
        <div className={chrome.userBlock}>
          <div className={chrome.avatar}>UF</div>
          <div className={chrome.userName}>User Full Name</div>
        </div>
        <nav className={chrome.menu}>
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Projects" ? chrome.menuItemActive : chrome.menuItem}
              >
                <NavLabel item={item} />
              </Link>
            ) : (
              <div key={item.label} className={chrome.menuItem}>
                <NavLabel item={item} />
              </div>
            )
          )}
        </nav>
        <div className={chrome.createWrap}>
          <Button
            variant="primary"
            size="md"
            className={chrome.createBtn}
            onClick={() => setIsCreatePopupOpen(true)}
          >
            + Create New
          </Button>
        </div>
      </aside>

      <main className={`${chrome.main} ${styles.main}`}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={tab === "overview" ? styles.tabActive : styles.tab}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            type="button"
            className={tab === "activities" ? styles.tabActive : styles.tab}
            onClick={() => setTab("activities")}
          >
            Activities
            <span className={styles.tabCount}>{project.activities.length}</span>
          </button>
        </div>

        {tab === "overview" ? (
          <div className={editingKey ? styles.overviewEditing : undefined}>
            <section
              className={`${styles.hero} ${editingKey === "hero" ? styles.fieldEditing : ""}`}
              data-tone={project.thumbTone}
            >
              <div className={styles.heroShade} />
              <HeroEditor
                name={project.name}
                projectNumber={project.projectNumber}
                team={project.team}
                editing={editingKey === "hero"}
                onEdit={() => setEditingKey("hero")}
                onCancel={() => setEditingKey(null)}
                onSave={(next) => patch(next)}
              />
              {editingKey === "hero" ? null : (
                <>
                  <div className={styles.heroBody}>
                    <span className={styles.heroId}>#{project.projectNumber}</span>
                    <h2 className={styles.heroTitle}>{project.name}</h2>
                  </div>
                  <div className={styles.heroTeam}>
                    {project.team.map((initials) => (
                      <span key={initials} className={styles.teamBadge}>
                        {initials}
                      </span>
                    ))}
                    <button
                      type="button"
                      className={styles.teamAdd}
                      aria-label="Add team member"
                      onClick={() => setEditingKey("hero")}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </>
              )}
            </section>

            <section className={styles.fields}>
              <TextFieldEditor
                label="Address"
                tone={project.address ? "pending" : "missing"}
                value={project.address}
                editing={editingKey === "address"}
                onEdit={() => setEditingKey("address")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) => patch({ address: value as string | null })}
              />
              <TextFieldEditor
                label="City"
                tone={project.city ? "ok" : "missing"}
                value={project.city}
                editing={editingKey === "city"}
                onEdit={() => setEditingKey("city")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) => patch({ city: value as string | null })}
              />
              <TextFieldEditor
                label="Quote Status"
                tone={quoteTone}
                value={project.contractStatus}
                kind="select"
                options={[...CONTRACT_OPTIONS]}
                statusAttr={project.contractStatus ?? "None"}
                editing={editingKey === "contractStatus"}
                onEdit={() => setEditingKey("contractStatus")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) =>
                  patch({ contractStatus: (value as Project["contractStatus"]) ?? null })
                }
              />
              <TextFieldEditor
                label="Buildings in Project"
                tone={project.buildingsCount ? "ok" : "missing"}
                value={project.buildingsCount}
                kind="number"
                editing={editingKey === "buildingsCount"}
                onEdit={() => setEditingKey("buildingsCount")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) => patch({ buildingsCount: Number(value) || 0 })}
              />
              <TextFieldEditor
                label="Project Status"
                tone={project.projectStatusTone}
                value={project.projectStatus}
                kind="select"
                options={PROJECT_STATUS_OPTIONS}
                editing={editingKey === "projectStatus"}
                onEdit={() => setEditingKey("projectStatus")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) => {
                  const status = String(value || project.projectStatus);
                  patch({ projectStatus: status, projectStatusTone: projectStatusTone(status) });
                }}
              />
              <TextFieldEditor
                label="Start Date"
                tone={project.startDate ? "ok" : "missing"}
                value={project.startDate}
                kind="date"
                editing={editingKey === "startDate"}
                onEdit={() => setEditingKey("startDate")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) => patch({ startDate: value as string | null })}
              />
              <TextFieldEditor
                label="Project Operator"
                tone={project.operator ? "ok" : "missing"}
                value={project.operator}
                editing={editingKey === "operator"}
                onEdit={() => setEditingKey("operator")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) => patch({ operator: value as string | null })}
              />
              <TextFieldEditor
                label="Developer"
                tone={project.developer ? "ok" : "missing"}
                value={project.developer}
                editing={editingKey === "developer"}
                onEdit={() => setEditingKey("developer")}
                onCancel={() => setEditingKey(null)}
                onSave={(value) => patch({ developer: value as string | null })}
              />
              <ListFieldEditor
                label="Elements"
                tone={project.elements.length ? "ok" : "missing"}
                values={project.elements}
                options={ELEMENT_OPTIONS}
                editing={editingKey === "elements"}
                onEdit={() => setEditingKey("elements")}
                onCancel={() => setEditingKey(null)}
                onSave={(values) => patch({ elements: values })}
              />
              <ListFieldEditor
                label="Mixes"
                tone={project.mixes.length ? "ok" : "missing"}
                values={project.mixes}
                options={MIX_OPTIONS}
                editing={editingKey === "mixes"}
                onEdit={() => setEditingKey("mixes")}
                onCancel={() => setEditingKey(null)}
                onSave={(values) => patch({ mixes: values })}
              />
              <ListFieldEditor
                label="Work Methods"
                tone={project.methods.length ? "ok" : "missing"}
                values={project.methods}
                options={METHOD_OPTIONS}
                editing={editingKey === "methods"}
                onEdit={() => setEditingKey("methods")}
                onCancel={() => setEditingKey(null)}
                onSave={(values) => patch({ methods: values })}
              />
              <ListFieldEditor
                label="Customers"
                tone={project.customers.length ? "ok" : "missing"}
                values={project.customers}
                options={CUSTOMER_OPTIONS}
                editing={editingKey === "customers"}
                onEdit={() => setEditingKey("customers")}
                onCancel={() => setEditingKey(null)}
                onSave={(values) => patch({ customers: values })}
              />
            </section>

            <section className={styles.cards}>
              <ContactsEditor
                contacts={project.contacts}
                editing={editingKey === "contacts"}
                onEdit={() => setEditingKey("contacts")}
                onCancel={() => setEditingKey(null)}
                onSave={(contacts) => patch({ contacts })}
              />
              <FilesEditor
                files={project.files}
                editing={editingKey === "files"}
                onEdit={() => setEditingKey("files")}
                onCancel={() => setEditingKey(null)}
                onSave={(files) => patch({ files })}
              />
              <ListFieldEditor
                label="Authorizations"
                tone="ok"
                variant="card"
                values={project.authorizations}
                options={AUTHORIZATION_OPTIONS}
                editing={editingKey === "authorizations"}
                onEdit={() => setEditingKey("authorizations")}
                onCancel={() => setEditingKey(null)}
                onSave={(values) => patch({ authorizations: values })}
              />
              <ListFieldEditor
                label="Quote — Fixes"
                tone="ok"
                variant="card"
                values={project.quoteFixes}
                options={QUOTE_FIX_OPTIONS}
                editing={editingKey === "quoteFixes"}
                onEdit={() => setEditingKey("quoteFixes")}
                onCancel={() => setEditingKey(null)}
                onSave={(values) => patch({ quoteFixes: values })}
              />
              <ListFieldEditor
                label="Fix Materials"
                tone="ok"
                variant="card"
                values={project.materials}
                options={MATERIAL_OPTIONS}
                editing={editingKey === "materials"}
                onEdit={() => setEditingKey("materials")}
                onCancel={() => setEditingKey(null)}
                onSave={(values) => patch({ materials: values })}
              />
              <article className={styles.card}>
                <div className={styles.cardHead}>
                  <h3>Actions</h3>
                </div>
                <div className={styles.actionStack}>
                  <button type="button" className={styles.actionBtn}>
                    <Calendar size={16} /> Diary
                  </button>
                  <button type="button" className={styles.actionBtn}>
                    <Shield size={16} /> Permits & Report Approval
                  </button>
                  <button type="button" className={styles.actionBtn}>
                    <Mail size={16} /> Send Report Email
                  </button>
                </div>
              </article>
            </section>
          </div>
        ) : (
          <>
            <section className={styles.statusSummary}>
              <span className={styles.summaryLabel}>Activities by status</span>
              <div className={styles.statusPills}>
                {WORKFLOW_STATUSES.map((status) => (
                  <span key={status} className={styles.statusPill} data-status={status}>
                    <strong>{statusCounts[status]}</strong>
                    <span>{status}</span>
                  </span>
                ))}
              </div>
            </section>

            <div className={styles.toolbar}>
              <div className={styles.searchWrap}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  placeholder="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <Button
                variant="tertiary"
                icon={Download}
                iconSize={18}
                disabled={selectedActivities.length === 0}
                onClick={() => exportWorkDiaries(project.name, selectedActivities)}
              >
                Export work diaries PDF
              </Button>
            </div>

            <div className={styles.filterBlock}>
              <span className={styles.filterLabel}>Type</span>
              <div className={styles.filterRow}>
                <button
                  type="button"
                  className={typeFilters.length === 0 ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setTypeFilters([])}
                >
                  All
                </button>
                {activityTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={typeFilters.includes(type) ? styles.filterChipActive : styles.filterChip}
                    onClick={() => setTypeFilters(toggleValue(typeFilters, type))}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterBlock}>
              <span className={styles.filterLabel}>Status</span>
              <div className={styles.filterRow}>
                <button
                  type="button"
                  className={statusFilters.length === 0 ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setStatusFilters([])}
                >
                  All
                </button>
                {activityStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={statusFilters.includes(status) ? styles.filterChipActive : styles.filterChip}
                    onClick={() => setStatusFilters(toggleValue(statusFilters, status))}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.counter}>
              {filteredActivities.length} | {project.activities.length}
            </div>

            {filteredActivities.length === 0 ? (
              <div className={styles.empty}>No activities match these filters.</div>
            ) : (
              <div className={styles.activityTable}>
                <div className={styles.activityHeader}>
                  <div className={styles.activityCheckbox} />
                  <div className={styles.activityGrid}>
                    <div className={styles.activityIconCol} />
                    <div className={styles.activityDate}>Date & Time</div>
                    <div className={styles.activityDetails}>Project Name</div>
                    <div className={styles.activityStatus}>Status</div>
                    <div className={styles.activityPeople}>Assignee</div>
                    <div className={styles.activityMenu} />
                  </div>
                </div>
                {filteredActivities.map((activity) => {
                  const selected = selectedIds.includes(activity.id);
                  return (
                    <div
                      key={activity.id}
                      className={`${styles.activityWrapper} ${selected ? styles.activitySelected : ""}`}
                      data-status={activity.status}
                    >
                      <div className={styles.activityCheckbox}>
                        <Checkbox
                          size="md"
                          checked={selected}
                          onChange={() => setSelectedIds(toggleValue(selectedIds, activity.id))}
                        />
                      </div>
                      <Link href="/activities" className={styles.activityCard}>
                        <div className={styles.activityGrid}>
                          <div className={styles.activityIconCol}>
                            <div className={styles.iconWrap}>
                              <span className={styles.activityIcon}>
                                <ActivityGlyph icon={activity.icon} size={18} />
                              </span>
                              <span className={styles.iconId}>#{activity.number}</span>
                            </div>
                          </div>
                          <div className={styles.activityDate}>{activity.dateLabel}</div>
                          <div className={styles.activityDetails}>
                            <div className={styles.activityType}>{activity.type}</div>
                            <div className={styles.activityProject}>{activity.title}</div>
                          </div>
                          <div className={styles.activityStatus} data-status={activity.status}>
                            {activity.status}
                          </div>
                          <div className={styles.activityPeople}>
                            {activity.assignee ? (
                              <span className={styles.assignee}>{activity.assignee}</span>
                            ) : null}
                          </div>
                          <div className={styles.activityMenu}>
                            <MoreVertical size={20} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />
    </div>
  );
}
