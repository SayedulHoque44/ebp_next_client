import DashboardContentWrapper from "@/components/features/Dashboard/DashboradContent";
import { Metadata } from "next";
import React from "react";
  // addd meta data
  export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard | Easy Bangla Patente",
  };
const dashboardPage = () => {
  return (
    <DashboardContentWrapper />
  );
};

export default dashboardPage;
