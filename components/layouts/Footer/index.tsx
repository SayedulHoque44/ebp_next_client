"use client";
import React from "react";
import { motion } from "framer-motion";
import CTA from "@/components/shared/CTA";
import Logo from "@/components/shared/Logo";
import Container from "@/components/ui/Container";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCar,
  FaUsers,
  FaAward,
  FaClock,
} from "react-icons/fa";
import { SocialLinks, STATS, STATS_LABELS } from "@/lib/constants/ui_constent";
import { mediaProvider } from "@/lib/constants/mediaProvider";

const Footer = () => {
  const footerLinks = {
    main: [
      { name: "Home", link: "/", external: true },
      { name: "Blogs", link: "/blogs", external: true },
      { name: "Free Video", link: "/YTFreevideo", external: true },
      { name: "Success Stories", link: "/feedback", external: true },
    ],
    apps: [
      { name: "EBP App", link: "/App/1", external: true },
      { name: "Latest App", link: "/App/2", external: true },
      { name: "Dashboard", link: "/dashboard", external: true },
      { name: "Profile", link: "/propile", external: true },
    ],
    resources: [
      { name: "Privacy Policy", link: "/privacy-policy", external: true },
    ],
  };

  const stats = [
    {
      icon: FaUsers,
      number: `${STATS.STUDENTS_PASSED}+`,
      label: "Students Trained",
    },
    { icon: FaAward, number: `${STATS.SUCCESS_RATE}%`, label: "Pass Rate" },
    {
      icon: FaCar,
      number: `${STATS.YEARS_EXPERIENCE}+`,
      label: STATS_LABELS.YEARS_EXPERIENCE,
    },
    { icon: FaClock, number: "24/7", label: "Support Available" },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${mediaProvider.bg.src})` }}
      className="relative py-20 bg-cover bg-center bg-fixed"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <Container>
        <div className="relative z-10">
          {/* Hero Section */}
          <motion.div
            className="flex flex-col items-center text-white gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Logo nameColor={"text-white"} />
            <h1 className="text-3xl md:text-6xl lg:text-7xl leading-tight text-center font-bold">
              We Give Best Guidance To Each Student, That&apos;s Why We Produce
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Confident & Safe Drivers
              </span>
            </h1>
            <CTA phone={`+39 320 608 8871`} />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
                  <stat.icon className="text-2xl text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Easy Bangla Patente
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Easy Bangla Patente - Your trusted partner for Italian driving
                license preparation. We provide comprehensive training, study
                materials, and guidance to help you become a confident and safe
                driver. Join thousands of successful students who passed their
                driving test with our expert guidance.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <FaPhone className="mr-3 text-blue-400" />
                  <span>+39 320 608 8871</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaEnvelope className="mr-3 text-blue-400" />
                  <span>info@easybanglapatente.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaMapMarkerAlt className="mr-3 text-blue-400" />
                  <span>Italy</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4 mt-6">
                {SocialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 transition-colors duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + categoryIndex * 0.1,
                  }}
                >
                  <h4 className="text-lg font-semibold text-white mb-6 capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        {link.external ? (
                          <a
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 block"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            href={link.link}
                            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 block"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest driving test tips,
                course updates, and success stories from our students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <footer className="footer footer-center p-4 bg-black text-white mt-5">
            <aside>
              <p>Copyright © 2023 - All right reserved by Sayedul Hoque</p>
            </aside>
          </footer>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
