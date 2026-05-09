"use client";

import React from "react";
import { motion } from "framer-motion";
import Logo from "@/components/shared/Logo";
import CTA from "@/components/shared/CTA";
import { FOOTER_HERO_TITLE, FOOTER_CONTACT } from "../config/footer.config";

/**
 * FooterHero Component (Client Component)
 * 
 * Hero section with logo, title, and CTA
 * Client component for animations
 */
export const FooterHero: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-white gap-8 mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Logo nameColor="text-white" />
      <h1 className="text-3xl md:text-6xl lg:text-7xl leading-tight text-center font-bold">
        {FOOTER_HERO_TITLE.main}
        <span className="block bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {FOOTER_HERO_TITLE.highlight}
        </span>
      </h1>
      <CTA phone={FOOTER_CONTACT.phone} />
    </motion.div>
  );
};
