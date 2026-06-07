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
      className="rounded-xl bg-gray-50 p-4 sm:rounded-2xl sm:p-6 lg:p-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-4 md:gap-6">
          <motion.button
            onClick={handleLike}
            aria-label={`Like article, ${likes + (isLiked ? 1 : 0)} likes`}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 transition-all duration-300 sm:w-auto sm:justify-start sm:gap-3 sm:px-6 sm:py-3 ${
              isLiked
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-gray-200 text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart
              className={`h-5 w-5 shrink-0 sm:h-6 sm:w-6 ${isLiked ? "fill-current" : ""}`}
            />
            <Caption className="text-sm font-semibold sm:text-base md:text-lg">
              <span className="sm:hidden">{likes + (isLiked ? 1 : 0)}</span>
              <span className="hidden sm:inline">
                {likes + (isLiked ? 1 : 0)} Likes
              </span>
            </Caption>
          </motion.button>

          <motion.button
            onClick={handleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Save article"}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 transition-all duration-300 sm:w-auto sm:justify-start sm:gap-3 sm:px-6 sm:py-3 ${
              isBookmarked
                ? "border-yellow-200 bg-yellow-50 text-yellow-500"
                : "border-gray-200 text-gray-600 hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-500"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <FaBookmark
              className={`h-5 w-5 shrink-0 sm:h-6 sm:w-6 ${isBookmarked ? "fill-current" : ""}`}
            />
            <Caption className="text-sm font-semibold sm:text-base md:text-lg">
              {isBookmarked ? "Saved" : "Save"}
            </Caption>
          </motion.button>
        </div>

        <motion.button
          onClick={handleShare}
          aria-label="Share article"
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-3 py-2.5 text-gray-600 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-500 sm:w-auto sm:justify-start sm:gap-3 sm:px-6 sm:py-3"
          whileTap={{ scale: 0.95 }}
        >
          <FaShareAlt className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          <Caption className="text-sm font-semibold sm:text-base md:text-lg">
            <span className="sm:hidden">Share</span>
            <span className="hidden sm:inline">Share Article</span>
          </Caption>
        </motion.button>
      </div>
    </motion.div>
  );
};
