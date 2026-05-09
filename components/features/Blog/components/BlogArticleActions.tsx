"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaBookmark, FaShareAlt } from "react-icons/fa";
import { Caption } from "@/components/ui/Typography";

interface BlogArticleActionsProps {
  likes: number;
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

/**
 * BlogArticleActions Component (Client Component)
 * 
 * Blog article action buttons (like, bookmark, share)
 * Client component for interactions
 */
export const BlogArticleActions: React.FC<BlogArticleActionsProps> = ({
  likes,
  onLike,
  onBookmark,
  onShare,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    onShare?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-gray-50 rounded-2xl p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <motion.button
            onClick={handleLike}
            className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
              isLiked
                ? "text-red-500 bg-red-50 border-2 border-red-200"
                : "text-gray-600 hover:text-red-500 hover:bg-red-50 border-2 border-gray-200 hover:border-red-200"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
            <Caption className="font-semibold text-lg">
              {likes + (isLiked ? 1 : 0)} Likes
            </Caption>
          </motion.button>

          <motion.button
            onClick={handleBookmark}
            className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
              isBookmarked
                ? "text-yellow-500 bg-yellow-50 border-2 border-yellow-200"
                : "text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 border-2 border-gray-200 hover:border-yellow-200"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <FaBookmark
              className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`}
            />
            <Caption className="font-semibold text-lg">
              {isBookmarked ? "Saved" : "Save"}
            </Caption>
          </motion.button>
        </div>

        <motion.button
          onClick={handleShare}
          className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-200 rounded-xl transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <FaShareAlt className="w-6 h-6" />
          <Caption className="font-semibold text-lg">Share Article</Caption>
        </motion.button>
      </div>
    </motion.div>
  );
};
