"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/design-system";
import { ChevronDown, ChevronUp, Edit2, Info, Plus, Search, Trash2, X } from "react-feather";
import CreateNewPopup from "../activities/CreateNewPopup";
import { NavLabel, navItems } from "../navItems";
import { Automation, mockAutomations } from "./data";
import styles from "./styles.module.css";

type SortKey = "name" | "topic" | "event" | "action" | "active";
type SortDir = "asc" | "desc";

const SORT_COLUMNS: { key: SortKey; label: string; className: string }[] = [
  { key: "name", label: "Name", className: styles.colName },
  { key: "topic", label: "Topic", className: styles.colTopic },
  { key: "event", label: "Event", className: styles.colEvent },
  { key: "action", label: "Action", className: styles.colAction },
  { key: "active", label: "Active", className: styles.colActive },
];

export default function AutomationsPage() {
  const [items, setItems] = useState<Automation[]>(mockAutomations);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [infoId, setInfoId] = useState<string | null>(null);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

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
  }

  function addAutomation() {
    const id = `new-${Date.now()}`;
    setItems((current) => [
      {
        id,
        name: "New automation",
        topic: "Time based",
        event: "Once a week",
        action: "Action send report",
        active: false,
      },
      ...current,
    ]);
    setEditingId(id);
    setSearch("");
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderContent}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          <h1 className={styles.topHeaderTitle}>Automations</h1>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
          <div className={styles.userName}>User Full Name</div>
        </div>
        <nav className={styles.menu}>
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Automations" ? styles.menuItemActive : styles.menuItem}
              >
                <NavLabel item={item} />
              </Link>
            ) : (
              <div key={item.label} className={styles.menuItem}>
                <NavLabel item={item} />
              </div>
            )
          )}
        </nav>
        <div className={styles.createWrap}>
          <Button
            variant="primary"
            size="md"
            className={styles.createBtn}
            onClick={() => setIsCreatePopupOpen(true)}
          >
            + Create New
          </Button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Automations</h1>
          <Button variant="primary" size="md" icon={Plus} onClick={addAutomation}>
            Add new
          </Button>
        </div>

        <div className={styles.searchRow}>
          <div className={styles.mainSearchWrapper}>
            <Search size={18} className={styles.mainSearchIcon} />
            <input
              placeholder="search"
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
                        ? `Sort by ${column.label}, ${dir === "asc" ? "ascending" : "descending"}`
                        : `Sort by ${column.label}`
                    }
                    onClick={() => toggleSort(column.key)}
                  >
                    {column.label}
                    <Icon size={14} className={styles.sortIcon} aria-hidden />
                  </button>
                </div>
              );
            })}
            <div className={styles.colActions}>Actions</div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>No automations match this search.</div>
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
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {infoItem ? (
        <div className={styles.overlay} onClick={() => setInfoId(null)}>
          <div className={styles.infoCard} onClick={(event) => event.stopPropagation()}>
            <div className={styles.infoHead}>
              <h2>Automation details</h2>
              <button type="button" className={styles.iconBtn} aria-label="Close" onClick={() => setInfoId(null)}>
                <X size={18} />
              </button>
            </div>
            <dl className={styles.infoList}>
              <div>
                <dt>Name</dt>
                <dd>{infoItem.name}</dd>
              </div>
              <div>
                <dt>Topic</dt>
                <dd>{infoItem.topic}</dd>
              </div>
              <div>
                <dt>Event</dt>
                <dd>{infoItem.event}</dd>
              </div>
              <div>
                <dt>Action</dt>
                <dd>{infoItem.action}</dd>
              </div>
              <div>
                <dt>Active</dt>
                <dd>{infoItem.active ? "Active" : "Inactive"}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}

      <CreateNewPopup isOpen={isCreatePopupOpen} onClose={() => setIsCreatePopupOpen(false)} />
    </div>
  );
}
