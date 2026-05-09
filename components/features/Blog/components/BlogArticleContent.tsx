"use client";

import React from "react";
import { motion } from "framer-motion";
import { Body } from "@/components/ui/Typography";

interface BlogArticleContentProps {
  description: string;
}

/**
 * BlogArticleContent Component (Client Component)
 * 
 * Blog article content
 * Client component for animations
 */
export const BlogArticleContent: React.FC<BlogArticleContentProps> = ({
  description,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="prose prose-xl max-w-none mb-12"
    >
      <div className="text-gray-800 leading-relaxed text-base sm:text-lg md:text-xl whitespace-pre-line">
        <Body>{description}</Body>
      </div>
    </motion.article>
  );
};
