import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import PageWrapper from "../PageWrapper/PageWrapper";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 transition-all duration-300 ease-in-out">
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </main>
    </div>
  );
};

export default DashboardLayout;
