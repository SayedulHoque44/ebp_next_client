import React from "react";
import Feedback from "@/components/features/Feedback";
import { Metadata } from "next";

/**
 * Generate metadata for feedback page
 */
export const metadata: Metadata = {
  title: "Student Feedback & Success Stories | Easy Bangla Patente",
  description:
    "Watch our students' success stories and feedback videos. See how our comprehensive Italian driving license courses have helped Bengali speakers achieve their dreams of obtaining an Italian driving license.",
  openGraph: {
    title: "Student Feedback & Success Stories | Easy Bangla Patente",
    description:
      "Watch our students' success stories and feedback videos. See how our comprehensive Italian driving license courses have helped Bengali speakers achieve their dreams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Feedback & Success Stories | Easy Bangla Patente",
    description:
      "Watch our students' success stories and feedback videos. See how our comprehensive Italian driving license courses have helped Bengali speakers.",
  },
  alternates: {
    canonical: "/feedback",
  },
};

const page = () => {
  return <Feedback />;
};

export default page;

