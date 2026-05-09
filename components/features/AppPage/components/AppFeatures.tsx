"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Heading2, Body } from "@/components/ui/Typography";

interface AppFeaturesProps {
  features: string[];
}

/**
 * AppFeatures Component (Client Component)
 * 
 * Features grid with animations
 * Client component for animations
 */
export const AppFeatures: React.FC<AppFeaturesProps> = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-12 sm:mb-16"
    >
      <Heading2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
        App Features
      </Heading2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                <FaStar className="text-primary-600 text-sm sm:text-base" />
              </div>
              <Body className="font-semibold text-gray-900 text-sm sm:text-base">
                {feature}
              </Body>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
