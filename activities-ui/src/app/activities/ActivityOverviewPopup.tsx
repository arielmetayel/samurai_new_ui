"use client";

import React from "react";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { typography } from "@/design-system";
import { ArrowLeft } from "react-feather";

interface ActivityOverviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onComplete: () => void;
  activityData: {
    activityType: string;
    project: string;
    dateTime: string;
  };
}

export default function ActivityOverviewPopup({ 
  isOpen, 
  onClose, 
  onBack, 
  onComplete,
  activityData
}: ActivityOverviewPopupProps) {
  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return "";
    const [date, time] = dateTime.split('T');
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <button className={styles.backButton} onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <h2 style={typography.combinations['header-m02']}>Activity Overview</h2>
        </div>
        
        {/* Activity Information */}
        <div className={styles.overviewContainer}>
          <div className={styles.overviewContent}>
            <div className={styles.overviewItem}>
              <div className={styles.overviewLabel}>Activity Type</div>
              <div className={styles.overviewValue}>{activityData.activityType}</div>
            </div>
            
            <div className={styles.overviewItem}>
              <div className={styles.overviewLabel}>Project</div>
              <div className={styles.overviewValue}>{activityData.project}</div>
            </div>
            
            <div className={styles.overviewItem}>
              <div className={styles.overviewLabel}>Schedule</div>
              <div className={styles.overviewValue}>{formatDateTime(activityData.dateTime)}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.popupFooter}>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onBack}
            className={styles.cancelButton}
          >
            Back
          </Button>
          <Button 
            type="button" 
            variant="primary"
            onClick={onComplete}
            className={styles.nextButton}
          >
            Create Activity
          </Button>
        </div>
      </div>
    </div>
  );
}
