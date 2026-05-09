"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaSortAmountDown, FaVideo } from "react-icons/fa";

interface FeedbackSearchAndFilterProps {
  searchTerm: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

/**
 * FeedbackSearchAndFilter Component (Client Component)
 * 
 * Search and filter controls
 * Client component for user interactions
 */
export const FeedbackSearchAndFilter: React.FC<
  FeedbackSearchAndFilterProps
> = ({ searchTerm, sortBy, onSearchChange, onSortChange }) => {
  const sortOptions = [
    {
      value: "createdAt",
      label: "Latest First",
      icon: <FaSortAmountDown />,
    },
    {
      value: "-createdAt",
      label: "Oldest First",
      icon: <FaSortAmountDown className="rotate-180" />,
    },
    { value: "title", label: "Title A-Z", icon: <FaVideo /> },
    { value: "-title", label: "Title Z-A", icon: <FaVideo /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-8"
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white/50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-w-[200px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
