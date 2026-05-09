"use client";

import React from "react";
import { motion } from "framer-motion";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import VideoSlide from "@/components/shared/VideoSlide";
import { ISubContent } from "@/features/UniContent/interface/uniContent.interface";

interface FeedbackVideoGridProps {
  videos: ISubContent[];
  isLoading: boolean;
  isFetching: boolean;
}

/**
 * FeedbackVideoGrid Component (Client Component)
 * 
 * Video grid with loading states
 * Client component for data display and animations
 */
export const FeedbackVideoGrid: React.FC<FeedbackVideoGridProps> = ({
  videos,
  isLoading,
  isFetching,
}) => {
  if (isFetching && videos.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoaderCircleWithBar />
      </div>
    );
  }

  if (videos.length === 0) {
    return null; // Empty state handled by parent
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8 relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <VideoSlide video={video} />
          </motion.div>
        ))}
      </div>

      {/* Loading Overlay */}
      {isFetching && videos.length > 0 && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
          <LoaderCircleWithBar />
        </div>
      )}
    </motion.div>
  );
};
