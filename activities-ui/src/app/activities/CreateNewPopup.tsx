"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { typography } from "@/design-system";
import { ArrowLeft, Briefcase, FileText, Users } from "react-feather";
import { useI18n } from "@/i18n";
import ChooseActivityTypePopup from "./ChooseActivityTypePopup";
import CreateDialog from "./CreateDialog";

interface CreateNewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNewPopup({ isOpen, onClose }: CreateNewPopupProps) {
  const { t } = useI18n();
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

  if (showActivityTypePopup) {
    return (
      <ChooseActivityTypePopup
        isOpen={isOpen}
        onClose={onClose}
        onBack={handleActivityTypeBack}
        onNext={handleActivityTypeNext}
      />
    );
  }

  return (
    <CreateDialog open={isOpen} onClose={onClose}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <button className={styles.backButton} onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <h2 style={typography.combinations['header-m02']}>{t("create.title")}</h2>
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
              <div style={typography.combinations['text-base-list']}>{t("create.activity")}</div>
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
              <div style={typography.combinations['text-base-list']}>{t("create.project")}</div>
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
              <div style={typography.combinations['text-base-list']}>{t("create.user")}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.popupFooter}>
          <Button 
            type="button" 
            variant="tertiary" 
            onClick={onClose}
            className={styles.cancelButton}
          >
            {t("common.cancel")}
          </Button>
          <Button 
            type="button" 
            variant="primary"
            shape="action"
            onClick={handleNext}
            disabled={!selectedOption}
            className={styles.nextButton}
          >
            {t("common.next")}
          </Button>
        </div>
    </CreateDialog>
  );
}
