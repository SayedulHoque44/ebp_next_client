"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * BlogEmptyState Component (Client Component)
 * 
 * Empty state when no blogs found
 * Client component for animations
 */
export const BlogEmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        No Blog Posts Found
      </h3>
      <p className="text-gray-600">
        We&apos;re working on creating amazing content for you. Check back soon!
      </p>
    </motion.div>
  );
};
