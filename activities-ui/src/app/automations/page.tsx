"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/design-system";
import { ChevronDown, ChevronUp, Edit2, Info, Plus, Search, Trash2, X } from "react-feather";
import CreateNewPopup from "../activities/CreateNewPopup";
import { useI18n } from "@/i18n";
import AppShell from "../AppShell";
import AutomationSetupWizard, { AutomationDraftResult } from "./AutomationSetupWizard";
import { Automation, mockAutomations } from "./data";
import styles from "./styles.module.css";

type SortKey = "name" | "topic" | "event" | "action" | "active";
type SortDir = "asc" | "desc";

const SORT_COLUMNS: { key: SortKey; labelKey: "automations.name" | "table.topic" | "table.event" | "table.action" | "table.active"; className: string }[] = [
  { key: "name", labelKey: "automations.name", className: styles.colName },
  { key: "topic", labelKey: "table.topic", className: styles.colTopic },
  { key: "event", labelKey: "table.event", className: styles.colEvent },
  { key: "action", labelKey: "table.action", className: styles.colAction },
  { key: "active", labelKey: "table.active", className: styles.colActive },
];

export default function AutomationsPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<Automation[]>(mockAutomations);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [infoId, setInfoId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    const list = items.filter((item) =>
      [item.name, item.topic, item.event, item.action].some((value) =>
        value.toLowerCase().includes(lower)
      )
    );

    if (!sort) return list;

    const direction = sort.dir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      if (sort.key === "active") {
        return (Number(a.active) - Number(b.active)) * direction;
      }
      return a[sort.key].localeCompare(b[sort.key], undefined, { sensitivity: "base" }) * direction;
    });
  }, [items, search, sort]);

  function toggleSort(key: SortKey) {
    setSort((current) => {
      if (current?.key !== key) return { key, dir: "asc" };
      if (current.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  }

  const infoItem = items.find((item) => item.id === infoId) ?? null;
  const deleteItem = items.find((item) => item.id === deleteId) ?? null;

  function toggleActive(id: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  }

  function updateName(id: string, name: string) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, name } : item)));
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    if (editingId === id) setEditingId(null);
    if (infoId === id) setInfoId(null);
    setDeleteId(null);
  }

  function addAutomation(draft: AutomationDraftResult) {
    const id = `new-${Date.now()}`;
    setItems((current) => [
      {
        id,
        name: draft.name,
        topic: draft.topic,
        event: draft.event,
        action: draft.action,
        active: false,
        condition: draft.condition,
        emailTo: draft.emailTo,
        emailSubject: draft.emailSubject,
      },
      ...current,
    ]);
    setIsSetupOpen(false);
    setSearch("");
  }

  return (
    <AppShell title={t("automations.title")} onCreateNew={() => setIsCreatePopupOpen(true)}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>{t("automations.title")}</h1>
          <Button variant="primary" size="md" icon={Plus} onClick={() => setIsSetupOpen(true)}>
            {t("automations.add")}
          </Button>
        </div>

        <div className={styles.searchRow}>
          <div className={styles.mainSearchWrapper}>
            <Search size={18} className={styles.mainSearchIcon} />
            <input
              placeholder={t("common.search")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.counterRow}>
          {filtered.length} | {items.length}
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            {SORT_COLUMNS.map((column) => {
              const dir = sort?.key === column.key ? sort.dir : null;
              const ariaSort = dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none";
              const Icon = dir === "asc" ? ChevronUp : ChevronDown;
              return (
                <div key={column.key} className={column.className}>
                  <button
                    type="button"
                    className={styles.sortBtn}
                    data-active={Boolean(dir)}
                    aria-sort={ariaSort}
                    aria-label={
                      dir
                        ? `Sort by ${t(column.labelKey)}, ${dir === "asc" ? "ascending" : "descending"}`
                        : `Sort by ${t(column.labelKey)}`
                    }
                    onClick={() => toggleSort(column.key)}
                  >
                    {t(column.labelKey)}
                    <Icon size={14} className={styles.sortIcon} aria-hidden />
                  </button>
                </div>
              );
            })}
            <div className={styles.colActions}>{t("common.actions")}</div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>{t("automations.empty")}</div>
          ) : (
            filtered.map((item) => {
              const editing = editingId === item.id;
              return (
                <div key={item.id} className={styles.row} data-active={item.active}>
                  <div className={styles.colName}>
                    {editing ? (
                      <input
                        className={styles.nameInput}
                        value={item.name}
                        aria-label="Automation name"
                        autoFocus
                        onChange={(event) => updateName(item.id, event.target.value)}
                        onBlur={() => setEditingId(null)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === "Escape") setEditingId(null);
                        }}
                      />
                    ) : (
                      <span className={styles.nameText}>{item.name}</span>
                    )}
                  </div>
                  <div className={styles.colTopic} data-label="Topic">{item.topic}</div>
                  <div className={styles.colEvent} data-label="Event">{item.event}</div>
                  <div className={styles.colAction} data-label="Action">{item.action}</div>
                  <div className={styles.colActive} data-label="Active">
                    <button
                      type="button"
                      className={styles.activeToggle}
                      data-on={item.active}
                      aria-pressed={item.active}
                      aria-label={item.active ? "Deactivate automation" : "Activate automation"}
                      onClick={() => toggleActive(item.id)}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                  <div className={styles.colActions}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      aria-label={`About ${item.name}`}
                      onClick={() => setInfoId(item.id)}
                    >
                      <Info size={16} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      aria-label={`Edit ${item.name}`}
                      onClick={() => setEditingId(item.id)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.iconBtn} ${styles.iconDanger}`}
                      aria-label={`Delete ${item.name}`}
                      onClick={() => setDeleteId(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      {deleteItem ? (
        <div className={styles.overlay} onClick={() => setDeleteId(null)}>
          <div className={styles.infoCard} role="dialog" aria-modal="true" aria-labelledby="delete-automation-title" onClick={(event) => event.stopPropagation()}>
            <div className={styles.infoHead}>
              <h2 id="delete-automation-title">{t("automations.deleteTitle")}</h2>
              <button type="button" className={styles.iconBtn} aria-label={t("common.close")} onClick={() => setDeleteId(null)}>
                <X size={18} />
              </button>
            </div>
            <p className={styles.confirmText}>
              {t("automations.deleteConfirm")}
            </p>
            <p className={styles.confirmName}>{deleteItem.name}</p>
            <div className={styles.confirmActions}>
              <button type="button" className={styles.confirmCancel} onClick={() => setDeleteId(null)}>
                {t("common.cancel")}
              </button>
              <button type="button" className={styles.confirmDelete} onClick={() => removeItem(deleteItem.id)}>
                {t("common.delete")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {infoItem ? (
        <div className={styles.overlay} onClick={() => setInfoId(null)}>
          <div className={styles.infoCard} onClick={(event) => event.stopPropagation()}>
            <div className={styles.infoHead}>
              <h2>{t("automations.details")}</h2>
              <button type="button" className={styles.iconBtn} aria-label="Close" onClick={() => setInfoId(null)}>
                <X size={18} />
              </button>
            </div>
            <dl className={styles.infoList}>
              <div>
                <dt>{t("automations.name")}</dt>
                <dd>{infoItem.name}</dd>
              </div>
              <div>
                <dt>{t("table.topic")}</dt>
                <dd>{infoItem.topic}</dd>
              </div>
              <div>
                <dt>{t("table.event")}</dt>
                <dd>{infoItem.event}</dd>
              </div>
              <div>
                <dt>{t("table.action")}</dt>
                <dd>{infoItem.action}</dd>
              </div>
              {infoItem.condition ? (
                <div>
                  <dt>{t("automations.conditions")}</dt>
                  <dd>{infoItem.condition}</dd>
                </div>
              ) : null}
              {infoItem.emailTo ? (
                <div>
                  <dt>{t("automations.sendTo")}</dt>
                  <dd>{infoItem.emailTo}</dd>
                </div>
              ) : null}
              {infoItem.emailSubject ? (
                <div>
                  <dt>{t("automations.subject")}</dt>
                  <dd>{infoItem.emailSubject}</dd>
                </div>
              ) : null}
              <div>
                <dt>{t("table.active")}</dt>
                <dd>{infoItem.active ? t("automations.active") : t("automations.inactive")}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}

      {isSetupOpen ? (
        <AutomationSetupWizard onClose={() => setIsSetupOpen(false)} onCreate={addAutomation} />
      ) : null}

      <CreateNewPopup isOpen={isCreatePopupOpen} onClose={() => setIsCreatePopupOpen(false)} />
    </AppShell>
  );
}
