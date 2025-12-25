import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import AnimatedWave from "./common/AnimateWave";
import Bannar from "./Bannar/Bannar";
import Course from "./Course/Course";
import CourseInfo from "./CourseInfo/CourseInfo";
import DrivingLicence from "./DrivingLicence/DrivingLicence";
import FounderDetails from "./FounderDetails/FounderDetails";
import IntroVideo from "./IntroVideo/IntroVideo";
import LatestBlog from "./LatestBlog/LatestBlog";
import PinnedBlog from "./common/PinnedBlog";
import YTFreeVideo from "./YTFreeVideo";
import YTFeedback from "./YTFeedback";
import Poster from "./Poster/Poster";

import {
  FaGraduationCap,
  FaTrophy,
  FaRocket,
  FaStar,
  FaBookOpen,
  FaVideo,
  FaComments,
  FaHeart,
} from "react-icons/fa";
import { useUserUXSetting } from "@/features/User/store/user.store";
import { IWaveLayer } from "./common/AnimateWave";
import PinnedBlogWrapper from "./common/PinnedBlogWrapper";

// ============================================
// Types for Wave Configurations
// ============================================

/**
 * Wave configuration keys for different sections
 */
type WaveConfigKey =
  | "hero"
  | "introVideo"
  | "founder"
  | "poster"
  | "drivingLicense"
  | "latestBlog"
  | "ytFreeVideo";

/**
 * Wave configurations object type
 * Maps section names to arrays of wave layer configurations
 */
type WaveConfigs = {
  [K in WaveConfigKey]: IWaveLayer[];
};

// ============================================
// Wave configurations for each section
// ============================================

const WAVE_CONFIGS: WaveConfigs = {
  hero: [
    {
      width: "200%",
      height: "120%",
      left: "-50%",
      top: "-10%",
      x: [0, 80, 0],
      duration: 12,
      delay: 0,
      color: "rgb(239, 246, 255)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "80%",
      left: "-25%",
      top: "20%",
      x: [0, -60, 0],
      duration: 8,
      delay: 1.5,
      color: "rgb(219, 234, 254)",
      opacity: 0.4,
    },
    {
      width: "120%",
      height: "60%",
      left: "-10%",
      top: "40%",
      x: [0, 40, 0],
      duration: 6,
      delay: 3,
      color: "rgb(191, 219, 254)",
      opacity: 0.5,
    },
  ],
  introVideo: [
    {
      width: "180%",
      height: "110%",
      left: "-40%",
      top: "-5%",
      x: [0, -70, 0],
      duration: 14,
      delay: 0,
      color: "rgb(243, 232, 255)",
      opacity: 0.2,
    },
    {
      width: "140%",
      height: "90%",
      left: "-20%",
      top: "10%",
      x: [0, 90, 0],
      duration: 7,
      delay: 2,
      color: "rgb(233, 213, 255)",
      opacity: 0.4,
    },
    {
      width: "120%",
      height: "70%",
      left: "-5%",
      top: "30%",
      x: [0, -50, 0],
      duration: 9,
      delay: 4.5,
      color: "rgb(221, 214, 254)",
      opacity: 0.6,
    },
  ],
  founder: [
    {
      width: "220%",
      height: "130%",
      left: "-60%",
      top: "-15%",
      x: [0, 60, 0],
      duration: 16,
      delay: 0,
      color: "rgb(254, 226, 226)",
      opacity: 0.2,
    },
    {
      width: "120%",
      height: "60%",
      left: "0%",
      top: "40%",
      x: [0, -80, 0],
      duration: 5,
      delay: 1,
      color: "rgb(252, 165, 165)",
      opacity: 0.6,
    },
    {
      width: "160%",
      height: "85%",
      left: "-30%",
      top: "15%",
      x: [0, 70, 0],
      duration: 10,
      delay: 3.5,
      color: "rgb(248, 113, 113)",
      opacity: 0.4,
    },
  ],
  poster: [
    {
      width: "130%",
      height: "95%",
      left: "-15%",
      top: "5%",
      x: [0, -90, 0],
      duration: 6,
      delay: 0,
      color: "rgb(153, 246, 228)",
      opacity: 0.5,
    },
    {
      width: "190%",
      height: "120%",
      left: "-45%",
      top: "-10%",
      x: [0, 50, 0],
      duration: 13,
      delay: 2.5,
      color: "rgb(94, 234, 212)",
      opacity: 0.3,
    },
    {
      width: "120%",
      height: "75%",
      left: "-10%",
      top: "25%",
      x: [0, -60, 0],
      duration: 8,
      delay: 5,
      color: "rgb(45, 212, 191)",
      opacity: 0.4,
    },
  ],
  drivingLicense: [
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 50, 0],
      duration: 9,
      delay: 0,
      color: "rgb(199, 210, 254)",
      opacity: 0.4,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -20, 0],
      duration: 11,
      delay: 2,
      color: "rgb(165, 180, 252)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 50, 0],
      duration: 13,
      delay: 4.5,
      color: "rgb(129, 140, 248)",
      opacity: 0.2,
    },
  ],
  latestBlog: [
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -40, 0],
      duration: 10,
      delay: 0,
      color: "rgb(251, 207, 232)",
      opacity: 0.4,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 100, 0],
      duration: 12,
      delay: 1.5,
      color: "rgb(244, 114, 182)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -50, 0],
      duration: 14,
      delay: 3.5,
      color: "rgb(236, 72, 153)",
      opacity: 0.2,
    },
  ],
  ytFreeVideo: [
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 100, 0],
      duration: 8,
      delay: 0,
      color: "rgb(229, 231, 235)",
      opacity: 0.4,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -30, 0],
      duration: 10,
      delay: 1,
      color: "rgb(209, 213, 219)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 40, 0],
      duration: 12,
      delay: 3,
      color: "rgb(156, 163, 175)",
      opacity: 0.2,
    },
  ],
};

