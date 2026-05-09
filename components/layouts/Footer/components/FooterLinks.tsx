"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FOOTER_LINKS } from "../config/footer.config";

/**
 * FooterLinks Component (Client Component)
 * 
 * Footer navigation links
 * Client component for animations
 */
export const FooterLinks: React.FC = () => {
  const formatCategoryName = (category: string): string => {
    return category.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <>
      {Object.entries(FOOTER_LINKS).map(
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
              {formatCategoryName(category)}
            </h4>
            <ul className="space-y-3">
              {links.map((link: any, index: number) => (
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
    </>
  );
};
