import React from "react";
import Container from "@/components/ui/Container";
import YTFeedbackBackground from "./components/YTFeedbackBackground";
import YTFeedbackHeader from "./components/YTFeedbackHeader";
import YTFeedbackVideoSlider from "./components/YTFeedbackVideoSlider";
import YTFeedbackStats from "./components/YTFeedbackStats";
import YTFeedbackCTA from "./components/YTFeedbackCTA";

/**
 * YTFeedback Component (Server Component)
 * 
 * Main YouTube feedback section - optimized for SEO and performance.
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
const YTFeedback = () => {
  return (
    <div
      className="py-20 bg-linear-to-br from-white via-gray-50 to-accent-50 relative overflow-hidden"
      id="feedback"
    >
      {/* Background Elements - Server Rendered */}
      <YTFeedbackBackground />

      <Container>
        <div className="relative z-10">
          {/* Section Header - Server Rendered for SEO */}
          <YTFeedbackHeader />

          {/* Video Slider - Client Component for Animations */}
          <YTFeedbackVideoSlider />

          {/* Success Stats - Client Component for Animations */}
          <YTFeedbackStats />

          {/* CTA Section - Client Component for Animations */}
          <YTFeedbackCTA />
        </div>
      </Container>
    </div>
  );
};

export default YTFeedback;
