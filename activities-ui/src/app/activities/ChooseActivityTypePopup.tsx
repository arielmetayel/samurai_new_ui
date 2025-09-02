"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { typography } from "@/design-system";
import { ArrowLeft, Search } from "react-feather";
import ChooseProjectPopup from "./ChooseProjectPopup";

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
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showProjectPopup, setShowProjectPopup] = useState(false);

  const activityTypes = [
    "Job Type 01",
    "Job Type 02", 
    "Job Type 03",
    "Job Type 04",
    "Job Type 05",
    "Job Type 06",
    "Job Type 07",
    "Job Type 08"
  ];

  const filteredTypes = activityTypes.filter(type =>
    type.toLowerCase().includes(searchQuery.toLowerCase())
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

  if (!isOpen) return null;

  // Show the project popup if it's open
  if (showProjectPopup) {
    return (
      <ChooseProjectPopup
        isOpen={true}
        onClose={onClose}
        onBack={handleProjectBack}
        onNext={handleProjectNext}
        activityType={selectedType}
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
          <h2 style={typography.combinations['header-m02']}>Choose Activity Type</h2>
        </div>
        
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="search"
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
              <span className={styles.typeText}>{type}</span>
            </div>
          ))}
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
            disabled={!selectedType}
            className={styles.nextButton}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
