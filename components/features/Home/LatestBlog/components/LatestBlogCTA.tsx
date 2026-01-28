"use client";
import React from "react";
import { motion } from "framer-motion";
import PLinkBtn from "@/components/shared/PLinkBtn";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";
import { Heading3, Body } from "@/components/ui/Typography";

/**
 * LatestBlogCTA Component (Client Component)
 * 
 * Call-to-action section with animations.
 * Client component for framer-motion animations.
 */
const LatestBlogCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 md:mb-6 gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 sm:mr-4">
            <FaBookOpen className="text-white text-lg sm:text-xl md:text-2xl" />
          </div>
          <div className="text-center sm:text-left">
            <Heading3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
              Want More Content?
            </Heading3>
            <Body className="text-sm sm:text-base text-gray-600">
              Explore our complete blog collection
            </Body>
          </div>
        </div>

        <PLinkBtn
          link="/blogs"
          text="View All Blogs"
          size="lg"
          className="group w-full sm:w-auto !bg-linear-to-r !from-primary-500 !to-primary-600 hover:!from-primary-600 hover:!to-primary-700 !focus:ring-primary-500"
          rightIcon={
            <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          }
        />
      </div>
    </motion.div>
  );
};

export default LatestBlogCTA;
