"use client";
import Aos from "aos";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import YTVideoSliderContainer from "@/components/shared/YTVideoSliderContainer";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaTrophy, FaArrowRight, FaStar, FaUsers } from "react-icons/fa";
import PLinkBtn from "@/components/shared/PLinkBtn";
import { STATS, STATS_LABELS } from "@/constants/ui_constent";

const YTFeedback = () => {
  useEffect(() => {
    Aos.init();
    Aos.refresh(); // Call AOS.refresh() after initialization

    return () => {
      Aos.refresh();
    };
  }, []);
  return (
    <div
      className="py-20 bg-gradient-to-br from-white via-gray-50 to-accent-50 relative overflow-hidden"
      id="feedback"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-100 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          <SectionHeader
            badge={{
              icon: <FaTrophy className="mr-2" />,
              text: "Success And Feedback",
              className: "bg-accent-100 text-accent-700",
            }}
            title="Our Students"
            subtitle="Success And Feedback"
            description="Watch real success stories from our students who passed their Italian driving license theory exam in just 45 days using our proven Bangla teaching method. These testimonials showcase the effectiveness of our approach."
            className="mb-16"
          />

          {/* Video Slider Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <YTVideoSliderContainer
              RefId={"66a5eadacef6bbd5277663cc"}
              limit={6}
              sorting={"-createdAt"}
            />
          </motion.div>

          {/* Success Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {STATS.SUCCESS_RATE}%
              </h3>
              <p className="text-gray-600">{STATS_LABELS.SUCCESS_RATE}</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {STATS.STUDENTS_PASSED}+
              </h3>
              <p className="text-gray-600">Happy Students</p>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 md:mb-4 gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center flex-shrink-0 sm:mr-4">
                  <FaTrophy className="text-white text-lg sm:text-xl md:text-2xl" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
                    More Success Stories
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Watch all student testimonials
                  </p>
                </div>
              </div>

              <PLinkBtn
                link="/feedback"
                text="View All Testimonials"
                size="lg"
                className="group w-full sm:w-auto !bg-gradient-to-r !from-accent-500 !to-accent-600 hover:!from-accent-600 hover:!to-accent-700 !focus:ring-accent-500"
                rightIcon={
                  <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                }
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default YTFeedback;
