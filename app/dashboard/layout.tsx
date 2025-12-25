import PrivateRoute from "@/providers/PrivateRoute";
import React from "react";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <h1>Dashboard Layout</h1>
      {children}
    </PrivateRoute>
  );
};

export default Dashboardlayout;
