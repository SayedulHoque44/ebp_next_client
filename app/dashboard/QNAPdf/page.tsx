import React from "react";
import type { Metadata } from "next";
import PaidOnlyRoute from "@/providers/PaidOnlyRoute";
import QNAPdf from "@/components/features/Dashboard/QNA/QNAPdf";

export const metadata: Metadata = {
  title: "QNA PDF",
  description: "QNA PDF | Easy Bangla Patente",
};

const QNAPdfPage = () => {
  return (
    <PaidOnlyRoute>
      <QNAPdf />
    </PaidOnlyRoute>
  );
};

export default QNAPdfPage;
