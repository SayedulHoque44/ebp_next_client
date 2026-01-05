import PrivacyAndPolicy from "@/components/features/PAP";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy | Easy Bangla Patente",
  description: "Privacy Policy | Easy Bangla Patente",
};

export default function PrivacyPolicyPage() {
  return <PrivacyAndPolicy />;
}
