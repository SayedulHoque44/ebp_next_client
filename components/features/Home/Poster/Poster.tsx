import React from "react";
import Container from "@/components/ui/Container";
import PosterBackground from "./components/PosterBackground";
import PosterHeader from "./components/PosterHeader";
import PosterCourseDuration from "./components/PosterCourseDuration";
import PosterTabs from "./components/PosterTabs";
import PosterContact from "./components/PosterContact";

/**
 * Poster Component (Server Component)
 * 
 * Main poster/course schedule section - optimized for SEO and performance.
 * 
 * SEO Benefits:
 * - Server-rendered static content (headings, descriptions)
 * - Proper semantic HTML structure
 * - Fast initial page load
 * - Better crawlability
 * 
 * Performance Benefits:
 * - Background elements server-rendered
 * - Static content doesn't require JavaScript
 * - Only interactive parts are client components
 * - Reduced initial bundle size
 * 
 * Note: AOS is initialized at the page level via AOSProvider in HomeClient
 */
const PosterCourseSchedule = () => {
  return (
    <div className="py-20 bg-linear-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Elements - Server Rendered */}
      <PosterBackground />

      <Container>
        <div className="relative z-10">
          {/* Header Section - Client Component for Animations */}
          <PosterHeader />

          {/* Course Duration & Access - Client Component for Animations */}
          <PosterCourseDuration />

          {/* Tabs Section - Client Component for State & Animations */}
          <PosterTabs />

          {/* Contact Section - Client Component for Animations */}
          <PosterContact />
        </div>
      </Container>
    </div>
  );
};

export default PosterCourseSchedule;
