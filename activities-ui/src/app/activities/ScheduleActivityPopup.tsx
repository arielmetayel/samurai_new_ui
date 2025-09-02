"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { typography } from "@/design-system";
import { ArrowLeft, Calendar, Clock } from "react-feather";
import ActivityOverviewPopup from "./ActivityOverviewPopup";

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
  const [showOverviewPopup, setShowOverviewPopup] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      setShowOverviewPopup(true);
    }
  };

  const handleOverviewBack = () => {
    setShowOverviewPopup(false);
  };

  const handleOverviewComplete = () => {
    const dateTime = `${selectedDate}T${selectedTime}`;
    onNext(dateTime);
  };

  if (!isOpen) return null;

  // Show the overview popup if it's open
  if (showOverviewPopup) {
    return (
      <ActivityOverviewPopup
        isOpen={true}
        onClose={onClose}
        onBack={handleOverviewBack}
        onComplete={handleOverviewComplete}
        activityData={{
          activityType: activityData.activityType,
          project: activityData.project,
          dateTime: `${selectedDate}T${selectedTime}`
        }}
      />
    );
  }

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
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
