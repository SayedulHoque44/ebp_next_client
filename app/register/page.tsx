import React from "react";
import Register from "@/components/features/Register";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register | Easy Bangla Patente",
  description: "Register to your account | Easy Bangla Patente",
};
export default function RegisterPage() {
  return <Register />;
}
