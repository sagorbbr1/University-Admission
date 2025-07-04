import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import PageWrapper from "../PageWrapper/PageWrapper";
import { useUser } from "../../context/UserContext";
import NotLoggedInPrompt from "../NotLoggedInPrompt/NotLoggedInPrompt";

const DashboardLayout = () => {
  const { user } = useUser();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <NotLoggedInPrompt />;
  }
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />

      <main
        className="
          flex-1
          min-h-screen
          bg-gray-50 dark:bg-gray-900
          p-0
          transition-all duration-300 ease-in-out
        "
      >
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </main>
    </div>
  );
};

export default DashboardLayout;
