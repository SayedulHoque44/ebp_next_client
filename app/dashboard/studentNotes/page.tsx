import React from "react";
import type { Metadata } from "next";
import STDNotes from "@/components/features/Dashboard/STDNotes";

export const metadata: Metadata = {
  title: "Student Notes",
  description: "Student Notes | Easy Bangla Patente",
};

const StudentNotesPage = () => {
  return <STDNotes />;
};

export default StudentNotesPage;
