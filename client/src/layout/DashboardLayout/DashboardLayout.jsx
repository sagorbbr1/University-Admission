import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useUser } from "../../context/UserContext";
import NotLoggedInPrompt from "../../components/NotLoggedInPrompt/NotLoggedInPrompt";

const DashboardLayout = () => {
  const features = [
    { title: "📊 Dashboard", link: "/dashboard" },
    { title: "⏱️ মক টেস্ট", link: "/mock" },
    { title: "📚 প্রশ্ন ব্যাংক", link: "/questionbank" },
    { title: "📊 রেজাল্ট বিশ্লেষণ", link: "/results" },
    { title: "📥 Mistake Bank", link: "/mistake-bank" },
    { title: "🔥 ডেইলি চ্যালেঞ্জ", link: "/daily-challenge" },
    { title: "📣 নোটিশ / আপডেট", link: "/notices" },
    { title: "💬 আলোচনা ফোরাম", link: "/forum" },
    { title: "👥 প্রোফাইল", link: "/profile" },
  ];

  const { user } = useUser();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <NotLoggedInPrompt />;
  }
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar features={features} />

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
