import React from "react";
import type { Metadata } from "next";
import PaidOnlyRoute from "@/providers/PaidOnlyRoute";
// import VideoContainerLayout from "@/components/features/Dashboard/CourseVideo/VideoContainer/VideoContainer";

export const metadata: Metadata = {
  title: "Course Video Part",
  description: "Course Video Part | Easy Bangla Patente",
};

const CourseVideoPartPage = () => {
  return (
    <PaidOnlyRoute>
      {/* <VideoContainerLayout /> */}
      <div>
        <h1>Course Video Part</h1>
      </div>
    </PaidOnlyRoute>
  );
};

export default CourseVideoPartPage;
