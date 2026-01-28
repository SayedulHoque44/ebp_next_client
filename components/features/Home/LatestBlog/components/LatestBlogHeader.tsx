import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaSortAmountDown } from "react-icons/fa";

/**
 * LatestBlogHeader Component (Server Component)
 * 
 * Section header with SEO-friendly content.
 * Server-rendered for better SEO and initial page load.
 */
const LatestBlogHeader = () => {
  return (
    <SectionHeader
      badge={{
        icon: <FaSortAmountDown className="mr-2" />,
        text: "Latest Articles",
        className: "bg-primary-100 text-primary-700",
      }}
      title="Our Latest"
      subtitle="Blog Posts"
      description="Stay updated with our latest insights, tips, and success stories from our driving school community. Discover valuable information to help you on your journey to getting your Italian driving license."
      className="mb-12"
    />
  );
};

export default LatestBlogHeader;
