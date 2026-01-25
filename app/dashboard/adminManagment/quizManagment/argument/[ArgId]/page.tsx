import React from "react";
import type { Metadata } from "next";
import Topics from "@/components/features/Dashboard/AdminManagment/QuizManagment/Topics";

export const metadata: Metadata = {
  title: "Topics Management",
  description: "Topics Management | Easy Bangla Patente",
};

interface ArgumentPageProps {
  params: {
    ArgId: string;
  };
}

const ArgumentPage = ({ params }: ArgumentPageProps) => {
  return <Topics />;
};

export default ArgumentPage;
