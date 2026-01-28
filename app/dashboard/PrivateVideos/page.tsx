import React from "react";
import type { Metadata } from "next";
import PrivateVideos from "@/components/features/Dashboard/PrivateVideos/PrivateVideos";

export const metadata: Metadata = {
  title: "Private Videos",
  description: "Private Videos | Easy Bangla Patente",
};

const PrivateVideosPage = () => {
  return <PrivateVideos />;
};

export default PrivateVideosPage;
