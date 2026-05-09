"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Caption, Heading1, Body } from "@/components/ui/Typography";
import { AppInfo } from "../data/apps.data";
import { AppStats } from "./AppStats";
import { AppLogo } from "./AppLogo";
import { AppDownloadBtn } from "./AppDownloadBtn";
import { AppVideoPlayer } from "./AppVideoPlayer";

interface AppHeroProps {
  app: AppInfo;
}

/**
 * AppHero Component (Client Component)
 * 
 * Hero section with app info and video
 * Client component for animations
 */
export const AppHero: React.FC<AppHeroProps> = ({ app }) => {
  const {
    name,
    title,
    category,
    rating,
    downloads,
    size,
    version,
    ytVideoLink,
    description,
    logoLink,
    PlayStoreInstallLink,
    ApkDownloadLink,
    iosDownLoadLink,
  } = app;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 sm:mb-16"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
        {/* App Info */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AppLogo
                logoLink={logoLink}
                name={name}
                version={version}
                appId={app.id}
              />
            </motion.div>

            <div className="flex-1 w-full">
              <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                <Caption className="bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full">
                  {category}
                </Caption>
              </div>
              <Heading1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {name}
              </Heading1>
              <Body className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6">
                {title}
              </Body>

              <AppStats rating={rating} downloads={downloads} size={size} />

              <AppDownloadBtn
                PlayStoreInstallLink={PlayStoreInstallLink}
                ApkDownloadLink={ApkDownloadLink}
                iosDownLoadLink={iosDownLoadLink}
              />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="space-y-4 sm:space-y-6">
          {ytVideoLink && <AppVideoPlayer ytVideoLink={ytVideoLink} />}

          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Body className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                {description}
              </Body>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
