"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading2, Body } from "@/components/ui/Typography";

interface AppDescriptionProps {
  name: string;
  info: string;
}

/**
 * AppDescription Component (Client Component)
 * 
 * About section with app description
 * Client component for animations
 */
export const AppDescription: React.FC<AppDescriptionProps> = ({
  name,
  info,
}) => {
  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg"
    >
      <Heading2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        About {name}
      </Heading2>
      <Body className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
        {info}
      </Body>
    </motion.div>
  );
};
