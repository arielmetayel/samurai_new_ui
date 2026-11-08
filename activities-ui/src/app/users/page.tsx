"use client";

import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";
import { Button, Table, TableHeader, TableRow, TableRowBody } from "@/design-system";
import { MoreVertical, Filter, FileText, Search } from "react-feather";
import CreateNewPopup from "../activities/CreateNewPopup";
import { useI18n } from "@/i18n";
import AppShell from "../AppShell";

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

export default function UsersPage() {
  const { t, localize } = useI18n();
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
    <AppShell onCreateNew={() => setIsCreatePopupOpen(true)}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>{t("users.title")}</h1>
        </div>
        <div className={styles.searchRow}>
          <div className={styles.mainSearchWrapper}>
            <Search size={18} className={styles.mainSearchIcon} />
            <input
              placeholder={t("common.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.headerActions}>
            <Button variant="tertiary" icon={Filter}>
              {t("common.filter")}
            </Button>
            <Button variant="tertiary" icon={FileText}>
              {t("common.createReport")}
            </Button>
          </div>
        </div>

        <div className={styles.counterRow}>
          {filtered.length} | {TOTAL_USERS}
        </div>

        <Table className={styles.table}>
          <TableHeader className={styles.tableHeader}>
            <div className={styles.colAvatar}></div>
            <div className={styles.colName}>{t("table.name")}</div>
            <div className={styles.colRole}>{t("table.role")}</div>
            <div className={styles.colPhone}>{t("table.phone")}</div>
            <div className={styles.colEmail}>{t("table.email")}</div>
            <div className={styles.colMenu}></div>
          </TableHeader>

          {filtered.map((u) => (
            <TableRow key={u.id}>
              <TableRowBody>
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
                  <div className={styles.colRole}>{localize(u.role)}</div>
                  <div className={styles.colPhone}>{u.phone}</div>
                  <div className={styles.colEmail}>{u.email}</div>
                  <div className={styles.colMenu}>
                    <div className={styles.ellipsisMenu}>
                      <MoreVertical size={24} />
                    </div>
                  </div>
                </div>
              </TableRowBody>
            </TableRow>
          ))}
        </Table>

      <CreateNewPopup
        isOpen={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
      />
    </AppShell>
  );
}
