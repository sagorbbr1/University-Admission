import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "⏱️ মক টেস্ট",
    link: "/mock-tests",
    desc: "নির্ধারিত সময়ের মধ্যে পরীক্ষার অনুশীলন করো",
  },
  {
    title: "📚 প্রশ্ন ব্যাংক",
    link: "/question-bank",
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">🎓 তোমার অ্যাডমিশন হাব</h1>
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
  );
};

export default Dashboard;
