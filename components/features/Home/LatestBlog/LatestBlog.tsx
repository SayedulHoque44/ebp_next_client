import React from "react";
import Container from "@/components/ui/Container";
import LatestBlogBackground from "./components/LatestBlogBackground";
import LatestBlogHeader from "./components/LatestBlogHeader";
import LatestBlogList from "./components/LatestBlogList";
import LatestBlogCTA from "./components/LatestBlogCTA";

/**
 * LatestBlog Component (Server Component)
 * 
 * Main latest blog section - optimized for SEO and performance.
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
const LatestBlog = () => {
  return (
    <div
      className="py-20 bg-linear-to-br from-gray-50 to-white relative overflow-hidden"
      id="DL"
    >
      {/* Background Elements - Server Rendered */}
      <LatestBlogBackground />

      <Container>
        <div className="relative z-10">
          {/* Section Header - Server Rendered for SEO */}
          <LatestBlogHeader />

          {/* Blog Grid - Client Component for Data Fetching */}
          <LatestBlogList />

          {/* CTA Section - Client Component for Animations */}
          <LatestBlogCTA />
        </div>
      </Container>
    </div>
  );
};

export default LatestBlog;
