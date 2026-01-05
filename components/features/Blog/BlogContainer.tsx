"use client";
import moment from "moment-timezone";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaComments, FaEye, FaBookmark, FaShareAlt } from "react-icons/fa";
import { minimizeText } from "@/utils/utils";
import Link from "next/link";
import { Heading3, Body, Caption } from "@/components/ui/Typography";
import { IBlog } from "@/features/Blog/interface/blog.interface";

/*
//TODO
1. Like only possiable if its a logged user {userId:.. like:true}/{userId:...,like:false}
2. Comment also only for logged user {userId:...,comment:"string"}
*/

const BlogContainer = ({ blog }: { blog: IBlog }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [seeMore, setSeeMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const {
    _id,
    title,
    description,
    pin,
    createdAt,
    imageUrl,
    likes = 0,
    views = 0,
    comments = 0,
  } = blog as IBlog & { likes: number; views: number; comments: number };

  const handleResize = useCallback(() => {
    setIsMobile(
      typeof window !== "undefined" ? window.innerWidth < 768 : false
    );
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const textObj = minimizeText(description, isMobile);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url:
          typeof window !== "undefined"
            ? window.location.origin + `/blogs/${_id}`
            : "",
      });
    } else {
      navigator.clipboard.writeText(
        typeof window !== "undefined"
          ? window.location.origin + `/blogs/${_id}`
          : ""
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group w-full max-w-sm mx-auto h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden ">
        {imageUrl && (
          <motion.img
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            src={imageUrl}
            alt={title}
            loading="lazy"
          />
        )}
        {pin && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full">
            <Caption className="text-xs font-semibold">Pinned</Caption>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
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
              <Caption>{views || 0}</Caption>
            </div>
            <div className="flex items-center">
              <FaComments className="w-4 h-4 mr-1" />
              <Caption>{comments || 0}</Caption>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        {/* Read More Button */}
        <Link
          href={`/blogs/${_id}`}
          className=" mb-4 inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 group"
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
    </motion.div>
  );
};

export default BlogContainer;
