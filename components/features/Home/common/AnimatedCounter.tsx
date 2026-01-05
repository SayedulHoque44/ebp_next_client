"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, HTMLMotionProps } from "framer-motion";

type EasingFunction = (t: number) => number;

type EasingType =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "easeOutCubic"
  | "easeInCubic"
  | "easeInOutCubic"
  | "easeOutQuart"
  | "easeInQuart"
  | "easeInOutQuart";

interface AnimatedCounterProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
  easing?: EasingType;
  onComplete?: (() => void) | null;
}

// Easing functions
const easingFunctions: Record<EasingType, EasingFunction> = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 2),
  easeInOut: (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t: number) => t * t * t,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeInQuart: (t: number) => t * t * t * t,
  easeInOutQuart: (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
};

const AnimatedCounter = ({
  end,
  start = 0,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  delay = 0,
  easing = "easeOutCubic",
  onComplete = null,
  ...props
}: AnimatedCounterProps) => {
  const [count, setCount] = useState<number>(start);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isInView) {
      const startAnimation = () => {
        let startTime: number | undefined;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);

          // Apply easing function
          const easeFunc =
            easingFunctions[easing] || easingFunctions.easeOutCubic;
          const easedProgress = easeFunc(progress);

          const currentCount = Math.floor(
            start + (end - start) * easedProgress
          );
          setCount(currentCount);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setCount(end);
            if (onComplete) onComplete();
          }
        };

        if (delay > 0) {
          setTimeout(() => {
            requestAnimationFrame(animate);
          }, delay);
        } else {
          requestAnimationFrame(animate);
        }
      };

      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, end, start, duration, easing, delay, onComplete]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={className}
      {...props}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.div>
  );
};

export default AnimatedCounter;
