"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaArrowRight } from "react-icons/fa";
import PLinkBtn from "@/components/shared/PLinkBtn";

/**
 * YTFeedbackCTA Component (Client Component)
 * 
 * Call-to-action section with animations.
 * Client component for framer-motion animations.
 */
const YTFeedbackCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 md:mb-4 gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center flex-shrink-0 sm:mr-4">
            <FaTrophy className="text-white text-lg sm:text-xl md:text-2xl" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
              More Success Stories
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Watch all student testimonials
            </p>
          </div>
        </div>

        <PLinkBtn
          link="/feedback"
          text="View All Testimonials"
          size="lg"
          className="group w-full sm:w-auto !bg-linear-to-r !from-accent-500 !to-accent-600 hover:!from-accent-600 hover:!to-accent-700 !focus:ring-accent-500"
          rightIcon={
            <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          }
        />
      </div>
    </motion.div>
  );
};

export default YTFeedbackCTA;
