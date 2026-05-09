"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import { FaEye, FaComments } from "react-icons/fa";
import { minimizeText } from "@/utils/utils";
import { Heading3, Body, Caption } from "@/components/ui/Typography";

interface BlogCardContentProps {
  title: string;
  description: string;
  createdAt: string;
  views?: number;
  comments?: number;
}

/**
 * BlogCardContent Component (Client Component)
 * 
 * Blog card content with expandable description
 * Client component for interactions
 */
export const BlogCardContent: React.FC<BlogCardContentProps> = ({
  title,
  description,
  createdAt,
  views = 0,
  comments = 0,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [handleResize]);

  const textObj = minimizeText(description, isMobile);

  return (
    <div className="p-6">
      {/* Title */}
      <motion.div
        className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <Heading3>{title}</Heading3>
      </motion.div>

      {/* Description */}
      <div className="mb-4">
        <Body className="text-gray-600 text-sm leading-relaxed">
          {seeMore ? description : textObj.minText}
          {textObj.minifay && !seeMore && (
            <button
              onClick={() => setSeeMore(true)}
              className="text-primary-600 hover:text-primary-700 font-medium ml-1 transition-colors duration-200"
            >
              Read more...
            </button>
          )}
          {seeMore && (
            <button
              onClick={() => setSeeMore(false)}
              className="text-primary-600 hover:text-primary-700 font-medium ml-1 transition-colors duration-200"
            >
              Show less
            </button>
          )}
        </Body>
      </div>

      {/* Date */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
        <Caption>{moment(createdAt).local().format("MMM D, YYYY")}</Caption>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaEye className="w-4 h-4 mr-1" />
            <Caption>{views}</Caption>
          </div>
          <div className="flex items-center">
            <FaComments className="w-4 h-4 mr-1" />
            <Caption>{comments}</Caption>
          </div>
        </div>
      </div>
    </div>
  );
};
