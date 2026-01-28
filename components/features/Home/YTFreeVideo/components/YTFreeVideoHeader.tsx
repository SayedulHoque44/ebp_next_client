import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaPlay } from "react-icons/fa";

/**
 * YTFreeVideoHeader Component (Server Component)
 * 
 * Section header with SEO-friendly content.
 * Server-rendered for better SEO and initial page load.
 */
const YTFreeVideoHeader = () => {
  return (
    <SectionHeader
      badge={{
        icon: <FaPlay className="mr-2" />,
        text: "Free Videos",
        className: "bg-primary-100 text-primary-700",
      }}
      title="Our Free"
      subtitle="Videos"
      description="Watch our free videos to learn more about our course and get a preview of our teaching methods. These videos will help you understand our approach and decide if our course is right for you."
      className="mb-16"
    />
  );
};

export default YTFreeVideoHeader;
