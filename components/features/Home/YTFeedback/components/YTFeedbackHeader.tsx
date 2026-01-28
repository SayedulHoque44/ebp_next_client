import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaTrophy } from "react-icons/fa";

/**
 * YTFeedbackHeader Component (Server Component)
 * 
 * Section header with SEO-friendly content.
 * Server-rendered for better SEO and initial page load.
 */
const YTFeedbackHeader = () => {
  return (
    <SectionHeader
      badge={{
        icon: <FaTrophy className="mr-2" />,
        text: "Success And Feedback",
        className: "bg-accent-100 text-accent-700",
      }}
      title="Our Students"
      subtitle="Success And Feedback"
      description="Watch real success stories from our students who passed their Italian driving license theory exam in just 45 days using our proven Bangla teaching method. These testimonials showcase the effectiveness of our approach."
      className="mb-16"
    />
  );
};

export default YTFeedbackHeader;
