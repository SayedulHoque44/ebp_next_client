import React from "react";
import Container from "@/components/ui/Container";
import DrivingLicenceBackground from "./components/DrivingLicenceBackground";
import DrivingLicenceHeader from "./components/DrivingLicenceHeader";
import DrivingLicenceBlogList from "./components/DrivingLicenceBlogList";
import DrivingLicenceCTA from "./components/DrivingLicenceCTA";

/**
 * DrivingLicence Component (Server Component)
 * 
 * Success stories section - optimized for SEO and performance.
 * 
 * SEO Benefits:
 * - Server-rendered static structure
 * - Proper semantic HTML structure
 * - Fast initial page load
 * - Better crawlability
 * 
 * Performance Benefits:
 * - Background elements server-rendered
 * - Only data fetching and animations are client components
 * - Reduced initial bundle size
 * - Better Core Web Vitals
 * 
 * Note: Blog data is fetched client-side using React Query.
 * This is necessary for real-time data and user interactions.
 */
const DrivingLicence = () => {
  return (
    <section
      className="py-20 bg-linear-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden"
      id="DL"
    >
      {/* Background Elements - Server Rendered */}
      <DrivingLicenceBackground />

      <Container>
        <div className="relative z-10">
          {/* Section Header - Client Component for Animations */}
          <DrivingLicenceHeader />

          {/* Blog List - Client Component for Data Fetching */}
          <DrivingLicenceBlogList />

          {/* CTA Section - Client Component for Animations */}
          <DrivingLicenceCTA />
        </div>
      </Container>
    </section>
  );
};

export default DrivingLicence;
