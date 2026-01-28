"use client";
import React from "react";
import { FaClock, FaUsers, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimatedCounter from "../../common/AnimatedCounter";
import { STATS, STATS_LABELS } from "@/constants/ui_constent";

/**
 * IntroVideoStats Component (Client Component)
 * 
 * Animated success metrics cards.
 * Client component for animations and interactivity.
 */
const IntroVideoStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <motion.div
        className="text-center p-6 modern-card hover:shadow-medium transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-16 h-16 bg-linear-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaTrophy className="text-white text-2xl" />
        </div>
        <AnimatedCounter
          end={STATS.SUCCESS_RATE}
          suffix="%"
          duration={2}
          className="text-2xl font-bold text-gray-900 mb-2"
          easing="easeOutCubic"
        />
        <p className="text-gray-600">{STATS_LABELS.SUCCESS_RATE}</p>
      </motion.div>

      <motion.div
        className="text-center p-6 modern-card hover:shadow-medium transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-16 h-16 bg-linear-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaClock className="text-white text-2xl" />
        </div>
        <AnimatedCounter
          end={45}
          suffix=" Days"
          duration={1.5}
          className="text-2xl font-bold text-gray-900 mb-2"
          easing="easeOutCubic"
        />
        <p className="text-gray-600">Average Time</p>
      </motion.div>

      <motion.div
        className="text-center p-6 modern-card hover:shadow-medium transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-16 h-16 bg-linear-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUsers className="text-white text-2xl" />
        </div>
        <AnimatedCounter
          end={STATS.STUDENTS_PASSED}
          suffix="+"
          duration={2.5}
          className="text-2xl font-bold text-gray-900 mb-2"
          easing="easeOutCubic"
        />
        <p className="text-gray-600">{STATS_LABELS.STUDENTS_PASSED}</p>
      </motion.div>
    </div>
  );
};

export default IntroVideoStats;
