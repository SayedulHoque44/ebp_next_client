"use client";

import React from "react";
import { motion } from "framer-motion";
import ReactPlayerLib from "react-player";

// Type assertion for ReactPlayer - types may not match actual API
const ReactPlayer = ReactPlayerLib as React.ComponentType<{
  url: string;
  width?: string;
  height?: string;
  controls?: boolean;
  className?: string;
  [key: string]: unknown;
}>;

interface AppVideoPlayerProps {
  ytVideoLink: string;
}

/**
 * AppVideoPlayer Component (Client Component)
 * 
 * YouTube video player with animations
 * Client component for video interactions
 */
export const AppVideoPlayer: React.FC<AppVideoPlayerProps> = ({
  ytVideoLink,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="aspect-video">
        <ReactPlayer
          url={ytVideoLink}
          width="100%"
          height="100%"
          controls
          className="absolute top-0 left-0"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
    </motion.div>
  );
};
