import React, { useState } from "react";
import Container from "../../../Shared/Container/Container";
import YTVideoPlayer from "../../../Shared/Components/YTVideoPlayer";
import SectionHeader from "../../../Shared/Components/SectionHeader/SectionHeader";
import { FaPlay, FaClock, FaUsers, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimatedCounter from "../../../Shared/Components/AnimatedCounter/AnimatedCounter";
import VideoPlayer from "../../../Shared/Components/VideoPlayer";
import { STATS, STATS_LABELS } from "../../../Shared/Constants";

const IntroVideo = () => {
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleVideoPlay = (event, playerState) => {
    // Hide overlay when video is played for the first time
    if (!hasPlayed) {
      setHasPlayed(true);
    }
  };
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary-300 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          {/* Section Header */}
          <SectionHeader
            badge={{
              icon: <FaTrophy className="mr-2" />,
              text: "Success Stories",
              className: "bg-primary-100 text-primary-700",
            }}
            title="See How Our Students"
            subtitle="Pass in 45 Days"
            description="Watch real success stories from our students who passed their Italian driving license theory exam in just 45 days using our proven Bangla teaching method."
            className="mb-16"
          />

          {/* Video Section */}
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
                {/* <YTVideoPlayer 
                  YTId={"4jBnXOCdBRA"}
                  coverUrl={
                    "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/45 Days Theory Pass .png"
                  }
                /> */}
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

            {/* Success Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                className="text-center p-6 modern-card hover:shadow-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrophy className="text-white text-2xl" />
                </div>
                <AnimatedCounter
                  end={STATS.SUCCESS_RATE}
                  suffix="%"
                  duration={2}
                  className="text-2xl font-bold text-gray-900 mb-2"
                  easing="easeOutCubic"
                />
                <p className="text-gray-600">{STATS_LABELS.SUCCESS_RATE}</p>
              </motion.div>

              <motion.div
                className="text-center p-6 modern-card hover:shadow-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-white text-2xl" />
                </div>
                <AnimatedCounter
                  end={45}
                  suffix=" Days"
                  duration={1.5}
                  className="text-2xl font-bold text-gray-900 mb-2"
                  easing="easeOutCubic"
                />
                <p className="text-gray-600">Average Time</p>
              </motion.div>

              <motion.div
                className="text-center p-6 modern-card hover:shadow-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <AnimatedCounter
                  end={STATS.STUDENTS_PASSED}
                  suffix="+"
                  duration={2.5}
                  className="text-2xl font-bold text-gray-900 mb-2"
                  easing="easeOutCubic"
                />
                <p className="text-gray-600">{STATS_LABELS.STUDENTS_PASSED}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default IntroVideo;
