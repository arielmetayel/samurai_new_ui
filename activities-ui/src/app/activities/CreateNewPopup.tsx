"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { typography } from "@/design-system";
import { ArrowLeft, Briefcase, FileText, Users } from "react-feather";
import ChooseActivityTypePopup from "./ChooseActivityTypePopup";

interface CreateNewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNewPopup({ isOpen, onClose }: CreateNewPopupProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showActivityTypePopup, setShowActivityTypePopup] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === 'option1') {
      // Show the activity type popup
      setShowActivityTypePopup(true);
    } else if (selectedOption) {
      console.log("Selected option:", selectedOption);
      // Handle other options here
      onClose();
    }
  };

  const handleActivityTypeBack = () => {
    setShowActivityTypePopup(false);
  };

  const handleActivityTypeNext = (selectedType: string) => {
    console.log("Selected activity type:", selectedType);
    // Handle the final step here
    onClose();
  };

  if (!isOpen) return null;

  // Show the activity type popup if it's open
  if (showActivityTypePopup) {
    return (
      <ChooseActivityTypePopup
        isOpen={true}
        onClose={onClose}
        onBack={handleActivityTypeBack}
        onNext={handleActivityTypeNext}
      />
    );
  }

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <button className={styles.backButton} onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <h2 style={typography.combinations['header-m02']}>Create New</h2>
        </div>
        
        {/* Body - 3 Cube Containers */}
        <div className={styles.popupBody}>
          <div 
            className={`${styles.cubeContainer} ${selectedOption === 'option1' ? styles.selected : ''}`}
            onClick={() => handleOptionSelect('option1')}
          >
            <div className={styles.cubeIcon}>
              <Briefcase size={36} />
            </div>
            <div className={styles.cubeContent}>
              <div style={typography.combinations['text-base-list']}>Activity</div>
            </div>
          </div>
          
          <div 
            className={`${styles.cubeContainer} ${selectedOption === 'option2' ? styles.selected : ''}`}
            onClick={() => handleOptionSelect('option2')}
          >
            <div className={styles.cubeIcon}>
              <FileText size={36} />
            </div>
            <div className={styles.cubeContent}>
              <div style={typography.combinations['text-base-list']}>Project</div>
            </div>
          </div>
          
          <div 
            className={`${styles.cubeContainer} ${selectedOption === 'option3' ? styles.selected : ''}`}
            onClick={() => handleOptionSelect('option3')}
          >
            <div className={styles.cubeIcon}>
              <Users size={36} />
            </div>
            <div className={styles.cubeContent}>
              <div style={typography.combinations['text-base-list']}>User</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.popupFooter}>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="primary"
            onClick={handleNext}
            disabled={!selectedOption}
            className={styles.nextButton}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
