"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { useParams } from "next/navigation";
import { mediaProvider } from "@/constants/mediaProvider";
import Link from "next/link";
import Image from "next/image";

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
import ReactPlayerLib from "react-player";

// Type assertion for ReactPlayer - types may not match actual API
const ReactPlayer = ReactPlayerLib as React.ComponentType<{
  url: string;
  width?: string;
  height?: string;
  controls?: boolean;
  className?: string;
  [key: string]: unknown;
}>;
import { FaStar, FaUsers, FaMobile } from "react-icons/fa";
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import {
  Heading1,
  Heading2,
  Heading3,
  Body,
  Caption,
} from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

interface AppInfo {
  id: number;
  name: string;
  title: string;
  category: string;
  rating: number;
  downloads: string;
  size: string;
  version: string;
  info: string;
  ytVideoLink: string;
  description: string;
  logoLink: string;
  PlayStoreInstallLink: string;
  ApkDownloadLink: string;
  iosDownLoadLink: string;
  features: string[];
  screenShots: string[];
}

export const AppsInfo: AppInfo[] = [
  {
    id: 1,
    name: "Easy Bangla Patente",
    title: "Classic Driving License App",
    category: "Education",
    rating: 4.8,
    downloads: "10K+",
    size: "25 MB",
    version: "2.1.0",
    info: "Unlock Your Road to Success in Italy with Our Expert Driving License Courses and Quiz App for Bengali Speakers! 🚗 At Easy Bangla Patente, we specialize in helping the Bengali-speaking community in Italy achieve their dreams of obtaining an Italian driving license. Our platform offers comprehensive online courses tailored specifically for Bengali speakers, designed to simplify the process and ensure your success!",
    ytVideoLink: "https://youtu.be/LHrQbhZSzPI",
    description:
      "Master Italian driving theory with our comprehensive online course. Pass your exam with confidence using our proven Bangla teaching method.",
    logoLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/app-icon-02.png",
    PlayStoreInstallLink: "",
    ApkDownloadLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/easybanglapatente2.apk",
    iosDownLoadLink:
      "https://apps.apple.com/app/easy-bangla-patente/id6727004305",
    features: [
      "Interactive Quiz System",
      "Bengali Language Support",
      "Offline Mode Available",
      "Progress Tracking",
      "Mock Tests",
    ],
    screenShots: [
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/3.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/4.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/5.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/6.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/7.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/8.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/9.png",
    ],
  },
  {
    id: 2,
    name: "Quiz Bangla Patente",
    title: "Modern Quiz App",
    category: "Education",
    rating: 4.9,
    downloads: "50K+",
    size: "30 MB",
    version: "3.0.1",
    info: "Unlock Your Road to Success in Italy with Our Expert Driving License Courses and Quiz App for Bengali Speakers! 🚗 At Easy Bangla Patente, we specialize in helping the Bengali-speaking community in Italy achieve their dreams of obtaining an Italian driving license. Our platform offers comprehensive online courses tailored specifically for Bengali speakers, designed to simplify the process and ensure your success!",
    ytVideoLink: "",
    description:
      "The latest and most advanced driving license quiz app with modern UI and enhanced features for better learning experience.",
    logoLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Qbp-App-Primary-Logo.png",
    PlayStoreInstallLink:
      "https://play.google.com/store/apps/details?id=com.recursolve.quiz_bangla_patente",
    ApkDownloadLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/easybanglapatente2.apk",
    iosDownLoadLink:
      "https://apps.apple.com/it/app/quiz-bangla-patente/id6742112091",
    features: [
      "Modern UI Design",
      "Advanced Analytics",
      "Social Features",
      "Cloud Sync",
      "Premium Content",
    ],
    screenShots: [
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/1.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/2.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/3.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/4.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/5.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/6.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/7.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/8.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/9.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/10.png",
    ],
  },
];

const AppPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const appId = id ? parseInt(id, 10) : null;

  const app = useMemo(
    () => (appId ? AppsInfo.find(({ id }) => id === appId) : undefined),
    [appId]
  );

  if (!app) {
    return (
      <Container className="py-12 sm:py-20">
        <div className="text-center">
          <Heading1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            App Not Found
          </Heading1>
          <Body className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            The requested app could not be found.
          </Body>
          <Link href="/">
            <Button variant="primary" size="lg">
              Go Back Home
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  const {
    name,
    title,
    category,
    rating,
    downloads,
    size,
    version,
    info,
    ytVideoLink,
    description,
    logoLink,
    PlayStoreInstallLink,
    ApkDownloadLink,
    iosDownLoadLink,
    features,
    screenShots,
  } = app;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-primary-50">
      <Container className="py-8 sm:py-12 md:py-20">
        {/* Hero Section */}
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
                  className="relative shrink-0"
                >
                  <Image
                    src={logoLink}
                    alt={name}
                    width={128}
                    height={128}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl shadow-2xl"
                    style={{
                      boxShadow: `0px 20px 40px 0px ${
                        appId === 2 ? "#003830" : "#c796fa"
                      }`,
                    }}
                  />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {version}
                  </div>
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

                  {/* App Stats */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-1.5">
                      <FaStar className="text-yellow-500 text-sm sm:text-base" />
                      <Caption className="font-semibold text-sm sm:text-base">
                        {rating}
                      </Caption>
                    </div>
                    <div className="flex items-center space-x-1.5 text-gray-600">
                      <FaUsers className="text-sm sm:text-base" />
                      <Caption className="text-sm sm:text-base">
                        {downloads}
                      </Caption>
                    </div>
                    <div className="flex items-center space-x-1.5 text-gray-600">
                      <FaMobile className="text-sm sm:text-base" />
                      <Caption className="text-sm sm:text-base">{size}</Caption>
                    </div>
                  </div>

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
              {ytVideoLink && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="aspect-video">
                    <ReactPlayer
                      url={ytVideoLink}
                      width="100%"
                      height="100%"
                      controls
                      className="absolute top-0 left-0"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
                </motion.div>
              )}

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

        {/* Features Section */}
        {features && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 sm:mb-16"
          >
            <Heading2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              App Features
            </Heading2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                      <FaStar className="text-primary-600 text-sm sm:text-base" />
                    </div>
                    <Body className="font-semibold text-gray-900 text-sm sm:text-base">
                      {feature}
                    </Body>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Screenshots Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <Heading2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Screenshots
          </Heading2>
          <AppScreenshotsShow screenShots={screenShots} />
        </motion.div>

        {/* Description Section */}
        {info && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg"
          >
            <Heading2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              About {name}
            </Heading2>
            <Body className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {info}
            </Body>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

interface AppShowCaseProps {
  title: string;
  info: string;
  id: string | number;
}

export const AppShowCase: React.FC<AppShowCaseProps> = ({
  title: showCaseTitle,
  info: showCaseInfo,
  id,
}) => {
  const appId = typeof id === "string" ? parseInt(id, 10) : id;
  const app = useMemo(() => AppsInfo.find(({ id }) => id === appId), [appId]);

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
              alt={name}
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

interface AppDownloadBtnProps {
  PlayStoreInstallLink?: string;
  ApkDownloadLink?: string;
  iosDownLoadLink?: string;
}

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

interface AppScreenshotsShowProps {
  screenShots: string[];
}

export const AppScreenshotsShow: React.FC<AppScreenshotsShowProps> = ({
  screenShots,
}) => {
  return (
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
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default AppPage;
