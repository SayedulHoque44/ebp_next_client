"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { Heading2 } from "@/components/ui/Typography";

interface AppScreenshotsProps {
  screenShots: string[];
}

/**
 * AppScreenshots Component (Client Component)
 * 
 * Screenshots carousel with Swiper
 * Client component for carousel interactions
 */
export const AppScreenshots: React.FC<AppScreenshotsProps> = ({
  screenShots,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-12 sm:mb-16"
    >
      <Heading2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
        Screenshots
      </Heading2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {screenShots.map((item: string, index: number) => (
          <SwiperSlide key={`${item}-${index}`}>
            <div className="flex justify-center">
              <Image
                width={400}
                height={400}
                className="rounded-lg m-auto max-h-[400px] sm:max-h-[500px] object-contain"
                src={item}
                alt={`${screenShots.length > 0 ? "App" : ""} Screenshot ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
