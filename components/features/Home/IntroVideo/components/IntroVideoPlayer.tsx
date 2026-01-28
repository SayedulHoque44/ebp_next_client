"use client";
import React, { useState } from "react";
import { FaPlay, FaClock, FaUsers, FaTrophy } from "react-icons/fa";
import VideoPlayer from "../../common/VideoPlayer";
import { STATS } from "@/constants/ui_constent";

/**
 * IntroVideoPlayer Component (Client Component)
 * 
 * Video player with overlay information that disappears after first play.
 * Client component for interactive state management.
 */
const IntroVideoPlayer = () => {
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleVideoPlay = (
    event: React.MouseEvent<HTMLDivElement>,
    playerState: any
  ) => {
    // Hide overlay when video is played for the first time
    if (!hasPlayed) {
      setHasPlayed(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="modern-card p-1 sm:p-8 relative group">
        {/* Video Stats */}
        <div className="absolute -top-4 -right-4 bg-white rounded-full p-1 sm:p-4 shadow-large z-10">
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-gray-700">
            <FaUsers className="text-primary-600" />
            <span>{STATS.STUDENTS_PASSED}+ Views</span>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-large group-hover:shadow-glow transition-all duration-500">
          <VideoPlayer
            videoLink="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/45_DINE_THEORY_PASS_Nazmul_N23_Add_Video.mp4"
            coverUrl="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/45 Days Theory Pass .png"
            title="45 Days Theory Pass"
            onPlay={handleVideoPlay}
          />

          {/* Video Overlay Info - Only shows before first play */}
          {!hasPlayed && (
            <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 md:bottom-3 md:left-3 md:right-3 bg-black/70 backdrop-blur-sm rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-3 text-white transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3 flex-nowrap">
                {/* Stats section */}
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-nowrap">
                  <div className="flex items-center space-x-1">
                    <FaClock className="text-yellow-400 text-[10px] sm:text-xs" />
                    <span className="text-[10px] sm:text-xs whitespace-nowrap">
                      45 Days
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaTrophy className="text-yellow-400 text-[10px] sm:text-xs" />
                    <span className="text-[10px] sm:text-xs whitespace-nowrap">
                      <span className="hidden sm:inline">
                        100% Pass Rate
                      </span>
                      <span className="sm:hidden">100%</span>
                    </span>
                  </div>
                </div>
                {/* Watch Now section */}
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <FaPlay className="text-primary-400 text-[10px] sm:text-xs" />
                  <span className="text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                    Watch Now
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroVideoPlayer;
