"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/design-system";
import { typography } from "@/design-system";
import { ArrowLeft, Search } from "react-feather";
import ScheduleActivityPopup from "./ScheduleActivityPopup";

interface ChooseProjectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: (selectedProject: string) => void;
  activityType: string;
}

export default function ChooseProjectPopup({ 
  isOpen, 
  onClose, 
  onBack, 
  onNext,
  activityType
}: ChooseProjectPopupProps) {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);

  const projects = [
    "Project Alpha",
    "Project Beta", 
    "Project Gamma",
    "Project Delta",
    "Project Epsilon",
    "Project Zeta",
    "Project Eta",
    "Project Theta"
  ];

  const filteredProjects = projects.filter(project =>
    project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
  };

  const handleNext = () => {
    if (selectedProject) {
      setShowSchedulePopup(true);
    }
  };

  const handleScheduleBack = () => {
    setShowSchedulePopup(false);
  };

  const handleScheduleNext = (selectedDate: string) => {
    console.log("Selected project:", selectedProject);
    console.log("Selected date:", selectedDate);
    // Handle the final step here
    onNext(selectedProject);
  };

  if (!isOpen) return null;

  // Show the schedule popup if it's open
  if (showSchedulePopup) {
    return (
      <ScheduleActivityPopup
        isOpen={true}
        onClose={onClose}
        onBack={handleScheduleBack}
        onNext={handleScheduleNext}
        activityData={{
          activityType: activityType,
          project: selectedProject
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
          <h2 style={typography.combinations['header-m02']}>Choose Project</h2>
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

        {/* Projects List */}
        <div className={styles.activityTypesList}>
          {filteredProjects.map((project) => (
            <div
              key={project}
              className={`${styles.activityTypeItem} ${selectedProject === project ? styles.selectedType : ''}`}
              onClick={() => handleProjectSelect(project)}
            >
              <div className={styles.typeIcon}></div>
              <span className={styles.typeText}>{project}</span>
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
            disabled={!selectedProject}
            className={styles.nextButton}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
