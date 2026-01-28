"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaTrophy, FaUsers } from "react-icons/fa";
import { STATS, STATS_LABELS } from "@/constants/ui_constent";

/**
 * YTFeedbackStats Component (Client Component)
 * 
 * Success statistics cards with animations.
 * Client component for framer-motion animations.
 */
const YTFeedbackStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="w-12 h-12 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaStar className="text-white text-xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
        <p className="text-gray-600">Average Rating</p>
      </div>

      <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="w-12 h-12 bg-linear-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaTrophy className="text-white text-xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {STATS.SUCCESS_RATE}%
        </h3>
        <p className="text-gray-600">{STATS_LABELS.SUCCESS_RATE}</p>
      </div>

      <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="w-12 h-12 bg-linear-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUsers className="text-white text-xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {STATS.STUDENTS_PASSED}+
        </h3>
        <p className="text-gray-600">Happy Students</p>
      </div>
    </motion.div>
  );
};

export default YTFeedbackStats;
