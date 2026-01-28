"use client";
import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaGraduationCap } from "react-icons/fa";

/**
 * DrivingLicenceHeader Component (Client Component)
 * 
 * Section header with badge and title.
 * Client component because SectionHeader uses framer-motion.
 */
const DrivingLicenceHeader = () => {
  return (
    <SectionHeader
      badge={{
        icon: <FaGraduationCap className="mr-2" />,
        text: "Success Stories",
        className: "bg-primary-100 text-primary-700",
      }}
      title="Our Success"
      subtitle="Students"
      description="Meet our successful students who have achieved their Italian driving license with our proven teaching methods. These real stories showcase the effectiveness of our approach and inspire others to follow their dreams."
      className="mb-16"
    />
  );
};

export default DrivingLicenceHeader;
