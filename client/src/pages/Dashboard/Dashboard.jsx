import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar.jsx";

const features = [
  {
    title: "⏱️ মক টেস্ট",
    link: "/mock-tests",
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
    title: "🧠 দুর্বলতা শনাক্তকরণ",
    link: "/weakness",
    desc: "দুর্বল অধ্যায় চিহ্নিত করে পুনরায় চর্চা করো",
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
      {user && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pb-10 pt-20 px-4">
          {user && user.role === "admin" && (
            <Link to="/admin" className="text-green-400 hover:underline">
              Admin Panel
            </Link>
          )}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">🎓 {user && user?.name}</h2>
            <p className="text-lg text-gray-300 mb-10">
              প্রতিদিনের প্র‍্যাকটিস, প্রস্তুতি ও অগ্রগতির সবকিছু এক জায়গায়।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ title, link, desc }) => (
                <Link
                  key={title}
                  to={link}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                  <p className="mt-2 text-sm text-gray-400">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {!user && (
        <div className="min-h-[60vh] flex items-center justify-center text-center">
          <div className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              🔐 Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please{" "}
              <span className="font-semibold text-green-600">log in</span> to
              access your dashboard and personalized features.
            </p>
            <a
              href="/login"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
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
