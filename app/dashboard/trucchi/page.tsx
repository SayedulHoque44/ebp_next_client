import React from "react";
import type { Metadata } from "next";
import Trucchi from "@/components/features/Dashboard/Trucchi";

export const metadata: Metadata = {
  title: "Trucchi",
  description: "Trucchi | Easy Bangla Patente",
};

const TrucchiPage = () => {
  return <Trucchi />;
};

export default TrucchiPage;
