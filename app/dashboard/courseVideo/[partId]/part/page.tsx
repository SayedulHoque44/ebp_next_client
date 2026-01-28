import React from "react";
import type { Metadata } from "next";
import PaidOnlyRoute from "@/providers/PaidOnlyRoute";
import VideoContainer2 from "@/components/features/Dashboard/CourseVideo/VideoContainer2";

export const metadata: Metadata = {
  title: "Course Video Part Detail",
  description: "Course Video Part Detail | Easy Bangla Patente",
};

const CourseVideoPartDetailPage = () => {
  return (
    <PaidOnlyRoute>
      <VideoContainer2 />
    </PaidOnlyRoute>
  );
};

export default CourseVideoPartDetailPage;
