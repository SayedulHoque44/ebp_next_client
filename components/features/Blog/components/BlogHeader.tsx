"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaSortAmountDown } from "react-icons/fa";
import SectionHeader from "@/components/shared/SectionHeader";

/**
 * BlogHeader Component (Client Component)
 * 
 * Section header with animations
 * Client component for animations
 */
export const BlogHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
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
    </motion.div>
  );
};
