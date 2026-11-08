"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, TextInput, typography } from "@/design-system";
import { ArrowLeft, Search } from "react-feather";
import { useI18n } from "@/i18n";
import ChooseProjectPopup from "./ChooseProjectPopup";
import CreateDialog from "./CreateDialog";
import dbData from "@/data/db.json";

interface ChooseActivityTypePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: (selectedType: string) => void;
}

export default function ChooseActivityTypePopup({ 
  isOpen, 
  onClose, 
  onBack, 
  onNext 
}: ChooseActivityTypePopupProps) {
  const { t, localize } = useI18n();
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showProjectPopup, setShowProjectPopup] = useState(false);

  const activityTypes = dbData.activityTypes;

  const filteredTypes = activityTypes.filter(type =>
    type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      localize(type).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
      setShowProjectPopup(true);
    }
  };

  const handleProjectBack = () => {
    setShowProjectPopup(false);
  };

  const handleProjectNext = (selectedProject: string) => {
    console.log("Selected activity type:", selectedType);
    console.log("Selected project:", selectedProject);
    // Handle the final step here
    onNext(selectedType);
  };

  if (showProjectPopup) {
    return (
      <ChooseProjectPopup
        isOpen={isOpen}
        onClose={onClose}
        onBack={handleProjectBack}
        onNext={handleProjectNext}
        activityType={selectedType}
      />
    );
  }

  return (
    <CreateDialog open={isOpen} onClose={onClose}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <button className={styles.backButton} onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <h2 style={typography.combinations['header-m02']}>{t("create.chooseType")}</h2>
        </div>
        
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon} aria-hidden>
              <Search size={20} />
            </span>
            <TextInput
              placeholder={t("common.search")}
              aria-label={t("common.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Activity Types List */}
        <div className={styles.activityTypesList}>
          {filteredTypes.map((type) => (
            <div
              key={type}
              className={`${styles.activityTypeItem} ${selectedType === type ? styles.selectedType : ''}`}
              onClick={() => handleTypeSelect(type)}
            >
              <div className={styles.typeIcon}></div>
              <span className={styles.typeText}>{localize(type)}</span>
            </div>
          ))}
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
            disabled={!selectedType}
            className={styles.nextButton}
          >
            {t("common.next")}
          </Button>
        </div>
    </CreateDialog>
  );
}
