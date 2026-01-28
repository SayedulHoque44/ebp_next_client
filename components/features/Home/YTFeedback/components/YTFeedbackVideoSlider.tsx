"use client";
import React from "react";
import { motion } from "framer-motion";
import YTVideoSliderContainer from "@/components/shared/YTVideoSliderContainer";

/**
 * YTFeedbackVideoSlider Component (Client Component)
 * 
 * Video slider container with animations.
 * Client component for framer-motion animations.
 */
const YTFeedbackVideoSlider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <YTVideoSliderContainer
        RefId={"66a5eadacef6bbd5277663cc"}
        limit={6}
        sorting={"-createdAt"}
      />
    </motion.div>
  );
};

export default YTFeedbackVideoSlider;
