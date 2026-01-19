// Dashboard Icons - Shared across DashboardContent and DashboardLayout
import React from "react";
import homeImg from "../assets/Images/dashboard/home-button.png";
import patenteBookImg from "../assets/Images/dashboard/online-course.png";
import QNAPdfImg from "../assets/Images/dashboard/question.png";
import QNABookImg from "../assets/Images/dashboard/quiz.png";
import adminMImg from "../assets/Images/dashboard/software-engineer.png";
import quiz_2 from "../assets/Images/dashboard/quiz-1.png";
import bookImg from "../assets/Images/dashboard/book.png";
import courseVideoImg from "../assets/Images/dashboard/webinar.png";
import YTVideoImg from "../assets/Images/dashboard/youtube.png";
import theoryimg from "../assets/Images/dashboard/theory.png";
import cercaimg from "../assets/Images/dashboard/search.png";
import simulazioneEsameImg from "../assets/Images/dashboard/simulazione.png";
import quizPerArgomentiImg from "../assets/Images/dashboard/quiz_per_arg.png";
import ripassoErroriImg from "../assets/Images/dashboard/clipboard.png";

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
    <img
      src={iconSrc}
      alt=""
      className={`flex-shrink-0 ${className}`}
      style={{ width: size, height: size, objectFit: "contain" }}
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
