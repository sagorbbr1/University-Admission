import React from "react";

const weaknesses = [
  {
    subject: "Physics",
    chapter: "Rotational Motion",
    accuracy: 42,
    attempts: 3,
  },
  {
    subject: "Chemistry",
    chapter: "Organic Naming",
    accuracy: 35,
    attempts: 4,
  },
  {
    subject: "Math",
    chapter: "Trigonometry",
    accuracy: 50,
    attempts: 2,
  },
];

const WeaknessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#0f172a] text-white px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-400 mb-8 drop-shadow">
        🧠 Weakness Analysis
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {weaknesses.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#111827] p-6 rounded-xl shadow-md border border-indigo-800/30"
          >
            <h2 className="text-xl font-semibold text-indigo-300 mb-2">
              {item.subject} – {item.chapter}
            </h2>
            <p className="text-sm text-gray-300 mb-1">
              Accuracy:{" "}
              <span className="text-red-400 font-bold">{item.accuracy}%</span>
            </p>
            <p className="text-sm text-gray-400">
              Attempts: {item.attempts} times
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition">
              🔁 Practice Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaknessPage;
