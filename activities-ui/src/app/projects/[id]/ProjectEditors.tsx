"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/design-system";
import { Box, Check, Edit2, FileText, Image, Plus, Search, Trash2, X } from "react-feather";
import { Contact, FieldTone, Project, ProjectFile } from "../data";
import styles from "./page.module.css";

export function FieldDot({ tone }: { tone: FieldTone }) {
  return <span className={styles.dot} data-tone={tone} />;
}

export function cloneProject(project: Project): Project {
  return {
    ...project,
    elements: [...project.elements],
    mixes: [...project.mixes],
    methods: [...project.methods],
    customers: [...project.customers],
    assignees: [...project.assignees],
    tags: [...project.tags],
    team: [...project.team],
    contacts: project.contacts.map((contact) => ({ ...contact })),
    files: project.files.map((file) => ({ ...file })),
    authorizations: [...project.authorizations],
    quoteFixes: [...project.quoteFixes],
    materials: [...project.materials],
    activities: project.activities.map((activity) => ({ ...activity })),
  };
}

export const CONTRACT_OPTIONS = ["Signed Contract", "No Contract"] as const;
export const PROJECT_STATUS_OPTIONS = ["Draft", "Quote", "Open", "In Progress", "On Hold", "Confirmed"];

export function projectStatusTone(status: string): FieldTone {
  if (status === "In Progress" || status === "Confirmed") return "ok";
  if (status === "On Hold") return "missing";
  return "pending";
}

export function displayToIso(value: string | null): string {
  if (!value) return "";
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{2})$/);
  if (!match) return "";
  return `20${match[3]}-${match[2]}-${match[1]}`;
}

export function isoToDisplay(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "";
  return `${day}/${month}/${year.slice(2)}`;
}

function useScrollWhenEditing<T extends HTMLElement>(editing: boolean) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (editing) ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [editing]);
  return ref;
}

function EditButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className={styles.fieldEditBtn} onClick={onClick} aria-label={`Edit ${label}`}>
      <Edit2 size={14} />
    </button>
  );
}

function EditorActions({
  onSave,
  onCancel,
  disableSave,
}: {
  onSave: () => void;
  onCancel: () => void;
  disableSave?: boolean;
}) {
  return (
    <div className={styles.editActions}>
      <button type="button" className={styles.editCancel} onClick={onCancel}>
        Cancel
      </button>
      <button type="button" className={styles.editSave} disabled={disableSave} onClick={onSave}>
        Save
      </button>
    </div>
  );
}

export function TextFieldEditor({
  label,
  tone,
  value,
  kind = "text",
  options,
  statusAttr,
  editing,
  onEdit,
  onCancel,
  onSave,
}: {
  label: string;
  tone: FieldTone;
  value: string | number | null;
  kind?: "text" | "number" | "date" | "select";
  options?: string[];
  statusAttr?: string;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (value: string | number | null) => void;
}) {
  const [local, setLocal] = useState("");
  const boxRef = useScrollWhenEditing<HTMLDivElement>(editing);

  useEffect(() => {
    if (!editing) return;
    if (kind === "date") {
      setLocal(displayToIso(value == null ? null : String(value)));
      return;
    }
    setLocal(value == null ? "" : String(value));
  }, [editing, kind, value]);

  function commit() {
    const trimmed = local.trim();
    if (kind === "number") {
      onSave(trimmed === "" ? 0 : Number(trimmed));
      return;
    }
    if (kind === "date") {
      onSave(trimmed ? isoToDisplay(trimmed) : null);
      return;
    }
    if (kind === "select") {
      onSave(trimmed === "" ? null : trimmed);
      return;
    }
    onSave(trimmed === "" ? null : trimmed);
  }

  return (
    <div ref={boxRef} className={`${styles.field} ${editing ? styles.fieldEditing : ""}`}>
      <div className={styles.fieldHead}>
        <div className={styles.fieldLabel}>
          <FieldDot tone={tone} />
          {label}
        </div>
        {editing ? null : <EditButton label={label} onClick={onEdit} />}
      </div>
      {editing ? (
        <div className={styles.editBox}>
          {kind === "select" ? (
            <select
              className={styles.editSelect}
              value={local}
              onChange={(event) => setLocal(event.target.value)}
              aria-label={label}
            >
              <option value="">—</option>
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={styles.editInput}
              type={kind === "number" ? "number" : kind === "date" ? "date" : "text"}
              value={local}
              min={kind === "number" ? 0 : undefined}
              onChange={(event) => setLocal(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") commit();
                if (event.key === "Escape") onCancel();
              }}
              aria-label={label}
              autoFocus
            />
          )}
          <EditorActions onSave={commit} onCancel={onCancel} />
        </div>
      ) : (
        <div className={styles.fieldValue} data-status={statusAttr}>
          {value === null || value === undefined || value === "" ? "—" : String(value)}
        </div>
      )}
    </div>
  );
}

