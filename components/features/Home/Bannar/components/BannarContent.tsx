import React from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import {
  Caption,
  BengaliHeading1,
  BengaliBody,
} from "@/components/ui/Typography";
import BannarCTA from "./BannarCTA";

/**
 * BannarContent Component (Server Component)
 * 
 * Static hero content - server-rendered for SEO.
 * Contains the main heading, description, and CTA buttons.
 */
const BannarContent = () => {
  return (
    <div className="space-y-8" data-aos="fade-right">
      <div className="space-y-4">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700">
          <FaStar className="mr-2 text-yellow-500" />
          <Caption className="text-sm font-semibold">
            #1 Italian Driving License Course
          </Caption>
        </div>

        {/* Main Heading - SEO Optimized */}
        <div className="space-y-2">
          <BengaliHeading1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Master Italian
            <span className="gradient-text block">Driving License</span>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-600">
              in Bangla
            </span>
          </BengaliHeading1>
        </div>

        {/* Description - SEO Rich Content */}
        <BengaliBody className="text-lg sm:text-xl text-gray-600 max-w-lg">
          Learn Italian driving theory with our comprehensive online course. Pass
          your exam with confidence using our proven Bangla teaching method.
        </BengaliBody>
      </div>

      {/* CTA Buttons */}
      <BannarCTA />
    </div>
  );
};

export default BannarContent;
