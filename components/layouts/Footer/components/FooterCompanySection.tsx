"use client";

import React from "react";
import { motion } from "framer-motion";
import { FooterContactInfo } from "./FooterContactInfo";
import { FooterSocialLinks } from "./FooterSocialLinks";

/**
 * FooterCompanySection Component (Client Component)
 * 
 * Company info section with animations
 * Client component for animations
 */
export const FooterCompanySection: React.FC = () => {
  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <FooterContactInfo />
      <FooterSocialLinks />
    </motion.div>
  );
};
