"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Heading2, Body } from "@/components/ui/Typography";

/**
 * BlogNotFound Component (Client Component)
 * 
 * 404 page for blog not found
 * Client component for animations
 */
export const BlogNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">😕</div>
        <Heading2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Blog Not Found
        </Heading2>
        <Body className="text-gray-600 mb-6">
          The blog you&apos;re looking for doesn&apos;t exist or has been removed.
        </Body>
        <Link
          href="/blogs"
          className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blogs
        </Link>
      </motion.div>
    </div>
  );
};
