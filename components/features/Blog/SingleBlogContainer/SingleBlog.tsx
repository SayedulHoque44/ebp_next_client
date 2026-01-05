"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaEye,
  FaComments,
  FaHeart,
  FaShareAlt,
  FaBookmark,
  FaUser,
  FaTag,
} from "react-icons/fa";
import moment from "moment-timezone";
import { Image } from "antd";
import { Heading1, Body, Caption } from "@/components/ui/Typography";
import { IBlog } from "@/features/Blog/interface/blog.interface";

const SingleBlog = ({ blogData }: { blogData: IBlog }) => {
  const {
    _id,
    title,
    description,
    pin,
    createdAt,
    imageUrl,
    author,
    category,
    likes = 0,
    views = 0,
    comments = 0,
  } = blogData as IBlog & {
    likes: number;
    views: number;
    comments: number;
    author: string;
    category: string;
  };
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-5xl mx-auto"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        {/* Category & Date */}
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
              <Caption className="font-medium">{views || 0} views</Caption>
            </div>
            <div className="flex items-center text-base">
              <FaComments className="w-5 h-5 mr-2" />
              <Caption className="font-medium">
                {comments || 0} comments
              </Caption>
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
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
            loading="lazy"
          />
        </motion.div>
      )}

      {/* Article Content */}
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

      {/* Action Bar */}
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
    </motion.div>
  );
};

export default SingleBlog;
