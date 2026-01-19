import DashboardLayout from "@/components/layouts/DashboardLayout";
import PrivateRoute from "@/providers/PrivateRoute";
import React from "react";

const DashboardMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <DashboardLayout>
        <h1>Dashboard Layout</h1>
        {children}
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default DashboardMainLayout;
