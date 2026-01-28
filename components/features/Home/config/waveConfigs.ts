import { IWaveLayer } from "../common/AnimateWave";

/**
 * Wave configuration keys for different sections
 */
export type WaveConfigKey =
  | "hero"
  | "introVideo"
  | "founder"
  | "poster"
  | "drivingLicense"
  | "latestBlog"
  | "ytFreeVideo";

/**
 * Wave configurations object type
 * Maps section names to arrays of wave layer configurations
 */
export type WaveConfigs = {
  [K in WaveConfigKey]: IWaveLayer[];
};

/**
 * Wave configurations for each section
 * Centralized configuration for animated wave backgrounds
 */
export const WAVE_CONFIGS: WaveConfigs = {
  hero: [
    {
      width: "200%",
      height: "120%",
      left: "-50%",
      top: "-10%",
      x: [0, 80, 0],
      duration: 12,
      delay: 0,
      color: "rgb(239, 246, 255)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "80%",
      left: "-25%",
      top: "20%",
      x: [0, -60, 0],
      duration: 8,
      delay: 1.5,
      color: "rgb(219, 234, 254)",
      opacity: 0.4,
    },
    {
      width: "120%",
      height: "60%",
      left: "-10%",
      top: "40%",
      x: [0, 40, 0],
      duration: 6,
      delay: 3,
      color: "rgb(191, 219, 254)",
      opacity: 0.5,
    },
  ],
  introVideo: [
    {
      width: "180%",
      height: "110%",
      left: "-40%",
      top: "-5%",
      x: [0, -70, 0],
      duration: 14,
      delay: 0,
      color: "rgb(243, 232, 255)",
      opacity: 0.2,
    },
    {
      width: "140%",
      height: "90%",
      left: "-20%",
      top: "10%",
      x: [0, 90, 0],
      duration: 7,
      delay: 2,
      color: "rgb(233, 213, 255)",
      opacity: 0.4,
    },
    {
      width: "120%",
      height: "70%",
      left: "-5%",
      top: "30%",
      x: [0, -50, 0],
      duration: 9,
      delay: 4.5,
      color: "rgb(221, 214, 254)",
      opacity: 0.6,
    },
  ],
  founder: [
    {
      width: "220%",
      height: "130%",
      left: "-60%",
      top: "-15%",
      x: [0, 60, 0],
      duration: 16,
      delay: 0,
      color: "rgb(254, 226, 226)",
      opacity: 0.2,
    },
    {
      width: "120%",
      height: "60%",
      left: "0%",
      top: "40%",
      x: [0, -80, 0],
      duration: 5,
      delay: 1,
      color: "rgb(252, 165, 165)",
      opacity: 0.6,
    },
    {
      width: "160%",
      height: "85%",
      left: "-30%",
      top: "15%",
      x: [0, 70, 0],
      duration: 10,
      delay: 3.5,
      color: "rgb(248, 113, 113)",
      opacity: 0.4,
    },
  ],
  poster: [
    {
      width: "130%",
      height: "95%",
      left: "-15%",
      top: "5%",
      x: [0, -90, 0],
      duration: 6,
      delay: 0,
      color: "rgb(153, 246, 228)",
      opacity: 0.5,
    },
    {
      width: "190%",
      height: "120%",
      left: "-45%",
      top: "-10%",
      x: [0, 50, 0],
      duration: 13,
      delay: 2.5,
      color: "rgb(94, 234, 212)",
      opacity: 0.3,
    },
    {
      width: "120%",
      height: "75%",
      left: "-10%",
      top: "25%",
      x: [0, -60, 0],
      duration: 8,
      delay: 5,
      color: "rgb(45, 212, 191)",
      opacity: 0.4,
    },
  ],
  drivingLicense: [
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 50, 0],
      duration: 9,
      delay: 0,
      color: "rgb(199, 210, 254)",
      opacity: 0.4,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -20, 0],
      duration: 11,
      delay: 2,
      color: "rgb(165, 180, 252)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 50, 0],
      duration: 13,
      delay: 4.5,
      color: "rgb(129, 140, 248)",
      opacity: 0.2,
    },
  ],
  latestBlog: [
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -40, 0],
      duration: 10,
      delay: 0,
      color: "rgb(251, 207, 232)",
      opacity: 0.4,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 100, 0],
      duration: 12,
      delay: 1.5,
      color: "rgb(244, 114, 182)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -50, 0],
      duration: 14,
      delay: 3.5,
      color: "rgb(236, 72, 153)",
      opacity: 0.2,
    },
  ],
  ytFreeVideo: [
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 100, 0],
      duration: 8,
      delay: 0,
      color: "rgb(229, 231, 235)",
      opacity: 0.4,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, -30, 0],
      duration: 10,
      delay: 1,
      color: "rgb(209, 213, 219)",
      opacity: 0.3,
    },
    {
      width: "150%",
      height: "100%",
      left: "-25%",
      top: "0%",
      x: [0, 40, 0],
      duration: 12,
      delay: 3,
      color: "rgb(156, 163, 175)",
      opacity: 0.2,
    },
  ],
};
