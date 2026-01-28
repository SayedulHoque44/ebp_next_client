import React from "react";
import Image from "next/image";
import {
  Heading2,
  Heading3,
  BengaliBody,
  Caption,
  Overline,
} from "@/components/ui/Typography";
import { mediaProvider } from "@/constants/mediaProvider";
import CourseCTA from "./CourseCTA";
import CourseFeatureCard from "./CourseFeatureCard";

/**
 * CourseContent Component (Server Component)
 * 
 * Static course content - server-rendered for SEO.
 * Contains course description, features, and information.
 */
const CourseContent = () => {
  return (
    <div className="modern-card p-8 lg:p-10">
      <div className="aos-init" data-aos="fade-up">
        <Overline className="text-primary-600 font-semibold">
          Our Course
        </Overline>
        <div className="space-y-6">
          {/* Main Heading - SEO Optimized */}
          <Heading2 className="text-2xl sm:text-3xl lg:text-4xl">
            Standard Driving Course
          </Heading2>

          {/* Description - SEO Rich Content */}
          <BengaliBody className="text-base sm:text-lg text-gray-600">
            📢 ভর্তি চলছে 📢ইতালিয়ান ড্রাইভিং লাইসেন্স অনলাইন পাতেন্তে A এবং B
            কোর্স BANGLA PATENTE
          </BengaliBody>

          {/* Course Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CourseFeatureCard
              icon={mediaProvider.icon6.src}
              title="THEORY SESSION"
              duration="150 Hours"
              variant="primary"
              alt="Theory Session Icon"
            />
            <CourseFeatureCard
              icon={mediaProvider.icon7.src}
              title="PRACTICAL SESSION"
              duration="06 Hours"
              variant="accent"
              alt="Practical Session Icon"
            />
          </div>

          {/* CTA */}
          <div className="pt-4">
            <CourseCTA />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
