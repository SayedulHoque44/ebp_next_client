import React from "react";
import Register from "@/components/features/Register";
import { Metadata } from "next";

/**
 * Generate metadata for register page
 */
export const metadata: Metadata = {
  title: "Register | Easy Bangla Patente",
  description:
    "Create your Easy Bangla Patente account to access comprehensive Italian driving license courses, quizzes, and study materials. Join thousands of successful students.",
  robots: {
    index: false, // Registration pages typically shouldn't be indexed
    follow: false,
  },
  openGraph: {
    title: "Register | Easy Bangla Patente",
    description:
      "Create your Easy Bangla Patente account to access comprehensive Italian driving license courses and study materials.",
    type: "website",
  },
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterPage() {
  return <Register />;
}

