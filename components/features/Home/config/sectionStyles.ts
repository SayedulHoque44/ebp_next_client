/**
 * Section Style Configuration
 * 
 * Defines background gradients and decorative elements for each section.
 * This allows server-rendered sections with consistent styling.
 */

export type SectionName =
  | "hero"
  | "introVideo"
  | "course"
  | "courseInfo"
  | "founder"
  | "poster"
  | "drivingLicense"
  | "latestBlog"
  | "ytFreeVideo"
  | "ytFeedback";

export interface DecorativeCircle {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: string;
  color: string;
  opacity?: number;
  className?: string;
  style?: Record<string, string | number>;
}

export interface SectionStyle {
  backgroundGradient: string;
  decorativeCircles: DecorativeCircle[];
  overlayOpacity?: number;
}

export const SECTION_STYLES: Record<SectionName, SectionStyle> = {
  hero: {
    backgroundGradient: "bg-linear-to-br from-slate-900 via-slate-800 to-slate-900",
    overlayOpacity: 0.2,
    decorativeCircles: [
      {
        position: { top: "top-20", right: "right-20" },
        size: "w-64 h-64",
        color: "bg-white",
        opacity: 0.1,
      },
      {
        position: { bottom: "bottom-20", left: "left-20" },
        size: "w-48 h-48",
        color: "bg-white",
        opacity: 0.1,
      },
    ],
  },
  introVideo: {
    backgroundGradient: "bg-linear-to-br from-blue-50 via-indigo-50 to-blue-100",
    overlayOpacity: 0.3,
    decorativeCircles: [
      {
        position: { top: "top-20", right: "right-20" },
        size: "w-64 h-64",
        color: "bg-blue-200",
      },
      {
        position: { bottom: "bottom-20", left: "left-20" },
        size: "w-48 h-48",
        color: "bg-indigo-200",
      },
    ],
  },
  course: {
    backgroundGradient: "bg-linear-to-br from-purple-50 via-violet-50 to-purple-100",
    decorativeCircles: [
      {
        position: { top: "top-20", right: "right-20" },
        size: "w-72 h-72",
        color: "bg-purple-200",
        className: "mix-blend-multiply filter blur-xl opacity-30 animate-pulse",
      },
      {
        position: { bottom: "bottom-20", left: "left-20" },
        size: "w-72 h-72",
        color: "bg-violet-200",
        className: "mix-blend-multiply filter blur-xl opacity-30 animate-pulse",
        style: { animationDelay: "2s" },
      },
    ],
  },
  courseInfo: {
    backgroundGradient: "bg-linear-to-br from-emerald-50 via-green-50 to-teal-50",
    overlayOpacity: 0.4,
    decorativeCircles: [
      {
        position: { top: "top-20", right: "right-20" },
        size: "w-64 h-64",
        color: "bg-emerald-200",
      },
      {
        position: { bottom: "bottom-20", left: "left-20" },
        size: "w-48 h-48",
        color: "bg-teal-200",
      },
    ],
  },
  founder: {
    backgroundGradient: "bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50",
    decorativeCircles: [
      {
        position: { top: "top-1/4", left: "left-1/4" },
        size: "w-96 h-96",
        color: "bg-orange-200",
        className: "mix-blend-multiply filter blur-xl opacity-20",
      },
      {
        position: { bottom: "bottom-1/4", right: "right-1/4" },
        size: "w-96 h-96",
        color: "bg-amber-200",
        className: "mix-blend-multiply filter blur-xl opacity-20",
      },
    ],
  },
  poster: {
    backgroundGradient: "bg-linear-to-br from-red-50 via-rose-50 to-pink-50",
    overlayOpacity: 0.3,
    decorativeCircles: [
      {
        position: { top: "top-20", right: "right-20" },
        size: "w-64 h-64",
        color: "bg-red-200",
      },
      {
        position: { bottom: "bottom-20", left: "left-20" },
        size: "w-48 h-48",
        color: "bg-rose-200",
      },
    ],
  },
  drivingLicense: {
    backgroundGradient: "bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50",
    decorativeCircles: [
      {
        position: { top: "top-20", left: "left-1/3" },
        size: "w-80 h-80",
        color: "bg-teal-200",
        className: "mix-blend-multiply filter blur-xl opacity-25",
      },
      {
        position: { bottom: "bottom-20", right: "right-1/3" },
        size: "w-80 h-80",
        color: "bg-cyan-200",
        className: "mix-blend-multiply filter blur-xl opacity-25",
      },
    ],
  },
  latestBlog: {
    backgroundGradient: "bg-linear-to-br from-indigo-50 via-purple-50 to-indigo-100",
    overlayOpacity: 0.4,
    decorativeCircles: [
      {
        position: { top: "top-20", right: "right-20" },
        size: "w-64 h-64",
        color: "bg-indigo-200",
      },
      {
        position: { bottom: "bottom-20", left: "left-20" },
        size: "w-48 h-48",
        color: "bg-purple-200",
      },
    ],
  },
  ytFreeVideo: {
    backgroundGradient: "bg-linear-to-br from-pink-50 via-rose-50 to-pink-100",
    decorativeCircles: [
      {
        position: { top: "top-1/2", left: "left-1/4" },
        size: "w-96 h-96",
        color: "bg-pink-200",
        className: "mix-blend-multiply filter blur-xl opacity-20",
      },
      {
        position: { bottom: "bottom-1/4", right: "right-1/4" },
        size: "w-96 h-96",
        color: "bg-rose-200",
        className: "mix-blend-multiply filter blur-xl opacity-20",
      },
    ],
  },
  ytFeedback: {
    backgroundGradient: "bg-linear-to-br from-gray-50 via-slate-50 to-gray-100",
    overlayOpacity: 0.3,
    decorativeCircles: [
      {
        position: { top: "top-20", right: "right-20" },
        size: "w-64 h-64",
        color: "bg-gray-200",
      },
      {
        position: { bottom: "bottom-20", left: "left-20" },
        size: "w-48 h-48",
        color: "bg-slate-200",
      },
    ],
  },
};
