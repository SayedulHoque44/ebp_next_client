"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

/**
 * BlogSearch Component (Client Component)
 * 
 * Search input with animations
 * Client component for user interactions
 */
export const BlogSearch: React.FC<BlogSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-2xl mx-auto mb-12"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-lg"
        />
      </div>
    </motion.div>
  );
};
