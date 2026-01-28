import React from "react";
import type { Metadata } from "next";
import ContentPages from "@/components/features/Dashboard/ContentPages";

export const metadata: Metadata = {
  title: "Content Pages",
  description: "Content Pages | Easy Bangla Patente",
};

const ContentPagesPage = () => {
  return <ContentPages />;
};

export default ContentPagesPage;
