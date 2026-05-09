import PrivacyAndPolicy from "@/components/features/PAP";
import React from "react";
import { Metadata } from "next";

/**
 * Generate metadata for privacy policy page
 */
export const metadata: Metadata = {
  title: "Privacy Policy | Easy Bangla Patente",
  description:
    "Read our Privacy Policy to understand how Easy Bangla Patente collects, uses, and protects your personal information. Learn about your privacy rights and how we handle your data when you use our Italian driving license courses and services.",
  openGraph: {
    title: "Privacy Policy | Easy Bangla Patente",
    description:
      "Read our Privacy Policy to understand how Easy Bangla Patente collects, uses, and protects your personal information.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Easy Bangla Patente",
    description:
      "Read our Privacy Policy to understand how Easy Bangla Patente collects, uses, and protects your personal information.",
  },
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyAndPolicy />;
}

