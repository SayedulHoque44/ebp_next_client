"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  BodyLarge,
  Body,
  BodySmall,
  Caption,
} from "@/components/ui/Typography";
import { mediaProvider } from "@/constants/mediaProvider";
import {
  FaGraduationCap,
  FaClock,
  FaUsers,
  FaBook,
  FaVideo,
  FaWhatsapp,
  FaCalendarAlt,
  FaTrophy,
  FaStar,
  FaCheckCircle,
  FaPhone,
  FaGlobe,
  FaFacebook,
  FaYoutube,
  FaCar,
  FaDownload,
  FaRocket,
} from "react-icons/fa";
import { SiZoom } from "react-icons/si";
import { SocialLinks } from "@/constants/ui_constent";
import Image from "next/image";

const PosterCourseSchedule = () => {
  const [activeTab, setActiveTab] = useState("features");

  const courseFeatures = [
    {
      icon: <FaVideo className="w-4 h-4 sm:w-6 sm:h-6" />,
      title: "25 Chapters Live Zoom Classes",
      description: "Interactive live sessions covering all topics",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaWhatsapp className="w-4 h-4 sm:w-6 sm:h-6" />,
      title: "24/7 WhatsApp Quiz Support",
      description: "Round-the-clock quiz solution group",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FaBook className="w-4 h-4 sm:w-6 sm:h-6" />,
      title: "Bengali Tips & Tricks",
      description: "Complex quiz solutions in Bengali",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaCalendarAlt className="w-4 h-4 sm:w-6 sm:h-6" />,
      title: "1 Year Unlimited Access",
      description: "Unlimited online live classes for 1 year",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaRocket className="w-4 h-4 sm:w-6 sm:h-6" />,
      title: "Bengali Quiz Apps",
      description: "Mobile-friendly quiz applications",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FaTrophy className="w-4 h-4 sm:w-6 sm:h-6" />,
      title: "Special GUIDA Preparation",
      description: "Dedicated exam preparation classes",
      color: "from-red-500 to-red-600",
    },
  ];

  const resources = [
    "Easy Bengali Patente Book",
    "Italian Words Bengali Book",
    "25 Chapters Recorded Videos",
    "SCHEDA EXAM Q&A (PDF)",
    "TRUCCHI QUIZ (True/False)",
    "THEORY WITH QUIZ",
    "7000+ Quiz Book",
    "Student's Notes",
  ];

  const schedule = [
    { day: "Monday", time: "9:00 PM - 10:00 PM", batch: "1st Batch" },
    { day: "Wednesday", time: "9:00 PM - 10:00 PM", batch: "1st Batch" },
    { day: "Friday", time: "9:00 PM - 10:00 PM", batch: "1st Batch" },
    { day: "Monday", time: "10:10 PM - 11:20 PM", batch: "2nd Batch" },
    { day: "Wednesday", time: "10:10 PM - 11:20 PM", batch: "2nd Batch" },
    { day: "Friday", time: "10:10 PM - 11:20 PM", batch: "2nd Batch" },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          {/* <img
            className="w-full lg:w-1/2 mx-auto"
            src="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/homePagePoster.jpg"
            alt="poster"
          /> */}
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-6">
              <FaCar className="mr-3" />
              EASY BANGLA PATENTE - ESTD 2021
            </div>

            <Heading1 className="mb-4 text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Italian Driving License
              <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Patente Course
              </span>
            </Heading1>

            <div className="relative inline-block">
              {/* Glowing Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-lg opacity-75"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 10px 25px rgba(0,0,0,0.1)",
                    "0 20px 40px rgba(239, 68, 68, 0.3)",
                    "0 10px 25px rgba(0,0,0,0.1)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaRocket className="mr-3" />
                </motion.div>
                <motion.span
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Admission is Ongoing!
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Course Duration & Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            <div className="lg:col-span-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                    <FaCalendarAlt className="text-white text-sm sm:text-base md:text-lg" />
                  </div>
                  <div>
                    <Heading2 className="mb-1 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                      3 Months Course
                    </Heading2>
                    <Body className="text-blue-100 text-sm sm:text-base md:text-lg">
                      Comprehensive Learning Program
                    </Body>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.div
                    className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <FaCheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <BodyLarge>Bengali Quiz Apps - 6 months access</BodyLarge>
                  </motion.div>

                  <motion.div
                    className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg text-sm sm:text-base md:text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <FaCheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <BodyLarge>Website Apps - 6 months access</BodyLarge>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCar className="text-white text-3xl" />
                </div>
                <Heading4 className="mb-2 text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  EASY BANGLA PATENTE
                </Heading4>
                <Body className="text-gray-600 text-sm sm:text-base md:text-lg">
                  ONLINE DRIVING SCHOOL
                </Body>
                <Caption className="mt-2 text-gray-500 text-xs sm:text-sm md:text-base">
                  ESTD 2021
                </Caption>
              </div>
            </motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            {/* Indicator Badge */}
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-lg"
              >
                <FaBook className="mr-2" />
                Switch Tabs to Explore More
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </motion.div>
            </div>

            {/* Responsive Tab Container */}
            <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 inline-flex gap-1">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    activeTab === "features"
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  Course Features
                </button>
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    activeTab === "resources"
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  Resources
                </button>
                <button
                  onClick={() => setActiveTab("schedule")}
                  className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    activeTab === "schedule"
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  Schedule
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div
                      className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <Heading3 className="text-gray-900 mb-2">
                      {feature.title}
                    </Heading3>
                    <Body className="text-gray-600">{feature.description}</Body>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "resources" && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <Heading2 className="mb-6 text-center text-gray-900">
                  Course Resources
                </Heading2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all duration-300"
                    >
                      <FaCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <Body className="text-gray-700 font-medium">
                        {resource}
                      </Body>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <Heading2 className="mb-6 text-center text-gray-900">
                  Live Class Schedule
                </Heading2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {schedule.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Heading4 className="text-gray-900">
                          {item.day}
                        </Heading4>
                        <span className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                          {item.batch}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaClock className="w-4 h-4 mr-2" />
                        <Body>{item.time}</Body>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Heading2 className="mb-4 text-white">
                  Ready to Start Your Journey?
                </Heading2>
                <Body className="text-purple-100 mb-6">
                  Join thousands of successful students who have achieved their
                  Italian driving license with our proven methods.
                </Body>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaPhone className="w-5 h-5 mr-3" />
                    <div>
                      <Caption className="text-white font-semibold">
                        Main Contact
                      </Caption>
                      <Body className="text-purple-100">+39 320 608 8871</Body>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="w-5 h-5 mr-3" />
                    <div>
                      <Caption className="text-white font-semibold">
                        Help Line
                      </Caption>
                      <Body className="text-purple-100">+39 389 961 1153</Body>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaGlobe className="w-5 h-5 mr-3" />
                    <div>
                      <Caption className="text-white font-semibold">
                        Website
                      </Caption>
                      <Body className="text-purple-100">
                        https://easybanglapatente.com
                      </Body>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src={mediaProvider.founder.src}
                    alt="Founder"
                    width={100}
                    height={100}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>
                <Heading4 className="mb-2 text-white">Nazmul Islam</Heading4>
                <Body className="text-purple-100">
                  Founder: Easy Bangla Patente
                </Body>

                <div className="flex justify-center space-x-4 mt-6">
                  {SocialLinks.map((item: any, index: number) => (
                    <a
                      href={item.link}
                      key={index}
                      target="_blank"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors duration-300"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default PosterCourseSchedule;
