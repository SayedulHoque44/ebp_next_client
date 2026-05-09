"use client";

import React from "react";
import { motion } from "framer-motion";
import { SocialLinks } from "@/constants/ui_constent";

/**
 * FooterSocialLinks Component (Client Component)
 * 
 * Social media links with animations
 * Client component for hover interactions
 */
export const FooterSocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-4 mt-6">
      {SocialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 transition-colors duration-300 ${social.color}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Visit our ${social.name} page`}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
};
