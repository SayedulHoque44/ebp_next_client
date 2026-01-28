// Dashboard Icons - Shared across DashboardContent and DashboardLayout
import React from "react";
import Image from "next/image";
const homeImg = "/assets/Images/dashboard/home-button.png";
const patenteBookImg = "/assets/Images/dashboard/online-course.png";
const QNAPdfImg = "/assets/Images/dashboard/question.png";
const QNABookImg = "/assets/Images/dashboard/quiz.png";
const adminMImg = "/assets/Images/dashboard/software-engineer.png";
const quiz_2 = "/assets/Images/dashboard/quiz-1.png";
const bookImg = "/assets/Images/dashboard/book.png";
const courseVideoImg = "/assets/Images/dashboard/webinar.png";
const YTVideoImg = "/assets/Images/dashboard/youtube.png";
const theoryimg = "/assets/Images/dashboard/theory.png";
const cercaimg = "/assets/Images/dashboard/search.png";
const simulazioneEsameImg = "/assets/Images/dashboard/simulazione.png";
const quizPerArgomentiImg = "/assets/Images/dashboard/quiz_per_arg.png";
const ripassoErroriImg = "/assets/Images/dashboard/clipboard.png";

// Dashboard icon mapping - maps routes to their corresponding images
export const DASHBOARD_ICONS: any = {
  dashboard: homeImg,
  adminManagment: adminMImg,
  simulazioneEsame: simulazioneEsameImg,
  quizPerArgument: quizPerArgomentiImg,
  theory: theoryimg,
  cerca: cercaimg,
  PrivateVideos: YTVideoImg,
  patenteBooks: patenteBookImg,
  courseVideo: courseVideoImg,
  QNAPdf: QNAPdfImg,
  quizBook: bookImg,
  trucchi: quiz_2,
  studentNotes: QNABookImg,
  ripassoErrori: ripassoErroriImg,
};

// Helper function to get icon for a route
export const getDashboardIcon = (route: string) => {
  if (!route) return DASHBOARD_ICONS.dashboard;

  // Extract the route key from path
  let routeKey = route
    .replace("/dashboard/", "")
    .replace("/dashboard", "")
    .split("/")[0]
    .trim();

  // Handle empty route (dashboard home)
  if (!routeKey || routeKey === "") {
    routeKey = "dashboard";
  }

  // Handle adminManagment route
  if (routeKey === "adminManagment" || route.includes("adminManagment")) {
    routeKey = "adminManagment";
  }

  if (routeKey === "ripassoErrori") {
    routeKey = "ripassoErrori";
  }

  return DASHBOARD_ICONS[routeKey as any] || DASHBOARD_ICONS.dashboard;
};

// Icon component for sidebar - renders image as icon
export const DashboardIcon = ({
  route,
  size = 20,
  className = "",
}: {
  route: string;
  size?: number;
  className?: string;
}) => {
  const iconSrc = getDashboardIcon(route);

  return (
    <Image
      src={iconSrc as string}
      alt=""
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size, objectFit: "contain" }}
      width={size}
      height={size}
    />
  );
};

// Export individual images for direct use
export {
  homeImg,
  patenteBookImg,
  QNAPdfImg,
  QNABookImg,
  adminMImg,
  quiz_2,
  bookImg,
  courseVideoImg,
  YTVideoImg,
  theoryimg,
  cercaimg,
  simulazioneEsameImg,
  quizPerArgomentiImg,
  ripassoErroriImg,
};
