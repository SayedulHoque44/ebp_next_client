"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import AnimatedCounter from "../common/AnimatedCounter";
import { AppShowCase } from "../../AppPage";
import Link from "next/link";
import Image from "next/image";
import { FaDownload, FaStar, FaUsers, FaGraduationCap } from "react-icons/fa";
import CTA from "../../../shared/CTA";
import {
  Caption,
  BengaliHeading1,
  BengaliBody,
} from "@/components/ui/Typography";
import { STATS, STATS_LABELS } from "@/constants/ui_constent";

const Bannar = () => {
  useEffect(() => {
    Aos.init();
    Aos.refresh();

    return () => {
      Aos.refresh();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-gray-50 via-white to-primary-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      </div>

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Hero Content */}
          <div className="space-y-8" data-aos="fade-right">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700">
                <FaStar className="mr-2 text-yellow-500" />
                <Caption className="text-sm font-semibold">
                  #1 Italian Driving License Course
                </Caption>
              </div>

              <div className="space-y-2">
                <BengaliHeading1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Master Italian
                  <span className="gradient-text block">Driving License</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-600">
                    in Bangla
                  </span>
                </BengaliHeading1>
              </div>

              <BengaliBody className="text-lg sm:text-xl text-gray-600 max-w-lg">
                Learn Italian driving theory with our comprehensive online
                course. Pass your exam with confidence using our proven Bangla
                teaching method.
              </BengaliBody>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedCounter
                  end={STATS.STUDENTS_PASSED}
                  suffix="+"
                  duration={2.5}
                  className="text-3xl font-bold text-primary-600"
                  easing="easeOutCubic"
                />
                <div className="text-sm text-gray-600 mt-1">
                  <Caption>{STATS_LABELS.STUDENTS_PASSED}</Caption>
                </div>
              </motion.div>

              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedCounter
                  end={STATS.SUCCESS_RATE}
                  suffix="%"
                  duration={2}
                  className="text-3xl font-bold text-primary-600"
                  easing="easeOutCubic"
                />
                <div className="text-sm text-gray-600 mt-1">
                  <Caption>{STATS_LABELS.SUCCESS_RATE}</Caption>
                </div>
              </motion.div>

              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedCounter
                  end={STATS.YEARS_EXPERIENCE}
                  suffix="+"
                  duration={1.5}
                  className="text-3xl font-bold text-primary-600"
                  easing="easeOutCubic"
                />
                <div className="text-sm text-gray-600 mt-1">
                  <Caption>{STATS_LABELS.YEARS_EXPERIENCE}</Caption>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  variant="primary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  Start Learning Now
                </Button>
              </Link>
              <CTA phone="+39 320 608 8871" outlined={true} />
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative" data-aos="fade-left">
            <div className="relative">
              {/* Main App Showcase */}
              <div className="modern-card p-8 space-y-6">
                <Link href={"/App/2"} className="block group">
                  <div className="relative overflow-hidden rounded-2xl shadow-large group-hover:shadow-glow transition-all duration-500">
                    <Image
                      src="https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Qbp-banner.png"
                      width={800}
                      height={600}
                      className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                      alt="Quiz Bangla Patente App"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <FaDownload className="text-primary-600" />
                    </div>
                  </div>
                </Link>

                {/* App Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <AppShowCase
                    id={2}
                    title={"Quiz Bangla Patente App"}
                    info={"Latest Android & iOS App with Modern UI"}
                  />
                  <AppShowCase
                    id={1}
                    title={"Easy Bangla Patente App"}
                    info={"Classic Android & iOS App"}
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 sm:w-20 h-12 sm:h-20 bg-linear-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl animate-bounce-gentle">
                <FaGraduationCap />
              </div>
              <div
                className="absolute -bottom-4 -left-4 w-12 sm:w-16 h-12 sm:h-16 bg-linear-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white text-xl animate-bounce-gentle"
                style={{ animationDelay: "1s" }}
              >
                <FaUsers />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Bannar;
