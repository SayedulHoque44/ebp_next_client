"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Heading2,
  Heading4,
  Body,
  BodyLarge,
  Caption,
} from "@/components/ui/Typography";
import { FaCalendarAlt, FaCheckCircle, FaCar } from "react-icons/fa";

/**
 * PosterCourseDuration Component (Client Component)
 * 
 * Course duration and access information section.
 * Client component for framer-motion animations.
 */
const PosterCourseDuration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
    >
      <div className="lg:col-span-2">
        <motion.div
          className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
              <FaCalendarAlt className="text-white text-sm sm:text-base md:text-lg" />
            </div>
            <div>
              <Heading2 className="mb-1 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                3 Months Course
              </Heading2>
              <Body className="text-blue-100 text-sm sm:text-base md:text-lg">
                Comprehensive Learning Program
              </Body>
            </div>
          </div>

          <div className="space-y-3">
            <motion.div
              className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FaCheckCircle className="w-5 h-5 mr-3 text-green-300" />
              <BodyLarge>Bengali Quiz Apps - 6 months access</BodyLarge>
            </motion.div>

            <motion.div
              className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FaCheckCircle className="w-5 h-5 mr-3 text-green-300" />
              <BodyLarge>Website Apps - 6 months access</BodyLarge>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCar className="text-white text-3xl" />
          </div>
          <Heading4 className="mb-2 text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            EASY BANGLA PATENTE
          </Heading4>
          <Body className="text-gray-600 text-sm sm:text-base md:text-lg">
            ONLINE DRIVING SCHOOL
          </Body>
          <Caption className="mt-2 text-gray-500 text-xs sm:text-sm md:text-base">
            ESTD 2021
          </Caption>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PosterCourseDuration;
