import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="text-center px-4 md:px-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          📚 স্বপ্নটা শুধু তোমার নয়,
          <br />
          সেটা একটা বিশ্ববিদ্যালয়েরও।
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          তোমার প্রতিদিনের অনুশীলন,{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            একটা বড় স্বপ্নের
          </span>{" "}
          দিকে একেকটা ধাপ। <br />
          Admission Mate – তোমার যাত্রায় সহযাত্রী।
        </p>
        <div className="mt-8">
          <a
            href="/register"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200"
          >
            এখনি শুরু করো
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
