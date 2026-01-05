import { Metadata } from "next";
import Home from "@/components/features/Home/Home";
import MainLayouts from "@/components/layouts/MainLayout";

export const metadata: Metadata = {
  title: "Easy Bangla Patente",
  description: "Easy Bangla Patente",
};

export default function HomePage() {
  return (
    <MainLayouts>
      <Home />
    </MainLayouts>
  );
}
