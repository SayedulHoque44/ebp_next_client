"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaUsers } from "react-icons/fa";
import { Heading3, Body, Caption } from "@/components/ui/Typography";
import { getAppById } from "../data/apps.data";
import { AppDownloadBtn } from "./AppDownloadBtn";

interface AppShowCaseProps {
  title: string;
  info: string;
  id: string | number;
}

/**
 * AppShowCase Component (Client Component)
 * 
 * Showcase card for app preview
 * Client component for hover animations
 */
export const AppShowCase: React.FC<AppShowCaseProps> = ({
  title: showCaseTitle,
  info: showCaseInfo,
  id,
}) => {
  const appId = typeof id === "string" ? parseInt(id, 10) : id;
  const app = useMemo(() => getAppById(appId), [appId]);

  if (!app) return null;

  const {
    name,
    logoLink,
    PlayStoreInstallLink,
    ApkDownloadLink,
    iosDownLoadLink,
    rating,
    downloads,
  } = app;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
        <Link href={`/App/${id}`} className="shrink-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <Image
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              src={logoLink}
              alt={`${name} app logo`}
              width={96}
              height={96}
            />
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {rating}
            </div>
          </motion.div>
        </Link>

        <div className="flex-1 space-y-3 sm:space-y-4 w-full">
          <div>
            <Heading3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
              {showCaseTitle}
            </Heading3>
            <Body className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              {showCaseInfo}
            </Body>

            {/* App Stats */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              <div className="flex items-center space-x-1">
                <FaStar className="text-yellow-500" />
                <Caption>{rating}</Caption>
              </div>
              <div className="flex items-center space-x-1">
                <FaUsers />
                <Caption>{downloads}</Caption>
              </div>
            </div>
          </div>

          <AppDownloadBtn
            PlayStoreInstallLink={PlayStoreInstallLink}
            ApkDownloadLink={ApkDownloadLink}
            iosDownLoadLink={iosDownLoadLink}
          />
        </div>
      </div>
    </motion.div>
  );
};
