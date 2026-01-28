import React from "react";
import Container from "@/components/ui/Container";
import BannarBackground from "./components/BannarBackground";
import BannarContent from "./components/BannarContent";
import BannarStats from "./components/BannarStats";
import BannarVisual from "./components/BannarVisual";

/**
 * Bannar Component (Server Component)
 * 
 * Main hero banner section - optimized for SEO and performance.
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
const Bannar = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-gray-50 via-white to-primary-50">
      {/* Background Elements - Server Rendered */}
      <BannarBackground />

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Hero Content - Server Rendered for SEO */}
          <div className="space-y-8">
            <BannarContent />
            {/* Stats - Client Component for Animations */}
            <BannarStats />
          </div>

          {/* Hero Visual - Client Component for Interactions */}
          <BannarVisual />
        </div>
      </Container>
    </div>
  );
};

export default Bannar;
