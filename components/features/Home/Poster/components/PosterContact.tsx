"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heading2, Heading4, Body, Caption } from "@/components/ui/Typography";
import { FaPhone, FaGlobe } from "react-icons/fa";
import { mediaProvider } from "@/constants/mediaProvider";
import { SocialLinks } from "@/constants/ui_constent";

/**
 * PosterContact Component (Client Component)
 * 
 * Contact information section with founder details.
 * Client component for framer-motion animations.
 */
const PosterContact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-8 shadow-xl"
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
  );
};

export default PosterContact;
