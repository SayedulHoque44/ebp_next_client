"use client";

import React from "react";
import { motion } from "framer-motion";
import { FOOTER_STATS } from "../config/footer.config";

/**
 * FooterStats Component (Client Component)
 * 
 * Statistics section with animations
 * Client component for animations
 */
export const FooterStats: React.FC = () => {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {FOOTER_STATS.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
              <IconComponent className="text-2xl text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stat.number}
            </div>
            <div className="text-gray-300 text-sm">{stat.label}</div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
