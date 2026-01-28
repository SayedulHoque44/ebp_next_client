"use client";
import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaCar } from "react-icons/fa";

/**
 * CourseHeader Component (Client Component)
 * 
 * Section header with badge and title.
 * Client component because SectionHeader uses framer-motion.
 */
const CourseHeader = () => {
  return (
    <SectionHeader
      badge={{
        icon: <FaCar className="mr-2" />,
        text: "Course to drive with",
        className: "bg-primary-100 text-primary-700",
      }}
      title="Course to drive with"
      subtitle="confidence"
      description="Master Italian driving with our comprehensive online course designed for success"
      className="mb-16"
    />
  );
};

export default CourseHeader;
