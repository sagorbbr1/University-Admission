import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"; // Adjust the path as necessary

const statsData = [
  { label: "মোট ব্যবহারকারী", value: 14235, icon: "👥" },
  { label: "মক টেস্ট সম্পন্ন", value: 89321, icon: "✅" },
  { label: "প্রশ্ন সংখ্যা", value: 10500, icon: "📚" },
  { label: "ডেইলি চ্যালেঞ্জ", value: 365, icon: "🔥" },
];

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

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let increment = Math.ceil(end / 100);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 15);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-purple-300 px-6 py-3 flex items-center justify-between shadow-md">
        <img
          src={logo}
          alt="Admission Mate"
          className="h-16 md:h-20 max-h-20 object-contain"
        />
        <nav className="space-x-4 text-sm md:text-base font-semibold text-purple-700 dark:text-purple-200">
          <Link to="/" className="hover:text-purple-500 transition">
            হোম
          </Link>
          <Link to="/dashboard" className="hover:text-purple-500 transition">
            ড্যাশবোর্ড
          </Link>
          <Link to="/login" className="hover:text-purple-500 transition">
            লগইন
          </Link>
          <Link to="/register" className="hover:text-purple-500 transition">
            রেজিস্টার
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24">
        <h2 className="text-5xl py-3 md:text-6xl font-extrabold bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          ভর্তি প্রস্তুতির সম্পূর্ণ সমাধান
        </h2>
        <p className="text-gray-800 dark:text-white/90 mt-6 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl">
          Admission Mate নিয়ে আয়, তোমার মক টেস্ট, প্রশ্ন ব্যাংক, রেজাল্ট
          বিশ্লেষণ ও ডেইলি চ্যালেঞ্জ সব এক জায়গায়। প্রস্তুত হও তোমার স্বপ্নের
          বিশ্ববিদ্যালয়ের জন্য, আজ থেকেই!
        </p>
        <Link
          to="/register"
          className="mt-10 bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-full shadow-md hover:scale-105 transition"
        >
          শুরু করো এখনি
        </Link>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map(({ label, value, icon }, i) => (
          <div
            key={i}
            className="bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-gray-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-purple-300 hover:scale-105 transition"
          >
            <div className="text-5xl mb-2">{icon}</div>
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
              <AnimatedCounter value={value} />
            </div>
            <div className="text-gray-800 dark:text-white/80 text-lg font-medium mt-1">
              {label}
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-purple-300 hover:scale-105 transition-transform"
          >
            <h3 className="text-purple-700 dark:text-purple-300 text-2xl font-bold mb-3">
              {f.icon} {f.title}
            </h3>
            <p className="text-gray-800 dark:text-white/80 text-base font-medium">
              {f.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Quote */}
      <section className="bg-white/20 dark:bg-white/10 border-t border-b border-purple-400 dark:border-purple-800 py-10 backdrop-blur text-center">
        <p className="text-xl italic font-semibold text-purple-800 dark:text-purple-200">
          “সফলতা পেতে হলে আজই শুরু করতে হবে, সময় তোমার প্রতিদ্বন্দ্বী নয়, বন্ধু
          হতে হবে।” — Admission Mate
        </p>
      </section>

      {/* Footer */}
      <footer className="text-gray-700 dark:text-white/70 py-6 text-center border-t border-purple-300 dark:border-purple-800 bg-white/30 dark:bg-black/30 backdrop-blur">
        <div>
          © {new Date().getFullYear()} Admission Mate | Developed by Sagor Boss
          🚀
        </div>
        <div className="flex justify-center gap-6 text-purple-500 dark:text-purple-300 text-xl mt-4">
          <a
            href="https://twitter.com/sagorboss"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-400"
          >
            🐦
          </a>
          <a
            href="https://github.com/sagorboss"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-600"
          >
            💻
          </a>
          <a
            href="https://linkedin.com/in/sagorboss"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-400"
          >
            🔗
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
