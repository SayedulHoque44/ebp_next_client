import Aos from "aos";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Container from "../../../Shared/Container/Container";
import YTVideoSliderContainer from "../../../Shared/Videos/YTVideoSliderContainer";
import SectionHeader from "../../../Shared/Components/SectionHeader/SectionHeader";
import { FaPlay, FaArrowRight, FaYoutube } from "react-icons/fa";
import ScrollLink from "../../../Shared/Components/ScrollLink";
import PLinkBtn from "../../../Shared/Components/PLinkBtn";

const YTFreeVideo = () => {
  useEffect(() => {
    Aos.init();
    Aos.refresh(); // Call AOS.refresh() after initialization

    return () => {
      Aos.refresh({
        // Optionally, you can pass options to AOS.refresh() within the cleanup function
        debounceDelay: 50,
        throttleDelay: 99,
      });
    };
  }, []);
  return (
    <div
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden"
      id="videos"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          <SectionHeader
            badge={{
              icon: <FaPlay className="mr-2" />,
              text: "Free Videos",
              className: "bg-primary-100 text-primary-700",
            }}
            title="Our Free"
            subtitle="Videos"
            description="Watch our free videos to learn more about our course and get a preview of our teaching methods. These videos will help you understand our approach and decide if our course is right for you."
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
              RefId={"66a5f14fcef6bbd5277663da"}
              limit={6}
              sorting={"createdAt"}
            />
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
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 sm:mr-4">
                  <FaYoutube className="text-white text-lg sm:text-xl md:text-2xl" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
                    More Free Content
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Explore our complete video library
                  </p>
                </div>
              </div>

              <PLinkBtn
                link="/YTFreeVideo"
                text="View All Videos"
                size="lg"
                className="group w-full sm:w-auto !bg-gradient-to-r !from-red-500 !to-red-600 hover:!from-red-600 hover:!to-red-700 !focus:ring-red-500"
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

export default YTFreeVideo;
