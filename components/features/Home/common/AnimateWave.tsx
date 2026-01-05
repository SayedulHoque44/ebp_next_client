"use client";
import React from "react";
import { motion } from "framer-motion";

// ============================================
// Types for Wave Layer Configuration
// ============================================

/**
 * Configuration for a single wave layer
 */
export interface IWaveLayer {
  /** Width of the wave layer (e.g., "200%", "150%") */
  width?: string;
  /** Height of the wave layer (e.g., "120%", "100%") */
  height?: string;
  /** Left position of the wave layer (e.g., "-50%", "-25%") */
  left?: string;
  /** Top position of the wave layer (e.g., "-10%", "0%") */
  top?: string;
  /** Animation x-axis values array for horizontal movement */
  x?: number[];
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Color of the wave (RGB string or CSS color) */
  color?: string;
  /** Opacity of the wave (0-1) */
  opacity?: number;
}

/**
 * Props for the AnimatedWave component
 */
export interface IAnimatedWaveProps {
  /** Array of wave layer configurations */
  layers?: IWaveLayer[];
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Animated Wave Component
 * Creates beautiful multi-layer animated wave effects
 *
 * @param props - Component props
 * @param props.layers - Array of wave layer configurations
 * @param props.className - Additional CSS classes for the container
 * @example
 * const layers: IWaveLayer[] = [
 *   {
 *     width: "200%",
 *     height: "120%",
 *     left: "-50%",
 *     top: "-10%",
 *     x: [0, 80, 0],
 *     duration: 12,
 *     delay: 0,
 *     color: "rgb(239, 246, 255)",
 *     opacity: 0.3
 *   }
 * ];
 * <AnimatedWave layers={layers} />
 */
const AnimatedWave: React.FC<IAnimatedWaveProps> = ({
  layers = [],
  className = "absolute bottom-0 left-0 w-full h-16 overflow-hidden",
}) => {
  const defaultOpacity = 0.3;

  return (
    <div className={className}>
      {layers.map((layer, index) => (
        <motion.div
          key={`wave-${index}`}
          className="absolute"
          style={{
            width: layer.width || "150%",
            height: layer.height || "100%",
            left: layer.left || "-25%",
            top: layer.top || "0%",
          }}
          animate={{
            x: layer.x || [0, 50, 0],
          }}
          transition={{
            duration: layer.duration || 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: layer.delay || 0,
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-full"
            style={{
              color: layer.color || "currentColor",
              opacity: layer.opacity || defaultOpacity,
            }}
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedWave;
