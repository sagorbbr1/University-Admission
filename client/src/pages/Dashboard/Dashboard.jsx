import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar.jsx";

const features = [
  {
    title: "⏱️ মক টেস্ট",
    link: "/mock",
    desc: "নির্ধারিত সময়ের মধ্যে পরীক্ষার অনুশীলন করো",
  },
  {
    title: "📚 প্রশ্ন ব্যাংক",
    link: "/questionbank",
    desc: "বিষয়ভিত্তিক ও অধ্যায়ভিত্তিক প্রশ্ন",
  },
  {
    title: "📊 রেজাল্ট বিশ্লেষণ",
    link: "/results",
    desc: "তোমার অগ্রগতি ট্র্যাক করো গ্রাফ সহ",
  },

  {
    title: "📥 Mistake Bank",
    link: "/mistake-bank",
    desc: "যে প্রশ্নগুলো ভুল করেছো, সেগুলো আবার চর্চা করো",
  },
  {
    title: "🗓️ স্টাডি রুটিন",
    link: "/routine",
    desc: "তোমার পড়াশোনার রুটিন নিজেই তৈরি করো",
  },
  {
    title: "🔥 ডেইলি চ্যালেঞ্জ",
    link: "/daily-challenge",
    desc: "প্রতিদিন নিজেকে চ্যালেঞ্জ করো নতুন প্রশ্নে",
  },
  {
    title: "🏆 লিডারবোর্ড",
    link: "/leaderboard",
    desc: "অন্যান্যদের সাথে তোমার অবস্থান দেখো",
  },
  {
    title: "📣 নোটিশ / আপডেট",
    link: "/notices",
    desc: "ভর্তি সংক্রান্ত সব খবর পেয়ে যাও এখানেই",
  },
  {
    title: "💬 আলোচনা ফোরাম",
    link: "/forum",
    desc: "প্রশ্ন-উত্তর, মতামত ও সহায়তা ভাগ করো",
  },
];

const Dashboard = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white px-4 pt-20 pb-10 transition-all duration-500">
          <div className="max-w-7xl mx-auto">
            {/* Admin Link */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="inline-block mb-4 text-green-600 dark:text-green-300 hover:underline transition"
              >
                🔧 Admin Panel
              </Link>
            )}

            {/* Welcome */}
            <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white drop-shadow">
              🎓 {user?.name}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
              প্রতিদিনের প্র‍্যাকটিস, প্রস্তুতি ও অগ্রগতির সবকিছু এক জায়গায়।
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ title, link, desc }) => (
                <Link
                  to={link}
                  key={title}
                  className="bg-white/30 dark:bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 transition-all hover:scale-[1.03] hover:shadow-2xl"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
          <div className="bg-white/30 dark:bg-white/10 backdrop-blur-lg border border-white/20 dark:border-gray-700 rounded-3xl p-10 shadow-2xl max-w-md w-full">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              🔐 Access Denied
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
              Please{" "}
              <span className="font-semibold text-green-600 dark:text-green-400 underline underline-offset-2">
                log in
              </span>{" "}
              to access your dashboard and personalized features.
            </p>
            <a
              href="/login"
              className="inline-block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.05]"
            >
              Go to Login
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
