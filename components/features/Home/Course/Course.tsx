import React from "react";
import Container from "@/components/ui/Container";
import CourseHeader from "./components/CourseHeader";
import CourseVideo from "./components/CourseVideo";
import CourseContent from "./components/CourseContent";

/**
 * Course Component (Server Component)
 * 
 * Main course section - optimized for SEO and performance.
 * 
 * SEO Benefits:
 * - Server-rendered static content (headings, descriptions, features)
 * - Proper semantic HTML structure
 * - Fast initial page load
 * - Better crawlability
 * 
 * Performance Benefits:
 * - Static content doesn't require JavaScript
 * - Only interactive parts are client components
 * - Reduced initial bundle size
 * - Better Core Web Vitals
 * 
 * Note: AOS is initialized at the page level via AOSProvider in HomeClient
 */
const Course = () => {
  return (
    <section
      className="py-16 bg-linear-to-br from-gray-50 to-white"
      id="Course"
    >
      <Container>
        {/* Section Header */}
        <CourseHeader />

        {/* Course Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Video Section - Client Component */}
          <CourseVideo />

          {/* Content Section - Server Component for SEO */}
          <CourseContent />
        </div>
      </Container>
    </section>
  );
};

export default Course;
