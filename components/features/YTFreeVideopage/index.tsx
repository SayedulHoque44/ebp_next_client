import React from "react";
import VideoShowSection from "@/components/features/Feedback/VideoShowSection";
import { YT_FREE_VIDEO_CONFIG } from "./config/video.config";

/**
 * YTFreeVideoPage Component (Server Component)
 * 
 * Free YouTube videos page wrapper
 * Server-rendered for SEO and performance
 * 
 * This component wraps the VideoShowSection component with
 * specific configuration for free videos.
 */
const YTFreeVideoPage = () => {
  return (
    <VideoShowSection
      id={YT_FREE_VIDEO_CONFIG.id}
      title={YT_FREE_VIDEO_CONFIG.title}
      sorting={YT_FREE_VIDEO_CONFIG.sorting}
    />
  );
};

export default YTFreeVideoPage;
