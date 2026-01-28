"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heading1 } from "@/components/ui/Typography";
import { FaCar, FaRocket } from "react-icons/fa";

/**
 * PosterHeader Component (Client Component)
 * 
 * Header section with animated badge and CTA button.
 * Client component for framer-motion animations.
 */
const PosterHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center px-6 py-3 bg-linear-to-r from-primary-500 to-primary-600 text-white rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-6">
        <FaCar className="mr-3" />
        EASY BANGLA PATENTE - ESTD 2021
      </div>

      <Heading1 className="mb-4 text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Italian Driving License
        <span className="block bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Patente Course
        </span>
      </Heading1>

      <div className="relative inline-block">
        {/* Glowing Background Effect */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-orange-400 to-red-400 rounded-2xl blur-lg opacity-75"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="relative inline-flex items-center px-8 py-4 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-lg"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 10px 25px rgba(0,0,0,0.1)",
              "0 20px 40px rgba(239, 68, 68, 0.3)",
              "0 10px 25px rgba(0,0,0,0.1)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaRocket className="mr-3" />
          </motion.div>
          <motion.span
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Admission is Ongoing!
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PosterHeader;
