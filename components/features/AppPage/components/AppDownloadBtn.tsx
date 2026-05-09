"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import { mediaProvider } from "@/constants/mediaProvider";

interface AppDownloadBtnProps {
  PlayStoreInstallLink?: string;
  ApkDownloadLink?: string;
  iosDownLoadLink?: string;
}

/**
 * AppDownloadBtn Component (Client Component)
 * 
 * Download buttons for Play Store, APK, and App Store
 * Client component for hover animations
 */
export const AppDownloadBtn: React.FC<AppDownloadBtnProps> = ({
  PlayStoreInstallLink,
  ApkDownloadLink,
  iosDownLoadLink,
}) => {
  const buttonBaseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-sm shadow-soft hover:shadow-medium";

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      {PlayStoreInstallLink ? (
        <motion.a
          href={PlayStoreInstallLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${buttonBaseClasses} bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-500 justify-start`}
        >
          <SiGoogleplay className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          <div className="text-left">
            <div className="text-[10px] sm:text-xs leading-tight opacity-90">
              GET IT ON
            </div>
            <div className="text-xs sm:text-sm font-bold leading-tight">
              Google Play
            </div>
          </div>
        </motion.a>
      ) : (
        <motion.a
          href={ApkDownloadLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${buttonBaseClasses} bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white focus:ring-gray-500 justify-start`}
        >
          <Image
            src={mediaProvider.robot}
            className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
            alt="Android"
            width={24}
            height={24}
          />
          <div className="text-left">
            <div className="text-[10px] sm:text-xs leading-tight opacity-90">
              DOWNLOAD
            </div>
            <div className="text-xs sm:text-sm font-bold leading-tight">
              APK File
            </div>
          </div>
        </motion.a>
      )}

      <motion.a
        href={iosDownLoadLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${buttonBaseClasses} bg-linear-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white focus:ring-gray-500 justify-start`}
      >
        <SiAppstore className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        <div className="text-left">
          <div className="text-[10px] sm:text-xs leading-tight opacity-90">
            Download on the
          </div>
          <div className="text-xs sm:text-sm font-bold leading-tight">
            App Store
          </div>
        </div>
      </motion.a>
    </div>
  );
};
