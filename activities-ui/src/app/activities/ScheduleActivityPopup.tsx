"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { typography } from "@/design-system";
import { ArrowLeft, Calendar, Clock, Briefcase } from "react-feather";


interface ScheduleActivityPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: (selectedDateTime: string) => void;
  activityData: {
    activityType: string;
    project: string;
  };
}

export default function ScheduleActivityPopup({ 
  isOpen, 
  onClose, 
  onBack, 
  onNext,
  activityData
}: ScheduleActivityPopupProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      const dateTime = `${selectedDate}T${selectedTime}`;
      onNext(dateTime);
    }
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
          <h2 style={typography.combinations['header-m02']}>Schedule Activity Date & Time</h2>
        </div>
        
        {/* Date and Time Inputs */}
        <div className={styles.dateTimeInputContainer}>
          {/* Selected Activity Type and Project Display */}
          <div className={styles.overviewContent}>
            <div className={styles.overviewItemVertical}>
              <div className={styles.overviewItemHorizontalRow}>
                <span className={styles.overviewLabel}>Activity Type:</span>
                <div className={styles.overviewValueWithIcon}>
                  <Briefcase size={16} className={styles.activityIcon} />
                  <span className={styles.overviewValue}>{activityData.activityType}</span>
                </div>
              </div>
              <div className={styles.overviewItemHorizontalRow}>
                <span className={styles.overviewLabel}>Project:</span>
                <span className={styles.overviewValue}>{activityData.project}</span>
              </div>
            </div>
          </div>
          <div className={styles.dateInputWrapper}>
            <Calendar size={20} className={styles.calendarIcon} />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className={styles.dateInput}
              placeholder="date"
            />
          </div>
          
          <div className={styles.timeInputWrapper}>
            <Clock size={20} className={styles.clockIcon} />
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className={styles.timeInput}
              placeholder="time"
            />
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
            onClick={handleNext}
            disabled={!selectedDate || !selectedTime}
            className={styles.nextButton}
          >
            Create New
          </Button>
        </div>
      </div>
    </div>
  );
}
