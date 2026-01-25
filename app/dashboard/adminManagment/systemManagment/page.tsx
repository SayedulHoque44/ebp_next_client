import React from "react";
import type { Metadata } from "next";
import SystemManagment from "@/components/features/Dashboard/AdminManagment/System";

export const metadata: Metadata = {
  title: "System Management",
  description: "System Management | Easy Bangla Patente",
};

const SystemManagementPage = () => {
  return <SystemManagment />;
};

export default SystemManagementPage;