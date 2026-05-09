"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaBookmark, FaShareAlt } from "react-icons/fa";
import { Caption } from "@/components/ui/Typography";

interface BlogCardActionsProps {
  blogId: string;
  likes: number;
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

/**
 * BlogCardActions Component (Client Component)
 * 
 * Blog card action buttons (like, bookmark, share, read more)
 * Client component for interactions
 */
export const BlogCardActions: React.FC<BlogCardActionsProps> = ({
  blogId,
  likes,
  onLike,
  onBookmark,
  onShare,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
    onBookmark?.();
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "",
        url: typeof window !== "undefined" ? window.location.origin + `/blogs/${blogId}` : "",
      });
    } else {
      navigator.clipboard.writeText(
        typeof window !== "undefined" ? window.location.origin + `/blogs/${blogId}` : ""
      );
    }
    onShare?.();
  };

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      {/* Read More Button */}
      <Link
        href={`/blogs/${blogId}`}
        className="mb-4 inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-linear-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 group"
      >
        Read Full Article
        <motion.svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </motion.svg>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <motion.button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
            isLiked
              ? "text-red-500 bg-red-50"
              : "text-gray-500 hover:text-red-500 hover:bg-red-50"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {isLiked ? (
            <AiFillLike className="w-5 h-5" />
          ) : (
            <AiOutlineLike className="w-5 h-5" />
          )}
          <Caption className="text-sm font-medium">
            {likes + (isLiked ? 1 : 0)}
          </Caption>
        </motion.button>

        <motion.button
          onClick={handleBookmark}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
            isBookmarked
              ? "text-yellow-500 bg-yellow-50"
              : "text-gray-500 hover:text-yellow-500 hover:bg-yellow-50"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <FaBookmark className="w-5 h-5" />
          <Caption className="text-sm font-medium">Save</Caption>
        </motion.button>

        <motion.button
          onClick={handleShare}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <FaShareAlt className="w-5 h-5" />
          <Caption className="text-sm font-medium">Share</Caption>
        </motion.button>
      </div>
    </div>
  );
};
