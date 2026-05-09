"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

/**
 * BlogBackButton Component (Client Component)
 * 
 * Back to blogs button
 * Client component for animations
 */
export const BlogBackButton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <Link
        href="/blogs"
        className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 group"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Blogs
      </Link>
    </motion.div>
  );
};
