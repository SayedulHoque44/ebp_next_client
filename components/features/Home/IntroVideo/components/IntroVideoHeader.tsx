import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaTrophy } from "react-icons/fa";

/**
 * IntroVideoHeader Component (Server Component)
 * 
 * Section header with SEO-friendly content.
 * Server-rendered for better SEO and initial page load.
 */
const IntroVideoHeader = () => {
  return (
    <SectionHeader
      badge={{
        icon: <FaTrophy className="mr-2" />,
        text: "Success Stories",
        className: "bg-primary-100 text-primary-700",
      }}
      title="See How Our Students"
      subtitle="Pass in 45 Days"
      description="Watch real success stories from our students who passed their Italian driving license theory exam in just 45 days using our proven Bangla teaching method."
      className="mb-16"
    />
  );
};

export default IntroVideoHeader;
