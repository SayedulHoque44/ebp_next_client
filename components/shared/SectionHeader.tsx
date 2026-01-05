"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Heading1,
  Heading2,
  Body,
  Caption,
  BengaliHeading1,
  BengaliHeading2,
  BengaliBody,
} from "@/components/ui/Typography";

interface ISectionHeaderProps {
  title?: string;
  subtitle?: string | null;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  center?: boolean;
  maxWidth?: string;
  animation?: boolean;
  useBengali?: boolean;
  // props?: React.HTMLAttributes<HTMLDivElement>;
  badge: {
    icon: React.ReactNode;
    text: string;
    className: string;
  };
}

const SectionHeader = ({
  badge = {
    icon: null,
    text: "Section",
    className: "bg-primary-100 text-primary-700",
  },
  title = "Section Title",
  subtitle = null,
  description = "Section description goes here",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  center = true,
  maxWidth = "max-w-3xl",
  animation = true,
  useBengali = false,
  ...props
}: ISectionHeaderProps) => {
  const containerClasses = center ? "text-center" : "text-left";

  const content = (
    <div className={`${containerClasses} ${className}`} {...props}>
      {/* Badge */}
      {badge.icon && (
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block"
        >
          <div
            className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 ${badge.className} shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            {badge.icon && (
              <motion.div
                className="mr-1 sm:mr-2"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                {badge.icon}
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Caption className="text-xs sm:text-sm font-semibold">
                {badge.text}
              </Caption>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
      >
        {useBengali ? (
          <BengaliHeading1 className={`mb-4 sm:mb-6 ${titleClassName}`}>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {title}
            </motion.span>
            {subtitle && (
              <motion.span
                className="gradient-text block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 sm:mt-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {subtitle}
              </motion.span>
            )}
          </BengaliHeading1>
        ) : (
          <Heading1 className={`mb-4 sm:mb-6 ${titleClassName}`}>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {title}
            </motion.span>
            {subtitle && (
              <motion.span
                className="gradient-text block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 sm:mt-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {subtitle}
              </motion.span>
            )}
          </Heading1>
        )}
      </motion.div>

      {/* Description */}
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {useBengali ? (
            <BengaliBody
              className={`text-gray-600 ${maxWidth} ${
                center ? "mx-auto" : ""
              } ${descriptionClassName}`}
              align={center ? "center" : "left"}
            >
              {description}
            </BengaliBody>
          ) : (
            <Body
              className={`text-gray-600 ${maxWidth} ${
                center ? "mx-auto" : ""
              } ${descriptionClassName}`}
              align={center ? "center" : "left"}
            >
              {description}
            </Body>
          )}
        </motion.div>
      )}
    </div>
  );

  if (animation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default SectionHeader;
