"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaTrophy,
  FaRocket,
  FaStar,
  FaBookOpen,
  FaVideo,
  FaComments,
  FaHeart,
} from "react-icons/fa";

/**
 * FloatingIcons Component
 * 
 * Displays animated floating icons in the background.
 * These icons provide visual interest without interfering with content.
 * 
 * Performance: Uses framer-motion for smooth animations.
 * Consider replacing with CSS animations for better performance if needed.
 */
const FloatingIcons = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 text-blue-400 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaGraduationCap className="w-8 h-8" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-purple-400 opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <FaTrophy className="w-10 h-10" />
      </motion.div>

      <motion.div
        className="absolute top-60 left-1/4 text-green-400 opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <FaRocket className="w-6 h-6" />
      </motion.div>

      <motion.div
        className="absolute top-80 right-1/3 text-orange-400 opacity-20"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <FaStar className="w-7 h-7" />
      </motion.div>

      <motion.div
        className="absolute top-96 left-1/2 text-red-400 opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 12, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <FaBookOpen className="w-9 h-9" />
      </motion.div>

      <motion.div
        className="absolute top-32 right-1/4 text-teal-400 opacity-20"
        animate={{
          y: [0, 18, 0],
          rotate: [0, -6, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      >
        <FaVideo className="w-8 h-8" />
      </motion.div>

      <motion.div
        className="absolute top-72 left-1/3 text-indigo-400 opacity-20"
        animate={{
          y: [0, -22, 0],
          rotate: [0, 7, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      >
        <FaComments className="w-6 h-6" />
      </motion.div>

      <motion.div
        className="absolute top-52 right-10 text-pink-400 opacity-20"
        animate={{
          y: [0, 28, 0],
          rotate: [0, -9, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7,
        }}
      >
        <FaHeart className="w-7 h-7" />
      </motion.div>
    </div>
  );
};

export default FloatingIcons;
