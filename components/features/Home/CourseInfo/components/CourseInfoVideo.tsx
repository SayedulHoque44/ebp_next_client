"use client";
import React from "react";
import YTVideoPlayer from "../../common/YTVideoPlayer";

/**
 * CourseInfoVideo Component (Client Component)
 * 
 * YouTube video player for course information.
 * Client component for video interactions and playback.
 */
const CourseInfoVideo = () => {
  return (
    <div className="space-y-5 overflow-hidden">
      <YTVideoPlayer
        coverUrl="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/EBP_NEW_ADD_Cover 28.09.25.png"
        YTId="57PHv-PCbxg"
      />
    </div>
  );
};

export default CourseInfoVideo;
