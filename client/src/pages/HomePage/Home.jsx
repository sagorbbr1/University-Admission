// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const features = [
  { title: "মক টেস্ট", desc: "সময় নিয়ন্ত্রিত পরীক্ষার প্রস্তুতি", icon: "⏱️" },
  {
    title: "প্রশ্ন ব্যাংক",
    desc: "বিষয়ভিত্তিক এবং অধ্যায়ভিত্তিক প্রশ্ন",
    icon: "📚",
  },
  { title: "রেজাল্ট বিশ্লেষণ", desc: "তোমার উন্নতির গ্রাফ", icon: "📊" },
  {
    title: "ডেইলি চ্যালেঞ্জ",
    desc: "প্রতিদিন একটি নতুন চ্যালেঞ্জ",
    icon: "🔥",
  },
];

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="py-4 px-6 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-2xl font-bold">🎓 Admission Mate</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-blue-400">
            হোম
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400">
            ড্যাশবোর্ড
          </Link>
          <Link to="/login" className="hover:text-blue-400">
            লগইন
          </Link>
          <Link to="/register" className="hover:text-blue-400">
            রেজিস্টার
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h2 className="text-4xl font-bold mb-4">
          ভর্তি প্রস্তুতির সম্পূর্ণ সমাধান
        </h2>
        <p className="text-gray-300 max-w-xl mb-6">
          মক টেস্ট, প্রশ্ন ব্যাংক, ডেইলি চ্যালেঞ্জ এবং আরও অনেক কিছু — এক
          প্ল্যাটফর্মেই তোমার ভর্তি প্রস্তুতি শক্তিশালী করো।
        </p>
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          এখনি শুরু করো
        </Link>
      </section>

      {/* Features */}
      <section className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {f.icon} {f.title}
              </h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-700">
        © {new Date().getFullYear()} Admission Mate | Developed by Sagor Boss 🚀
      </footer>
    </div>
  );
};

export default Home;
