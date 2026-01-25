import React from "react";
import type { Metadata } from "next";
import TopicTheroy from "@/components/features/Dashboard/AdminManagment/QuizManagment/Theroy";

export const metadata: Metadata = {
  title: "Topic Theory",
  description: "Topic Theory | Easy Bangla Patente",
};

interface TopicPageProps {
  params: {
    topicId: string;
  };
}

const TopicPage = ({ params }: TopicPageProps) => {
  return <TopicTheroy />;
};

export default TopicPage;
