"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FOOTER_NEWSLETTER } from "../config/footer.config";

/**
 * FooterNewsletter Component (Client Component)
 * 
 * Newsletter subscription form
 * Client component for form interactions
 */
export const FooterNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          {FOOTER_NEWSLETTER.title}
        </h3>
        <p className="text-gray-300 mb-6">{FOOTER_NEWSLETTER.description}</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={FOOTER_NEWSLETTER.placeholder}
            className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <motion.button
            type="submit"
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
