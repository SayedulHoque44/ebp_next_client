import React from "react";
import Container from "@/components/ui/Container";
import CourseInfoImage from "./components/CourseInfoImage";
import CourseInfoVideo from "./components/CourseInfoVideo";

/**
 * CourseInfo Component (Server Component)
 * 
 * Course information section - optimized for SEO and performance.
 * 
 * SEO Benefits:
 * - Server-rendered static content (image)
 * - Proper semantic HTML structure
 * - Fast initial page load
 * - Better crawlability
 * 
 * Performance Benefits:
 * - Static image server-rendered
 * - Only video player is client component
 * - Reduced initial bundle size
 * - Better Core Web Vitals
 * 
 * Note: AOS is initialized globally via AOSProvider in HomeClient.tsx
 */
const CourseInfo = () => {
  return (
    <section className="py-10" id="Assets">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Course Info Image - Server Rendered for SEO */}
          <CourseInfoImage />

          {/* Course Info Video - Client Component for Interactions */}
          <CourseInfoVideo />
        </div>
      </Container>
    </section>
  );
};

export default CourseInfo;
