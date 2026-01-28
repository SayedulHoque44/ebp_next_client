"use client";
import React from "react";

import AOSProvider from "./common/AOSProvider";
import SectionWrapper from "./common/SectionWrapper";
import SectionWithWave from "./common/SectionWithWave";
import FloatingIcons from "./common/FloatingIcons";
import PinnedBlogWrapper from "./common/PinnedBlogWrapper";
import Bannar from "./Bannar/Bannar";
import Course from "./Course/Course";
import CourseInfo from "./CourseInfo/CourseInfo";
import DrivingLicence from "./DrivingLicence/DrivingLicence";
import FounderDetails from "./FounderDetails/FounderDetails";
import IntroVideo from "./IntroVideo/IntroVideo";
import LatestBlog from "./LatestBlog/LatestBlog";
import YTFreeVideo from "./YTFreeVideo";
import YTFeedback from "./YTFeedback";
import Poster from "./Poster/Poster";

import { WAVE_CONFIGS } from "./config/waveConfigs";

/**
 * HomeClient Component
 * 
 * Client-side component for the Home page.
 * Contains all interactive elements and animations.
 * 
 * This component is wrapped by Home.tsx (server component) for better SEO and performance.
 */
const HomeClient = () => {
  return (
    <AOSProvider>
      <div className="relative overflow-hidden">
      <PinnedBlogWrapper />

      {/* Hero Section - Dark Professional */}
      <SectionWithWave sectionName="hero" waveLayers={WAVE_CONFIGS.hero}>
        <Bannar />
      </SectionWithWave>

      {/* Intro Video Section - Light Blue Professional */}
      <SectionWithWave sectionName="introVideo" waveLayers={WAVE_CONFIGS.introVideo}>
        <IntroVideo />
      </SectionWithWave>

      {/* Course Section - Purple Gradient */}
      <SectionWrapper sectionName="course">
        <Course />
      </SectionWrapper>

      {/* Course Info Section - Green Professional */}
      <SectionWrapper sectionName="courseInfo">
        <CourseInfo />
      </SectionWrapper>

      {/* Founder Details Section - Orange Warm */}
      <SectionWithWave sectionName="founder" waveLayers={WAVE_CONFIGS.founder}>
        <FounderDetails />
      </SectionWithWave>

      {/* Poster Section - Red Energy */}
      <SectionWithWave sectionName="poster" waveLayers={WAVE_CONFIGS.poster}>
        <Poster />
      </SectionWithWave>

      {/* Driving Licence Section - Teal Professional */}
      <SectionWithWave sectionName="drivingLicense" waveLayers={WAVE_CONFIGS.drivingLicense}>
        <DrivingLicence />
      </SectionWithWave>

      {/* Latest Blog Section - Indigo Professional */}
      <SectionWithWave sectionName="latestBlog" waveLayers={WAVE_CONFIGS.latestBlog}>
        <LatestBlog />
      </SectionWithWave>

      {/* YT Free Video Section - Pink Creative */}
      <SectionWithWave sectionName="ytFreeVideo" waveLayers={WAVE_CONFIGS.ytFreeVideo}>
        <YTFreeVideo />
      </SectionWithWave>

      {/* YT Feedback Section - Gray Professional */}
      <SectionWrapper sectionName="ytFeedback">
        <YTFeedback />
      </SectionWrapper>

      {/* Floating Elements */}
      <FloatingIcons />
      </div>
    </AOSProvider>
  );
};

export default HomeClient;