export function ListFieldEditor({
  label,
  tone,
  values,
  options = [],
  editing,
  variant = "field",
  onEdit,
  onCancel,
  onSave,
}: {
  label: string;
  tone: FieldTone;
  values: string[];
  options?: string[];
  editing: boolean;
  variant?: "field" | "card";
  onEdit: () => void;
  onCancel: () => void;
  onSave: (values: string[]) => void;
}) {
  const [local, setLocal] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const boxRef = useScrollWhenEditing<HTMLElement>(editing);

  useEffect(() => {
    if (!editing) return;
    setLocal([...values]);
    setQuery("");
  }, [editing, values]);

  function toggle(option: string) {
    setLocal((current) =>
      current.includes(option) ? current.filter((value) => value !== option) : [...current, option]
    );
  }

  const extras = local.filter((value) => !options.includes(value));
  const catalog = [...extras, ...options.filter((option) => !extras.includes(option))];
  const filtered = catalog.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));

  const body = editing ? (
    <div className={styles.editBox}>
      <div className={styles.pickerMeta}>
        <span className={styles.selectedCount}>
          {local.length} selected
        </span>
        {local.length > 0 ? (
          <div className={styles.valueList}>
            {local.map((item) => (
              <span key={item} className={styles.tag}>
                {item}
                <button
                  type="button"
                  className={styles.tagRemove}
                  aria-label={`Remove ${item}`}
                  onClick={() => toggle(item)}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.cardEmpty}>Select from the list</div>
        )}
      </div>
      <div className={styles.pickerSearch}>
        <Search size={16} className={styles.pickerSearchIcon} />
        <input
          className={styles.editInput}
          value={query}
          placeholder={`Search ${label.toLowerCase()}`}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={`Search ${label}`}
        />
      </div>
      <div className={styles.optionList} role="listbox" aria-multiselectable="true" aria-label={label}>
        {filtered.length === 0 ? (
          <div className={styles.optionEmpty}>No matches</div>
        ) : (
          filtered.map((option) => {
            const checked = local.includes(option);
            return (
              <button
                key={option}
                type="button"
                className={styles.optionRow}
                data-checked={checked}
                role="option"
                aria-selected={checked}
                onClick={() => toggle(option)}
              >
                <span className={styles.optionCheck} data-checked={checked} aria-hidden="true">
                  {checked ? <Check size={12} /> : null}
                </span>
                <span>{option}</span>
              </button>
            );
          })
        )}
      </div>
      <EditorActions onSave={() => onSave(local)} onCancel={onCancel} />
    </div>
  ) : (
    <div className={variant === "field" ? styles.valueWrap : undefined}>
      <ExpandableValues values={values} preview={variant === "card" ? 3 : 2} />
    </div>
  );

  if (variant === "card") {
    return (
      <article ref={boxRef} className={`${styles.card} ${editing ? styles.fieldEditing : ""}`}>
        <div className={styles.cardHead}>
          <h3>{label}</h3>
          {editing ? null : <EditButton label={label} onClick={onEdit} />}
        </div>
        {body}
      </article>
    );
  }

  return (
    <div ref={boxRef} className={`${styles.field} ${editing ? styles.fieldEditing : ""}`}>
      <div className={styles.fieldHead}>
        <div className={styles.fieldLabel}>
          <FieldDot tone={tone} />
          {label}
        </div>
        {editing ? null : <EditButton label={label} onClick={onEdit} />}
      </div>
      {body}
    </div>
  );
}

export function ExpandableValues({ values, preview = 2 }: { values: string[]; preview?: number }) {
  const [open, setOpen] = useState(false);
  if (values.length === 0) {
    return <div className={styles.fieldValue}>—</div>;
  }
  const shown = open ? values : values.slice(0, preview);
  const hidden = values.length - preview;
  return (
    <div className={styles.valueList}>
      {shown.map((value) => (
        <span key={value} className={styles.tag}>
          {value}
        </span>
      ))}
      {!open && hidden > 0 ? (
        <button type="button" className={styles.moreBtn} onClick={() => setOpen(true)}>
          +{hidden}
        </button>
      ) : null}
      {open && values.length > preview ? (
        <button type="button" className={styles.moreBtn} onClick={() => setOpen(false)}>
          Show less
        </button>
      ) : null}
    </div>
  );
}

export function HeroEditor({
  name,
  projectNumber,
  team,
  editing,
  onEdit,
  onCancel,
  onSave,
}: {
  name: string;
  projectNumber: string;
  team: string[];
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (next: { name: string; projectNumber: string; team: string[] }) => void;
}) {
  const [localName, setLocalName] = useState(name);
  const [localNumber, setLocalNumber] = useState(projectNumber);
  const [localTeam, setLocalTeam] = useState<string[]>(team);
  const [member, setMember] = useState("");

  useEffect(() => {
    if (!editing) return;
    setLocalName(name);
    setLocalNumber(projectNumber);
    setLocalTeam([...team]);
    setMember("");
  }, [editing, name, projectNumber, team]);

  function addMember() {
    const next = member.trim().toUpperCase().slice(0, 3);
    if (!next || localTeam.includes(next)) return;
    setLocalTeam([...localTeam, next]);
    setMember("");
  }

  return (
    <>
      {editing ? null : (
        <button type="button" className={styles.heroEdit} aria-label="Edit project" onClick={onEdit}>
          <Edit2 size={16} />
        </button>
      )}
      {editing ? (
        <div className={styles.heroEditor}>
          <input
            className={styles.heroInput}
            value={localNumber}
            onChange={(event) => setLocalNumber(event.target.value)}
            aria-label="Project number"
            placeholder="Project number"
          />
          <input
            className={styles.heroInputTitle}
            value={localName}
            onChange={(event) => setLocalName(event.target.value)}
            aria-label="Project name"
            placeholder="Project name"
          />
          <div className={styles.heroTeamEdit}>
            {localTeam.map((initials) => (
              <span key={initials} className={styles.teamBadge}>
                {initials}
                <button
                  type="button"
                  className={styles.tagRemove}
                  aria-label={`Remove ${initials}`}
                  onClick={() => setLocalTeam(localTeam.filter((item) => item !== initials))}
                >
                  <X size={10} />
                </button>
              </span>
            ))}
            <div className={styles.teamAddRow}>
              <input
                className={styles.teamInput}
                value={member}
                maxLength={3}
                placeholder="MK"
                aria-label="Add team member initials"
                onChange={(event) => setMember(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addMember();
                  }
                }}
              />
              <button type="button" className={styles.teamAdd} aria-label="Add team member" onClick={addMember}>
                <Plus size={16} />
              </button>
            </div>
          </div>
          <EditorActions
            disableSave={!localName.trim() || !localNumber.trim()}
            onSave={() =>
              onSave({
                name: localName.trim(),
                projectNumber: localNumber.trim(),
                team: localTeam,
              })
            }
            onCancel={onCancel}
          />
        </div>
      ) : null}
    </>
  );
}

