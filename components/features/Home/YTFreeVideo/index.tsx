import React from "react";
import Container from "@/components/ui/Container";
import YTFreeVideoBackground from "./components/YTFreeVideoBackground";
import YTFreeVideoHeader from "./components/YTFreeVideoHeader";
import YTFreeVideoSlider from "./components/YTFreeVideoSlider";
import YTFreeVideoCTA from "./components/YTFreeVideoCTA";

/**
 * YTFreeVideo Component (Server Component)
 * 
 * Main free videos section - optimized for SEO and performance.
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
const YTFreeVideo = () => {
  return (
    <div
      className="py-20 bg-linear-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden"
      id="videos"
    >
      {/* Background Elements - Server Rendered */}
      <YTFreeVideoBackground />

      <Container>
        <div className="relative z-10">
          {/* Section Header - Server Rendered for SEO */}
          <YTFreeVideoHeader />

          {/* Video Slider - Client Component for Animations */}
          <YTFreeVideoSlider />

          {/* CTA Section - Client Component for Animations */}
          <YTFreeVideoCTA />
        </div>
      </Container>
    </div>
  );
};

export default YTFreeVideo;
