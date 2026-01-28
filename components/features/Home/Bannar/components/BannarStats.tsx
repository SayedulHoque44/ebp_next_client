"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "../../common/AnimatedCounter";
import { Caption } from "@/components/ui/Typography";
import { STATS, STATS_LABELS } from "@/constants/ui_constent";

interface StatItemProps {
  end: number;
  suffix: string;
  duration: number;
  label: string;
}

/**
 * StatItem Component
 * Individual stat card with animation
 */
const StatItem: React.FC<StatItemProps> = ({
  end,
  suffix,
  duration,
  label,
}) => {
  return (
    <motion.div
      className="text-center group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <AnimatedCounter
        end={end}
        suffix={suffix}
        duration={duration}
        className="text-3xl font-bold text-primary-600"
        easing="easeOutCubic"
      />
      <div className="text-sm text-gray-600 mt-1">
        <Caption>{label}</Caption>
      </div>
    </motion.div>
  );
};

/**
 * BannarStats Component (Client Component)
 * 
 * Animated statistics section.
 * Client component for animations and interactivity.
 */
const BannarStats = () => {
  return (
    <div
      className="grid grid-cols-3 gap-6"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <StatItem
        end={STATS.STUDENTS_PASSED}
        suffix="+"
        duration={2.5}
        label={STATS_LABELS.STUDENTS_PASSED}
      />
      <StatItem
        end={STATS.SUCCESS_RATE}
        suffix="%"
        duration={2}
        label={STATS_LABELS.SUCCESS_RATE}
      />
      <StatItem
        end={STATS.YEARS_EXPERIENCE}
        suffix="+"
        duration={1.5}
        label={STATS_LABELS.YEARS_EXPERIENCE}
      />
    </div>
  );
};

export default BannarStats;
