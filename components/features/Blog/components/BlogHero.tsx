"use client";

import React from "react";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import {
  FaCalendarAlt,
  FaEye,
  FaComments,
  FaUser,
  FaTag,
} from "react-icons/fa";
import { Heading1, Body, Caption } from "@/components/ui/Typography";
import Image from "next/image";

interface BlogHeroProps {
  title: string;
  category?: string;
  createdAt: string;
  views: number;
  comments: number;
  author?: string;
  pin?: boolean;
  imageUrl?: string;
}

/**
 * BlogHero Component (Client Component)
 * 
 * Blog hero section with title, meta, and featured image
 * Client component for animations
 */
export const BlogHero: React.FC<BlogHeroProps> = ({
  title,
  category,
  createdAt,
  views,
  comments,
  author,
  pin,
  imageUrl,
}) => {
  return (
    <>
      {/* Category & Date */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            {category && (
              <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                <FaTag className="w-4 h-4 mr-2" />
                {category}
              </span>
            )}
            <div className="flex items-center text-gray-500 text-base">
              <FaCalendarAlt className="w-4 h-4 mr-2" />
              <Caption>
                {moment(createdAt).local().format("MMMM D, YYYY")}
              </Caption>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-gray-500">
            <div className="flex items-center text-base">
              <FaEye className="w-5 h-5 mr-2" />
              <Caption className="font-medium">{views} views</Caption>
            </div>
            <div className="flex items-center text-base">
              <FaComments className="w-5 h-5 mr-2" />
              <Caption className="font-medium">{comments} comments</Caption>
            </div>
          </div>
        </div>

        {/* Title */}
        <Heading1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </Heading1>

        {/* Author & Meta */}
        <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
          {author && (
            <div className="flex items-center text-gray-700">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <FaUser className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <Body className="text-lg font-semibold">{author}</Body>
                <Caption className="text-gray-500">Author</Caption>
              </div>
            </div>
          )}

          {pin && (
            <div className="flex items-center text-red-500">
              <span className="text-2xl mr-2">📌</span>
              <Caption className="font-semibold">Pinned Post</Caption>
            </div>
          )}
        </div>
      </motion.div>

      {/* Featured Image */}
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <Image
            src={imageUrl}
            alt={title}
            width={1200}
            height={500}
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
            priority
          />
        </motion.div>
      )}
    </>
  );
};
