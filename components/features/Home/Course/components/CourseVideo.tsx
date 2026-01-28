"use client";
import React from "react";
import VideoPlayer from "@/components/features/Home/common/VideoPlayer";

/**
 * CourseVideo Component (Client Component)
 * 
 * Video player section for course preview.
 * Client component for video interactions.
 */
const CourseVideo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="modern-card p-1 sm:p-4 w-full max-w-3xl">
        <VideoPlayer
          videoLink="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/Paris_3rd_ADD_Video .mp4"
          coverUrl="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/Paris_Youtube_Video_COVER .png"
          title="Course to drive with confidence"
        />
      </div>
    </div>
  );
};

export default CourseVideo;
