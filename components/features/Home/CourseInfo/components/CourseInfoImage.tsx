import React from "react";
import Image from "next/image";

/**
 * CourseInfoImage Component (Server Component)
 * 
 * Static course info image - server-rendered for SEO.
 * Optimized image with proper alt text and AOS animation attribute.
 */
const CourseInfoImage = () => {
  return (
    <div className="overflow-hidden">
      <Image
        width={500}
        height={500}
        className="mx-auto h-full w-full"
        src="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/car-driving.png"
        alt="Italian Driving License Course - Car Driving Illustration"
        data-aos="fade-up-left"
        priority={false}
      />
    </div>
  );
};

export default CourseInfoImage;
