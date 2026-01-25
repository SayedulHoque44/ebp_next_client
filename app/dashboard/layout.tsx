import DashboardWrapper from "@/components/features/Dashboard/DashboardWrapper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import PrivateRoute from "@/providers/PrivateRoute";
import React from "react";

const DashboardMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <DashboardLayout>
        <DashboardWrapper>
          {children}
        </DashboardWrapper>
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default DashboardMainLayout;