export function ContactsEditor({
  contacts,
  editing,
  onEdit,
  onCancel,
  onSave,
}: {
  contacts: Contact[];
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (contacts: Contact[]) => void;
}) {
  const [local, setLocal] = useState<Contact[]>([]);
  const boxRef = useScrollWhenEditing<HTMLElement>(editing);

  useEffect(() => {
    if (!editing) return;
    setLocal(contacts.map((contact) => ({ ...contact })));
  }, [editing, contacts]);

  function update(index: number, key: keyof Contact, value: string) {
    setLocal((current) => current.map((contact, i) => (i === index ? { ...contact, [key]: value } : contact)));
  }

  return (
    <article ref={boxRef} className={`${styles.card} ${styles.cardWide} ${editing ? styles.fieldEditing : ""}`}>
      <div className={styles.cardHead}>
        <h3>Contacts</h3>
        <div className={styles.cardHeadActions}>
          <span className={styles.cardMeta}>{editing ? local.length : contacts.length}</span>
          {editing ? null : <EditButton label="Contacts" onClick={onEdit} />}
        </div>
      </div>
      {editing ? (
        <div className={styles.editBox}>
          <div className={styles.tableWrap}>
            <table className={`${styles.table} ${styles.tableEditing}`}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th className={styles.tableActionCol}>
                    <span className={styles.srOnly}>Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {local.map((contact, index) => (
                  <tr key={`${contact.email}-${index}`}>
                    <td data-label="Name">
                      <input
                        className={styles.tableInput}
                        value={contact.name}
                        aria-label="Name"
                        onChange={(event) => update(index, "name", event.target.value)}
                      />
                    </td>
                    <td data-label="Role">
                      <input
                        className={styles.tableInput}
                        value={contact.role}
                        aria-label="Role"
                        onChange={(event) => update(index, "role", event.target.value)}
                      />
                    </td>
                    <td data-label="Phone">
                      <input
                        className={styles.tableInput}
                        value={contact.phone}
                        aria-label="Phone"
                        onChange={(event) => update(index, "phone", event.target.value)}
                      />
                    </td>
                    <td data-label="Email">
                      <input
                        className={styles.tableInput}
                        value={contact.email}
                        aria-label="Email"
                        onChange={(event) => update(index, "email", event.target.value)}
                      />
                    </td>
                    <td className={styles.tableActionCol}>
                      <button
                        type="button"
                        className={styles.rowDeleteBtn}
                        aria-label={`Remove ${contact.name || "contact"}`}
                        onClick={() => setLocal(local.filter((_, i) => i !== index))}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className={styles.addTableRow}
            onClick={() => setLocal([...local, { name: "", role: "", phone: "", email: "" }])}
          >
            <Plus size={16} /> Add row
          </button>
          <EditorActions onSave={() => onSave(local.filter((contact) => contact.name.trim()))} onCancel={onCancel} />
        </div>
      ) : contacts.length === 0 ? (
        <div className={styles.cardEmpty}>No contacts yet.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.email}>
                  <td data-label="Name">{contact.name}</td>
                  <td data-label="Role">{contact.role}</td>
                  <td data-label="Phone">{contact.phone}</td>
                  <td data-label="Email">{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

export function FilesEditor({
  files,
  editing,
  onEdit,
  onCancel,
  onSave,
}: {
  files: ProjectFile[];
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (files: ProjectFile[]) => void;
}) {
  const [local, setLocal] = useState<ProjectFile[]>([]);
  const [name, setName] = useState("");
  const boxRef = useScrollWhenEditing<HTMLElement>(editing);

  useEffect(() => {
    if (!editing) return;
    setLocal(files.map((file) => ({ ...file })));
    setName("");
  }, [editing, files]);

  function addFile() {
    const next = name.trim();
    if (!next) return;
    const kind: ProjectFile["kind"] = next.endsWith(".jpg") || next.endsWith(".png")
      ? "image"
      : next.endsWith(".xlsx") || next.endsWith(".xls")
        ? "sheet"
        : "pdf";
    setLocal([
      ...local,
      {
        id: `f-${Date.now()}`,
        name: next,
        kind,
        size: "—",
        date: isoToDisplay(new Date().toISOString().slice(0, 10)),
      },
    ]);
    setName("");
  }

  return (
    <article ref={boxRef} className={`${styles.card} ${styles.cardWide} ${editing ? styles.fieldEditing : ""}`}>
      <div className={styles.cardHead}>
        <h3>Files & Plans</h3>
        <div className={styles.cardHeadActions}>
          <span className={styles.cardMeta}>{files.length}</span>
          {editing ? null : <EditButton label="Files" onClick={onEdit} />}
        </div>
      </div>
      {editing ? (
        <div className={styles.editBox}>
          {local.length === 0 ? <div className={styles.cardEmpty}>No files attached.</div> : null}
          <ul className={styles.fileList}>
            {local.map((file) => (
              <li key={file.id} className={styles.fileRow}>
                <div className={styles.fileCopy}>
                  <input
                    className={styles.editInput}
                    value={file.name}
                    aria-label="File name"
                    onChange={(event) =>
                      setLocal(local.map((item) => (item.id === file.id ? { ...item, name: event.target.value } : item)))
                    }
                  />
                  <div className={styles.fileMeta}>
                    {file.size} · {file.date}
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.removeRowBtn}
                  aria-label={`Remove ${file.name}`}
                  onClick={() => setLocal(local.filter((item) => item.id !== file.id))}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.addRow}>
            <input
              className={styles.editInput}
              value={name}
              placeholder="File name, e.g. plan.pdf"
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addFile();
                }
              }}
            />
            <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={addFile}>
              Add
            </Button>
          </div>
          <EditorActions onSave={() => onSave(local.filter((file) => file.name.trim()))} onCancel={onCancel} />
        </div>
      ) : files.length === 0 ? (
        <div className={styles.cardEmpty}>No files attached.</div>
      ) : (
        <ul className={styles.fileList}>
          {files.map((file) => (
            <li key={file.id} className={styles.fileRow}>
              <span className={styles.fileIcon}>
                {file.kind === "image" ? <Image size={16} /> : file.kind === "sheet" ? <Box size={16} /> : <FileText size={16} />}
              </span>
              <div className={styles.fileCopy}>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileMeta}>
                  {file.size} · {file.date}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
