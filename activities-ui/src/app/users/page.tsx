"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { MoreVertical, Filter, FileText, Search } from "react-feather";
import CreateNewPopup from "../activities/CreateNewPopup";

interface User {
  id: string;
  userNumber: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  initials: string;
  thumbTone: "rose" | "sand" | "sage" | "sky" | "lilac";
}

const mockUsers: User[] = [
  {
    id: "1",
    userNumber: "47334",
    name: "Gavriel Hadad",
    role: "Inspector",
    phone: "050-123-4567",
    email: "gavriel.hadad@example.com",
    initials: "GH",
    thumbTone: "sky",
  },
  {
    id: "2",
    userNumber: "47333",
    name: "Yair Yefet",
    role: "Inspector",
    phone: "052-987-6543",
    email: "yair.yefet@example.com",
    initials: "YY",
    thumbTone: "sand",
  },
  {
    id: "3",
    userNumber: "47332",
    name: "Adiel Susi Atia",
    role: "Inspector",
    phone: "054-222-1188",
    email: "adiel.atia@example.com",
    initials: "AA",
    thumbTone: "sage",
  },
  {
    id: "4",
    userNumber: "47331",
    name: "Ariel Nexc",
    role: "Inspector",
    phone: "053-441-2090",
    email: "ariel@nexc.co.il",
    initials: "AN",
    thumbTone: "lilac",
  },
  {
    id: "5",
    userNumber: "47330",
    name: "Elisaf Gito",
    role: "Inspector",
    phone: "050-778-3344",
    email: "elisaf.gito@example.com",
    initials: "EG",
    thumbTone: "rose",
  },
  {
    id: "6",
    userNumber: "47329",
    name: "Yaakov Eisen",
    role: "Inspector",
    phone: "058-665-1122",
    email: "yaakov.eisen@example.com",
    initials: "YE",
    thumbTone: "sky",
  },
  {
    id: "7",
    userNumber: "47327",
    name: "Chen Benoliel",
    role: "Manager",
    phone: "052-300-7788",
    email: "chen.benoliel@example.com",
    initials: "CB",
    thumbTone: "sand",
  },
];

const TOTAL_USERS = 60;

const menuItems: { label: string; href?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Projects", href: "/projects" },
  { label: "Users", href: "/users" },
  { label: "Data Analysis", href: "/data-analysis" },
  { label: "Files" },
  { label: "Apps" },
  { label: "Placement", href: "/placement" },
  { label: "Blueprint" },
  { label: "Skills" },
  { label: "Automations" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return mockUsers.filter((u) =>
      [u.name, u.role, u.phone, u.email, u.userNumber].some((v) =>
        v.toLowerCase().includes(lower)
      )
    );
  }, [search]);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.topHeader}>
        <div className={styles.topHeaderContent}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          <h1 className={styles.topHeaderTitle}>Users</h1>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div className={styles.userBlock}>
          <div className={styles.avatar}>UF</div>
          <div className={styles.userName}>User Full Name</div>
        </div>
        <nav className={styles.menu}>
          {menuItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={item.label === "Users" ? styles.menuItemActive : styles.menuItem}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className={styles.menuItem}>
                {item.label}
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
          <h1 className={styles.pageTitle}>Users</h1>
        </div>
        <div className={styles.searchRow}>
          <div className={styles.mainSearchWrapper}>
            <Search size={18} className={styles.mainSearchIcon} />
            <input
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.headerActions}>
            <Button variant="tertiary" icon={Filter} iconSize={22}>
              Filter
            </Button>
            <Button variant="tertiary" icon={FileText} iconSize={22}>
              Create Report
            </Button>
          </div>
        </div>

        <div className={styles.counterRow}>
          {filtered.length} | {TOTAL_USERS}
        </div>

        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.colAvatar}></div>
            <div className={styles.colName}>Name</div>
            <div className={styles.colRole}>Role</div>
            <div className={styles.colPhone}>Phone</div>
            <div className={styles.colEmail}>Email</div>
            <div className={styles.colMenu}></div>
          </div>

          {filtered.map((u) => (
            <div key={u.id} className={styles.rowWrapper}>
              <div className={styles.columnBlock}>
                <div className={styles.row}>
                  <div className={styles.colAvatar}>
                    <div className={styles.userAvatar} data-tone={u.thumbTone}>
                      <span className={styles.userInitials}>{u.initials}</span>
                      <span className={styles.userId}>#{u.userNumber}</span>
                    </div>
                  </div>
                  <div className={styles.colName}>
                    <div className={styles.userNameCell}>{u.name}</div>
                  </div>
                  <div className={styles.colRole}>{u.role}</div>
                  <div className={styles.colPhone}>{u.phone}</div>
                  <div className={styles.colEmail}>{u.email}</div>
                  <div className={styles.colMenu}>
                    <div className={styles.ellipsisMenu}>
                      <MoreVertical size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />
    </div>
  );
}
