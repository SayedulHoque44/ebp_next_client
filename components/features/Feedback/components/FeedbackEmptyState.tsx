"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaVideo } from "react-icons/fa";

interface FeedbackEmptyStateProps {
  searchTerm: string;
  onClearSearch: () => void;
}

/**
 * FeedbackEmptyState Component (Client Component)
 * 
 * Empty state when no videos found
 * Client component for animations and interactions
 */
export const FeedbackEmptyState: React.FC<FeedbackEmptyStateProps> = ({
  searchTerm,
  onClearSearch,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 max-w-md mx-auto">
        <div className="w-16 h-16 bg-linear-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaVideo className="text-white text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No Videos Found
        </h3>
        <p className="text-gray-600 mb-4">
          {searchTerm
            ? `No videos match "${searchTerm}". Try a different search term.`
            : "No videos available at the moment. Please check back later."}
        </p>
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
          >
            Clear Search
          </button>
        )}
      </div>
    </motion.div>
  );
};
