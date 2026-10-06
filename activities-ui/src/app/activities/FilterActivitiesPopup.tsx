"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronLeft } from "react-feather";
import { Button, Checkbox } from "@/design-system";
import { typography } from "@/design-system/typography/tokens";
import styles from "./FilterActivitiesPopup.module.css";

interface FilterActivitiesPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const dateChips = [
  "This week",
  "Tomorrow",
  "today",
  "last month",
  "last week",
  "this month",
  "next month",
  "custom",
];

const statusChips = [
  "Tested",
  "Done",
  "Reported",
  "Confirmed",
  "Open",
  "To Review",
  "Assigned",
  "Complete Report",
  "Instructra Care",
  "Rejected",
];

function getStatusChipClass(status: string) {
  const key = status.toLowerCase().replace(/\s+/g, "");
  return `statusChip${key.charAt(0).toUpperCase()}${key.slice(1)}`;
}

export default function FilterActivitiesPopup({ isOpen, onClose }: FilterActivitiesPopupProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    projects: false,
    users: false,
    dates: true,
    statuses: true,
    activityType: false,
    projectValue: false,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose} aria-label="Back">
            <ChevronLeft size={22} />
          </button>
          <h2 className={styles.title} style={typography.combinations["header-m02"]}>
            Filter Activities
          </h2>
        </div>

        <div className={styles.body}>
          <div className={styles.quickFilters}>
            <label className={styles.checkboxRow}>
              <Checkbox size="md" />
              <span>My Activities</span>
            </label>
            <label className={styles.checkboxRow}>
              <Checkbox size="md" />
              <span>My Projects</span>
            </label>
          </div>

          <button
            type="button"
            className={styles.sectionRow}
            onClick={() => toggleSection("projects")}
          >
            <span>Projects</span>
            <ChevronDown
              size={18}
              className={`${styles.chevron} ${expandedSections.projects ? styles.chevronOpen : ""}`}
            />
          </button>
          <div
            className={`${styles.sectionContent} ${expandedSections.projects ? styles.sectionContentOpen : ""}`}
          >
            <div className={styles.sectionContentInner}>
              <button type="button" className={styles.optionChip}>FoodChain Suppliers</button>
              <button type="button" className={styles.optionChip}>Event Masters</button>
              <button type="button" className={styles.optionChip}>Legal Pro Consulting</button>
            </div>
          </div>

          <button
            type="button"
            className={styles.sectionRow}
            onClick={() => toggleSection("users")}
          >
            <span>Users</span>
            <ChevronDown
              size={18}
              className={`${styles.chevron} ${expandedSections.users ? styles.chevronOpen : ""}`}
            />
          </button>
          <div
            className={`${styles.sectionContent} ${expandedSections.users ? styles.sectionContentOpen : ""}`}
          >
            <div className={styles.sectionContentInner}>
              <button type="button" className={styles.optionChip}>AB</button>
              <button type="button" className={styles.optionChip}>CD</button>
              <button type="button" className={styles.optionChip}>EF</button>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.sectionRow} ${styles.sectionRowNoBorder}`}
            onClick={() => toggleSection("dates")}
          >
            <span>Dates</span>
            <ChevronDown
              size={18}
              className={`${styles.chevron} ${expandedSections.dates ? styles.chevronOpen : ""}`}
            />
          </button>
          <div
            className={`${styles.chipsWrap} ${expandedSections.dates ? styles.sectionContentOpen : ""}`}
          >
            <div className={styles.sectionContentInner}>
              {dateChips.map((chip) => (
                <button key={chip} className={styles.dateChip} type="button">
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.sectionRow} ${styles.sectionRowNoBorder}`}
            onClick={() => toggleSection("statuses")}
          >
            <span>Statuses</span>
            <ChevronDown
              size={18}
              className={`${styles.chevron} ${expandedSections.statuses ? styles.chevronOpen : ""}`}
            />
          </button>
          <div
            className={`${styles.chipsWrap} ${expandedSections.statuses ? styles.sectionContentOpen : ""}`}
          >
            <div className={styles.sectionContentInner}>
              {statusChips.map((chip) => (
                <button
                  key={chip}
                  className={`${styles.statusChip} ${styles[getStatusChipClass(chip) as keyof typeof styles] || ""}`}
                  type="button"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.sectionRow}
            onClick={() => toggleSection("activityType")}
          >
            <span>Activity Type</span>
            <ChevronDown
              size={18}
              className={`${styles.chevron} ${expandedSections.activityType ? styles.chevronOpen : ""}`}
            />
          </button>
          <div
            className={`${styles.sectionContent} ${expandedSections.activityType ? styles.sectionContentOpen : ""}`}
          >
            <div className={styles.sectionContentInner}>
              <button type="button" className={styles.optionChip}>Support Case</button>
              <button type="button" className={styles.optionChip}>Meeting Summary</button>
              <button type="button" className={styles.optionChip}>Phase Execution</button>
            </div>
          </div>

          <button
            type="button"
            className={styles.sectionRow}
            onClick={() => toggleSection("projectValue")}
          >
            <span>Project Value</span>
            <ChevronDown
              size={18}
              className={`${styles.chevron} ${expandedSections.projectValue ? styles.chevronOpen : ""}`}
            />
          </button>
          <div
            className={`${styles.sectionContent} ${expandedSections.projectValue ? styles.sectionContentOpen : ""}`}
          >
            <div className={styles.sectionContentInner}>
              <button type="button" className={styles.optionChip}>0 - 10K</button>
              <button type="button" className={styles.optionChip}>10K - 100K</button>
              <button type="button" className={styles.optionChip}>100K+</button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.clearButton}>
            Clear Selection
          </button>
          <Button type="button" variant="secondary" className={styles.saveTabButton}>
            Save Filter as Tab
          </Button>
          <Button type="button" variant="primary" className={styles.applyButton}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
