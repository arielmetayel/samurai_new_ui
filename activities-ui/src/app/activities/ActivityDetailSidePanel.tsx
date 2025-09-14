"use client";

import React, { useState, useEffect, useRef } from "react";
import { Activity } from "@/types";
import { Button } from "@/design-system";
import { ArrowLeft, MoreVertical, MessageCircle, Paperclip, Check, FileText, Copy, Share, Eye, Trash2 } from "react-feather";
import styles from "./ActivityDetailSidePanel.module.css";

interface ActivityDetailSidePanelProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ActivityDetailSidePanel({ 
  activity, 
  isOpen, 
  onClose 
}: ActivityDetailSidePanelProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!activity || !isOpen) return null;

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const yy = String(date.getUTCFullYear()).slice(2);
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const min = String(date.getUTCMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yy}, ${hh}:${min}`;
  };

  // Mock data for the detailed view based on the mockup
  const sections = [
    {
      title: "Section Title",
      questions: [
        {
          id: "q1",
          title: "Question title",
          type: "input",
          placeholder: "Placeholder",
          hasComment: false,
          hasAttachment: false,
          isRequired: false,
        },
        {
          id: "q2", 
          title: "Question title",
          type: "input",
          placeholder: "Placeholder",
          hasComment: false,
          hasAttachment: false,
          isRequired: false,
        },
        {
          id: "q3",
          title: "Question title", 
          type: "input",
          placeholder: "Placeholder",
          hasComment: true,
          hasAttachment: true,
          isRequired: true,
        },
        {
          id: "q4",
          title: "Question title",
          type: "input", 
          placeholder: "Placeholder",
          hasComment: true,
          hasAttachment: false,
          isRequired: false,
        },
        {
          id: "q5",
          title: "Question title",
          type: "input",
          placeholder: "Placeholder", 
          hasComment: false,
          hasAttachment: false,
          isRequired: true,
        },
        {
          id: "q6",
          title: "Question title",
          type: "select",
          options: ["Value 1", "Value 2", "Value 3"],
          hasComment: false,
          hasAttachment: true,
          isRequired: true,
        },
      ],
    },
    {
      title: "Section Title",
      questions: [
        {
          id: "q7",
          title: "Question title",
          type: "input",
          placeholder: "Placeholder",
          hasComment: false,
          hasAttachment: false,
          isRequired: false,
        },
        {
          id: "q8",
          title: "Question title",
          type: "select",
          options: ["Value 1", "Value 2"],
          hasComment: false,
          hasAttachment: false,
          isRequired: false,
        },
        {
          id: "q9",
          title: "Question title",
          type: "input",
          placeholder: "Placeholder",
          hasComment: false,
          hasAttachment: false,
          isRequired: false,
        },
        {
          id: "q10",
          title: "Question title",
          type: "select",
          options: ["Value 1", "Value 2", "Value 3"],
          hasComment: false,
          hasAttachment: false,
          isRequired: true,
        },
        {
          id: "q11",
          title: "Question title",
          type: "select",
          options: ["Value 1", "Value 2"],
          hasComment: false,
          hasAttachment: false,
          isRequired: true,
        },
        {
          id: "q12",
          title: "Question title",
          type: "select",
          options: ["Value 1", "Value 2"],
          hasComment: false,
          hasAttachment: false,
          isRequired: true,
        },
        {
          id: "q13",
          title: "Question title",
          type: "boolean",
          value: "Yes",
          hasComment: false,
          hasAttachment: false,
          isRequired: true,
        },
      ],
    },
  ];

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`} onClick={onClose}>
      <div className={styles.sidePanel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <button className={styles.backButton} onClick={onClose}>
              <ArrowLeft size={20} />
            </button>
            <div className={styles.jobType}>
              <span className={styles.jobTypeIcon}>🚚</span>
              <span>Job type</span>
            </div>
            <div className={styles.menuContainer} ref={menuRef}>
              <button 
                className={styles.menuButton}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MoreVertical size={20} />
              </button>
              
              {isMenuOpen && (
                <div className={styles.contextMenu}>
                  <div className={styles.menuItem}>
                    <FileText size={16} />
                    <span>Create PDF</span>
                  </div>
                  <div className={styles.menuItem}>
                    <Paperclip size={16} />
                    <span>Show Files</span>
                  </div>
                  <div className={styles.menuItem}>
                    <Copy size={16} />
                    <span>Duplicate</span>
                  </div>
                  <div className={styles.menuItem}>
                    <Share size={16} />
                    <span>Share</span>
                  </div>
                  <div className={styles.menuItem}>
                    <Eye size={16} />
                    <span>Show History</span>
                  </div>
                  <div className={`${styles.menuItem} ${styles.menuItemDanger}`}>
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.statusRow}>
            <div className={styles.statusBadge}>Open</div>
          </div>

          <div className={styles.headerMiddle}>
            <h1 className={styles.projectTitle}>{activity.projectName}</h1>
            <div className={styles.dateTimeRow}>
              <div className={styles.dateTime}>{formatDate(activity.dateTime)}</div>
              <div className={styles.jobId}># Job Id</div>
            </div>
          </div>

          <div className={styles.headerBottom}>
            <Button variant="tertiary" size="sm" className={styles.approveButton}>
              Approve
            </Button>
            <div className={styles.assignees}>
              {activity.assignees.map((assignee, index) => (
                <div key={index} className={styles.assigneeAvatar}>
                  {assignee}
                </div>
              ))}
              <div className={styles.addAssignee}>+</div>
            </div>
          </div>

          <Button variant="primary" size="lg" className={styles.answerAllButton}>
            <Check size={20} />
            Answer All
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.tabActive}`}>Main Q&A</div>
          <div className={styles.tab}>Project info</div>
          <div className={styles.tab}>Full form</div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.section}>
              <div className={styles.sectionTitle}>{section.title}</div>
              
              {section.questions.map((question) => (
                <div key={question.id} className={styles.question}>
                  <div className={styles.questionHeader}>
                    <div className={styles.questionTitle}>
                      {question.isRequired && <div className={styles.requiredIndicator} />}
                      {question.title}
                    </div>
                    <div className={styles.questionActions}>
                      {question.hasComment && (
                        <button className={styles.actionButton}>
                          <MessageCircle size={16} />
                        </button>
                      )}
                      {question.hasAttachment && (
                        <button className={styles.actionButton}>
                          <Paperclip size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.questionInput}>
                    {question.type === "input" && (
                      <input
                        type="text"
                        placeholder={question.placeholder}
                        className={styles.inputField}
                      />
                    )}
                    {question.type === "select" && (
                      <div className={styles.selectField}>
                        {question.options?.map((option, index) => (
                          <div key={index} className={styles.selectOption}>
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                    {question.type === "boolean" && (
                      <div className={styles.booleanField}>
                        {question.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
