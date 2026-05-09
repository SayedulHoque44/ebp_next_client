"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import SectionHeader from "@/components/shared/SectionHeader";

interface FeedbackHeaderProps {
  title: string[];
}

/**
 * FeedbackHeader Component (Client Component)
 * 
 * Section header with animations
 * Client component for animations
 */
export const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ title }) => {
  return (
    <SectionHeader
      badge={{
        icon: <FaPlay className="mr-2" />,
        text: "Video Library",
        className: "bg-primary-100 text-primary-700",
      }}
      title={title[0]}
      subtitle={title[1]}
      description="Explore our comprehensive collection of educational videos designed to help you master the Italian driving license exam."
      className="mb-12"
    />
  );
};
