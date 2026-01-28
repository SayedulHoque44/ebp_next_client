"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heading2,
  Heading3,
  Heading4,
  Body,
} from "@/components/ui/Typography";
import {
  FaBook,
  FaVideo,
  FaWhatsapp,
  FaCalendarAlt,
  FaTrophy,
  FaRocket,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

/**
 * PosterTabs Component (Client Component)
 * 
 * Tabbed interface for course features, resources, and schedule.
 * Client component for state management and animations.
 */
const PosterTabs = () => {
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
    <>
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
            className="inline-flex items-center px-4 py-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full shadow-lg"
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
                  ? "bg-linear-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              Course Features
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === "resources"
                  ? "bg-linear-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === "schedule"
                  ? "bg-linear-to-r from-primary-500 to-primary-600 text-white shadow-lg"
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
                  className={`w-8 h-8 sm:w-12 sm:h-12 bg-linear-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
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
                  className="flex items-center p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all duration-300"
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
                  className="p-6 bg-linear-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200"
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
    </>
  );
};

export default PosterTabs;
