import React from "react";
import type { Metadata } from "next";
import PaidOnlyRoute from "@/providers/PaidOnlyRoute";
import PDFBook from "@/components/features/Dashboard/PatenteBooks/PDFBook";

export const metadata: Metadata = {
  title: "PDF Book",
  description: "PDF Book | Easy Bangla Patente",
};

const PDFBookPage = () => {
  return (
    <PaidOnlyRoute>
      <PDFBook />
    </PaidOnlyRoute>
  );
};

export default PDFBookPage;
