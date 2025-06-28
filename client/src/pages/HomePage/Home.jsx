import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-tr from-[#141e30] to-[#243b55] text-white flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[#1c2b36]/90 backdrop-blur border-b border-blue-600 px-8 py-5 flex justify-between items-center shadow">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400 drop-shadow-md">
          🎓 Admission Mate
        </h1>
        <nav className="space-x-6 font-semibold text-white/90 text-lg">
          {["/", "/dashboard", "/login", "/register"].map((path, i) => {
            const names = ["হোম", "ড্যাশবোর্ড", "লগইন", "রেজিস্টার"];
            return (
              <Link
                key={i}
                to={path}
                className="hover:text-blue-300 transition hover:underline underline-offset-4"
              >
                {names[i]}
              </Link>
            );
          })}
        </nav>
      </header>

      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24">
        <h2 className="text-5xl py-3 md:text-6xl font-extrabold bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          ভর্তি প্রস্তুতির সম্পূর্ণ সমাধান
        </h2>
        <p className="text-white/90 mt-6 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl">
          Admission Mate নিয়ে আয়, তোমার মক টেস্ট, প্রশ্ন ব্যাংক, রেজাল্ট
          বিশ্লেষণ ও ডেইলি চ্যালেঞ্জ সব এক জায়গায়। প্রস্তুত হও তোমার স্বপ্নের
          বিশ্ববিদ্যালয়ের জন্য, আজ থেকেই!
        </p>
        <Link
          to="/register"
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full shadow-md hover:scale-105 transition"
        >
          শুরু করো এখনি
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map(({ label, value, icon }, i) => (
          <div
            key={i}
            className="bg-[#1e2a38]/60 backdrop-blur border border-blue-300/20 rounded-2xl p-8 text-center shadow hover:shadow-xl hover:scale-105 transition"
          >
            <div className="text-5xl mb-2">{icon}</div>
            <div className="text-3xl font-bold text-blue-300">
              <AnimatedCounter value={value} />
            </div>
            <div className="text-white/80 text-lg font-medium mt-1">
              {label}
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-md hover:shadow-blue-400 hover:border-blue-300 transition-transform hover:scale-105"
          >
            <h3 className="text-blue-300 text-2xl font-bold mb-3">
              {f.icon} {f.title}
            </h3>
            <p className="text-white/80 text-base font-medium">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-blue-800/20 border-t border-b border-blue-600 py-10">
        <p className="text-center text-xl italic font-semibold text-blue-200">
          “সফলতা পেতে হলে আজই শুরু করতে হবে, সময় তোমার প্রতিদ্বন্দ্বী নয়, বন্ধু
          হতে হবে।” — Admission Mate
        </p>
      </section>

      <footer className="text-white/70 py-6 text-center border-t border-blue-800 bg-black/40 backdrop-blur">
        <div>
          © {new Date().getFullYear()} Admission Mate | Developed by Sagor Boss
          🚀
        </div>
        <div className="flex justify-center gap-6 text-blue-400 text-xl mt-4">
          <a
            href="https://twitter.com/sagorboss"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-300"
          >
            🐦
          </a>
          <a
            href="https://github.com/sagorboss"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-300"
          >
            💻
          </a>
          <a
            href="https://linkedin.com/in/sagorboss"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500"
          >
            🔗
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
