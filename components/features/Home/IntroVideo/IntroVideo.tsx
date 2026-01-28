import React from "react";
import Container from "@/components/ui/Container";
import IntroVideoBackground from "./components/IntroVideoBackground";
import IntroVideoHeader from "./components/IntroVideoHeader";
import IntroVideoPlayer from "./components/IntroVideoPlayer";
import IntroVideoStats from "./components/IntroVideoStats";

/**
 * IntroVideo Component (Server Component)
 * 
 * Main intro video section - optimized for SEO and performance.
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
const IntroVideo = () => {
  return (
    <div className="py-20 bg-linear-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements - Server Rendered */}
      <IntroVideoBackground />

      <Container>
        <div className="relative z-10">
          {/* Section Header - Server Rendered for SEO */}
          <IntroVideoHeader />

          {/* Video Section - Client Component for Interactions */}
          <IntroVideoPlayer />

          {/* Success Metrics - Client Component for Animations */}
          <IntroVideoStats />
        </div>
      </Container>
    </div>
  );
};

export default IntroVideo;
