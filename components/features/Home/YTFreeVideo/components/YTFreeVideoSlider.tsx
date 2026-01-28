"use client";
import React from "react";
import { motion } from "framer-motion";
import YTVideoSliderContainer from "@/components/shared/YTVideoSliderContainer";

/**
 * YTFreeVideoSlider Component (Client Component)
 * 
 * Video slider container with animations.
 * Client component for framer-motion animations.
 */
const YTFreeVideoSlider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <YTVideoSliderContainer
        RefId={"66a5f14fcef6bbd5277663da"}
        limit={6}
        sorting={"createdAt"}
      />
    </motion.div>
  );
};

export default YTFreeVideoSlider;
