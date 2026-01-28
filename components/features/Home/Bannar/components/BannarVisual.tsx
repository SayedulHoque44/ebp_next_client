"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaDownload, FaUsers, FaGraduationCap } from "react-icons/fa";
import { AppShowCase } from "@/components/features/AppPage";


/**
 * BannarVisual Component (Client Component)
 * 
 * Hero visual section with app showcase.
 * Client component for hover effects and animations.
 */
const BannarVisual = () => {
  return (
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
                alt="Quiz Bangla Patente App - Italian Driving License Learning Platform"
                priority
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
  );
};

export default BannarVisual;
