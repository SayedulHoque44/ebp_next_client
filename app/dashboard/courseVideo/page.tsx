import React from "react";
import type { Metadata } from "next";
import CourseVideo from "@/components/features/Dashboard/CourseVideo/CourseVideo";

export const metadata: Metadata = {
  title: "Course Video",
  description: "Course Video | Easy Bangla Patente",
};

const CourseVideoPage = () => {
  return <CourseVideo />;
};

export default CourseVideoPage;
