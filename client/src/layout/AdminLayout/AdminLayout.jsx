import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useUser } from "../../context/UserContext";
import NotAdminPrompt from "../../components/NotAdminPrompt/NotAdminPrompt";

const AdminLayout = () => {
  const adminSections = [
    { title: "🏠 Admin Home", link: "/admin" },
    { title: "➕ Add Question", link: "/admin/add-question" },
    { title: "📁 Bulk Upload", link: "/admin/bulk-upload" },
    { title: "📝 All Questions", link: "/admin/questions" },
    { title: "🗑️ Delete Questions", link: "/admin/delete-questions" },
    { title: "📊 Statistics", link: "/admin/statistics" },
    { title: "👥 All Students", link: "/admin/users" },
    { title: "📢 Announcements", link: "/admin/announcements" },
  ];

  const { user } = useUser();

  // 🛡️ Block access if not admin
  if (!user || user.role !== "admin") {
    return <NotAdminPrompt />;
  }

  // ✅ Admin user — show admin layout
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar features={adminSections} />

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

export default AdminLayout;