const Home = () => {
  // Show popup when pinned blog is available

  return (
    <div className="relative overflow-hidden">
      <PinnedBlogWrapper />
      {/* <ButtonExample /> */}

      {/* Hero Section - Dark Professional */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white rounded-full opacity-10"></div>
        </div>
        <Bannar />

        <AnimatedWave layers={WAVE_CONFIGS.hero} />
      </div>

      {/* Intro Video Section - Light Blue Professional */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-200 rounded-full"></div>
        </div>
        <IntroVideo />

        <AnimatedWave layers={WAVE_CONFIGS.introVideo} />
      </div>

      {/* Course Section - Purple Gradient */}
      <div className="relative bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <Course />
      </div>

      {/* Course Info Section - Green Professional */}
      <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-teal-200 rounded-full"></div>
        </div>
        <CourseInfo />
      </div>

      {/* Founder Details Section - Orange Warm */}
      <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>
        <FounderDetails />

        <AnimatedWave layers={WAVE_CONFIGS.founder} />
      </div>

      {/* Poster Section - Red Energy */}
      <div className="relative bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-red-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-rose-200 rounded-full"></div>
        </div>
        <Poster />

        <AnimatedWave layers={WAVE_CONFIGS.poster} />
      </div>

      {/* Driving Licence Section - Teal Professional */}
      <div className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
          <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
        </div>
        <DrivingLicence />

        <AnimatedWave layers={WAVE_CONFIGS.drivingLicense} />
      </div>

      {/* Latest Blog Section - Indigo Professional */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200 rounded-full"></div>
        </div>
        <LatestBlog />

        <AnimatedWave layers={WAVE_CONFIGS.latestBlog} />
      </div>

      {/* YT Free Video Section - Pink Creative */}
      <div className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>
        <YTFreeVideo />

        <AnimatedWave layers={WAVE_CONFIGS.ytFreeVideo} />
      </div>

      {/* YT Feedback Section - Gray Professional */}
      <div className="relative bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gray-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-slate-200 rounded-full"></div>
        </div>
        <YTFeedback />
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-10 text-blue-400 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaGraduationCap className="w-8 h-8" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 text-purple-400 opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <FaTrophy className="w-10 h-10" />
        </motion.div>

        <motion.div
          className="absolute top-60 left-1/4 text-green-400 opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <FaRocket className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute top-80 right-1/3 text-orange-400 opacity-20"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <FaStar className="w-7 h-7" />
        </motion.div>

        <motion.div
          className="absolute top-96 left-1/2 text-red-400 opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 12, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <FaBookOpen className="w-9 h-9" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-1/4 text-teal-400 opacity-20"
          animate={{
            y: [0, 18, 0],
            rotate: [0, -6, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        >
          <FaVideo className="w-8 h-8" />
        </motion.div>

        <motion.div
          className="absolute top-72 left-1/3 text-indigo-400 opacity-20"
          animate={{
            y: [0, -22, 0],
            rotate: [0, 7, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        >
          <FaComments className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute top-52 right-10 text-pink-400 opacity-20"
          animate={{
            y: [0, 28, 0],
            rotate: [0, -9, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
        >
          <FaHeart className="w-7 h-7" />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
